import React from "react";
import ExportQuoteButton from "../../components/ExportQuoteButton";

export default function Export() {
  const reasons = [
    { icon: "fa-clock-rotate-left", title: "25+ years of manufacturing experience (since 1998), 500+ projects delivered across 25+ countries" },
    { icon: "fa-certificate", title: "ISO 9001:2015 & CE certified; BIS-compliant machinery" },
    { icon: "fa-shield-halved", title: "SS304/SS316 food-grade construction on all filling lines" },
    { icon: "fa-industry", title: "Complete turnkey capability: R.O. plant, blow moulding, filling, labelling, batch coding and shrink wrapping under one roof" },
    { icon: "fa-warehouse", title: "15,000 sq. ft. manufacturing facility in Ahmedabad with in-house quality testing" },
    { icon: "fa-box-open", title: "Export documentation, container-friendly packing, and remote installation support" },
  ];

  const steps = [
    "Share your requirement (bottle size, capacity in BPH, product type)",
    "Get a customized proposal with FOB/CIF pricing",
    "Factory inspection & video call walkthrough before dispatch (on request)",
    "Export packing & shipping documentation handled end-to-end",
    "On-site or remote installation & operator training",
    "Ongoing spare parts & technical support",
  ];

  const markets = ["Africa", "Middle East", "Southeast Asia", "South America", "South Asia"];
  const certifications = ["ISO 9001:2015", "CE", "BIS Compliance"];

  return (
    <main>
      {/* Hero */}
      <section className="page-header pattern-bg active">
        <div className="container">
          <h1 className="page-title fade-up" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.25 }}>
            Your Trusted Manufacturing Partner for Water &amp; Beverage Bottling Machinery — <span className="text-gradient">Exported to 25+ Countries</span>
          </h1>
          <p className="page-subtitle fade-up delay-1" style={{ maxWidth: "900px" }}>
            From industrial R.O. plants to complete turnkey bottling lines, SHIIV SHAKTI WATER EQUIPMENT delivers
            ISO 9001:2015 &amp; CE certified machinery to distributors, trading houses, and manufacturers across
            Africa, the Middle East, Southeast Asia, and South America.
          </p>
          <div className="export-hero-badges fade-up delay-2">
            {certifications.map((c) => (
              <span key={c} className="export-chip">
                <i className="fa-solid fa-circle-check"></i> {c}
              </span>
            ))}
          </div>
          <div className="export-hero-cta fade-up delay-2">
            <ExportQuoteButton label="Get an Export Quote" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container" style={{ maxWidth: "1000px" }}>

          <div className="about-content-section animate-on-scroll">
            <h2>
              <i className="fa-solid fa-star"></i> Why International Buyers Choose Shiv Shakti
            </h2>
            <div className="values-grid export-reasons">
              {reasons.map((r, idx) => (
                <div key={idx} className="value-card">
                  <i className={`fa-solid ${r.icon}`}></i>
                  <span style={{ fontSize: "1rem" }}>{r.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-content-section animate-on-scroll">
            <h2>
              <i className="fa-solid fa-route"></i> Our Export Process
            </h2>
            <ol className="export-steps">
              {steps.map((s, idx) => (
                <li key={idx} className="export-step">
                  <span className="export-step-num">{idx + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="export-info-cards">
            <div className="export-info-card animate-on-scroll">
              <h2>
                <i className="fa-solid fa-earth-africa"></i> Markets We Serve
              </h2>
              <div className="export-chips">
                {markets.map((m) => (
                  <span key={m} className="export-chip">
                    <i className="fa-solid fa-location-dot"></i> {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="export-info-card animate-on-scroll delay-1">
              <h2>
                <i className="fa-solid fa-certificate"></i> Certifications
              </h2>
              <div className="export-chips">
                {certifications.map((c) => (
                  <span key={c} className="export-chip">
                    <i className="fa-solid fa-circle-check"></i> {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="export-cta-band animate-on-scroll">
            <h2>Looking for a distributor or manufacturing partner in your country?</h2>
            <p>Share your requirement and our export team will respond within 24 hours.</p>
            <ExportQuoteButton label="Request A Quote" />
          </div>

        </div>
      </section>
    </main>
  );
}
