import React from "react";
import { Metadata } from "next";
import productsData from "../../../data/products.json";
import { ProductDetailClient } from "../../../components/ProductDetailClient";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return productsData.map((p) => ({
    slug: p.filename.replace(".html", ""),
  }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolvedParams = await props.params;
  const product = productsData.find(
    (p) => p.filename.replace(".html", "") === resolvedParams.slug
  );

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const imageUrl = `https://www.shivshaktiengineering.com/assets/images/${product.image}`;

  return {
    title: `${product.seoTitle} | SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.`,
    description: product.seoDesc,
    alternates: {
      canonical: `https://www.shivshaktiengineering.com/products/${resolvedParams.slug}`,
    },
    openGraph: {
      type: "article",
      title: product.seoTitle,
      description: product.seoDesc,
      url: `https://www.shivshaktiengineering.com/products/${resolvedParams.slug}`,
      images: [
        {
          url: imageUrl,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.seoDesc,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<Params>;
}) {
  const resolvedParams = await props.params;
  const product = productsData.find(
    (p) => p.filename.replace(".html", "") === resolvedParams.slug
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = productsData
    .filter((p) => p.filename !== product.filename)
    .filter((p) => p.category === product.category || p.category.includes("Filling"));

  if (relatedProducts.length < 3) {
    const filledFilenames = new Set(relatedProducts.map((rp) => rp.filename));
    const extraProducts = productsData
      .filter((p) => p.filename !== product.filename && !filledFilenames.has(p.filename))
      .slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...extraProducts);
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": `https://www.shivshaktiengineering.com/assets/images/${product.image}`,
    "description": product.seoDesc,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD."
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.shivshaktiengineering.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Our Products",
        "item": "https://www.shivshaktiengineering.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category,
        "item": `https://www.shivshaktiengineering.com/products#${product.category.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.title,
        "item": `https://www.shivshaktiengineering.com/products/${resolvedParams.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
