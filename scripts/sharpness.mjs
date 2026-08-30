// Finds images that will look soft: either the served variant is smaller than
// the slot needs at 2x, or the source aspect ratio is badly mismatched to the
// slot so object-cover throws most of the pixels away.
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import path from "node:path";
import { existsSync } from "node:fs";

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = process.env.BASE || "http://localhost:3001";
const routes = ["", "rooms", "rooms/king-bed-studio", "amenities", "breakfast", "attractions", "contact", "specials"];
const DPR = 2;

const b = await puppeteer.launch({
  executablePath: EDGE, headless: "new",
  args: ["--disable-gpu", "--hide-scrollbars"], protocolTimeout: 240000,
});

const seen = new Map();

for (const r of routes) {
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: DPR });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await p.goto(`${BASE}/${r}`, { waitUntil: "load", timeout: 120000 });
  await new Promise((s) => setTimeout(s, 1500));
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 700) {
    await p.evaluate((v) => window.scrollTo(0, v), y);
    await new Promise((s) => setTimeout(s, 90));
  }
  await new Promise((s) => setTimeout(s, 1500));

  const imgs = await p.evaluate(() =>
    [...document.images]
      .map((i) => {
        const rect = i.getBoundingClientRect();
        const u = i.currentSrc || i.src;
        const fm = u.match(/[?&]url=([^&]+)/);
        const wm = u.match(/[?&]w=(\d+)/);
        return {
          file: fm ? decodeURIComponent(fm[1]).replace("/images/", "") : u.split("/").pop(),
          served: wm ? Number(wm[1]) : 0,
          cssW: Math.round(rect.width),
          cssH: Math.round(rect.height),
        };
      })
      .filter((i) => i.cssW > 40),
  );

  for (const i of imgs) {
    const key = i.file + "@" + (r || "/");
    if (!seen.has(key)) seen.set(key, { ...i, route: r || "/" });
  }
  await p.close();
}
await b.close();

const rows = [];
for (const d of seen.values()) {
  const fp = path.join("public", "images", d.file);
  if (!existsSync(fp)) continue;
  const m = await sharp(fp).metadata();
  const srcW = m.width ?? 0, srcH = m.height ?? 0;
  const need = d.cssW * DPR;
  const slotAR = d.cssW / Math.max(d.cssH, 1);
  const srcAR = srcW / Math.max(srcH, 1);
  // object-cover: how much of the source width survives the crop
  const usableW = srcAR > slotAR ? srcH * slotAR : srcW;
  rows.push({
    ...d, srcW, srcH, need,
    servedShort: d.served > 0 && d.served < need,
    effective: Math.round(usableW),
    cropStarved: usableW < need,
    arSkew: Math.max(srcAR / slotAR, slotAR / srcAR),
  });
}

const bad = rows.filter((r) => r.cropStarved || r.servedShort);
bad.sort((a, b2) => a.effective / a.need - b2.effective / b2.need);

console.log(`Slot needs = CSS width x ${DPR}\n`);
console.log("effective/need  source        slot          served  file  (page)");
for (const r of bad) {
  const flag = r.cropStarved ? (r.arSkew > 1.6 ? " CROP" : " SMALL") : " SERVED";
  console.log(
    `${String(r.effective).padStart(5)}/${String(r.need).padEnd(6)}  ${String(r.srcW + "x" + r.srcH).padEnd(12)}  ${String(r.cssW + "x" + r.cssH).padEnd(12)}  ${String(r.served).padEnd(6)}  ${r.file}  (${r.route})${flag}`,
  );
}
console.log(`\n${bad.length} of ${rows.length} image placements are short of what the slot needs`);
