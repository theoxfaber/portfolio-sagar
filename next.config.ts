import type { NextConfig } from "next";

// GitHub Pages project site: https://theoxfaber.github.io/portfolio-sagar/
// Static export (no ISR/server) — stats refresh on rebuild (weekly cron in CI).
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio-sagar",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
