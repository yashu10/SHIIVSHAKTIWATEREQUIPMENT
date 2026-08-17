import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
  description: "Terms and Conditions governing the use of the SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. B2B portal.",
};

export default function TermsAndConditions() {
  return (
    <main>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li>Terms & Conditions</li>
          </ul>
          <h1>Terms & Conditions</h1>
          <p>SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.</p>
        </div>
      </section>
      <section className="section-padding bg-light">
        <div className="container" style={{ maxWidth: "800px", background: "#fff", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing our website and inquiring about our machinery, you agree to these Terms and Conditions.</p>
          <br />
          <h2>2. Products and Quotes</h2>
          <p>All machinery specifications and quotes provided are subject to our final confirmation. We reserve the right to modify technical specifications as part of continuous product improvement.</p>
          <br />
          <h2>3. Intellectual Property</h2>
          <p>All content, designs, and machinery specifications on this website are the intellectual property of SHIIV SHAKTI WATER EQUIPMENT PVT. LTD..</p>
          <br />
          <h2>4. Limitation of Liability</h2>
          <p>SHIIV SHAKTI WATER EQUIPMENT PVT. LTD. shall not be liable for any indirect or consequential loss arising from the use of our website or initial consultation.</p>
        </div>
      </section>
    </main>
  );
}
