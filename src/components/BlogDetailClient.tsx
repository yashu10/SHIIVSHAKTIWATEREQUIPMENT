"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUI } from "../context/UIContext";

export interface BlogItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime?: string;
  image: string;
  summary: string;
  content: string;
}

interface BlogDetailClientProps {
  blog: BlogItem;
  suggestions: BlogItem[];
  prevBlog: BlogItem | null;
  nextBlog: BlogItem | null;
}

export const BlogDetailClient: React.FC<BlogDetailClientProps> = ({
  blog,
  suggestions,
  prevBlog,
  nextBlog,
}) => {
  const { openLeadPopup } = useUI();
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${blog.title} - Read more at: ${window.location.href}`
      )}`;
      window.open(shareUrl, "_blank");
    }
  };

  const handleLinkedInShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href
      )}`;
      window.open(shareUrl, "_blank");
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = "/assets/images/prod_water_filling.png";
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="reading-progress-container">
        <div
          className="reading-progress-bar"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Page Hero Header */}
      <section className="page-header pattern-bg active" style={{ padding: "60px 0 40px" }}>
        <div className="container">
          <ul className="breadcrumb" style={{ justifyContent: "center", marginBottom: "15px" }}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>{blog.category}</li>
          </ul>

          <h1
            className="page-title fade-up"
            style={{ fontSize: "2.4rem", maxWidth: "900px", margin: "0 auto 15px", lineHeight: "1.3" }}
          >
            {blog.title}
          </h1>

          <div
            className="fade-up delay-1"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              color: "#cbd5e1",
              fontSize: "0.95rem",
            }}
          >
            <span className="blog-category-badge">{blog.category}</span>
            <span>
              <i className="fa-regular fa-calendar-check" style={{ marginRight: "6px", color: "var(--accent)" }}></i>
              {blog.date}
            </span>
            <span>
              <i className="fa-regular fa-clock" style={{ marginRight: "6px", color: "var(--accent)" }}></i>
              {blog.readTime || "5 Min Read"}
            </span>
          </div>
        </div>
      </section>

      {/* Main Article Section */}
      <section className="section-padding bg-light" style={{ paddingTop: "40px" }}>
        <div className="container" style={{ maxWidth: "920px" }}>
          <div className="blog-single-wrapper">
            {/* Featured Hero Image */}
            <div className="blog-single-img-box">
              <img
                src={blog.image}
                alt={blog.title}
                onError={handleImageError}
              />
            </div>

            {/* Sub Meta & Social Sharing Bar */}
            <div className="blog-single-meta-bar">
              <div className="blog-meta-left">
                <div className="blog-meta-item">
                  <i className="fa-solid fa-user-gear"></i>
                  <span>SHIIV SHAKTI Engineering Team</span>
                </div>
                <div className="blog-meta-item">
                  <i className="fa-solid fa-check-double"></i>
                  <span>ISO & CE Certified Guide</span>
                </div>
              </div>

              <div className="blog-share-buttons">
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#64748b", marginRight: "5px" }}>
                  Share:
                </span>
                <button
                  className="blog-share-btn"
                  onClick={handleWhatsAppShare}
                  title="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp" style={{ color: "#25D366" }}></i>
                  WhatsApp
                </button>
                <button
                  className="blog-share-btn"
                  onClick={handleLinkedInShare}
                  title="Share on LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in" style={{ color: "#0A66C2" }}></i>
                  LinkedIn
                </button>
                <button
                  className="blog-share-btn"
                  onClick={handleCopyLink}
                  title="Copy Article Link"
                >
                  <i className={`fa-solid ${copied ? "fa-check" : "fa-link"}`} style={{ color: copied ? "green" : "inherit" }}></i>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Rich HTML Content Body */}
            <div
              className="blog-single-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* High-Converting B2B Lead CTA Box */}
            <div className="blog-cta-box">
              <div className="blog-cta-content" style={{ maxWidth: "550px" }}>
                <h3>Looking for Bottling & Packaging Solutions?</h3>
                <p>
                  Get customized turn-key project layouts, ROI estimates, and factory-direct pricing from India&apos;s leading beverage machinery engineers.
                </p>
              </div>
              <div className="blog-cta-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => openLeadPopup("quote")}
                  style={{ background: "var(--primary)", borderColor: "var(--primary)" }}
                >
                  <i className="fa-solid fa-calculator" style={{ marginRight: "8px" }}></i>
                  Get Machine Quote
                </button>
                <a
                  href="https://wa.me/919712666160?text=Hello%20Shiv%20Shakti%20Team%2C%20I%20read%20your%20article%20and%20want%20machinery%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.4)" }}
                >
                  <i className="fa-brands fa-whatsapp" style={{ marginRight: "8px", color: "#25D366" }}></i>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Author / Company Brand Box */}
            <div className="blog-author-box">
              <img
                src="/assets/images/shiv_shakti_logo.png"
                alt="SHIIV SHAKTI Water Equipment Logo"
                className="blog-author-avatar"
                onError={handleImageError}
              />
              <div className="blog-author-info">
                <h4>SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.</h4>
                <p>
                  Premier ISO 9001:2015 & CE Certified Manufacturer of Automatic Mineral Water Bottling Lines, PET Blow Moulding Machines, CSD Soda Fillers & Packaging Systems based in Ahmedabad, India.
                </p>
              </div>
            </div>

            {/* Article Footer */}
            <div className="blog-single-footer">
              <Link href="/blog" className="btn btn-outline">
                <i className="fa-solid fa-arrow-left" style={{ marginRight: "8px" }}></i>
                Back to All Articles
              </Link>

              <button
                className="btn btn-outline"
                onClick={handleCopyLink}
                style={{ fontSize: "0.88rem" }}
              >
                <i className="fa-solid fa-share-nodes" style={{ marginRight: "6px" }}></i>
                {copied ? "Link Copied!" : "Share Article"}
              </button>
            </div>
          </div>

          {/* Previous / Next Article Navigation Cards */}
          {(prevBlog || nextBlog) && (
            <div className="blog-nav-buttons">
              {prevBlog ? (
                <Link href={`/blog/${prevBlog.slug}`} className="blog-nav-card">
                  <span className="blog-nav-label">
                    <i className="fa-solid fa-chevron-left" style={{ marginRight: "5px" }}></i>
                    Previous Article
                  </span>
                  <span className="blog-nav-title">{prevBlog.title}</span>
                </Link>
              ) : (
                <div></div>
              )}

              {nextBlog ? (
                <Link href={`/blog/${nextBlog.slug}`} className="blog-nav-card" style={{ textAlign: "right" }}>
                  <span className="blog-nav-label">
                    Next Article
                    <i className="fa-solid fa-chevron-right" style={{ marginLeft: "5px" }}></i>
                  </span>
                  <span className="blog-nav-title">{nextBlog.title}</span>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          )}

          {/* Related Articles Section */}
          {suggestions.length > 0 && (
            <div style={{ marginTop: "60px" }}>
              <div className="section-header center" style={{ marginBottom: "35px" }}>
                <h2 className="section-title" style={{ fontSize: "1.8rem" }}>
                  Explore Related Articles
                </h2>
                <p className="section-subtitle">
                  More industry insights, maintenance guidelines, and technology updates.
                </p>
              </div>

              <div className="blog-grid" style={{ marginTop: "20px" }}>
                {suggestions.map((s, idx) => (
                  <div key={idx} className="blog-card">
                    <div className="blog-img-wrapper">
                      <img
                        src={s.image}
                        alt={s.title}
                        onError={handleImageError}
                      />
                      <div className="blog-date">{s.date}</div>
                    </div>
                    <div className="blog-content">
                      <span className="blog-category">{s.category}</span>
                      <h3>{s.title}</h3>
                      <p>{s.summary}</p>
                      <Link href={`/blog/${s.slug}`} className="blog-read-more">
                        Read Full Article
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
