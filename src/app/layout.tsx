import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { UIProvider } from "../context/UIContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LeadPopup } from "../components/LeadPopup";
import { VideoModal } from "../components/VideoModal";
import { ScrollObserver } from "../components/ScrollObserver";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const baseUrl = "https://www.shivshaktiengineering.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD. | Water Filling & Packaging Machinery",
    template: "%s | SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
  },
  description: "Leading manufacturer & exporter of mineral water filling machinery, RO plants, PET blow moulding, and packaging equipment since 1998. ISO 9001:2015 certified.",
  keywords: [
    "mineral water plant",
    "bottle filling machine",
    "water bottling plant",
    "juice filling machine",
    "soda filling machine",
    "beer filling machine",
    "shrink wrapping machine",
    "industrial RO plant",
    "PET blow moulding machine",
    "batch coding machine",
    "sticker labelling machine",
    "packaging machinery manufacturer India",
    "Shiv Shakti Water Equipment"
  ],
  authors: [{ name: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD." }],
  creator: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
  publisher: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: "/assets/images/fav_icon.png",
    shortcut: "/assets/images/fav_icon.png",
    apple: "/assets/images/fav_icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    title: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD. | Industrial Bottling Machinery",
    description: "Trusted B2B manufacturer of water filling machines, RO plants, PET blow moulding, and packaging equipment.",
    images: [
      {
        url: `${baseUrl}/assets/images/shiv_shakti_logo.png`,
        width: 800,
        height: 600,
        alt: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD. Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    description: "Leading manufacturer of mineral water bottling and liquid filling machinery in India.",
    images: [`${baseUrl}/assets/images/shiv_shakti_logo.png`],
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${baseUrl}/#organization`,
      "name": "SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
      "alternateName": "Shiv Shakti Water Equipment",
      "url": baseUrl,
      "logo": `${baseUrl}/assets/images/shiv_shakti_logo.png`,
      "image": `${baseUrl}/assets/images/shiv_shakti_logo.png`,
      "description": "Leading manufacturer & exporter of mineral water filling machinery, RO plants, PET blow moulding, and packaging equipment in India.",
      "telephone": "+919712666160",
      "email": "info@shivshaktiengineering.com",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "309, Ganesh Imperial, Near Podar School, S.P. Ring Road",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "382418",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "23.0225",
        "longitude": "72.5714"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919712666160",
        "contactType": "sales",
        "areaServed": "Global",
        "availableLanguage": ["en", "hi", "gu"]
      },
      "sameAs": [
        "https://wa.me/919712666160"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "SHIV SHAKTI WATER EQUIPMENT PVT. LTD.",
      "description": "Industrial Bottling and Packaging Machinery Manufacturer",
      "publisher": {
        "@id": `${baseUrl}/#organization`
      },
      "potentialAction": [{
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/products?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body>
        <UIProvider>
          <Header />
          {children}
          <Footer />
          <LeadPopup />
          <VideoModal />
          <ScrollObserver />
        </UIProvider>
      </body>
    </html>
  );
}
