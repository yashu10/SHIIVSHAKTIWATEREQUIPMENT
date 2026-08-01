"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Blog {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  content: string;
  readTime: string;
}

interface BlogListClientProps {
  blogs: Blog[];
  categories: string[];
}

export function BlogListClient({ blogs, categories }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = activeCategory === "all" || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search and Filter Area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "12px 20px",
            borderRadius: "30px",
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: "1rem",
            outline: "none",
            transition: "all 0.3s ease",
            boxShadow: "var(--shadow-sm)",
          }}
        />

        {/* Category Filter Tabs */}
        <div
          className="filter-buttons-wrapper"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                border: "1px solid var(--primary)",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "0.85rem",
                transition: "all 0.3s ease",
                background: activeCategory === cat ? "var(--primary)" : "transparent",
                color: activeCategory === cat ? "white" : "var(--primary)",
              }}
            >
              {cat === "all" ? "All Posts" : cat === "Maintenance Tips" ? "Maintenance & Support" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="blog-grid" style={{ marginTop: 0 }}>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, idx) => (
            <div key={idx} className="blog-card" style={{ marginBottom: "20px" }}>
              <div className="blog-img-wrapper">
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/images/prod_water_filling.png";
                  }}
                />
                <div className="blog-date">{blog.date}</div>
              </div>
              <div className="blog-content">
                <span className="blog-category">{blog.category}</span>
                <h3>{blog.title}</h3>
                <p>{blog.summary}</p>
                <Link href={`/blog/${blog.slug}`} className="blog-read-more">
                  Read Full Article
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>
            <h3>No articles found matching your criteria.</h3>
          </div>
        )}
      </div>
    </>
  );
}
