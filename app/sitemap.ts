import type { MetadataRoute } from "next";
import { fleet } from "./_data/fleet";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fivestarrentals.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...fleet.map((vehicle) => ({
      url: `${base}/fleet/${vehicle.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...["privacy", "terms", "legal"].map((page) => ({
      url: `${base}/${page}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
