"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { GalleryImage } from "@/lib/gallery";

const glassBtn =
  "h-12 w-12 place-items-center rounded-full bg-white/[0.06] text-white/80 ring-1 ring-inset ring-white/15 transition-[background-color,color,transform] duration-300 hover:bg-white/15 hover:text-white active:scale-95";

/**
 * Full-screen photo viewer shared by the grounds gallery and the room pages.
 * Arrow keys and swipes step through, Escape or a tap outside closes, focus
 * moves into the dialog and back to whatever opened it.
 */
export default function Lightbox({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: GalleryImage[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = images.length;
  const prev = () => onIndex((index - 1 + n) % n);
  const next = () => onIndex((index + 1) % n);

  // Keep the latest handlers for the key listener without re-subscribing.
  const keys = useRef({ prev, next, onClose });
  useEffect(() => {
    keys.current = { prev, next, onClose };
  });

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") keys.current.onClose();
      if (e.key === "ArrowLeft") keys.current.prev();
      if (e.key === "ArrowRight") keys.current.next();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, []);

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-atlantic/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        ref={closeBtn}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`absolute right-4 top-4 grid ${glassBtn}`}
      >
        <X size={20} />
      </button>

      {n > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous photo"
          className={`absolute left-3 z-10 hidden sm:left-8 sm:grid ${glassBtn}`}
        >
          <CaretLeft size={20} />
        </button>
      )}

      <figure
        className="relative max-h-[86dvh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={1800}
          height={1350}
          sizes="(max-width: 1100px) 100vw, 1024px"
          className="mx-auto max-h-[78dvh] w-auto rounded-[var(--radius-card)] object-contain shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
        />
        <figcaption className="mt-5 text-center text-small text-foam-muted">
          {img.alt}
          {n > 1 && (
            <span className="ml-3 tabular-nums text-foam-muted/70">
              {index + 1} of {n}
            </span>
          )}
        </figcaption>
      </figure>

      {n > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next photo"
          className={`absolute right-3 z-10 hidden sm:right-8 sm:grid ${glassBtn}`}
        >
          <CaretRight size={20} />
        </button>
      )}
    </div>
  );
}
