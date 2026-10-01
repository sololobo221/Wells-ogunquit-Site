import Image from "next/image";
import { site } from "@/lib/site";

/**
 * The property's sign artwork, with the white background removed so it sits
 * on any surface. The source is exactly 2:1, so width and height stay in
 * ratio and no CSS override is needed.
 */
export default function Logo({
  width = 132,
  className = "",
  eager = false,
}: {
  width?: number;
  className?: string;
  /** Above the fold: load straight away rather than lazily. Never the LCP. */
  eager?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt={site.name}
      width={width}
      height={width / 2}
      loading={eager ? "eager" : undefined}
      sizes={`${width}px`}
      className={className}
    />
  );
}
