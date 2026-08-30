import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = process.env.BASE || "http://localhost:3001";
// Git Bash rewrites a bare "/rooms" into a Windows path, so take the last
// segment and rebuild the route.
const raw = process.argv[2] || "/";
const route = raw === "/" ? "/" : "/" + raw.split(/[\\/]/).filter(Boolean).pop();

const b = await puppeteer.launch({
  executablePath: EDGE, headless: "new",
  args: ["--disable-gpu", "--hide-scrollbars"], protocolTimeout: 240000,
});
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });

// simulate a mid-range laptop
const cdp = await p.createCDPSession();
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

const bytes = { total: 0, image: 0, script: 0, css: 0, font: 0 };
p.on("response", async (res) => {
  try {
    const len = Number(res.headers()["content-length"] || 0);
    if (!len) return;
    const t = res.request().resourceType();
    bytes.total += len;
    if (t === "image") bytes.image += len;
    else if (t === "script") bytes.script += len;
    else if (t === "stylesheet") bytes.css += len;
    else if (t === "font") bytes.font += len;
  } catch {}
});

await p.goto(BASE + route, { waitUntil: "load", timeout: 120000 });
await new Promise((r) => setTimeout(r, 2500));

// long tasks + frame timing during a scripted scroll
const result = await p.evaluate(async () => {
  const longTasks = [];
  new PerformanceObserver((l) => l.getEntries().forEach((e) => longTasks.push(Math.round(e.duration))))
    .observe({ entryTypes: ["longtask"] });

  const frames = [];
  let last = performance.now();
  let running = true;
  const tick = () => {
    const now = performance.now();
    frames.push(now - last);
    last = now;
    if (running) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 420) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 55));
  }
  running = false;
  await new Promise((r) => setTimeout(r, 300));

  frames.sort((a, b) => a - b);
  const pct = (q) => Math.round(frames[Math.floor(frames.length * q)] || 0);
  const nav = performance.getEntriesByType("navigation")[0];
  const lcp = performance.getEntriesByType("largest-contentful-paint").pop();
  return {
    frames: frames.length,
    medianFrameMs: pct(0.5),
    p95FrameMs: pct(0.95),
    worstFrameMs: Math.round(frames[frames.length - 1] || 0),
    jankFrames: frames.filter((f) => f > 50).length,
    longTasks: longTasks.length,
    longTaskTotalMs: longTasks.reduce((a, c) => a + c, 0),
    domContentLoaded: Math.round(nav?.domContentLoadedEventEnd || 0),
    loadMs: Math.round(nav?.loadEventEnd || 0),
    lcpMs: lcp ? Math.round(lcp.startTime) : null,
    domNodes: document.querySelectorAll("*").length,
    images: document.images.length,
  };
});

const kb = (n) => (n / 1024).toFixed(0) + "KB";
console.log(`\n${route}  (CPU throttled 4x)`);
console.log(`  transfer   total ${kb(bytes.total)}  img ${kb(bytes.image)}  js ${kb(bytes.script)}  css ${kb(bytes.css)}  font ${kb(bytes.font)}`);
console.log(`  timing     DCL ${result.domContentLoaded}ms  load ${result.loadMs}ms  LCP ${result.lcpMs}ms`);
console.log(`  scroll     median ${result.medianFrameMs}ms  p95 ${result.p95FrameMs}ms  worst ${result.worstFrameMs}ms  janky(>50ms) ${result.jankFrames}/${result.frames}`);
console.log(`  main thread long tasks ${result.longTasks} totalling ${result.longTaskTotalMs}ms`);
console.log(`  DOM nodes ${result.domNodes}  images ${result.images}`);

await b.close();
