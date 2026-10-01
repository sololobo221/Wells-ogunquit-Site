"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  { src: "/images/hero-pool-umbrella.jpg", alt: "Loungers and umbrellas around the heated saltwater pool" },
  { src: "/images/hero-room-porch.jpg", alt: "A private porch outside a guest room" },
  { src: "/images/garden-view.jpg", alt: "The garden and lawn between the buildings" },
  { src: "/images/hero-sunrise-wide.jpg", alt: "Sunrise over the water near Wells and Ogunquit" },
];

const INTERVAL = 7000;

/**
 * Crossfading hero photography. The active frame drifts slowly back from a
 * slight push-in, so the hero feels alive without anything on it moving fast.
 * Under reduced motion there is one still photograph.
 */
export default function HeroSlider({ indicatorClassName = "" }: { indicatorClassName?: string }) {
  const [i, setI] = useState(0);
  // Only the first slide ships with the page. The other three mount once the
  // browser goes idle, so the initial load is one image instead of four.
  const [loadRest, setLoadRest] = useState(false);

  // Under reduced motion there is one still photograph: the other slides are
  // never fetched and nothing rotates.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Data Saver on: keep it to the one photograph that is already loaded.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
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
  }, []);

  useEffect(() => {
    if (!loadRest) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [loadRest, i]);

  const visible = loadRest ? slides : slides.slice(0, 1);

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden bg-atlantic">
        {visible.map((s, idx) => {
          const active = idx === i;
          return (
            <div
              key={s.src}
              aria-hidden={!active}
              className="absolute inset-0 transition-opacity duration-[1400ms] ease-[var(--ease-out)]"
              style={{ opacity: active ? 1 : 0 }}
            >
              {/* Same markup for everyone; CSS removes the drift under
                  reduced motion so server and client never disagree. */}
              <div
                className={`absolute inset-0 transition-transform ease-[var(--ease-out)] motion-reduce:!transform-none motion-reduce:transition-none ${
                  idx === 0 && i === 0 && !loadRest ? "animate-hero-settle" : ""
                }`}
                style={{
                  transform: active ? "scale(1)" : "scale(1.07)",
                  transitionDuration: active ? `${INTERVAL + 1400}ms` : "1400ms",
                }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  preload={idx === 0}
                  quality={idx === 0 ? 72 : 65}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
        <div className="hero-wash absolute inset-0" />
      </div>

      {loadRest && (
        <div className={`absolute z-10 hidden items-center gap-2.5 lg:flex ${indicatorClassName}`}>
          {slides.map((s, idx) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show photo ${idx + 1} of ${slides.length}`}
              aria-current={idx === i}
              className="group relative h-6 py-2.5"
            >
              <span className="block h-[2px] w-10 overflow-hidden rounded-full bg-white/30 transition-colors duration-300 group-hover:bg-white/50">
                {/* A timer, so it runs at constant speed on purpose. */}
                {idx === i && (
                  <span
                    key={i}
                    className="block h-full origin-left bg-white"
                    style={{ animation: `slide-progress ${INTERVAL}ms linear both` }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
