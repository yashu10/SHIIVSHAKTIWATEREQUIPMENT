import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Inquiry & Technical Support",
  description: "Get in touch with SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. for sales inquiries, custom plant layouts, quotes, or 24/7 technical support. Office located in Ahmedabad, Gujarat.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    description: "Request a quote or contact our sales & support team in Ahmedabad, Gujarat.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
