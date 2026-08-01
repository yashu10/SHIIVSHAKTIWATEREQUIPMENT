"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUI } from "../context/UIContext";

export const Header: React.FC = () => {
  const { openLeadPopup } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Check initial state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = (key: string, e: React.MouseEvent) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setOpenDropdowns((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  return (
    <header className="site-header" id="header">
      {/* Top Branding Section */}
      <div className="header-branding">
        <div className="container branding-container">
          <Link href="/" className="logo" onClick={closeMobileMenu}>
            <img
              src="/assets/images/shiv_shakti_logo.png"
              alt="SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. Logo"
              className="header-logo"
            />
          </Link>
          <p className="company-tagline">Engineering Purity. Delivering Trust.</p>
        </div>
      </div>

      {/* Bottom Navbar Section */}
      <nav className={`main-nav-bar ${isScrolled ? "scrolled" : ""}`} id="mainNav">
        <div className="container nav-container">

          <div className={`nav-wrapper ${isMobileMenuOpen ? "active" : ""}`}>
            <button 
              className="mobile-close-btn" 
              onClick={closeMobileMenu}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '40px',
                lineHeight: '1',
                cursor: 'pointer',
                zIndex: 1000
              }}
              aria-label="Close Menu"
            >
              &times;
            </button>
            <ul className="nav-links">
              <li>
                <Link href="/" onClick={closeMobileMenu}>Home</Link>
              </li>
              <li>
                <Link href="/about" onClick={closeMobileMenu}>About Us</Link>
              </li>
              <li className={`has-dropdown ${openDropdowns["products"] ? "open" : ""}`}>
                <Link href="/products" onClick={(e) => toggleDropdown("products", e)}>
                  Our Products <span className="arrow">&#9660;</span>
                </Link>
                <ul className="dropdown">
                  {/* Bottle Filling Machines */}
                  <li className={`has-subdropdown ${openDropdowns["bottle-filling"] ? "open" : ""}`}>
                    <Link href="/products#cat-bottle-filling" onClick={(e) => toggleDropdown("bottle-filling", e)}>
                      Bottle Filling Machines <span className="arrow">&#9654;</span>
                    </Link>
                    <ul className="subdropdown">
                      <li>
                        <Link href="/products/water-filling-machine" onClick={closeMobileMenu}>
                          Water Filling Machine
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/juice-filling-machine" onClick={closeMobileMenu}>
                          Juice Filling Machine
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/beer-filling-machine" onClick={closeMobileMenu}>
                          Beer Filling Machine
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/soda-filling-machine" onClick={closeMobileMenu}>
                          Soda Filling Machine
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/liquid-filling-machines" onClick={closeMobileMenu}>
                          All Type of Filling Machine
                        </Link>
                      </li>
                    </ul>
                  </li>
  
                  {/* Labeling Machines */}
                  <li className={`has-subdropdown ${openDropdowns["labeling"] ? "open" : ""}`}>
                    <Link href="/products#cat-labeling" onClick={(e) => toggleDropdown("labeling", e)}>
                      Labeling Machines <span className="arrow">&#9654;</span>
                    </Link>
                    <ul className="subdropdown">
                      <li>
                        <Link href="/products/sticker-labelling-machine" onClick={closeMobileMenu}>
                          Automatic Sticker Labeling Machine
                        </Link>
                      </li>
                    </ul>
                  </li>
  
                  {/* Shrink Wrapping */}
                  <li className={`has-subdropdown ${openDropdowns["shrink"] ? "open" : ""}`}>
                    <Link href="/products#cat-shrink" onClick={(e) => toggleDropdown("shrink", e)}>
                      Shrink Wrapping <span className="arrow">&#9654;</span>
                    </Link>
                    <ul className="subdropdown">
                      <li>
                        <Link href="/products/fully-automatic-shrink-wrapping-machine" onClick={closeMobileMenu}>
                          Fully Automatic Shrink Wrapping Machine
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/semi-automatic-shrink-wrapping-machine" onClick={closeMobileMenu}>
                          Semi Automatic Shrink Wrapping Machine
                        </Link>
                      </li>
                    </ul>
                  </li>
  
                  {/* RO Plant */}
                  <li className={`has-subdropdown ${openDropdowns["ro-plant"] ? "open" : ""}`}>
                    <Link href="/products#cat-ro-plant" onClick={(e) => toggleDropdown("ro-plant", e)}>
                      R.O Plant <span className="arrow">&#9654;</span>
                    </Link>
                    <ul className="subdropdown">
                      <li>
                        <Link href="/products/r-o-plant" onClick={closeMobileMenu}>
                          Industrial S.S R.O Plant
                        </Link>
                      </li>
                    </ul>
                  </li>
  
                  {/* Blow Molding */}
                  <li className={`has-subdropdown ${openDropdowns["blow"] ? "open" : ""}`}>
                    <Link href="/products#cat-blow" onClick={(e) => toggleDropdown("blow", e)}>
                      Blow Molding <span className="arrow">&#9654;</span>
                    </Link>
                    <ul className="subdropdown">
                      <li>
                        <Link href="/products/fully-automatic-blow-moulding-machine" onClick={closeMobileMenu}>
                          Fully Auto Blow Moulding Machine
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/semi-automatic-blow-moulding-machine" onClick={closeMobileMenu}>
                          Semi Auto Blow Moulding Machine
                        </Link>
                      </li>
                    </ul>
                  </li>
  
                  {/* Batch Coding */}
                  <li className={`has-subdropdown ${openDropdowns["batch-coding"] ? "open" : ""}`}>
                    <Link href="/products#cat-batch-coding" onClick={(e) => toggleDropdown("batch-coding", e)}>
                      Batch Coding <span className="arrow">&#9654;</span>
                    </Link>
                    <ul className="subdropdown">
                      <li>
                        <Link href="/products/inkjet-batch-coding" onClick={closeMobileMenu}>
                          Inkjet Batch Coding
                        </Link>
                      </li>
                    </ul>
                  </li>
  
                  {/* Lab Equipment */}
                  <li className={`has-subdropdown ${openDropdowns["lab"] ? "open" : ""}`}>
                    <Link href="/products#cat-lab" onClick={(e) => toggleDropdown("lab", e)}>
                      Lab Equipment <span className="arrow">&#9654;</span>
                    </Link>
                    <ul className="subdropdown">
                      <li>
                        <Link href="/products/chemical-lab" onClick={closeMobileMenu}>
                          Chemical Lab
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/video" onClick={closeMobileMenu}>Video</Link>
              </li>
              <li>
                <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
              </li>
              <li>
                <Link href="/contact" onClick={closeMobileMenu}>Contact Us</Link>
              </li>
            </ul>
            <div className="header-actions">
              <button
                onClick={() => {
                  closeMobileMenu();
                  openLeadPopup("quote");
                }}
                className="btn btn-primary nav-cta"
                style={{ cursor: "pointer" }}
              >
                Request A Quote
              </button>
              <button
                onClick={() => {
                  closeMobileMenu();
                  openLeadPopup("brochure");
                }}
                className="btn btn-outline nav-cta secondary-cta"
                style={{ cursor: "pointer" }}
              >
                Download Brochure
              </button>
            </div>
          </div>
          
          <button
            className="mobile-menu-toggle"
            id="mobileToggle"
            aria-label="Toggle Menu"
            onClick={toggleMobileMenu}
          >
            <span
              className="hamburger"
              style={{
                background: isMobileMenuOpen ? "transparent" : "var(--white)",
                transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            ></span>
          </button>
        </div>
      </nav>
    </header>
  );
};
