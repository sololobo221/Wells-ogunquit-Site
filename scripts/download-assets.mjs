// Downloads the resort's real photography at the highest resolution the
// original site offers. Run: npm run assets
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const BASE = "https://www.wells-ogunquit.com/wp-content/uploads/";
const OUT = path.join(process.cwd(), "public", "images");

// name -> source path. Highest-resolution version of each photo, verified by probing.
const ASSETS = {
  // ---- Hero / large feature (2300px+) ----
  "hero-pool-umbrella.jpg": "2020/10/poolwithumbrella.jpg",     // 2896x1879
  "hero-pool.jpg": "2020/10/pool.jpg",                           // 2902x1867
  "hero-sunrise.jpg": "2020/10/Sarah-sunrise-oct-2020-1.jpg",    // 4032x3024
  "hero-room-porch.jpg": "2020/10/room1porch.jpg",               // 2976x1984
  "hero-room.jpg": "2020/10/room5.jpg",                          // 2922x1919
  "hero-room-alt.jpg": "2020/10/room5reversed.jpg",              // 2922x1901
  "hero-room-deck.jpg": "2020/10/room5deck.jpg",                 // 2923x1876

  // ---- Breakfast (2500px) ----
  "breakfast-muffins.jpg": "2021/11/breakfast-beans-and-muffins-scaled.jpg",
  "breakfast-pans.jpeg": "2021/11/breakfast-muffins-in-pans-scaled.jpeg",
  "breakfast-mugs.jpg": "2021/11/breakfast-mugs-and-pastry-scaled.jpg",

  // ---- Garden / wide bands ----
  "garden-view.jpg": "2021/02/garden-view-2018.jpg",             // 1875x993
  "band-sign-front.jpg": "2023/06/slidesignandfront.jpg",        // 1920x500
  "band-picnic.jpg": "2023/06/slidepicnicareajune2023.jpg",      // 1920x500
  "band-aerial-beach.png": "2017/04/aerialbeach-1.png",          // 1920x500

  // ---- Rooms (700px, used at card scale) ----
  "room-suite-main.jpg": "2023/05/206fromdoor.jpg",
  "room-suite-second.jpg": "2023/05/203extrabedroom.jpg",
  "room-suite-toward.jpg": "2023/05/206towarddoor.jpg",
  "room-queen-double.jpg": "2023/05/208fromdoor.jpg",
  "room-queen-double-2.jpg": "2023/05/209towarddoor.jpg",
  "room-kitchenette.jpg": "2023/05/209kitchenetteandvanity.jpg",
  "room-poolside.jpg": "2023/05/211towarddoor.jpg",
  "room-poolside-2.jpg": "2023/05/211fromdoor.jpg",
  "room-305.jpg": "2023/05/305fromdoor.jpg",
  "room-301.jpg": "2023/05/301fromdoor.jpg",
  "room-304.jpg": "2023/05/304fromdoor.jpg",
  "room-king.jpg": "2023/07/room1.jpg",
  "room-king-corner.jpg": "2023/07/room1bedcorner.jpg",
  "room-king-bath.jpg": "2023/07/room1bath.jpg",
  "room-queen.jpg": "2023/07/room3.jpg",
  "room-queen-corner.jpg": "2023/07/room3bedcorner.jpg",
  "room-vanity.jpg": "2021/06/311vanity.jpg",
  "room-bath.jpg": "2021/06/305bath.jpg",

  // ---- Grounds & amenities ----
  "pool-fall.jpg": "2020/04/poolandfoliage.jpg",
  "pool-2019.jpg": "2020/10/new-pool-2019.jpg",
  "sign-fall.jpg": "2020/04/signandfoliage.jpg",
  "tables-fall.jpg": "2020/04/tablesandfoliage.jpg",
  "canopies-fall.jpg": "2020/04/canopiesandfoliage.jpg",
  "office-fall.jpg": "2020/04/officeandfoliage.jpg",
  "playground.jpg": "2018/07/playgroundswings.jpg",
  "gazebo.jpg": "2018/07/gazeboandpicnictables.jpg",
  "grills.jpg": "2016/04/700grillsandpatio.jpg",
  "sandbox.jpg": "2016/04/700sandboxandpicnicarea.jpg",
  "beach-carts.jpg": "2016/04/700beachcarts.jpg",
  "beach-aerial.jpg": "2016/04/beachaerial800.jpg",
  "beach.jpg": "2020/10/ogt-beach-carrie-2020.jpg",
  "beach-rose.jpg": "2020/04/OGT-Ocean-Beach-rose-email.jpg",
  "breakfast-patio.jpg": "2021/05/breakfastpatio1.jpg",
};

async function get(url) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (asset-fetch)" } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return buf.length > 800 ? buf : null;
  } catch {
    return null;
  }
}

await mkdir(OUT, { recursive: true });
const entries = Object.entries(ASSETS);
let ok = 0;
const failed = [];

await Promise.all(
  entries.map(async ([name, src]) => {
    const dest = path.join(OUT, name);
    if (existsSync(dest)) { ok++; return; }
    const buf = await get(BASE + src);
    if (buf) {
      await writeFile(dest, buf);
      ok++;
      console.log(`  ok  ${name}  ${(buf.length / 1024).toFixed(0)} KB`);
    } else {
      failed.push(name);
      console.log(`  --  ${name}  could not download`);
    }
  }),
);

console.log(`\n${ok}/${entries.length} downloaded. Failed: ${failed.length ? failed.join(", ") : "none"}`);
