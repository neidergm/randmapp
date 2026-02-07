import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://rickandmortyapi.com/api/**')
    ]
  }
};

export default nextConfig;
