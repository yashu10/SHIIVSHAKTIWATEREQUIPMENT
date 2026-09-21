import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { UIProvider } from "../context/UIContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LeadPopup } from "../components/LeadPopup";
import { VideoModal } from "../components/VideoModal";
import { ScrollObserver } from "../components/ScrollObserver";
import ChatLauncher from "../components/ChatLauncher";

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

const baseUrl = "https://www.shivshaktiwaterequipment.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "RO Plant & Water Filling Machine Manufacturer in Ahmedabad | Shiv Shakti Water Equipment",
    template: "%s | Shiv Shakti Water Equipment",
  },
  description: "Ahmedabad-based manufacturer & exporter of Industrial R.O. Plants, water/juice/soda filling machines & turnkey bottling lines since 1998. ISO 9001:2015 certified, 25+ countries exported.",
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
  authors: [{ name: "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD." }],
  creator: "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
  publisher: "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
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
    siteName: "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    title: "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. | Industrial Bottling Machinery",
    description: "Trusted B2B manufacturer of water filling machines, RO plants, PET blow moulding, and packaging equipment.",
    images: [
      {
        url: `${baseUrl}/assets/images/shiv_shakti_logo.png`,
        width: 800,
        height: 600,
        alt: "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    description: "Leading manufacturer of mineral water bottling and liquid filling machinery in India.",
    images: [`${baseUrl}/assets/images/shiv_shakti_logo.png`],
  },
  verification: {
    google: "gVfe6jh6UftZf1zoorBjefPqRhpLr1nHrbiwerW6Nz0",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${baseUrl}/#organization`,
      "name": "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
      "alternateName": "Shiv Shakti Water Equipment",
      "url": baseUrl,
      "logo": `${baseUrl}/assets/images/shiv_shakti_logo.png`,
      "image": `${baseUrl}/assets/images/shiv_shakti_logo.png`,
      "description": "Leading manufacturer & exporter of mineral water filling machinery, RO plants, PET blow moulding, and packaging equipment in India.",
      "telephone": "+919712666160",
      "email": "contact@shivshaktiwaterequipment.com",
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
      "areaServed": ["India", "Africa", "Middle East", "Southeast Asia", "South America"],
      "sameAs": [
        "https://wa.me/919712666160",
        "https://www.indiamart.com/shiivshaktiwaterequipment/",
        "https://www.instagram.com/shivshaktiwatersolution"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
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
          <ChatLauncher />
        </UIProvider>
      </body>
    </html>
  );
}
