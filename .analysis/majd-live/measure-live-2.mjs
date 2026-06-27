import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
const OUT = path.resolve(".analysis/majd-live");
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("https://majd-portfolio.framer.website/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(800);

const topMap = await page.evaluate(() => {
  const nodes = [...document.querySelectorAll("body *")].map((el, i) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const text = (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120);
    return { i, tag: el.tagName, text, cls: String(el.className || ""), pos: cs.position, cursor: cs.cursor, pe: cs.pointerEvents, z: cs.zIndex, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, bg: cs.backgroundColor, radius: cs.borderRadius };
  }).filter((n) => n.rect.w > 2 && n.rect.h > 2 && n.rect.y > -100 && n.rect.y < 950);
  return nodes.sort((a, b) => (a.rect.y - b.rect.y) || (a.rect.x - b.rect.x)).slice(0, 240);
});
await fs.writeFile(path.join(OUT, "top-map.json"), JSON.stringify(topMap, null, 2));

const load = await page.evaluate(async () => {
  const pick = () => {
    const els = [...document.querySelectorAll("body *")];
    const titleParts = els.filter((el) => {
      const t = (el.textContent || "").replace(/\s+/g, " ").trim();
      const r = el.getBoundingClientRect();
      return /Software|Engineer/i.test(t) && r.y < 700 && r.width > 20 && r.height > 20;
    }).map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { text: (el.textContent || "").replace(/\s+/g, " ").trim(), rect: { x: r.x, y: r.y, w: r.width, h: r.height }, opacity: Number(cs.opacity), transform: cs.transform, fontSize: cs.fontSize };
    });
    const nav = els.find((el) => {
      const r = el.getBoundingClientRect();
      return r.x > 520 && r.x < 590 && r.y > 20 && r.y < 40 && Math.round(r.width) === 320 && Math.round(r.height) >= 58;
    });
    const portrait = [...document.images].find((img) => /Portrait of portfolio creator/.test(img.alt));
    const portraitBox = portrait?.parentElement?.parentElement || portrait?.parentElement;
    const pack = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { x: r.x, y: r.y, w: r.width, h: r.height, opacity: Number(cs.opacity), transform: cs.transform, radius: cs.borderRadius };
    };
    return { nav: pack(nav), portrait: pack(portraitBox), titleParts };
  };
  const frames = [];
  const start = performance.now();
  while (performance.now() - start <= 1800) {
    await new Promise(requestAnimationFrame);
    frames.push({ t: Math.round(performance.now() - start), ...pick() });
  }
  return frames;
});
await fs.writeFile(path.join(OUT, "load-precise.json"), JSON.stringify(load, null, 2));

const nav = await page.evaluate(async () => {
  const elementsAt = document.elementsFromPoint(852, 60).map((el) => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80), cls: String(el.className || ""), rect: { x: r.x, y: r.y, w: r.width, h: r.height }, cursor: getComputedStyle(el).cursor };
  });
  return elementsAt;
});
await fs.writeFile(path.join(OUT, "nav-point-stack.json"), JSON.stringify(nav, null, 2));

await page.mouse.click(852, 60);
const navFrames = await page.evaluate(async () => {
  const findNav = () => [...document.querySelectorAll("body *")].find((el) => {
    const r = el.getBoundingClientRect();
    return r.x > 520 && r.x < 590 && r.y > 20 && r.y < 40 && Math.round(r.width) === 320;
  });
  const pack = () => {
    const nav = findNav();
    const r = nav?.getBoundingClientRect();
    const children = nav ? [...nav.querySelectorAll("*")].slice(0, 40).map((el) => {
      const cr = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { tag: el.tagName, text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 30), rect: { x: cr.x, y: cr.y, w: cr.width, h: cr.height }, opacity: Number(cs.opacity), transform: cs.transform, bg: cs.backgroundColor, radius: cs.borderRadius };
    }) : [];
    return { nav: r ? { x: r.x, y: r.y, w: r.width, h: r.height } : null, children };
  };
  const frames = [];
  const start = performance.now();
  while (performance.now() - start <= 1000) {
    await new Promise(requestAnimationFrame);
    frames.push({ t: Math.round(performance.now() - start), ...pack() });
  }
  return frames;
});
await fs.writeFile(path.join(OUT, "nav-click-precise.json"), JSON.stringify(navFrames, null, 2));

await page.goto("https://majd-portfolio.framer.website/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(400);
const scroll = [];
for (const y of [0, 120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680]) {
  await page.evaluate((v) => scrollTo(0, v), y);
  await page.waitForTimeout(100);
  scroll.push(await page.evaluate(() => {
    const portrait = [...document.images].find((img) => /Portrait of portfolio creator/.test(img.alt));
    let el = portrait;
    const boxes = [];
    for (let i = 0; el && i < 6; i++, el = el.parentElement) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      boxes.push({ tag: el.tagName, cls: String(el.className || ""), rect: { x: r.x, y: r.y, w: r.width, h: r.height }, opacity: Number(cs.opacity), transform: cs.transform, bg: cs.backgroundColor, radius: cs.borderRadius, pos: cs.position });
    }
    return { y: scrollY, boxes };
  }));
}
await fs.writeFile(path.join(OUT, "scroll-portrait-chain.json"), JSON.stringify(scroll, null, 2));
await browser.close();
