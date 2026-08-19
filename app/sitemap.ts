import type { MetadataRoute } from "next";
import { services } from "./lib/services";
import { getAllPosts } from "./lib/blog";

const SITE_URL = "https://citycommercefinance.com";

// Fallback date for pages that don't carry their own "last updated" stamp.
// Uses the build time, so a fresh deploy refreshes these entries.
const BUILD_DATE = new Date();

function toDate(value: string | undefined): Date {
  if (!value) return BUILD_DATE;
  const d = new Date(value);
  return isNaN(d.getTime()) ? BUILD_DATE : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ---- Core static pages -------------------------------------------------
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about/masiar-rahaman`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ---- Service detail pages (flagship weighted higher) -------------------
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: s.flagship ? 0.8 : 0.6,
  }));

  // ---- Blog posts --------------------------------------------------------
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: toDate(p.updatedAt || p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
