import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore type errors during production builds (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during builds (optional)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Required for deploying on Render (bundles app into standalone output)
  output: "standalone",
};

export default nextConfig;
