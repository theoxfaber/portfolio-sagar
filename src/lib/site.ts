/** Canonical site URL for metadata, sitemap, robots, JSON-LD. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://theoxfaber.github.io/portfolio-sagar";

/** Subpath the site is served from (GitHub Pages project site). */
export const basePath = "/portfolio-sagar";
