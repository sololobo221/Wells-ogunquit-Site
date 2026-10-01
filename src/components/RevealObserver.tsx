"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The one script behind every <Reveal>. A single IntersectionObserver marks
 * elements with [data-shown] as they scroll in; CSS keyed on `.reveal-ready`
 * does the animation.
 *
 * On the first load, `.reveal-ready` is only added after the observer's first
 * report, by which time everything already on screen has been marked shown.
 * So server-painted content never flashes or waits on JavaScript, and nothing
 * here reads layout directly: sections skipped by content-visibility stay
 * skipped until they are scrolled near.
 *
 * After a client navigation the class is already present, so the new page's
 * content rises in as it appears.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const ready = () => root.classList.add("reveal-ready");
    const pending = document.querySelectorAll("[data-reveal]:not([data-shown])");
    if (pending.length === 0) return ready();

    let first = true;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute("data-shown", "");
        io.unobserve(e.target);
      }
      if (first) {
        first = false;
        ready();
      }
    });
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
