"use client";

import React, { useState } from "react";
import Link from "next/link";

export function HomeFaqAccordion() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const faqs = [
    {
      q: "What types of filling machines do you manufacture?",
      a: "We manufacture a comprehensive range of filling machines including Water Filling Machines, Juice Filling Machines, Soda Filling Machines, Beer Filling Machines, and Oil Filling Machines. All our machines are designed with food-grade stainless steel (SS304/SS316) and comply with international hygiene and safety standards.",
      icon: "fa-industry",
    },
    {
      q: "Do you provide turnkey project solutions?",
      a: "Yes! We specialize in complete turnkey projects for packaged drinking water plants and beverage production lines. This includes everything from R.O. plant installation, blow moulding, filling & capping machines, labelling, batch coding, shrink wrapping, to final packaging — all under one roof.",
      icon: "fa-gears",
    },
    {
      q: "Do you export machinery internationally?",
      a: "Absolutely. We have successfully exported our machinery to over 25+ countries across Africa, the Middle East, Southeast Asia, and South America. Our machines are designed to meet international quality standards with CE marking and ISO certification.",
      icon: "fa-globe",
    },
    {
      q: "What certifications does your company hold?",
      a: "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. is an ISO 9001:2015 certified company. Our products meet BIS (Bureau of Indian Standards) compliance, and we maintain rigorous quality checks through our in-house Chemical and Micro-Biology laboratories.",
      icon: "fa-certificate",
    },
    {
      q: "What kind of after-sales support do you offer?",
      a: "We provide 24/7 technical support, on-site installation assistance, operator training, and a comprehensive warranty on all our machines. Our dedicated service team ensures minimal downtime with prompt spare parts delivery and remote troubleshooting support.",
      icon: "fa-headset",
    },
    {
      q: "What is the production capacity of your machines?",
      a: "Our filling machines are available in a wide range of capacities — from 1,000 bottles per hour (BPH) for small-scale operations to 12,000+ BPH for large-scale industrial production. We customize the capacity based on your specific requirements and budget.",
      icon: "fa-bolt",
    },
    {
      q: "What is the typical delivery and installation timeline?",
      a: "Standard delivery timelines range from 30 to 60 days depending on machine complexity and customization requirements. Installation and commissioning typically take 5-10 days on-site, including full operator training and trial runs.",
      icon: "fa-truck-fast",
    },
    {
      q: "How can I get a quotation for my project?",
      a: "Simply click the 'Request A Quote' button or call us directly at +91 9712666160. Share your production requirements, bottle sizes, and desired capacity — our engineering team will provide a detailed proposal with competitive pricing within 24 hours.",
      icon: "fa-hand-holding-dollar",
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="faq-wrapper animate-on-scroll">
      {/* Left Column */}
      <div className="faq-col">
        {faqs.slice(0, 4).map((faq, idx) => (
          <div key={idx} className={`faq-item ${activeFaq === idx ? "active" : ""}`} id={`faq-${idx + 1}`}>
            <button
              className="faq-question"
              aria-expanded={activeFaq === idx}
              onClick={() => toggleFaq(idx)}
            >
              <span className="faq-icon">
                <i className={`fa-solid ${faq.icon}`}></i>
              </span>
              <span>{faq.q}</span>
              <span className="faq-toggle">
                <span className="faq-plus"></span>
              </span>
            </button>
            <div
              className="faq-answer"
              id={`faq-answer-${idx + 1}`}
              style={{
                maxHeight: activeFaq === idx ? "200px" : "0px",
                opacity: activeFaq === idx ? 1 : 0,
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column */}
      <div className="faq-col">
        {faqs.slice(4, 8).map((faq, idx) => {
          const actualIdx = idx + 4;
          return (
            <div key={actualIdx} className={`faq-item ${activeFaq === actualIdx ? "active" : ""}`} id={`faq-${actualIdx + 1}`}>
              <button
                className="faq-question"
                aria-expanded={activeFaq === actualIdx}
                onClick={() => toggleFaq(actualIdx)}
              >
                <span className="faq-icon">
                  <i className={`fa-solid ${faq.icon}`}></i>
                </span>
                <span>{faq.q}</span>
                <span className="faq-toggle">
                  <span className="faq-plus"></span>
                </span>
              </button>
              <div
                className="faq-answer"
                id={`faq-answer-${actualIdx + 1}`}
                style={{
                  maxHeight: activeFaq === actualIdx ? "200px" : "0px",
                  opacity: activeFaq === actualIdx ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
