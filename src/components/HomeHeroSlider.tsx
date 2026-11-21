"use client";

import { useState, useEffect } from "react";

export function HomeHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0]);
  
  const slides = [
    {
      img: "/assets/images/hero_machine_1.webp",
      title: "Precision Engineering for the Beverage Industry",
      desc: "State-of-the-art washing, filling, and capping solutions tailored for high-volume production.",
    },
    {
      img: "/assets/images/hero_machine_2.webp",
      title: "Advanced Rinsing Systems",
      desc: "Ensuring maximum hygiene and efficiency for global standards.",
    },
    {
      img: "/assets/images/hero_machine_3.webp",
      title: "High-Speed Filling Technology",
      desc: "Robust, stainless steel construction designed for minimal downtime.",
    },
    {
      img: "/assets/images/hero_machine_4.webp",
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

  // Only fetch a slide's image once it is current or next up
  useEffect(() => {
    const next = (currentSlide + 1) % slides.length;
    setLoaded((prev) => {
      const add = [currentSlide, next].filter((i) => !prev.includes(i));
      return add.length ? [...prev, ...add] : prev;
    });
  }, [currentSlide, slides.length]);

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
          >
            {loaded.includes(idx) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="slide-img"
                src={slide.img}
                alt=""
                width={1600}
                height={1600}
                decoding="async"
                fetchPriority={idx === 0 ? "high" : "auto"}
              />
            )}
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
