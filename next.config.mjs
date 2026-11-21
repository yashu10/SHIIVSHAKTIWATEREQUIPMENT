/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  // Export page is hidden (code kept in src/app/_export). Restore by renaming it back to "export".
  async redirects() {
    return [
      { source: "/export", destination: "/", permanent: false },
      { source: "/export/", destination: "/", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  // Note: redirects (e.g. /about.html -> /about) are not applied here;
  // configure them on the hosting provider if needed.
};

export default nextConfig;
