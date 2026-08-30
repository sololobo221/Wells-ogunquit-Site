// Caps source photos at 2400px wide and re-encodes them. Retina-sharp for
// full-bleed use, without shipping 4 MB originals. Run: npm run images
import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "images");
const MAX_W = 3000;
const QUALITY = 82;

const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));
let before = 0;
let after = 0;

for (const f of files) {
  const p = path.join(DIR, f);
  const sizeBefore = (await stat(p)).size;
  before += sizeBefore;

  const img = sharp(p, { failOn: "none" });
  const meta = await img.metadata();
  const isPng = /\.png$/i.test(f);

  if ((meta.width ?? 0) <= MAX_W && sizeBefore < 600_000) {
    after += sizeBefore;
    continue; // already reasonable
  }

  const tmp = p + ".tmp";
  let pipeline = img.rotate();
  if ((meta.width ?? 0) > MAX_W) pipeline = pipeline.resize({ width: MAX_W, withoutEnlargement: true });
  pipeline = isPng
    ? pipeline.png({ compressionLevel: 9, palette: true })
    : pipeline.jpeg({ quality: QUALITY, mozjpeg: true });

  await pipeline.toFile(tmp);
  const sizeAfter = (await stat(tmp)).size;

  if (sizeAfter < sizeBefore) {
    await unlink(p);
    await rename(tmp, p);
    after += sizeAfter;
    console.log(
      `  ${f}  ${(sizeBefore / 1024 / 1024).toFixed(2)}MB -> ${(sizeAfter / 1024 / 1024).toFixed(2)}MB`,
    );
  } else {
    await unlink(tmp);
    after += sizeBefore;
  }
}

// The sunrise photo is portrait but every slot that uses it is full-bleed
// landscape. Derive a wide crop so we are not shipping pixels the crop throws away.
const SUNRISE = path.join(DIR, "hero-sunrise.jpg");
const SUNRISE_WIDE = path.join(DIR, "hero-sunrise-wide.jpg");
if (existsSync(SUNRISE)) {
  await sharp(SUNRISE)
    .resize({ width: 2800, height: 1575, fit: "cover", position: "attention" })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(SUNRISE_WIDE);
  console.log("  hero-sunrise-wide.jpg  derived landscape crop at 2800px");
}

console.log(
  `\nTotal ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB across ${files.length} files`,
);
