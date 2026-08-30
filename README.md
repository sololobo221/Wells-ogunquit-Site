# Wells-Ogunquit Resort Motel, website

A rebuild of [wells-ogunquit.com](https://www.wells-ogunquit.com/) as a modern Next.js site,
using the resort's own photography and verified business details.

## Design

Light and warm, with the palette sampled straight from the sign artwork: black `#010101`,
gold `#c6b871`, lobster red `#b13828`, navy `#133562`. Navy is the single accent. Gold and red
stay inside the logo itself.

- **Type**: Playfair Display for headings, Geist for body
- **Colour**: `--color-canvas` `#f7f6f3` page, `--color-surface` white panels, `--color-ink`
  `#111111` text, `--color-navy` accent. Tokens live in `src/app/globals.css` under `@theme`
- **Radius**: `--radius-card` 12px, `--radius-media` 10px, `--radius-control` 6px. No pill buttons
- **Shadows**: near invisible. Structure comes from `--color-line` hairlines, not elevation

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **motion** (`motion/react`) for scroll reveals, **@phosphor-icons/react** for icons
- **sharp** (dev only) for the image right-sizing script

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
npm run assets  # re-download property photos into public/images
npm run images  # cap photos at 2400px, re-encode, derive the wide sunrise crop
```

Two local tools, both driving the installed Edge (no browser download):

```bash
node scripts/shots.mjs          # full-page screenshots of every route into .shots/
node scripts/perf.mjs /rooms    # transfer size, scroll frame times, long tasks
```

`BASE=http://localhost:3001 node scripts/shots.mjs` points either tool at a
production server instead of dev.

## Where things live

| Path | What it is |
| --- | --- |
| `src/lib/site.ts` | Business facts: address, phones, email, booking URL, distances, policies |
| `src/lib/rooms.ts` | The six room types: beds, occupancy, stairs, photos, copy |
| `src/lib/gallery.ts` | Gallery image lists with written alt text |
| `src/components/` | Header, Footer, HeroSlider, BookingBar, RoomCard, Gallery and friends |
| `src/app/` | One folder per route |
| `scripts/download-assets.mjs` | Pulls the highest resolution photos from the old WordPress site |
| `scripts/optimize-images.mjs` | Caps them at 2400px and re-encodes |
| `public/images/` | The photography, 47 files, about 7.7 MB |

Nearly all repeated copy comes from `src/lib/site.ts` and `src/lib/rooms.ts`. Change it once there
and it updates everywhere.

## Performance

Measured on the production build with the CPU throttled 4x, and on mobile at
390px with a 6x CPU throttle over Fast 3G.

| | before | after |
| --- | --- | --- |
| Homepage transfer | 1535 KB | 752 KB |
| Above-the-fold images | 1094 KB | 506 KB |
| Mobile transfer | | 207 KB |
| Mobile load, Fast 3G | | 2.3 s |
| Scroll | | 60 fps, no long tasks |

What made the difference:

- **The hero slider loaded all four photos at once.** Only the first ships with
  the page now; the rest mount on `requestIdleCallback`.
- **AVIF** is enabled ahead of WebP in `next.config.ts`, roughly halving image
  bytes (the lead hero went from 258 KB to 136 KB).
- **The sunrise photo was portrait** but every slot using it is full-bleed
  landscape, so `npm run images` derives `hero-sunrise-wide.jpg`. 767 KB to 285 KB.
- **`backdrop-filter` is gone from the fixed header and mobile bar.** Blur on a
  fixed element repaints every scroll frame and is a common cause of stutter on
  integrated graphics.
- **The film grain is a small tiled PNG** rather than a live SVG turbulence
  filter, and it is skipped entirely on touch devices and under reduced motion.

Note that `next start` serves `public/` from the build snapshot, so add a new
image and rebuild before testing it. Killing it needs the port, not the name:
`pkill -f "next start"` does not match, so use
`Get-NetTCPConnection -LocalPort 3001` and stop that PID, or you will keep
testing a stale build.

### Image sharpness

`node scripts/sharpness.mjs` renders every page at 2x and reports any image
whose source cannot fill its slot on a retina screen, either because the file
is too small or because the crop throws most of the width away.

Two limits are in the source photography, not the code:

- **The room photos top out at 700px wide.** They are the largest the old site
  ever had. At card size they are around 75% of retina sharpness, which is
  slightly soft but acceptable. New photography is the only real fix.
- **The beach aerial is a 1920x500 banner**, so it cannot fill a wide hero at
  2x. A high resolution beach photo would be the single most useful new asset.

## Reviews

`src/lib/reviews.ts` holds the review data. The ratings there came from the
property's own previous site: number one on TripAdvisor in Wells since 2017,
8.9/10 on Booking.com, 4.5/5 on Expedia. **Check each listing and update those
numbers before launch**, since ratings drift.

The section links out to TripAdvisor and Google rather than embedding a review
widget. Widgets cost a monthly fee and inject third-party JavaScript, which
would undo the performance work above.

To add real guest quotes, fill in the `quotes` array in the same file with words
people actually wrote, credited the way the platform credits them. Leave it
empty and the quote block simply does not render, so the site never shows a
testimonial nobody wrote.

Do not add `AggregateRating` schema based on these numbers. Google treats review
markup for ratings collected on other sites as self-serving and it can earn a
manual penalty.

## Booking

Reservations run through the existing **Cloudbeds** engine
(`hotels.cloudbeds.com/reservation/HViWyP`), set in `src/lib/site.ts`. The booking bar under the
hero passes the chosen dates and guest count through as URL parameters.

## Notes for the owner

- **No prices appear anywhere on this site.** The old site did not list them either, and rates vary
  by date and occupancy, so every rate call to action sends guests to the live Cloudbeds page. If
  you want "from $X" pricing shown, that figure needs to come from you.
- **The logo** is at `public/images/logo.png` with the white background cut out, so it sits on any
  surface. It appears in the header, the footer, the home page, the 404 page, the favicon and the
  social share card. Render it anywhere with `<Logo width={n} />`.
- **`/privacy` and `/policies`** were drafted from what the old site stated. Read them and correct
  anything that has changed, especially cancellation terms and season dates.
- **Season dates** are written generally. Update `season` in `src/lib/site.ts` each year.
- **The review ratings need verifying.** See the Reviews section above.
- The virtual tour and the four bedroom vacation home have been removed at your request. If either
  comes back, the old page files are in git history.

## Deploying

The site is static apart from the image optimizer.

- **Vercel**: connect the repo, no configuration needed.
- **Any static host**: add `output: "export"` and `images: { unoptimized: true }` to
  `next.config.ts`, run `npm run build`, and upload `out/`.
