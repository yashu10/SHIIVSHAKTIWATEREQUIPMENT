import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Machinery & Bottling Equipment | Water, Juice, Soda, RO Plants",
  description: "Browse our complete catalog of industrial water filling machines, juice bottling lines, RO plants, PET blow moulding, shrink wrapping, and lab equipment.",
  alternates: {
    canonical: "https://www.shivshaktiengineering.com/products",
  },
  openGraph: {
    title: "Our Machinery Catalog | SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    description: "Browse industrial packaging and bottling equipment built for maximum throughput.",
    url: "https://www.shivshaktiengineering.com/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
