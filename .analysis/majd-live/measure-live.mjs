import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(".analysis/majd-live");
await fs.mkdir(OUT, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  recordVideo: { dir: path.join(OUT, "video"), size: { width: 1440, height: 900 } },
});
const page = await context.newPage();
await page.goto("https://majd-portfolio.framer.website/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(700);

await page.screenshot({ path: path.join(OUT, "01-load.png"), fullPage: false });

const selectors = await page.evaluate(() => {
  const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 4 && r.height > 4 && cs.visibility !== "hidden" && cs.display !== "none";
  };
  const labelFor = (el) => {
    if (el.tagName === "IMG") return el.getAttribute("alt") || el.getAttribute("src") || "img";
    return norm(el.textContent).slice(0, 80);
  };
  const all = [...document.querySelectorAll("body *")].filter(visible);
  const fixed = all.filter((el) => getComputedStyle(el).position === "fixed").map((el) => ({ tag: el.tagName, text: labelFor(el), rect: el.getBoundingClientRect().toJSON?.() || null, cls: el.className }));
  const textHits = ["Software Engineer", "Hey!", "Services", "Featured Projects", "Let's talk"].map((needle) => {
    const el = all.find((node) => norm(node.textContent) === needle) || all.find((node) => norm(node.textContent).includes(needle));
    if (!el) return { needle, found: false };
    const r = el.getBoundingClientRect();
    return { needle, found: true, tag: el.tagName, text: labelFor(el), rect: { x: r.x, y: r.y, w: r.width, h: r.height }, className: String(el.className || "") };
  });
  const images = [...document.images].filter(visible).map((img) => {
    const r = img.getBoundingClientRect();
    return { alt: img.alt, src: img.currentSrc || img.src, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, className: String(img.className || "") };
  }).slice(0, 12);
  return { fixed, textHits, images, title: document.title, height: document.documentElement.scrollHeight };
});
await fs.writeFile(path.join(OUT, "selectors.json"), JSON.stringify(selectors, null, 2));

const sample = async (name, duration = 1600) => {
  const data = await page.evaluate(async ({ duration }) => {
    const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 4 && r.height > 4 && cs.visibility !== "hidden" && cs.display !== "none";
    };
    const all = [...document.querySelectorAll("body *")].filter(visible);
    const byText = (needle) => all.find((el) => norm(el.textContent) === needle) || all.find((el) => norm(el.textContent).includes(needle));
    const nav = all.find((el) => getComputedStyle(el).position === "fixed" && el.getBoundingClientRect().top < 80 && el.getBoundingClientRect().width > 220);
    const title = byText("Software Engineer");
    const hey = byText("Hey!");
    const avatar = [...document.images].map((img) => img.parentElement).filter(Boolean).find((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 220 && r.height > 260 && r.top < innerHeight;
    });
    const star = [...document.images].find((img) => /star/i.test(img.currentSrc || img.src));
    const bolt = [...document.images].find((img) => /bolt/i.test(img.currentSrc || img.src));
    const targets = { nav, title, hey, avatar, star, bolt };
    const start = performance.now();
    const frames = [];
    const pack = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { x: r.x, y: r.y, w: r.width, h: r.height, opacity: Number(cs.opacity), transform: cs.transform, borderRadius: cs.borderRadius };
    };
    while (performance.now() - start <= duration) {
      await new Promise(requestAnimationFrame);
      frames.push({ t: Math.round(performance.now() - start), y: scrollY, ...Object.fromEntries(Object.entries(targets).map(([k, el]) => [k, pack(el)])) });
    }
    return frames;
  }, { duration });
  await fs.writeFile(path.join(OUT, `${name}.json`), JSON.stringify(data, null, 2));
  return data;
};

await page.reload({ waitUntil: "networkidle" });
await sample("load-frames", 1800);
await page.screenshot({ path: path.join(OUT, "02-after-load.png"), fullPage: false });

const navMotion = await page.evaluate(async () => {
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 4 && r.height > 4 && getComputedStyle(el).visibility !== "hidden";
  };
  const fixed = [...document.querySelectorAll("body *")].filter((el) => visible(el) && getComputedStyle(el).position === "fixed" && el.getBoundingClientRect().top < 90);
  const nav = fixed.sort((a, b) => b.getBoundingClientRect().width * b.getBoundingClientRect().height - a.getBoundingClientRect().width * a.getBoundingClientRect().height)[0];
  const button = nav?.querySelector("button") || [...document.querySelectorAll("button")].find((b) => b.getBoundingClientRect().top < 100);
  const pack = () => {
    const nr = nav?.getBoundingClientRect();
    const br = button?.getBoundingClientRect();
    const bars = button ? [...button.querySelectorAll("*")].slice(0, 5).map((el) => ({ tag: el.tagName, style: getComputedStyle(el).transform, rect: el.getBoundingClientRect().toJSON?.() })) : [];
    return { nav: nr ? { x: nr.x, y: nr.y, w: nr.width, h: nr.height } : null, button: br ? { x: br.x, y: br.y, w: br.width, h: br.height } : null, bars };
  };
  const frames = [];
  const start = performance.now();
  button?.click();
  while (performance.now() - start <= 1100) {
    await new Promise(requestAnimationFrame);
    frames.push({ t: Math.round(performance.now() - start), ...pack() });
  }
  return frames;
});
await fs.writeFile(path.join(OUT, "nav-toggle-frames.json"), JSON.stringify(navMotion, null, 2));
await page.screenshot({ path: path.join(OUT, "03-nav-open.png"), fullPage: false });

await page.goto("https://majd-portfolio.framer.website/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(400);
const scrollSamples = [];
for (const y of [0, 90, 180, 270, 360, 450, 540, 630, 720, 810, 900, 990, 1080]) {
  await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
  await page.waitForTimeout(120);
  scrollSamples.push(await page.evaluate(() => {
    const imgs = [...document.images].map((img) => img.parentElement).filter(Boolean);
    const avatar = imgs.find((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 220 && r.height > 260 && r.top >= -40 && r.top < innerHeight;
    }) || imgs.find((el) => el.getBoundingClientRect().width > 220 && el.getBoundingClientRect().height > 260);
    const title = [...document.querySelectorAll("body *")].find((el) => (el.textContent || "").replace(/\s+/g, " ").trim().includes("Software Engineer"));
    const hey = [...document.querySelectorAll("body *")].find((el) => (el.textContent || "").replace(/\s+/g, " ").trim() === "Hey!");
    const pack = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { x: r.x, y: r.y, w: r.width, h: r.height, opacity: Number(cs.opacity), transform: cs.transform };
    };
    return { y: scrollY, avatar: pack(avatar), title: pack(title), hey: pack(hey) };
  }));
}
await fs.writeFile(path.join(OUT, "scroll-avatar-samples.json"), JSON.stringify(scrollSamples, null, 2));
await page.screenshot({ path: path.join(OUT, "04-scroll-mid.png"), fullPage: false });

await context.close();
await browser.close();
