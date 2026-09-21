"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// The chat panel (UI + logic) is only downloaded the first time it is opened.
const loadPanel = () => import("./ChatPanel");
const ChatPanel = dynamic(loadPanel, { ssr: false });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatPanel onClose={() => setOpen(false)} />}
      <button
        className={`chat-fab${open ? " chat-fab-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => {
          loadPanel();
        }}
        onFocus={() => {
          loadPanel();
        }}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
      >
        <i className={`fa-solid ${open ? "fa-xmark" : "fa-comments"}`}></i>
      </button>
    </>
  );
}
