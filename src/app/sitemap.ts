import type { MetadataRoute } from "next";
import { rooms } from "@/lib/rooms";

const BASE = "https://www.wells-ogunquit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/rooms", priority: 0.9 },
    { path: "/amenities", priority: 0.8 },
    { path: "/breakfast", priority: 0.7 },
    { path: "/attractions", priority: 0.7 },
    { path: "/specials", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/policies", priority: 0.4 },
    { path: "/privacy", priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...rooms.map((r) => ({
      url: `${BASE}/rooms/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
