import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
  description: "Privacy Policy for SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. regarding B2B lead generation and customer data handling.",
};

export default function PrivacyPolicy() {
  return (
    <main>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li>Privacy Policy</li>
          </ul>
          <h1>Privacy Policy</h1>
          <p>SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.</p>
        </div>
      </section>
      <section className="section-padding bg-light">
        <div className="container" style={{ maxWidth: "800px", background: "#fff", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
          <h2>1. Information We Collect</h2>
          <p>We may collect personal information such as your name, contact details, and company information when you interact with us or request a quote for our machinery.</p>
          <br />
          <h2>2. Use of Information</h2>
          <p>Your information is used to process inquiries, provide customer support, and send updates regarding our industrial products and services.</p>
          <br />
          <h2>3. Data Protection</h2>
          <p>We implement industry-standard security measures to protect your personal information from unauthorized access.</p>
          <br />
          <h2>4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at shivshakti2932@yahoo.com.</p>
        </div>
      </section>
    </main>
  );
}
