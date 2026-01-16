import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For static export (AWS S3/CloudFront)
  output: "export",
  
  // Optional: Add trailing slashes for S3 compatibility
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
