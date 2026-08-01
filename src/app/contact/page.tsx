"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    const message = `Hello, I have an inquiry.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/919712666160?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      window.open(whatsappUrl, "_blank");
    }, 1200);
  };

  return (
    <main>
      {/* Page Header */}
      <section className="page-header pattern-bg active">
        <div className="container">
          <h1 className="page-title fade-up">CONTACT <span className="text-gradient">US</span></h1>
          <p className="page-subtitle fade-up delay-1">We are here to assist with your industrial machinery needs.</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-light">
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          {/* Contact Info Grid */}
          <div className="contact-info-grid animate-on-scroll">
            <div className="contact-info-card">
              <i className="fa-solid fa-building"></i>
              <h3>Office & Factory Address</h3>
              <p>
                Plot No. B/5, Revabhai Industrial Estate, Part-2,
                <br />
                Opp. Ishwarkrupa Weighbridge,
                <br />
                CTM, Ahmedabad - 380026.
              </p>
            </div>
            <div className="contact-info-card">
              <i className="fa-solid fa-envelope"></i>
              <h3>Email Us</h3>
              <p>
                contact@shivshaktiwaterequipment.com
                <br />
                info@shivshaktiwaterequipment.com
              </p>
            </div>
            <div className="contact-info-card">
              <i className="fa-solid fa-address-book"></i>
              <h3>Contact Info</h3>
              <p>
                <i className="fa-solid fa-phone" style={{ fontSize: "0.9rem", marginRight: "5px", color: "var(--primary)" }}></i>
                +91 97126 66160
                <br />
                <i className="fa-solid fa-phone" style={{ fontSize: "0.9rem", marginRight: "5px", color: "var(--primary)" }}></i>
                +91 84900 87773
              </p>
              <p style={{ marginTop: "10px" }}>
                <i className="fa-solid fa-envelope" style={{ fontSize: "0.9rem", marginRight: "5px", color: "var(--primary)" }}></i>
                contact@shivshaktiwaterequipment.com
              </p>
            </div>
          </div>

          {/* Custom Form Section */}
          <div className="contact-form-section animate-on-scroll" style={{ position: "relative" }}>
            <p className="contact-subtitle">SEND US A MESSAGE</p>
            <h2 className="contact-title">Get in touch with us</h2>
            <p className="contact-desc">
              Whether you have a question about our products, services, or pricing, you can ask us. Our team is ready to support you!
            </p>

            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: "3rem", color: "green", marginBottom: "15px" }}></i>
                <h3>Sending Message...</h3>
              </div>
            ) : (
              <form className="custom-contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nameInput">Name</label>
                    <input
                      id="nameInput"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneInput">Phone</label>
                    <input
                      id="phoneInput"
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="emailInput">Email</label>
                    <input
                      id="emailInput"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subjectInput">Subject</label>
                    <input
                      id="subjectInput"
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="messageInput">Message</label>
                  <textarea
                    id="messageInput"
                    placeholder="Message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-orange-form" style={{ border: "none", cursor: "pointer" }}>
                  Submit Message <i className="fa-regular fa-paper-plane" style={{ marginLeft: "5px" }}></i>
                </button>
              </form>
            )}
          </div>

          {/* Google Map */}
          <div className="map-container-iframe animate-on-scroll" style={{ position: "relative", marginTop: "40px" }}>
            {/* Overlay directions shortcut link */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=B-5,+Revabhai+Industrial+Estate,+Opp.+Ishwar+Krupa+Weight+Bridge,+CTM,+Ahmedabad+-+380026"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 10,
                cursor: "pointer",
                display: "block",
              }}
              title="Click to get directions"
            ></a>
            <iframe
              src="https://maps.google.com/maps?q=B-5,%20Revabhai%20Industrial%20Estate,%20Opp.%20Ishwar%20Krupa%20Weight%20Bridge,%20CTM,%20Ahmedabad%20-%20380026&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: "12px", boxShadow: "var(--shadow-sm)", pointerEvents: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>
    </main>
  );
}
