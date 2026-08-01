"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUI } from "../context/UIContext";

export const Footer: React.FC = () => {
  const { openLeadPopup } = useUI();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="container relative">
        <div className="footer-grid new-footer">
          {/* Column 1 */}
          <div className="footer-about">
            <img
              src="/assets/images/shiv_shakti_logo.png"
              alt="Shiv Shakti Enterprise"
              className="footer-logo"
              style={{ maxHeight: "60px", width: "auto" }}
            />
            <p>
              We produce positive results in the ever-growing industrial and manufacturing sectors.
              Our corporate mandate focuses on maintaining strong core values, ensuring consistent growth
              and excellence in all operations.
            </p>
            <Link href="/about" className="know-more">
              <i className="fa-solid fa-arrow-right" style={{ marginRight: "5px" }}></i> Know More
            </Link>
            <div className="social-links">
              <a href="https://www.facebook.com/share/1ayi4yDzHA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/shivshaktiwatersolution?igsh=ZGlvanBjcGtuOXR2" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://youtube.com/@0508pradip?si=oyYaSQHBArGgwJog" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/#certificate">Certificate</Link></li>
              <li><Link href="/video">Video</Link></li>
              <li>
                <button
                  onClick={() => openLeadPopup("quote")}
                  style={{ background: "none", border: "none", color: "inherit", padding: 0, cursor: "pointer", font: "inherit", textAlign: "left" }}
                >
                  Inquiry
                </button>
              </li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-links">
            <h4>Our Products</h4>
            <ul>
              <li><Link href="/products/water-filling-machine">WATER Filling Machine</Link></li>
              <li><Link href="/products/juice-filling-machine">Juice Filling Machine</Link></li>
              <li><Link href="/products/beer-filling-machine">Beer Filling Machine</Link></li>
              <li><Link href="/products/sticker-labelling-machine">Automatic Sticker Labeling Machine</Link></li>
              <li><Link href="/products/inkjet-batch-coding">Inkjet Batch Coding</Link></li>
              <li><Link href="/products/chemical-lab">Chemical Lab</Link></li>
              <li><Link href="/products/r-o-plant">R. O. Plant</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-contact">
            <h4>Quick Contact</h4>
            <p className="contact-desc">
              If you have any questions or need help, feel free to contact with our team.
            </p>
            <div className="contact-address-block">
              <strong>SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.</strong>
              <br />
              Plot No. B/5, Revabhai Industrial Estate,
              <br />
              Part-2, Opp. Ishwarkrupa Weighbridge,
              <br />
              CTM, Ahmedabad, Gujarat- 380026.
            </div>
            <p>
              <i className="fa-solid fa-phone" style={{ marginRight: "8px", color: "var(--accent)" }}></i>
              Mr. Pradip Patel +91 8490087773
            </p>
            <p>
              <i className="fa-solid fa-phone" style={{ marginRight: "8px", color: "var(--accent)" }}></i>
              Mrs. Sonal Patel +91 9712666160
            </p>
            <p>
              <i className="fa-solid fa-envelope" style={{ marginRight: "8px", color: "var(--accent)" }}></i>
              contact@shivshaktiwaterequipment.com
            </p>
          </div>
        </div>

        {/* Bottom Action Strip */}
        <div className="footer-action-strip">
          <div className="action-item">
            <i className="fa-solid fa-phone"></i>
            <div className="action-text">
              <span>Call Us:</span>
              <strong>+91 9712666160</strong>
            </div>
          </div>
          <div className="action-item">
            <i className="fa-solid fa-envelope"></i>
            <div className="action-text">
              <span>Email Us:</span>
              <strong>contact@shivshaktiwaterequipment.com</strong>
            </div>
          </div>
          <div className="action-item">
            <i className="fa-regular fa-clock"></i>
            <div className="action-text">
              <span>Opening Hours:</span>
              <strong>Mon to Sun: 8am-8pm</strong>
            </div>
          </div>
          <div className="action-btn">
            <button
              onClick={() => openLeadPopup("quote")}
              className="btn btn-primary"
              style={{ background: "#0F2744", borderColor: "#0F2744", cursor: "pointer" }}
            >
              Request A Quote
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.. All rights reserved.</p>
        </div>
      </div>

      {/* Floating Elements */}
      <a
        href="https://wa.me/919712666160"
        target="_blank"
        rel="noopener noreferrer"
        className="float-whatsapp"
        aria-label="WhatsApp Us"
      >
        <svg viewBox="0 0 448 512" width="30" height="30" fill="currentColor">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </a>

      {showScrollTop && (
        <button
          id="scrollTopBtn"
          className="float-scroll-top"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg viewBox="0 0 448 512" width="20" height="20" fill="currentColor">
            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
          </svg>
        </button>
      )}
    </footer>
  );
};
