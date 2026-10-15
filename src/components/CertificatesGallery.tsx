"use client";

import React, { useState } from "react";

const certificates = [
  {
    src: "/assets/images/certificates/cor.jpg",
    alt: "Certificate of Registration - SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    title: "Certificate of Registration",
  },
  {
    src: "/assets/images/certificates/coc.jpg",
    alt: "Certificate of Compliance - SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    title: "Certificate of Compliance",
  },
  {
    src: "/assets/images/certificates/cedraft.jpg",
    alt: "CE Certificate - SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    title: "CE Certificate",
  },
  {
    src: "/assets/images/certificates/qmsdraft.jpg",
    alt: "ISO 9001 QMS Certificate - SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
    title: "ISO 9001 QMS Certificate",
  },
];

export default function CertificatesGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="cert-grid">
        {certificates.map((cert, index) => (
          <div 
            className="cert-card" 
            key={index} 
            onClick={() => setSelectedImage(cert.src)} 
            style={{ cursor: 'pointer' }}
          >
            <div className="img-wrapper">
              <img
                src={cert.src}
                alt={cert.alt}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </div>
            <div className="cert-info" style={{ marginTop: "15px", textAlign: "center" }}>
              <h4>{cert.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="lightbox-overlay"
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '35px',
                cursor: 'pointer',
                padding: '0 10px',
                lineHeight: 1
              }}
              title="Close"
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Expanded Certificate" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '85vh', 
                objectFit: 'contain', 
                borderRadius: '8px',
                boxShadow: '0 5px 25px rgba(0,0,0,0.5)'
              }} 
            />
          </div>
        </div>
      )}
    </>
  );
}
