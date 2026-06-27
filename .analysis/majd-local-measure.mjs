import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
const OUT = path.resolve(".analysis/majd-local");
await fs.mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, recordVideo: { dir: path.join(OUT, "video"), size: { width: 1440, height: 900 } } });
const page = await context.newPage();
const logs=[];
page.on('console', msg => logs.push({type:msg.type(), text:msg.text()}));
page.on('pageerror', err => logs.push({type:'pageerror', text:err.message}));
await page.goto("http://localhost:5173/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(OUT, "01-load.png"), fullPage: false });
const sample = await page.evaluate(() => {
  const pack = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { x:r.x,y:r.y,w:r.width,h:r.height,opacity:Number(cs.opacity),transform:cs.transform, radius:cs.borderRadius, fontSize:cs.fontSize };
  };
  return {
    nav: pack('.mp-nav__panel'),
    title: pack('.hero-screen h1'),
    star: pack('.hero-screen__star'),
    bolt: pack('.hero-screen__bolt'),
    avatar: pack('.avatar-card'),
    meta: pack('.hero-screen__meta'),
    bodyHeight: document.documentElement.scrollHeight,
  };
});
await fs.writeFile(path.join(OUT, "initial.json"), JSON.stringify(sample, null, 2));
await page.mouse.click(852, 60);
const navFrames=[];
for (let i=0;i<45;i++) { await page.waitForTimeout(16); navFrames.push(await page.evaluate(() => { const el=document.querySelector('.mp-nav__panel'); const r=el.getBoundingClientRect(); const cs=getComputedStyle(el); return { t: performance.now(), nav:{x:r.x,y:r.y,w:r.width,h:r.height,transform:cs.transform,radius:cs.borderRadius} }; })); }
await fs.writeFile(path.join(OUT, "nav-frames.json"), JSON.stringify(navFrames, null, 2));
await page.screenshot({ path: path.join(OUT, "02-nav-open.png"), fullPage: false });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(500);
const scroll=[];
for (const y of [0,120,240,360,480,600,720,840,960,1080,1200,1320,1440]) {
  await page.evaluate((v) => scrollTo(0,v), y);
  await page.waitForTimeout(120);
  scroll.push(await page.evaluate(() => {
    const el=document.querySelector('.avatar-card');
    const r=el.getBoundingClientRect();
    const cs=getComputedStyle(el);
    return { y:scrollY, avatar:{x:r.x,y:r.y,w:r.width,h:r.height,transform:cs.transform,opacity:Number(cs.opacity)} };
  }));
}
await fs.writeFile(path.join(OUT, "scroll-avatar.json"), JSON.stringify(scroll, null, 2));
await fs.writeFile(path.join(OUT, "console.json"), JSON.stringify(logs, null, 2));
await context.close();
await browser.close();
