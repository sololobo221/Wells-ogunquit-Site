"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowsOut } from "@phosphor-icons/react";
import type { GalleryImage } from "@/lib/gallery";
import Lightbox from "./Lightbox";

/**
 * A room's photographs. Each one opens full screen; guests want to look
 * closely before they book. `children` is the last cell of the grid (the
 * room-at-a-glance tile), so a two-photo room still fills its row.
 */
export default function RoomPhotos({
  images,
  children,
}: {
  images: GalleryImage[];
  children?: ReactNode;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div
        className={`grid gap-4 sm:grid-cols-2 ${images.length === 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View larger: ${img.alt}`}
            className="bezel group block text-left"
          >
            <span className="bezel-core block aspect-[4/5] bg-mist">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                preload={i === 0}
                sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 25vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-[rgba(10,26,32,0.6)] text-white opacity-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <ArrowsOut size={16} />
              </span>
            </span>
          </button>
        ))}
        {children}
      </div>

      {active !== null && (
        <Lightbox
          images={images}
          index={active}
          onIndex={setActive}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
