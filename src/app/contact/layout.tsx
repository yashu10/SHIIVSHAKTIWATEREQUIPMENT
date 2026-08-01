import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Inquiry & Technical Support",
  description: "Get in touch with SHIV SHAKTI WATER EQUIPMENT PVT. LTD. for sales inquiries, custom plant layouts, quotes, or 24/7 technical support. Office located in Ahmedabad, Gujarat.",
  alternates: {
    canonical: "https://www.shivshaktiengineering.com/contact",
  },
  openGraph: {
    title: "Contact SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    description: "Request a quote or contact our sales & support team in Ahmedabad, Gujarat.",
    url: "https://www.shivshaktiengineering.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
