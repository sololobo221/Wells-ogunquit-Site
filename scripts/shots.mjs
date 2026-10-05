// Full-page screenshots via the local Edge install.
// Usage: node scripts/shots.mjs            (all routes)
//        node scripts/shots.mjs rooms      (one route, no leading slash)
//
// Reduced motion is emulated so the scroll reveals render in their
// resting state and the whole page captures in one pass.
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = process.env.BASE || "http://localhost:3000";
const OUT = ".shots";

const ALL = [
  "",
  "rooms",
  "rooms/king-bed-studio",
  "amenities",
  "breakfast",
  "attractions",
  "contact",
  "specials",
];
const arg = process.argv[2];
const routes = arg ? [arg.replace(/^\/+/, "")] : ALL;

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--disable-gpu", "--hide-scrollbars"],
  protocolTimeout: 240000,
});

for (const r of routes) {
  const url = `${BASE}/${r}`;
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(url, { waitUntil: "load", timeout: 120000 });
  // content-visibility: auto skips painting off-screen sections, which leaves
  // them blank in a full-page capture. Render everything for the screenshot.
  await page.addStyleTag({
    content: "main > section, body > footer { content-visibility: visible !important; }",
  });

  await new Promise((res) => setTimeout(res, 2500));

  // Drive the scroll from Node in small steps so whileInView reveals fire
  // and the image optimizer keeps up. Each round trip stays short.
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 700) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await new Promise((res) => setTimeout(res, 120));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((res) => setTimeout(res, 2500));

  const name = r === "" ? "home" : r.replace(/\//g, "-");
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });

  const broken = await page.evaluate(
    () => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
  );
  const h = await page.evaluate(() => document.body.scrollHeight);
  console.log(`  ${name}.png  ${h}px${broken ? `  (${broken} BROKEN images)` : ""}`);
  await page.close();
}

await browser.close();
