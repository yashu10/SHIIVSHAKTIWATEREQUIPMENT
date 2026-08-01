"use client";

import React, { useState } from "react";
import { useUI } from "../context/UIContext";

export const LeadPopup: React.FC = () => {
  const { isLeadPopupOpen, leadPopupType, closeLeadPopup } = useUI();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    requirement: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isLeadPopupOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // If it was a brochure request, open the brochure immediately to prevent popup blockers
    if (leadPopupType === "brochure") {
      window.open(encodeURI("/assets/images/Shiv Shakti Broucher.pdf"), "_blank");
    }

    const message = `Hello, I am interested in ${leadPopupType === "quote" ? "a Quote" : "downloading the Brochure"}.\n\nName: ${formData.name}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\nRequirement: ${formData.requirement}`;
    const whatsappUrl = `https://wa.me/919712666160?text=${encodeURIComponent(message)}`;
    
    // Reset form after a brief period and close popup
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", mobile: "", email: "", requirement: "" });
      closeLeadPopup();
      
      window.open(whatsappUrl, "_blank");
    }, 1000);
  };

  const isQuote = leadPopupType === "quote";

  return (
    <div
      className="popup-overlay show"
      id="leadPopup"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLeadPopup();
      }}
    >
      <div className="popup-content">
        <button className="popup-close" aria-label="Close" onClick={closeLeadPopup}>
          &times;
        </button>
        <div className="popup-body">
          <div className="popup-form-side">
            <p className="popup-subtitle">
              {isQuote ? "INTERESTED IN OUR MACHINERY?" : "GET MORE DETAILS ABOUT OUR PRODUCT?"}
            </p>
            <h2 className="popup-title">
              {isQuote ? (
                <>Fill Up This Form &<br />Request a Quote :</>
              ) : (
                <>Fill Up This Form &<br />Download Brochure :</>
              )}
            </h2>
            
            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: "3rem", color: "green", marginBottom: "15px" }}></i>
                <h3>Processing your request...</h3>
              </div>
            ) : (
              <form className="lead-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                  style={{
                    padding: "12px 15px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    fontFamily: "inherit",
                    fontSize: "0.95rem",
                    width: "100%",
                    transition: "all 0.3s ease",
                    marginBottom: "15px",
                    background: "white",
                  }}
                >
                  <option value="" disabled>
                    Select Product Requirement
                  </option>
                  <option value="Water Filling Machine">Water Filling Machine</option>
                  <option value="Juice Filling Machine">Juice Filling Machine</option>
                  <option value="Beer Filling Machine">Beer Filling Machine</option>
                  <option value="Automatic Sticker Labeling Machine">Automatic Sticker Labeling Machine</option>
                  <option value="Fully Automatic Shrink Wrapping Machine">Fully Automatic Shrink Wrapping Machine</option>
                  <option value="Semi Automatic Shrink Wrapping Machine">Semi Automatic Shrink Wrapping Machine</option>
                  <option value="Industrial S.S R.O Plant">Industrial S.S R.O Plant</option>
                  <option value="Fully Auto Blow Moulding Machine">Fully Auto Blow Moulding Machine</option>
                  <option value="Semi Auto Blow Moulding Machine">Semi Auto Blow Moulding Machine</option>
                  <option value="Inkjet Batch Coding">Inkjet Batch Coding</option>
                  <option value="Other">Other Requirement</option>
                </select>
                <button type="submit" className="btn btn-orange">
                  {isQuote ? "REQUEST QUOTE" : "DOWNLOAD BROCHURE"}
                </button>
              </form>
            )}
          </div>
          <div
            className="popup-image-side"
            style={{
              backgroundImage: "url('/assets/images/hero_machine_1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
