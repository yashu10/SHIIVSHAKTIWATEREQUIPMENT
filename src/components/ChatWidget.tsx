"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUI } from "../context/UIContext";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm the SHIIV SHAKTI AI Assistant. How can I help you with our machinery today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuoteButton, setShowQuoteButton] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { openLeadPopup } = useUI();

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check if we should show the quote button
  useEffect(() => {
    // 2-3 exchanges = 4 to 6 messages
    if (messages.length >= 5) {
      setShowQuoteButton(true);
    }
    // Check if user mentions pricing/ordering
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    if (lastUserMessage) {
      const lower = lastUserMessage.content.toLowerCase();
      if (
        lower.includes("price") || 
        lower.includes("cost") || 
        lower.includes("quote") || 
        lower.includes("order") || 
        lower.includes("buy")
      ) {
        setShowQuoteButton(true);
      }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: "Sorry, I am having trouble connecting right now. Please try again later." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I am having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "90px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "var(--primary)",
          color: "white",
          border: "none",
          boxShadow: "var(--shadow-md)",
          cursor: "pointer",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          transition: "transform 0.3s",
          transform: isOpen ? "scale(0)" : "scale(1)",
        }}
        aria-label="Open AI Chat"
      >
        <i className="fa-solid fa-robot"></i>
      </button>

      {/* Chat Panel */}
      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "30px",
          width: "350px",
          height: "500px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          zIndex: 10000,
          transition: "transform 0.3s, opacity 0.3s, pointer-events 0.3s",
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "var(--primary)",
            color: "white",
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <i className="fa-solid fa-robot"></i>
            AI Assistant
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            &times;
          </button>
        </div>

        {/* Messages Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            backgroundColor: "#f8fafc",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "var(--primary)" : "white",
                color: msg.role === "user" ? "white" : "var(--text-color)",
                padding: "10px 15px",
                borderRadius: "15px",
                borderBottomRightRadius: msg.role === "user" ? "4px" : "15px",
                borderBottomLeftRadius: msg.role === "assistant" ? "4px" : "15px",
                maxWidth: "85%",
                fontSize: "0.9rem",
                boxShadow: msg.role === "assistant" ? "0 2px 5px rgba(0,0,0,0.05)" : "none",
                border: msg.role === "assistant" ? "1px solid #e2e8f0" : "none",
                lineHeight: "1.4",
              }}
            >
              {msg.content}
            </div>
          ))}
          
          {isLoading && (
            <div
              style={{
                alignSelf: "flex-start",
                backgroundColor: "white",
                padding: "10px 15px",
                borderRadius: "15px",
                borderBottomLeftRadius: "4px",
                maxWidth: "85%",
                fontSize: "0.9rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                border: "1px solid #e2e8f0",
                display: "flex",
                gap: "5px",
              }}
            >
              <span className="dot-typing">...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Persistent Quote Button */}
        {showQuoteButton && (
          <div style={{ padding: "0 20px 10px 20px", backgroundColor: "#f8fafc" }}>
            <button
              onClick={() => openLeadPopup("quote")}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "var(--accent)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <i className="fa-solid fa-file-invoice"></i> Request A Quote
            </button>
          </div>
        )}

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            padding: "15px",
            backgroundColor: "white",
            borderTop: "1px solid var(--border)",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: "10px 15px",
              border: "1px solid #cbd5e1",
              borderRadius: "20px",
              outline: "none",
              fontSize: "0.9rem",
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: input.trim() && !isLoading ? "var(--primary)" : "#cbd5e1",
              color: "white",
              border: "none",
              cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "background-color 0.3s",
            }}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </>
  );
}
