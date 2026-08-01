import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | 25+ Years Experience in Bottling Engineering",
  description: "Established in 1998, SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. is a premier B2B manufacturer & global exporter of mineral water bottling and liquid packaging plants.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    description: "Pioneering mineral water bottling and packaging solutions across 25+ countries.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
