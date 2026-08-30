import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback. Typically 25-40% smaller than WebP alone.
    formats: ["image/avif", "image/webp"],
    // Cache optimized output for a year; the filenames are content addressed.
    minimumCacheTTL: 31536000,
    qualities: [60, 65, 72, 75, 80],
  },
};

export default nextConfig;
