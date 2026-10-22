import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep links to the original static site working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/jspage.html", destination: "/lessons/welcome", permanent: true },
      { source: "/aboutpage.html", destination: "/#about", permanent: true },
    ];
  },
};

export default nextConfig;
