import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  /*
  // Next.js static HTML export does not support next.config redirects.
  // These redirects must be configured on your hosting provider (e.g., Netlify redirects, Vercel JSON, Nginx rewrite rules).
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/products.html",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/video.html",
        destination: "/video",
        permanent: true,
      },
      {
        source: "/blog.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-single.html",
        destination: "/blog/how-automation-is-revolutionizing-the-beverage-industry",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/privacy-policy.html",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions.html",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      // Individual products redirect
      {
        source: "/:slug.html",
        destination: "/products/:slug",
        permanent: true,
      },
    ];
  },
  */
};

export default nextConfig;

