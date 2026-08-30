"use client";

import Link from "next/link";
import { site } from "@/lib/site";

export default function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-canvas p-3 lg:hidden">
      <a
        href={site.phones.tollFreeHref}
        className="rounded-[var(--radius-control)] border border-line bg-surface py-3 text-center text-[0.85rem] text-ink transition-colors duration-200 active:bg-canvas"
      >
        Call us
      </a>
      <Link
        href={site.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-[var(--radius-control)] bg-ink py-3 text-center text-[0.85rem] font-medium text-white transition-transform duration-200 active:scale-[0.98]"
      >
        Book a room
      </Link>
    </div>
  );
}
