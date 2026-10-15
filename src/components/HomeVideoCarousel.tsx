"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUI } from "../context/UIContext";

export function HomeVideoCarousel() {
  const { openVideoModal } = useUI();
  const videoTrackRef = useRef<HTMLDivElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  
  const videos = [
    {
      id: "6Pg6A-bWHjg",
      title: "Fully Auto Water Filling Line",
      thumb: "https://i.ytimg.com/vi/6Pg6A-bWHjg/hqdefault.jpg",
    },
    {
      id: "wbqcbmG2D3g",
      title: "PET Stretch Blow Moulding",
      thumb: "https://i.ytimg.com/vi/wbqcbmG2D3g/hqdefault.jpg",
    },
    {
      id: "FQfJBwNIgXU",
      title: "Shrink Wrap Collation System",
      thumb: "https://i.ytimg.com/vi/FQfJBwNIgXU/hqdefault.jpg",
    },
    {
      id: "iilA4-Z5TuU",
      title: "Oil Filling Machine (Servo System)",
      thumb: "https://i.ytimg.com/vi/iilA4-Z5TuU/hqdefault.jpg",
    },
    {
      id: "k586NB93dbg",
      title: "Automatic Juice Filling Machine",
      thumb: "https://i.ytimg.com/vi/k586NB93dbg/hqdefault.jpg",
    },
    {
      id: "6mTa6I_Bid0",
      title: "Soda Filling Machine",
      thumb: "https://i.ytimg.com/vi/6mTa6I_Bid0/hqdefault.jpg",
    },
    {
      id: "wLdaR-DqCRk",
      title: "Automatic 15 Ltr. Oil Tin Filling Machine",
      thumb: "https://i.ytimg.com/vi/wLdaR-DqCRk/hqdefault.jpg",
    },
    {
      id: "EzVnuGPVFbI",
      title: "Beer Bottle Filling & Sealing",
      thumb: "https://i.ytimg.com/vi/EzVnuGPVFbI/hqdefault.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVideoIndex((prev) => {
        const visibleCards = typeof window !== "undefined" && window.innerWidth > 991 ? 3 : (window.innerWidth > 576 ? 2 : 1);
        const maxIndex = Math.max(0, videos.length - visibleCards);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [videos.length]);

  useEffect(() => {
    if (videoTrackRef.current) {
      const cards = videoTrackRef.current.querySelectorAll(".video-card");
      if (cards.length > 0) {
        const cardWidth = (cards[0] as HTMLElement).offsetWidth;
        const gap = 30; // matches css layout
        const moveAmt = cardWidth + gap;
        videoTrackRef.current.style.transform = `translateX(-${videoIndex * moveAmt}px)`;
      }
    }
  }, [videoIndex]);

  return (
    <section className="video-gallery section-padding bg-light" id="video">
      <div className="container animate-on-scroll">
        <div className="section-header center">
          <h2 className="section-title">Machinery in Action</h2>
          <p>Watch our industrial equipment run at maximum efficiency.</p>
        </div>
        <div className="video-carousel-container" id="videoCarousel" style={{ overflow: "hidden" }}>
          <div
            className="video-carousel-track"
            id="videoTrack"
            ref={videoTrackRef}
            style={{ display: "flex", transition: "transform 0.5s ease" }}
          >
            {videos.map((vid, idx) => (
              <div key={idx} className="video-card" style={{ flexShrink: 0 }}>
                <div
                  className="video-wrapper"
                  onClick={() => openVideoModal(`https://www.youtube.com/embed/${vid.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={vid.thumb} alt={vid.title} className="video-thumb" loading="lazy" />
                  <div className="play-btn"></div>
                </div>
                <h3 style={{ fontSize: "1rem", lineHeight: "1.4" }}>{vid.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/video" className="btn btn-outline" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
            View All Videos
          </Link>
        </div>
      </div>
    </section>
  );
}
