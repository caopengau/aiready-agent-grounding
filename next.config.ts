import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use static export for S3 deployment
  output: "export",
  
  // Keep image optimization disabled for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
