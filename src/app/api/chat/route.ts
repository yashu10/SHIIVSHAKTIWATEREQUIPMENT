import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CHAT_SYSTEM_PROMPT } from "../../../lib/chatKnowledge";
import { escapeHtml, sendCompanyMail } from "../../../lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.CHAT_MODEL || "claude-opus-5";
const MAX_MESSAGES = 16;
const MAX_MESSAGE_LEN = 1000;
const MAX_TOOL_ROUNDS = 3;

// --- Abuse protection (in-memory; resets when the server restarts) ---------
const PER_MINUTE = 6;
const PER_HOUR = 40;
const DAILY_CAP = Number(process.env.CHAT_DAILY_LIMIT || 500);
const hits = new Map<string, number[]>();
let dayKey = "";
let dayCount = 0;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    dayCount = 0;
  }
  if (dayCount >= DAILY_CAP) return true;

  const recent = (hits.get(ip) || []).filter((t) => now - t < 3_600_000);
  const lastMinute = recent.filter((t) => now - t < 60_000).length;
  if (lastMinute >= PER_MINUTE || recent.length >= PER_HOUR) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  dayCount += 1;

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= 3_600_000)) hits.delete(key);
    }
  }
  return false;
}

// --- Lead tool -------------------------------------------------------------
const SAVE_LEAD_TOOL: Anthropic.Tool = {
  name: "save_lead",
  description:
    "Save a sales lead and notify the Shiv Shakti team. Call it once, only after the visitor has shown buying interest AND given their name and at least one of phone or email.",
  input_schema: {
    type: "object",
    properties: {
      name: { type: "string", description: "Name of the visitor" },
      phone: { type: "string", description: "Phone / WhatsApp number, with country code if given" },
      email: { type: "string", description: "Email address" },
      interest: { type: "string", description: "Machine or plant they are interested in" },
      notes: {
        type: "string",
        description: "Requirement details: capacity (BPH), bottle size, country, timeline, etc.",
      },
    },
    required: ["name", "interest"],
  },
};

type ChatMessage = { role: "user" | "assistant"; content: string };

function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function saveLead(input: Record<string, unknown>, history: ChatMessage[]) {
  const name = clip(input.name, 100);
  const phone = clip(input.phone, 30);
  const email = clip(input.email, 150);
  const interest = clip(input.interest, 200);
  const notes = clip(input.notes, 1000);

  if (!name || (!phone && !email)) {
    return {
      ok: false,
      message: "Missing details: need a name and at least a phone number or email. Ask the visitor for them.",
    };
  }

  const transcript = history
    .slice(-10)
    .map((m) => `${m.role === "user" ? "Visitor" : "Bot"}: ${m.content}`)
    .join("\n");

  await sendCompanyMail({
    subject: `[Chatbot Lead] ${interest || "Enquiry"} - ${name}`,
    replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined,
    text: [
      "New lead from the website chatbot",
      "",
      `Name: ${name}`,
      `Phone: ${phone || "-"}`,
      `Email: ${email || "-"}`,
      `Interested in: ${interest || "-"}`,
      `Notes: ${notes || "-"}`,
      "",
      "Recent conversation:",
      transcript,
    ].join("\n"),
    html: `
      <h2>New lead from the website chatbot</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><b>Phone</b></td><td>${escapeHtml(phone || "-")}</td></tr>
        <tr><td><b>Email</b></td><td>${escapeHtml(email || "-")}</td></tr>
        <tr><td><b>Interested in</b></td><td>${escapeHtml(interest || "-")}</td></tr>
        <tr><td><b>Notes</b></td><td>${escapeHtml(notes || "-")}</td></tr>
      </table>
      <p><b>Recent conversation:</b></p>
      <p style="white-space:pre-wrap">${escapeHtml(transcript)}</p>`,
  });

  return {
    ok: true,
    message: "Lead saved and the team has been notified. Tell the visitor the team will contact them shortly.",
  };
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Chat API: ANTHROPIC_API_KEY is not configured.");
    return NextResponse.json({ error: "Chat is not available right now." }, { status: 503 });
  }

  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a moment or call us on +91 97126 66160." },
      { status: 429 }
    );
  }

  let body: { messages?: unknown; leadSaved?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!Array.isArray(body.messages)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const history: ChatMessage[] = body.messages
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string" &&
        (m as ChatMessage).content.trim().length > 0
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LEN) }))
    .slice(-MAX_MESSAGES);

  while (history.length && history[0].role !== "user") history.shift();
  if (!history.length || history[history.length - 1].role !== "user") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const alreadySaved = body.leadSaved === true;
  const client = new Anthropic();
  const messages: Anthropic.MessageParam[] = history.map((m) => ({ role: m.role, content: m.content }));
  let leadSaved = alreadySaved;

  try {
    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: CHAT_SYSTEM_PROMPT,
        messages,
        ...(alreadySaved ? {} : { tools: [SAVE_LEAD_TOOL] }),
        ...(MODEL.includes("haiku") ? {} : { output_config: { effort: "low" as const } }),
      });

      if (response.stop_reason === "tool_use") {
        messages.push({ role: "assistant", content: response.content });
        const results: Anthropic.ToolResultBlockParam[] = [];
        for (const block of response.content) {
          if (block.type !== "tool_use") continue;
          if (block.name === "save_lead" && !leadSaved) {
            try {
              const out = await saveLead(block.input as Record<string, unknown>, history);
              if (out.ok) leadSaved = true;
              results.push({ type: "tool_result", tool_use_id: block.id, content: out.message, is_error: !out.ok });
            } catch (err) {
              console.error("Chat API: failed to save lead", err);
              results.push({
                type: "tool_result",
                tool_use_id: block.id,
                content:
                  "Could not save the lead. Ask the visitor to call +91 97126 66160 or email contact@shivshaktiwaterequipment.com.",
                is_error: true,
              });
            }
          } else {
            results.push({ type: "tool_result", tool_use_id: block.id, content: "Already saved.", is_error: true });
          }
        }
        messages.push({ role: "user", content: results });
        continue;
      }

      const reply = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();

      return NextResponse.json({
        reply: reply || "Sorry, I could not answer that. Please call us on +91 97126 66160.",
        leadSaved,
      });
    }

    return NextResponse.json({
      reply: "Sorry, something went wrong. Please call us on +91 97126 66160.",
      leadSaved,
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError || err instanceof Anthropic.APIConnectionError) {
      console.error("Chat API: upstream unavailable", err);
      return NextResponse.json({ error: "Chat is busy right now. Please try again shortly." }, { status: 503 });
    }
    console.error("Chat API: request failed", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
