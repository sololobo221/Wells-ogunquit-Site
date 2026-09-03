"use client";

import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Pinned booking CTA. Always visible on small screens.
 *
 * z-30 keeps it below the full-screen mobile menu (z-45), which carries its own
 * booking CTA. The safe-area padding clears the iPhone home indicator, and the
 * body reserves matching space so no content sits behind the bar.
 */
export default function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-3 border-t border-line bg-canvas/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-[2px] lg:hidden">
      <a
        href={site.phones.tollFreeHref}
        className="flex h-11 items-center justify-center rounded-[var(--radius-control)] border border-ink/20 text-small text-ink transition-colors duration-200 active:bg-ink/5"
      >
        Call us
      </a>
      <Link
        href="/booking"
        className="flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-accent text-small font-medium text-white transition-[background-color,transform] duration-200 active:translate-y-px"
      >
        Book a room
      </Link>
    </div>
  );
}
