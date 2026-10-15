"use client";

import React, { useState, useEffect } from "react";

export function HomeHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      img: "/assets/images/hero_machine_1.png",
      title: "Precision Engineering for the Beverage Industry",
      desc: "State-of-the-art washing, filling, and capping solutions tailored for high-volume production.",
    },
    {
      img: "/assets/images/hero_machine_2.png",
      title: "Advanced Rinsing Systems",
      desc: "Ensuring maximum hygiene and efficiency for global standards.",
    },
    {
      img: "/assets/images/hero_machine_3.png",
      title: "High-Speed Filling Technology",
      desc: "Robust, stainless steel construction designed for minimal downtime.",
    },
    {
      img: "/assets/images/hero_machine_4.png",
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
    <section className="hero" id="home">
      <div className="slider-container" id="heroSlider">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`slide ${idx === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url('${slide.img}')` }}
          >
            <div className="slide-overlay"></div>
            <div className="container slide-content">
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
      <div className="slider-controls">
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
