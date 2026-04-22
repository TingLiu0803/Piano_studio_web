import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.sanjosepianolesson.com",
          },
        ],
        destination: "https://sanjosepianolesson.com/:path*",
        permanent: true,
      },
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
      // Exact-match URL patterns → canonical lesson pages (consolidates signals)
      {
        source: "/:locale(en|zh)/san-jose-piano-lessons",
        destination: "/:locale/piano-lessons-san-jose",
        permanent: true,
      },
      {
        source: "/:locale(en|zh)/adult-piano-lessons-san-jose",
        destination: "/:locale/adult-piano-lessons",
        permanent: true,
      },
      {
        source: "/:locale(en|zh)/piano-teacher-sunnyvale",
        destination: "/:locale/piano-teacher-san-jose",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
