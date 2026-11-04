/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Note: redirects (e.g. /about.html -> /about) are not applied here;
  // configure them on the hosting provider if needed.
};

export default nextConfig;
