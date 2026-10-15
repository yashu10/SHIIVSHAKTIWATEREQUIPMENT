"use client";

import React from "react";
import { useUI } from "../context/UIContext";

export default function ExportQuoteButton({ label }: { label: string }) {
  const { openLeadPopup } = useUI();
  return (
    <button
      className="btn btn-primary"
      onClick={() => openLeadPopup("quote")}
      style={{ cursor: "pointer" }}
    >
      {label}
    </button>
  );
}
