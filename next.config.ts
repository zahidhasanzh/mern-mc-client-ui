import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mern-micro-project.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
