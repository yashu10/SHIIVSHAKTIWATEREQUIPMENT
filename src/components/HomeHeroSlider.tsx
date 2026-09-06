"use client";

import React, { useState, useEffect } from "react";

export function HomeHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Precision Engineering for the Beverage Industry",
      desc: "State-of-the-art washing, filling, and capping solutions tailored for high-volume production.",
    },
    {
      title: "Advanced Rinsing Systems",
      desc: "Ensuring maximum hygiene and efficiency for global standards.",
    },
    {
      title: "High-Speed Filling Technology",
      desc: "Robust, stainless steel construction designed for minimal downtime.",
    },
    {
      title: "Automated Capping Units",
      desc: "Securing your product with precision torque and reliable sealing.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="hero" id="home" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <source src="/assets/images/Video/Red%20White%20and%20Gray%20Modern%20Construction%20Safety%20Video.mp4" type="video/mp4" />
      </video>

      {/* Overlay to ensure text readability */}
      <div className="slide-overlay" style={{ zIndex: 2 }}></div>

      <div className="slider-container" id="heroSlider" style={{ zIndex: 3, position: "relative" }}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`slide ${idx === currentSlide ? "active" : ""}`}
            style={{ background: "transparent" }}
          >
            <div className="container slide-content" style={{ zIndex: 3 }}>
              {idx === 0 ? (
                <h1 className="fade-up">{slide.title}</h1>
              ) : (
                <h2 className="fade-up">{slide.title}</h2>
              )}
              <p className="fade-up delay-1">{slide.desc}</p>
              <div className="slide-actions fade-up delay-2">
                <a href="#products" className="btn btn-primary">
                  Explore Machinery
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="slider-controls" style={{ zIndex: 4, position: "absolute" }}>
        <button className="slider-btn prev" onClick={handlePrevSlide} aria-label="Previous Slide">
          &#10094;
        </button>
        <button className="slider-btn next" onClick={handleNextSlide} aria-label="Next Slide">
          &#10095;
        </button>
      </div>
    </section>
  );
}
