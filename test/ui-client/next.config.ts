import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allow all images from the internet
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
