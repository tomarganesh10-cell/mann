import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Sitemaps need absolute URLs; emit entries only once NEXT_PUBLIC_SITE_URL is confirmed.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
