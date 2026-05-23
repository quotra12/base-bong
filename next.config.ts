import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/icon.png",
        destination: "/brand/base-bong-icon.png",
        permanent: false,
      },
      {
        source: "/splash.png",
        destination: "/brand/base-bong-splash.png",
        permanent: false,
      },
      {
        source: "/image.png",
        destination: "/brand/base-bong-og.png",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
