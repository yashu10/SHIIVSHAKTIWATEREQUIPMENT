import React from "react";
import blogsData from "../../data/blogs.json";
import { BlogListClient } from "../../components/BlogListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Insights & News | Shiv Shakti Water Equipment",
  description: "Read our latest articles on industry trends, maintenance tips, sustainability, and quality control in the bottling and packaging industry.",
};

export default function BlogListing() {
  const categories = ["all", "Product Guide", "Industry Trends", "Maintenance Tips", "Sustainability", "Company News", "Quality Control"];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://shivshaktiwaterequipment.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://shivshaktiwaterequipment.com/blog"
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Page Header */}
      <section className="page-header pattern-bg active">
        <div className="container">
          <h1 className="page-title fade-up">LATEST <span className="text-gradient">INSIGHTS</span></h1>
          <p className="page-subtitle fade-up delay-1">Read about the latest trends, maintenance tips, and innovations in B2B bottling plants.</p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <BlogListClient blogs={blogsData} categories={categories} />
        </div>
      </section>
    </main>
  );
}

