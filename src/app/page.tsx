import React from "react";
import Link from "next/link";
import productsData from "../data/products.json";
import blogsData from "../data/blogs.json";
import { HomeHeroSlider } from "../components/HomeHeroSlider";
import { HomeVideoCarousel } from "../components/HomeVideoCarousel";
import { HomeFaqAccordion } from "../components/HomeFaqAccordion";

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of filling machines do you manufacture?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We manufacture a comprehensive range of filling machines including Water Filling Machines, Juice Filling Machines, Soda Filling Machines, Beer Filling Machines, and Oil Filling Machines. All our machines are designed with food-grade stainless steel (SS304/SS316) and comply with international hygiene and safety standards.",
        },
      },
      {
        "@type": "Question",
        "name": "Do you provide turnkey project solutions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We specialize in complete turnkey projects for packaged drinking water plants and beverage production lines. This includes everything from R.O. plant installation, blow moulding, filling & capping machines, labelling, batch coding, shrink wrapping, to final packaging — all under one roof.",
        },
      },
      {
        "@type": "Question",
        "name": "Do you export machinery internationally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We have successfully exported our machinery to over 25+ countries across Africa, the Middle East, Southeast Asia, and South America. Our machines are designed to meet international quality standards with CE marking and ISO certification.",
        },
      },
      {
        "@type": "Question",
        "name": "What certifications does your company hold?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. is an ISO 9001:2015 certified company. Our products meet BIS (Bureau of Indian Standards) compliance, and we maintain rigorous quality checks through our in-house Chemical and Micro-Biology laboratories.",
        },
      },
      {
        "@type": "Question",
        "name": "What kind of after-sales support do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide 24/7 technical support, on-site installation assistance, operator training, and a comprehensive warranty on all our machines. Our dedicated service team ensures minimal downtime with prompt spare parts delivery and remote troubleshooting support.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the production capacity of your machines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our filling machines are available in a wide range of capacities — from 1,000 bottles per hour (BPH) for small-scale operations to 12,000+ BPH for large-scale industrial production. We customize the capacity based on your specific requirements and budget.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the typical delivery and installation timeline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard delivery timelines range from 30 to 60 days depending on machine complexity and customization requirements. Installation and commissioning typically take 5-10 days on-site, including full operator training and trial runs.",
        },
      },
      {
        "@type": "Question",
        "name": "How can I get a quotation for my project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply click the 'Request A Quote' button or call us directly at +91 9712666160. Share your production requirements, bottle sizes, and desired capacity — our engineering team will provide a detailed proposal with competitive pricing within 24 hours.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the cost of a water bottling plant in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of a water bottling plant in India varies widely based on production capacity, automation level, and included components (like RO plant and blow moulding). A basic semi-automatic setup may start around ₹10-15 Lakhs, while high-speed, fully automatic turnkey plants can range from ₹40 Lakhs to over ₹1 Crore. Contact us for a precise quote."
        }
      },
      {
        "@type": "Question",
        "name": "How does an automatic blow moulding machine work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An automatic PET blow moulding machine works by first heating PET preforms in an infrared oven until they become malleable. The preforms are then transferred into a custom bottle mould, where high-pressure compressed air stretches and blows the plastic into the final bottle shape before cooling and ejection."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between RO plant and regular water filtration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While regular filtration removes large particles and sediment, a Reverse Osmosis (RO) plant uses a semi-permeable membrane under high pressure to remove dissolved solids (TDS), heavy metals, bacteria, and viruses at a microscopic level, producing pure drinking water that meets stringent commercial standards."
        }
      },
      {
        "@type": "Question",
        "name": "How much space is required for a commercial RO and bottling plant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Space requirements depend on the plant's capacity and machinery configuration. A compact 2000 LPH RO plant with a basic filling line might need 1,000 to 1,500 sq. ft. However, a fully automatic high-speed turnkey line typically requires 3,000 to 5,000 sq. ft. of covered industrial space to accommodate machinery, raw materials, and finished goods."
        }
      }
    ],
  };

  const manufacturerSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Manufacturer"],
    "name": "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    "url": "https://shivshaktiwaterequipment.com",
    "logo": "https://shivshaktiwaterequipment.com/assets/images/shiv_shakti_logo.png",
    "description": "Leading manufacturer of mineral water bottling and liquid filling machinery in India.",
    "telephone": "+919712666160",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. B/5, Revabhai Industrial Estate, Part-2, Opp. Ishwarkrupa Weighbridge, CTM",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380026",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0039",
      "longitude": "72.6366"
    },
    "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 08:00-20:00"
  };

  // Get products for home page catalog preview, excluding Semi Automatic Blow Moulding Machine
  const homeProducts = productsData
    .filter(p => p.title !== "Semi Automatic Blow Moulding Machine")
    .slice(0, 12);
  // Get first 3 blogs for preview
  const homeBlogs = blogsData.slice(0, 3);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(manufacturerSchema) }}
      />
      {/* Hero Slider Section */}
      <HomeHeroSlider />

      {/* About Section */}
      <section className="about section-padding" id="about">
        <div className="container about-container">
          <div className="about-image animate-on-scroll">
            <img src="/assets/images/prod_water_filling.png" alt="Water Filling Equipment" loading="lazy" />
            <div className="floating-badge">
              <span className="year">25+</span>
              <span className="text">
                Years of
                <br />
                Excellence
              </span>
            </div>
          </div>
          <div className="about-text animate-on-scroll">
            <h2 className="section-title">Trusted Since 1998</h2>
            <h3 className="section-subtitle">Pioneering Industrial B2B Machinery</h3>
            <p>
              SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. is a premier manufacturer and exporter based in Ahmedabad, specializing
              in comprehensive turnkey projects for the packaged drinking water and beverage industries.
            </p>
            <p>
              We blend robust engineering with innovation, ensuring every machine delivered meets international
              quality standards. From standalone equipment to fully automated lines, our mission is to empower your production.
            </p>
            <ul className="feature-list">
              <li>
                <span className="icon">&#10003;</span> ISO Certified Quality
              </li>
              <li>
                <span className="icon">&#10003;</span> Global Export Network
              </li>
              <li>
                <span className="icon">&#10003;</span> 24/7 Technical Support
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us section-padding" id="why-us">
        <div className="container animate-on-scroll">
          <div className="section-header center">
            <h2 className="section-title">Why SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.</h2>
            <p style={{ maxWidth: "800px", margin: "0 auto" }}>
              Trusted manufacturers in Gujarat, India, providing high-quality solutions for all your water treatment needs.
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-card">
              <div className="why-icon">
                <i className="fa-solid fa-medal"></i>
              </div>
              <h3>Our Quality</h3>
              <p>
                Presenting our superior Mineral Water Plant with automatic and manual operation for ease and reliability.
                Evaluated by our expert Quality Management team, guaranteeing flawless performance.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fa-solid fa-users-gear"></i>
              </div>
              <h3>Our Team</h3>
              <p>
                Backed by a team of skilled professionals, we conduct business operations effectively. Their dedication
                ensures the delivery of precisely engineered machines, fostering a strong market reputation.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3>24x7 Support</h3>
              <p>
                Utilizing advanced technology, we manufacture market-competitive products. Our items adhere to industry
                standards and undergo rigorous quality testing before final dispatch.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3>Vision - Mission</h3>
              <p>
                &quot;Excellence in service is our pledge to every customer, epitomizing our commitment. Experience
                unparalleled support tailored to your needs, ensuring satisfaction with every product.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Catalog Section */}
      <section className="products section-padding bg-light" id="products">
        <div className="container">
          <div className="section-header center animate-on-scroll">
            <h2 className="section-title">Our Machinery Catalog</h2>
            <p>Advanced equipment designed to scale your operations.</p>
          </div>

          <div className="product-grid">
            {homeProducts.map((p, idx) => {
              const slug = p.filename.replace(".html", "");
              // Handle image paths that might be plain filename or contain directory prefix
              const imgPath = p.image.startsWith("prod_") || p.image.startsWith("hero_")
                ? `/assets/images/${p.image}`
                : `/assets/images/${p.image}`;
              return (
                <div key={idx} className="product-card animate-on-scroll">
                  <div className="product-image">
                    {/* Fallback pattern not easily achievable with simple img without client code, using next/image would be better but keeping simple img as requested to avoid UI changes */}
                    <img
                      src={imgPath}
                      alt={p.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-info">
                    <h3>{p.title}</h3>
                    <p>{p.tagline || "Fully automatic packing & bottling solutions."}</p>
                    <Link href={`/products/${slug}`} className="read-more">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/products" className="btn btn-outline" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
              View All Machinery
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="industries section-padding" id="industries">
        <div className="container animate-on-scroll">
          <div className="section-header center">
            <h2 className="section-title">Industries We Served!</h2>
            <p style={{ maxWidth: "800px", margin: "0 auto" }}>
              Our machines are highly demanded across industries for filling, capping, and packaging. We offer reliable
              and efficient solutions tailored to meet the diverse needs of these industries.
            </p>
          </div>

          <div className="industries-grid">
            <div className="industry-card">
              <i className="fa-solid fa-flask"></i>
              <h3>Pharmaceutical</h3>
            </div>
            <div className="industry-card">
              <i className="fa-solid fa-vial-virus"></i>
              <h3>Chemical</h3>
            </div>
            <div className="industry-card">
              <i className="fa-solid fa-utensils"></i>
              <h3>Food Processing</h3>
            </div>
            <div className="industry-card">
              <i className="fa-solid fa-bottle-water"></i>
              <h3>Mineral Water</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <HomeVideoCarousel />

      {/* Blog Section */}
      <section className="blog-section section-padding bg-light" id="blog">
        <div className="container animate-on-scroll">
          <div className="section-header center">
            <h2 className="section-title">Latest News & Blogs</h2>
            <p>Stay updated with the latest trends, tips, and innovations in the bottling industry.</p>
          </div>
          <div className="blog-grid">
            {homeBlogs.map((blog, idx) => (
              <div key={idx} className="blog-card">
                <div className="blog-img-wrapper">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
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
            ))}
          </div>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/blog" className="btn btn-outline" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Logo Section */}
      <section className="clients section-padding" id="clients" style={{ backgroundColor: "var(--bg-light)" }}>
        <div className="container animate-on-scroll">
          <div className="section-header center" style={{ marginBottom: "50px" }}>
            <h2 className="section-title">Our Esteemed Clients</h2>
            <p className="section-subtitle">We are trusted by industry leaders across the globe.</p>
          </div>
          <div className="clients-collage-wrapper">
            <div className="clients-collage-grid">
              {Array.from({ length: 27 }, (_, i) => {
                const logoNumber = i + 3;
                return (
                  <div key={logoNumber} className="client-logo-item">
                    <div className="client-logo-inner">
                      <img
                        src={`/assets/images/clients/${logoNumber}.jpg`}
                        alt={`SHIIV SHAKTI Client Logo ${logoNumber}`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section
        className="global-reach section-padding"
        id="global-reach"
        style={{ backgroundImage: "url('/assets/images/bg_factory.png')" }}
      >
        <div className="glass-overlay new-glass-overlay"></div>
        <div className="container relative z-index-1">
          <div className="global-reach-wrapper">
            <div className="reach-text-content animate-on-scroll">
              <span className="text-accent">Worldwide Presence</span>
              <h2 className="section-title text-white" style={{ textAlign: "left", marginBottom: "20px" }}>
                Exporting Excellence Globally
              </h2>
              <p className="text-white" style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "40px", opacity: 0.9 }}>
                Our robust network spans multiple continents. We deliver and install top-tier machinery across the globe with
                comprehensive after-sales support, ensuring your production never stops.
              </p>

              <div className="new-stats-grid">
                <div className="new-stat-card">
                  <div className="icon-box">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3 className="counter">25+</h3>
                    <p>Countries Exported</p>
                  </div>
                </div>
                <div className="new-stat-card">
                  <div className="icon-box">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                      <path d="M22 21H2V8l7 4 7-4 6 3v10z"></path>
                      <path d="M17 11V7l-5 3V7H7v3"></path>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3 className="counter">500+</h3>
                    <p>Projects Delivered</p>
                  </div>
                </div>
                <div className="new-stat-card">
                  <div className="icon-box">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3 className="counter">100%</h3>
                    <p>Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reach-map-content animate-on-scroll delay-1">
              <div className="map-floating-wrapper">
                <img src="/assets/images/bg_world_map.png" alt="Global Network Map" className="world-map-animated" loading="lazy" />
                <div className="pulse-dot" style={{ top: "35%", left: "22%" }}></div>
                <div className="pulse-dot" style={{ top: "45%", left: "48%" }}></div>
                <div className="pulse-dot" style={{ top: "55%", left: "75%" }}></div>
                <div className="pulse-dot" style={{ top: "38%", left: "82%" }}></div>
                <div className="pulse-dot" style={{ top: "75%", left: "62%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section-padding" id="faq">
        <div className="container">
          <div className="section-header center animate-on-scroll">
            <span className="faq-badge">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">Everything you need to know about our machinery, processes, and services.</p>
          </div>

          <HomeFaqAccordion />

          <div className="faq-cta animate-on-scroll">
            <p>Still have questions? We're here to help!</p>
            <Link href="/contact" className="btn btn-primary">
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

