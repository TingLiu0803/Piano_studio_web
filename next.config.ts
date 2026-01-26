import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "eric-liu-piano-studio-web.vercel.app",
          },
        ],
        destination: "https://sanjosepianolesson.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
