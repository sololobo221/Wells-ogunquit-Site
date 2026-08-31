"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { GalleryImage } from "@/lib/gallery";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {images.map((img, idx) => (
          <button
            key={img.src + idx}
            type="button"
            onClick={() => setActive(idx)}
            className="group relative block w-full overflow-hidden rounded-[var(--radius-media)] bg-sand"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.05]"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={24} weight="bold" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 grid h-12 w-12 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:left-8"
          >
            <CaretLeft size={26} weight="bold" />
          </button>
          <figure className="relative max-h-[86dvh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active].src}
              alt={images[active].alt}
              width={1800}
              height={1350}
              className="mx-auto max-h-[80dvh] w-auto rounded-[var(--radius-media)] object-contain"
            />
            <figcaption className="mt-4 text-center text-micro text-white/60">
              {images[active].alt}
            </figcaption>
          </figure>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-3 grid h-12 w-12 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-8"
          >
            <CaretRight size={26} weight="bold" />
          </button>
        </div>
      )}
    </>
  );
}
