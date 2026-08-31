"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

const slides = [
  { src: "/images/hero-pool-umbrella.jpg", alt: "Loungers and umbrellas around the heated saltwater pool" },
  { src: "/images/hero-room-porch.jpg", alt: "A private porch outside a guest room" },
  { src: "/images/garden-view.jpg", alt: "The garden and lawn between the buildings" },
  { src: "/images/hero-sunrise-wide.jpg", alt: "Sunrise over the water near Wells and Ogunquit" },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  // Only the first slide ships with the page. The other three mount once the
  // browser goes idle, so the initial load is one image instead of four.
  const [loadRest, setLoadRest] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setLoadRest(true), { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setLoadRest(true), 2000);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (reduce || !loadRest) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [reduce, loadRest]);

  const visible = loadRest ? slides : slides.slice(0, 1);

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden bg-ink">
        {visible.map((s, idx) => (
          <div
            key={s.src}
            aria-hidden={idx !== i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: idx === i ? 1 : 0 }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={idx === 0}
              quality={idx === 0 ? 72 : 65}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="hero-wash absolute inset-0" />
      </div>

      {loadRest && (
        <div className="absolute bottom-7 right-5 z-10 hidden items-center gap-2 lg:right-10 lg:flex">
          {slides.map((s, idx) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show photo ${idx + 1}`}
              aria-current={idx === i}
              className={`h-[2px] transition-all duration-500 ${
                idx === i ? "w-9 bg-white" : "w-4 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
