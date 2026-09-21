"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "ss-chat-v1";
const WELCOME: Msg = {
  role: "assistant",
  content: "Hi! I'm the Shiv Shakti assistant. Ask me about our R.O. plants, water filling machines, blow moulding or any bottling equipment.",
};
const SUGGESTIONS = ["I need a water filling machine", "R.O. plant for 2000 LPH?", "Do you export to Africa?"];

function renderText(text: string) {
  const parts = text.split(/(https?:\/\/[^\s)]+|\/products\/[a-z0-9-]+\/?)/gi);
  return parts.map((part, i) => {
    if (/^\/products\//i.test(part)) {
      return (
        <Link key={i} href={part} className="chat-link">
          {part}
        </Link>
      );
    }
    if (/^https?:\/\//i.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="chat-link">
          {part}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadSaved, setLeadSaved] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (Array.isArray(data.messages) && data.messages.length) setMessages(data.messages);
        if (data.leadSaved) setLeadSaved(true);
      }
    } catch {
      /* storage unavailable - start fresh */
    }
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, leadSaved }));
    } catch {
      /* ignore */
    }
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, leadSaved, loading]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-16), leadSaved }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setMessages([...next, { role: "assistant", content: data.reply }]);
      if (data.leadSaved) setLeadSaved(true);
    } catch (err) {
      setError(
        (err instanceof Error ? err.message : "Something went wrong.") +
          " You can also call us on +91 97126 66160."
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="chat-panel" role="dialog" aria-label="Chat with Shiv Shakti assistant">
      <div className="chat-header">
        <div className="chat-header-title">
          <i className="fa-solid fa-droplet"></i>
          <div>
            <strong>Shiv Shakti Assistant</strong>
            <span>Ask about machines, quotes &amp; export</span>
          </div>
        </div>
        <button className="chat-close" onClick={onClose} aria-label="Close chat">
          &times;
        </button>
      </div>

      <div className="chat-messages" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role === "user" ? "chat-msg-user" : "chat-msg-bot"}`}>
            {renderText(m.content)}
          </div>
        ))}

        {messages.length === 1 && !loading && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="chat-msg chat-msg-bot chat-typing" aria-label="Assistant is typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {error && (
          <div className="chat-error" role="alert">
            {error}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        className="chat-input-row"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          maxLength={1000}
          aria-label="Your message"
        />
        <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>

      <div className="chat-footer">
        <i className="fa-solid fa-robot"></i> Powered by AI &middot; may make mistakes, our team confirms all quotes
      </div>
    </div>
  );
}
