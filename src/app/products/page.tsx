import React from "react";
import productsData from "../../data/products.json";
import { ProductsListClient } from "../../components/ProductsListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machinery Catalog | Shiv Shakti Water Equipment",
  description: "Explore our comprehensive catalog of heavy-duty, automatic packaging and water treatment equipment including RO plants, filling machines, and blow moulding.",
};

export default function Products() {
  // Get unique categories dynamically
  const categories = ["all", ...Array.from(new Set(productsData.map((p) => p.category)))];

  return (
    <main>
      {/* Page Header */}
      <section className="page-header pattern-bg active">
        <div className="container">
          <h1 className="page-title fade-up">OUR <span className="text-gradient">MACHINERY</span></h1>
          <p className="page-subtitle fade-up delay-1">Explore our heavy-duty, automatic packaging and water treatment equipment.</p>
        </div>
      </section>

      {/* Product Listing Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <ProductsListClient products={productsData} categories={categories} />
        </div>
      </section>
    </main>
  );
}

