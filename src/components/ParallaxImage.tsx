import type { CSSProperties } from "react";
import Image from "next/image";

/**
 * A photograph that drifts a little slower than the page, giving a framed
 * image some depth as it passes. Fills its positioned parent.
 *
 * Pure CSS: a scroll-driven animation keyed to this frame's own view timeline
 * (see .parallax in globals.css), so it costs no JavaScript and runs off the
 * main thread. Browsers without scroll timelines, and visitors who prefer
 * reduced motion, get a still photograph.
 *
 * The image is oversized by `travel` on both ends so the drift never shows an
 * edge. Use it only on photographs with resolution to spare.
 */
export default function ParallaxImage({
  src,
  alt,
  sizes,
  travel = 8,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Percent of the image height it moves through, each way. */
  travel?: number;
  className?: string;
}) {
  const style = {
    "--travel": `${travel}%`,
    top: `-${travel + 2}%`,
    bottom: `-${travel + 2}%`,
  } as CSSProperties;

  return (
    <div className={`parallax absolute inset-0 overflow-clip ${className}`}>
      <div className="parallax-media absolute inset-x-0" style={style}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
