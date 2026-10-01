"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";
import Lightbox from "./Lightbox";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {images.map((img, idx) => (
          <button
            key={img.src + idx}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={`View larger: ${img.alt}`}
            className="bezel group relative block w-full break-inside-avoid rounded-[var(--radius-card)] p-1 transition-transform duration-700 ease-[var(--ease-glide)] hover:-translate-y-1"
          >
            <span className="relative block overflow-hidden rounded-[calc(var(--radius-card)-4px)] bg-mist">
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.05]"
              />
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <Lightbox images={images} index={active} onIndex={setActive} onClose={() => setActive(null)} />
      )}
    </>
  );
}
