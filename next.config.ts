import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.wordpress.com",
      },
    ],
  },
};

export default nextConfig;
