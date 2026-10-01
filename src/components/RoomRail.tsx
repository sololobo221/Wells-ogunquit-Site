"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import type { Room } from "@/lib/rooms";
import RoomCard from "./RoomCard";

/**
 * All six rooms on one horizontal shelf. Native scroll-snap does the work, so
 * touch, trackpad and keyboard all behave; the arrow buttons step one card at
 * a time. The first card lines up with the page container and the shelf bleeds
 * off the right edge to show there is more.
 *
 * No scroll listener: an IntersectionObserver watches the first and last
 * cards, and the two buttons disable when either end is fully in view.
 */
export default function RoomRail({ rooms, header }: { rooms: Room[]; header: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    const first = el?.firstElementChild;
    const last = el?.lastElementChild;
    if (!el || !first || !last) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const visible = e.intersectionRatio > 0.9;
          if (e.target === first) setAtStart(visible);
          if (e.target === last) setAtEnd(visible);
        }
      },
      { root: el, threshold: [0, 0.9, 1] },
    );
    io.observe(first);
    io.observe(last);
    return () => io.disconnect();
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const distance = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * distance, behavior: reduce ? "instant" : "smooth" });
  };

  const btn =
    "grid h-12 w-12 place-items-center rounded-full text-ink ring-1 ring-inset ring-ink/20 transition-[background-color,color,opacity,transform,box-shadow] duration-500 ease-[var(--ease-glide)] " +
    "hover:bg-ink hover:text-canvas hover:ring-ink active:scale-95 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 px-6 lg:flex-row lg:items-end lg:px-10">
        {header}
        <div className="flex shrink-0 items-center gap-3">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous rooms" className={btn}>
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next rooms" className={btn}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        aria-label="Rooms and suites"
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-1 [--gutter:1.5rem] [scroll-padding-inline:var(--gutter)] [padding-inline:var(--gutter)] lg:mt-16 lg:gap-7 lg:[--gutter:max(2.5rem,calc((100vw-1400px)/2+2.5rem))]"
      >
        {rooms.map((room) => (
          <li key={room.slug} className="w-[82vw] shrink-0 snap-start sm:w-[44vw] lg:w-[400px]">
            <RoomCard room={room} sizes="(max-width: 640px) 82vw, (max-width: 1024px) 44vw, 400px" />
          </li>
        ))}
      </ul>
    </div>
  );
}
