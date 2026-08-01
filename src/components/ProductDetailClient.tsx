"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUI } from "../context/UIContext";

interface Product {
  filename: string;
  title: string;
  category: string;
  seoTitle: string;
  seoDesc: string;
  tagline: string;
  overview: string;
  image: string;
  topFeatures: string[];
  benefits: { title: string; desc: string }[];
  specs: { k: string; v: string }[];
}

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const { openLeadPopup } = useUI();
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (product) {
      setActiveImage(`/assets/images/${product.image}`);
    }
  }, [product]);

  const thumbImages = [
    `/assets/images/${product.image}`,
    "/assets/images/hero_machine_1.png",
    "/assets/images/hero_machine_2.png",
    "/assets/images/hero_machine_3.png",
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="page-header" style={{ padding: "120px 0 40px" }}>
        <div className="container">
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Our Products</Link></li>
            <li>{product.category}</li>
            <li>{product.title}</li>
          </ul>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="section-padding bg-light" style={{ paddingTop: "50px" }}>
        <div className="container">
          {/* Hero / Overview */}
          <div className="product-detail-container">
            <div className="product-gallery">
              <div className="main-img-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={activeImage}
                  alt={product.title}
                  id="mainImage"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/images/prod_water_filling.png";
                  }}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              <div className="thumbnail-grid">
                {thumbImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className={activeImage === img ? "active" : ""}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setActiveImage(img)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/prod_water_filling.png";
                    }}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>

            <div className="product-overview">
              <span
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                  letterSpacing: "1px",
                }}
              >
                {product.category}
              </span>
              <h1 style={{ marginTop: "5px" }}>{product.title}</h1>
              <h3 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "15px", fontWeight: 500 }}>
                {product.tagline}
              </h3>

              <p>{product.overview}</p>

              <ul className="feature-list" style={{ marginBottom: "30px", marginTop: "20px" }}>
                {product.topFeatures.map((f, idx) => (
                  <li key={idx}>
                    <span className="icon">&#10003;</span> {f}
                  </li>
                ))}
              </ul>

              <div className="product-cta-group">
                <button
                  onClick={() => openLeadPopup("quote")}
                  className="btn btn-primary"
                  style={{ marginRight: "15px", border: "none", cursor: "pointer" }}
                >
                  Request A Quote
                </button>
                <a
                  href="https://wa.me/919712666160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{
                    borderColor: "#25D366",
                    color: "#25D366",
                    marginRight: "15px",
                    background: "rgba(37, 211, 102, 0.1)",
                  }}
                >
                  WhatsApp Us
                </a>
                <button
                  onClick={() => openLeadPopup("brochure")}
                  className="btn btn-outline secondary-cta"
                  style={{ borderColor: "var(--primary)", color: "var(--primary)", background: "none", cursor: "pointer" }}
                >
                  Download Specs PDF
                </button>
              </div>
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="product-content-area">
            <h2 className="product-section-title">Features & Benefits</h2>
            <ul className="features-grid">
              {product.benefits.map((b, idx) => (
                <li key={idx} style={{ display: "flex", gap: "15px" }}>
                  <span className="icon">&#10003;</span>
                  <div>
                    <strong>{b.title}</strong>
                    <span style={{ display: "block", color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "5px" }}>
                      {b.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specifications */}
          <div className="product-content-area">
            <h2 className="product-section-title">Technical Specifications</h2>
            <table className="spec-table">
              <tbody>
                {product.specs.map((s, idx) => (
                  <tr key={idx}>
                    <th>{s.k}</th>
                    <td>{s.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Call to Action Footer Box */}
          <div
            className="product-content-area"
            style={{
              background: "var(--primary-dark)",
              color: "white",
              textAlign: "center",
              borderRadius: "12px",
              padding: "40px",
            }}
          >
            <h2 style={{ color: "white", marginBottom: "15px" }}>Ready to Scale Your Production?</h2>
            <p
              style={{
                fontSize: "1.1rem",
                opacity: 0.9,
                marginBottom: "25px",
                maxWidth: "700px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Our engineering team is ready to design a custom solution integrating the {product.title} directly into your
              facility layout.
            </p>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => openLeadPopup("quote")}
                className="btn btn-primary"
                style={{ background: "var(--primary)", borderColor: "var(--primary)", color: "white", cursor: "pointer", border: "none" }}
              >
                Get Immediate Pricing
              </button>
              <a
                href="https://wa.me/919712666160"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ borderColor: "white", color: "white", background: "transparent" }}
              >
                Chat via WhatsApp
              </a>
            </div>
          </div>

          {/* Related Products */}
          <div className="product-content-area" style={{ background: "transparent", boxShadow: "none", border: "none", padding: 0 }}>
            <h2 className="product-section-title" style={{ border: "none" }}>Explore Related Machinery</h2>
            <div className="product-grid" style={{ marginTop: 0 }}>
              {relatedProducts.map((rp, idx) => {
                const rpSlug = rp.filename.replace(".html", "");
                const rpImgPath = `/assets/images/${rp.image}`;
                return (
                  <div key={idx} className="product-card">
                    <div className="product-image">
                      <img
                        src={rpImgPath}
                        alt={rp.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/assets/images/prod_water_filling.png";
                        }}
                      />
                    </div>
                    <div className="product-info">
                      <h3>{rp.title}</h3>
                      <Link href={`/products/${rpSlug}`} className="read-more" style={{ marginTop: "10px" }}>
                        View Details &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
