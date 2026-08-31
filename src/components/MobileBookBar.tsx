"use client";

import Link from "next/link";
import { site } from "@/lib/site";

/** Pinned booking CTA. Always visible on small screens. */
export default function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-line bg-canvas/95 px-4 py-3 backdrop-blur-[2px] lg:hidden">
      <a
        href={site.phones.tollFreeHref}
        className="flex h-12 items-center justify-center rounded-[var(--radius-control)] border border-ink/20 text-small text-ink transition-colors duration-200 active:bg-ink/5"
      >
        Call us
      </a>
      <Link
        href={site.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 items-center justify-center rounded-[var(--radius-control)] bg-accent text-small font-medium text-white transition-[background-color,transform] duration-200 active:translate-y-px"
      >
        Book a room
      </Link>
    </div>
  );
}
