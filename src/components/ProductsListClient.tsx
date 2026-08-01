"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUI } from "../context/UIContext";

interface Product {
  title: string;
  category: string;
  image: string;
  filename: string;
  tagline?: string;
}

interface ProductsListClientProps {
  products: Product[];
  categories: string[];
}

export function ProductsListClient({ products, categories }: ProductsListClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { openLeadPopup } = useUI();

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category Tabs */}
      <div
        className="filter-buttons-wrapper"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: "1px solid var(--primary)",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.9rem",
              transition: "all 0.3s ease",
              background: activeCategory === cat ? "var(--primary)" : "transparent",
              color: activeCategory === cat ? "white" : "var(--primary)",
            }}
          >
            {cat === "all" ? "All Machinery" : cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="product-grid" style={{ marginTop: 0 }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p, idx) => {
            const slug = p.filename.replace(".html", "");
            const imgPath = `/assets/images/${p.image}`;
            return (
              <div key={idx} className="product-card animate-on-scroll">
                <div className="product-image">
                  <img
                    src={imgPath}
                    alt={p.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/prod_water_filling.png";
                    }}
                  />
                </div>
                <div className="product-info">
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.75rem",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      marginBottom: "8px",
                    }}
                  >
                    {p.category}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.tagline || "Heavy-duty custom industrial machine."}</p>
                  <div className="product-card-actions">
                    <Link href={`/products/${slug}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <button
                      onClick={() => openLeadPopup("quote")}
                      className="read-more"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        font: "inherit",
                        padding: 0,
                      }}
                    >
                      Request Quote &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>
            <h3>No machinery found in this category.</h3>
          </div>
        )}
      </div>
    </>
  );
}
