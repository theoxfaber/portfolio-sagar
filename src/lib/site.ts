/** Canonical site URL for metadata, sitemap, robots, JSON-LD. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://portfolio-sagar.vercel.app";
