import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Blog & News | Bottling & Packaging Automation",
  description: "Stay updated with expert articles, maintenance tips, industry trends, and technical insights on beverage bottling, RO plants, and packaging machinery.",
  alternates: {
    canonical: "https://www.shivshaktiengineering.com/blog",
  },
  openGraph: {
    title: "Packaging Machinery Blog | SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    description: "Expert insights, maintenance guides, and bottling technology trends.",
    url: "https://www.shivshaktiengineering.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
