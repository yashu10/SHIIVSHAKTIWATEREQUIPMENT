import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Export Water Filling & Bottling Machinery Manufacturer",
  description: "Indian manufacturer & exporter of water filling machines, R.O. plants and turnkey bottling lines. ISO 9001:2015 & CE certified machinery exported to 25+ countries across Africa, the Middle East, Southeast Asia and South America.",
  alternates: {
    canonical: "https://www.shivshaktiwaterequipment.com/export/",
  },
  openGraph: {
    title: "Export Water Filling & Bottling Machinery | SHIIV SHAKTI WATER EQUIPMENT",
    description: "ISO 9001:2015 & CE certified bottling machinery exported to 25+ countries. Get an export quote with FOB/CIF pricing.",
    url: "https://www.shivshaktiwaterequipment.com/export/",
  },
};

export default function ExportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
