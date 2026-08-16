"use client";

import React, { useState } from "react";
import Link from "next/link";

export const metadata = {
  title: "Machinery Videos | SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
  alternates: { canonical: "/video" },
};
import { useUI } from "../../context/UIContext";

interface Video {
  id: string;
  title: string;
  category: string;
  thumb: string;
}

export default function VideoGallery() {
  const { openVideoModal } = useUI();
  const [activeFilter, setActiveFilter] = useState("all");

  const videos: Video[] = [
    {
      id: "6Pg6A-bWHjg",
      title: "Fully Auto Water Filling Line",
      category: "Filling Lines",
      thumb: "https://i.ytimg.com/vi/6Pg6A-bWHjg/hqdefault.jpg",
    },
    {
      id: "wbqcbmG2D3g",
      title: "PET Stretch Blow Moulding",
      category: "Blow Moulding",
      thumb: "https://i.ytimg.com/vi/wbqcbmG2D3g/hqdefault.jpg",
    },
    {
      id: "FQfJBwNIgXU",
      title: "Shrink Wrap Collation System",
      category: "Client Installations",
      thumb: "https://i.ytimg.com/vi/FQfJBwNIgXU/hqdefault.jpg",
    },
    {
      id: "iilA4-Z5TuU",
      title: "Oil Filling Machine (Servo System)",
      category: "Filling Lines",
      thumb: "https://i.ytimg.com/vi/iilA4-Z5TuU/hqdefault.jpg",
    },
    {
      id: "k586NB93dbg",
      title: "Automatic Juice Filling Machine",
      category: "Filling Lines",
      thumb: "https://i.ytimg.com/vi/k586NB93dbg/hqdefault.jpg",
    },
    {
      id: "6mTa6I_Bid0",
      title: "Soda Filling Machine",
      category: "Filling Lines",
      thumb: "https://i.ytimg.com/vi/6mTa6I_Bid0/hqdefault.jpg",
    },
    {
      id: "wLdaR-DqCRk",
      title: "Automatic 15 Ltr. Oil Tin Filling Machine",
      category: "Filling Lines",
      thumb: "https://i.ytimg.com/vi/wLdaR-DqCRk/hqdefault.jpg",
    },
    {
      id: "EzVnuGPVFbI",
      title: "Beer Bottle Filling & Sealing",
      category: "Labelling",
      thumb: "https://i.ytimg.com/vi/EzVnuGPVFbI/hqdefault.jpg",
    },
  ];

  const filterOptions = ["all", "Filling Lines", "Blow Moulding", "Labelling", "Client Installations"];

  const filteredVideos = activeFilter === "all"
    ? videos
    : videos.filter((v) => v.category === activeFilter);

  return (
    <main>
      {/* Page Header */}
      <section className="page-header pattern-bg active">
        <div className="container">
          <h1 className="page-title fade-up">MACHINERY <span className="text-gradient">VIDEOS</span></h1>
          <p className="page-subtitle fade-up delay-1">Watch our high-speed, heavy-duty industrial machinery in active operation.</p>
        </div>
      </section>

      {/* Video Content Grid */}
      <section className="section-padding bg-light">
        <div className="container">
          
          {/* Category Filter Buttons */}
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
            {filterOptions.map((filter, idx) => (
              <button
                key={idx}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "20px",
                  border: "1px solid var(--primary)",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                  background: activeFilter === filter ? "var(--primary)" : "transparent",
                  color: activeFilter === filter ? "white" : "var(--primary)",
                }}
              >
                {filter === "all" ? "All Videos" : filter}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="product-grid" style={{ marginTop: 0 }}>
            {filteredVideos.map((vid, idx) => (
              <div key={idx} className="video-card" style={{ boxShadow: "var(--shadow-sm)" }}>
                <div
                  className="video-wrapper"
                  onClick={() => openVideoModal(`https://www.youtube.com/embed/${vid.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={vid.thumb} alt={vid.title} className="video-thumb" />
                  <div className="play-btn"></div>
                </div>
                <div style={{ padding: "20px", background: "white", borderRadius: "0 0 12px 12px" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      display: "block",
                      marginBottom: "5px",
                    }}
                  >
                    {vid.category}
                  </span>
                  <h3 style={{ fontSize: "1.1rem", margin: 0, fontWeight: 600 }}>{vid.title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
