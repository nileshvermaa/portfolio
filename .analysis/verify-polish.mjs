import { chromium } from "playwright";
import fs from "node:fs";

fs.mkdirSync(".analysis", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.screenshot({ path: ".analysis/polish-hero.png", fullPage: false });
const result = await page.evaluate(() => {
  const body = getComputedStyle(document.body);
  const meta = document.querySelector(".hero-screen__meta span:first-child")?.textContent;
  const back = getComputedStyle(document.querySelector(".avatar-card__face--back img")).filter;
  const front = getComputedStyle(document.querySelector(".avatar-card__face--front img")).filter;
  const anchor = getComputedStyle(document.querySelector(".avatar-anchor")).animationName;
  return { bodyBackground: body.backgroundColor, meta, backFilter: back, frontFilter: front, avatarAnimation: anchor };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();