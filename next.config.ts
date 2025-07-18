import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow production build to complete even if there are type errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint blocking build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Required for Render deployment
  output: "standalone",
};

export default nextConfig;
