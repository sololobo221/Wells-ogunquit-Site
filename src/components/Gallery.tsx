"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";
import Lightbox from "./Lightbox";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4 [&>*]:mb-2 sm:[&>*]:mb-3">
        {images.map((img, idx) => (
          <button
            key={img.src + idx}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={`View larger: ${img.alt}`}
            className="group relative block w-full break-inside-avoid"
          >
            <span className="relative block overflow-hidden bg-sand">
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
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
