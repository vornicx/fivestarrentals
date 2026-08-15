import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fivestars-rental.com",
        pathname: "/assets/images/**",
      },
    ],
  },
};

export default nextConfig;
