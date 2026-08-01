import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About Us | SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
  description: "Established in 1998, SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. is one of Gujarat's leading manufacturers of mineral water bottling equipment with 25+ years combined experience.",
};

export default function About() {
  const coreValues = [
    { icon: "fa-award", title: "Quality Excellence" },
    { icon: "fa-handshake-angle", title: "Customer Commitment" },
    { icon: "fa-lightbulb", title: "Innovation & Technology" },
    { icon: "fa-leaf", title: "Environmental Responsibility" },
    { icon: "fa-shield-halved", title: "Integrity & Trust" },
    { icon: "fa-arrow-trend-up", title: "Continuous Improvement" },
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="page-header pattern-bg active">
        <div className="container">
          <h1 className="page-title fade-up">ABOUT <span className="text-gradient">SHIV SHAKTI</span></h1>
          <p className="page-subtitle fade-up delay-1">Pioneering mineral water bottling and treatment solutions globally.</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-light">
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          {/* Shiv Shakti Group Of Company Structure */}
          <div className="group-section-wrapper animate-on-scroll">
            <div className="group-chart-box">
              <h2 className="group-chart-title">
                SHIV SHAKTI <span>GROUP OF COMPANY</span>
              </h2>
              <div className="org-tree">
                <div className="org-connector-main"></div>

                <div className="org-row-2">
                  <div className="org-box-wrap left-wrap">
                    <div className="org-connector-drop"></div>
                    <div className="org-box">
                      <i className="fa-solid fa-screwdriver-wrench"></i>
                      <span>SHIV SHAKTI ENGG. WORKS</span>
                    </div>
                  </div>
                  <div className="org-box-wrap right-wrap">
                    <div className="org-connector-drop"></div>
                    <div className="org-box">
                      <i className="fa-solid fa-industry"></i>
                      <span>SHIV SHAKTI ENTERPRISE</span>
                    </div>
                  </div>
                </div>

                <div className="org-row-3">
                  <div className="org-connector-drop-long"></div>
                  <div className="org-box highlight-box">
                    <i className="fa-solid fa-droplet"></i>
                    <span>SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group-stats-box">
              <div className="stat-item">
                <div className="stat-icon-circle">
                  <i className="fa-regular fa-calendar-check"></i>
                </div>
                <div className="stat-text">
                  <h3 className="gradient-text">1998</h3>
                  <p>Established In</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon-circle">
                  <i className="fa-solid fa-award"></i>
                </div>
                <div className="stat-text">
                  <h3 className="gradient-text">25+</h3>
                  <p>Years of Experience</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon-circle">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="stat-text">
                  <h3 className="gradient-text">1500+</h3>
                  <p>Happy Clients</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-content-section animate-on-scroll">
            <h2>
              <i className="fa-solid fa-clock-rotate-left"></i> Company History
            </h2>
            <p>
              Established in 1998, SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. has grown to become one of Gujarat&apos;s
              leading manufacturers of mineral water bottling equipment. With over 25+ years of combined industry
              experience, our team has successfully delivered 1000+ projects across 15+ countries.
            </p>
          </div>

          <div className="mission-vision-wrapper">
            <div className="mv-card animate-on-scroll">
              <h2>
                <i className="fa-solid fa-bullseye"></i> Our Mission
              </h2>
              <p>
                To provide world-class, innovative bottling and water treatment solutions that exceed customer
                expectations while maintaining the highest standards of quality and environmental responsibility.
              </p>
            </div>
            <div className="mv-card animate-on-scroll delay-1">
              <h2>
                <i className="fa-solid fa-eye"></i> Our Vision
              </h2>
              <p>
                To be the most trusted name in mineral water filling machinery globally, known for reliability,
                innovation, and customer satisfaction.
              </p>
            </div>
          </div>

          <div className="about-content-section animate-on-scroll">
            <h2>
              <i className="fa-solid fa-star"></i> Our Core Values
            </h2>
            <div className="values-grid">
              {coreValues.map((val, idx) => (
                <div key={idx} className="value-card">
                  <i className={`fa-solid ${val.icon}`}></i>
                  <span>{val.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-content-section animate-on-scroll">
            <h2>
              <i className="fa-solid fa-industry"></i> Infrastructure
            </h2>
            <p>
              Our state-of-the-art manufacturing facility in Ahmedabad spans 15,000 square feet, equipped with
              modern CNC machines, testing laboratories, and assembly lines. We maintain strict quality control at
              every stage of production.
            </p>
          </div>

          <div className="about-content-section animate-on-scroll">
            <h2>
              <i className="fa-solid fa-users-gear"></i> Our Team
            </h2>
            <p>
              Led by industry veterans with decades of experience, our team includes skilled engineers,
              technicians, quality control experts, and customer support specialists dedicated to your success.
            </p>
          </div>

          <div className="about-content-section animate-on-scroll">
            <h2>
              <i className="fa-solid fa-certificate"></i> Our Certifications
            </h2>
            <p>
              We maintain strict compliance with international manufacturing and quality standards. As an ISO & CE
              Certified manufacturer, our corporate mandate focuses on delivering excellence, ensuring consistent
              growth, and maintaining strong core values across all operations.
            </p>
            <div className="cert-grid">
              <div className="cert-card">
                <div className="img-wrapper">
                  <img
                    src="/assets/images/certificates/cor.jpg"
                    alt="Certificate of Registration - SHIIV SHAKTI WATER EQUIPMENT PVT. LTD."
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                </div>
                <div className="cert-info" style={{ marginTop: "15px", textAlign: "center" }}>
                  <h4>Certificate of Registration</h4>
                </div>
              </div>
              <div className="cert-card">
                <div className="img-wrapper">
                  <img
                    src="/assets/images/certificates/coc.jpg"
                    alt="Certificate of Compliance - SHIIV SHAKTI WATER EQUIPMENT PVT. LTD."
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                </div>
                <div className="cert-info" style={{ marginTop: "15px", textAlign: "center" }}>
                  <h4>Certificate of Compliance</h4>
                </div>
              </div>
              <div className="cert-card">
                <div className="img-wrapper">
                  <img
                    src="/assets/images/certificates/CE-DRAFT.jpg"
                    alt="CE Certificate - SHIIV SHAKTI WATER EQUIPMENT PVT. LTD."
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                </div>
                <div className="cert-info" style={{ marginTop: "15px", textAlign: "center" }}>
                  <h4>CE Certificate</h4>
                </div>
              </div>
              <div className="cert-card">
                <div className="img-wrapper">
                  <img
                    src="/assets/images/certificates/qms-draft.jpg"
                    alt="ISO 9001 QMS Certificate - SHIIV SHAKTI WATER EQUIPMENT PVT. LTD."
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                </div>
                <div className="cert-info" style={{ marginTop: "15px", textAlign: "center" }}>
                  <h4>ISO 9001 QMS Certificate</h4>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
