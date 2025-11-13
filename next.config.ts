import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    // Note: remotePatterns are disabled for static export; use direct img tags for external images from unsplash.com or escrow.greenmarket.com.ng
  },
  transpilePackages: ["react-mobile-app-button"],
};

export default nextConfig;