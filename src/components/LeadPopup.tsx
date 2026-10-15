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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  if (!isLeadPopupOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");

    // If it was a brochure request, open the brochure immediately to prevent popup blockers
    if (leadPopupType === "brochure") {
      window.open(encodeURI("/assets/images/Shiv Shakti Broucher.pdf"), "_blank");
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.mobile,
          email: formData.email,
          subject: leadPopupType === "quote" ? "Quote Request" : "Brochure Download",
          message: `Requirement: ${formData.requirement}`,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFeedback("Message sent! We'll get back to you soon.");
      setFormData({ name: "", mobile: "", email: "", requirement: "" });
      setTimeout(() => {
        setStatus("idle");
        setFeedback("");
        closeLeadPopup();
      }, 2500);
    } catch (err) {
      setStatus("error");
      setFeedback(
        (err instanceof Error && err.message ? err.message : "Could not send your request.") +
          " Please try again or call us on +91 97126 66160."
      );
    }
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
            
            {status === "success" ? (
              <div role="status" style={{ textAlign: "center", padding: "40px 0" }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: "3rem", color: "green", marginBottom: "15px" }}></i>
                <h3>{feedback}</h3>
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
                {status === "error" && (
                  <p role="alert" style={{ color: "#a12626", fontWeight: 600, marginBottom: "12px" }}>
                    {feedback}
                  </p>
                )}
                <button type="submit" className="btn btn-orange" disabled={status === "sending"} style={{ opacity: status === "sending" ? 0.7 : 1 }}>
                  {status === "sending" ? "SENDING..." : isQuote ? "REQUEST QUOTE" : "DOWNLOAD BROCHURE"}
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
