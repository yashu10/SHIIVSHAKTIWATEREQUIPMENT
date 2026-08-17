import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | 25+ Years Experience in Bottling Engineering",
  description: "Established in 1998, SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. is a premier B2B manufacturer & global exporter of mineral water bottling and liquid packaging plants.",
  alternates: {
    canonical: "https://www.shivshaktiengineering.com/about",
  },
  openGraph: {
    title: "About Us | SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    description: "Pioneering mineral water bottling and packaging solutions across 25+ countries.",
    url: "https://www.shivshaktiengineering.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
