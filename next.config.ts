import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/icon.png",
        destination: "/logo.png",
        permanent: false,
      },
      {
        source: "/splash.png",
        destination: "/logo-splash.png",
        permanent: false,
      },
      {
        source: "/image.png",
        destination: "/logo.png",
        permanent: false,
      },
      {
        source: "/brand/base-bong-icon.png",
        destination: "/logo.png",
        permanent: false,
      },
      {
        source: "/brand/base-bong-splash.png",
        destination: "/logo-splash.png",
        permanent: false,
      },
      {
        source: "/brand/base-bong-og.png",
        destination: "/logo.png",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
