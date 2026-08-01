import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Blog & News | Bottling & Packaging Automation",
  description: "Stay updated with expert articles, maintenance tips, industry trends, and technical insights on beverage bottling, RO plants, and packaging machinery.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Industry Insights | SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    description: "Read the latest news, guides, and technical insights from the water bottling and packaging industry.",
    url: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
