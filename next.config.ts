import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  distDir: isGitHubPages ? ".next-pages" : ".next",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGitHubPages ? "/tuchatu" : "",
  assetPrefix: isGitHubPages ? "/tuchatu/" : "",
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
};

export default nextConfig;
