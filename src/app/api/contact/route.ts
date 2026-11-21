import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact form -> email.
 *
 * Environment variables (see .env.example):
 *   SMTP_PASS        (required) mailbox password
 *   SMTP_USER        default: contact@shivshaktiwaterequipment.com
 *   SMTP_HOST        default: smtp.hostinger.com
 *   SMTP_PORT        default: 465  (465 => SSL/TLS, 587 => STARTTLS)
 *   CONTACT_TO_EMAIL default: SMTP_USER  (where enquiries are delivered)
 *   SMTP_FROM        default: SMTP_USER  (Hostinger only accepts the authenticated mailbox)
 */

const MAX_LEN = { name: 100, phone: 30, email: 150, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-.\s]{7,30}$/;

// Basic abuse protection: same-origin check + per-IP rate limit (in-memory, per instance)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  // --- Origin / rate limit ---------------------------------------------------
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return fail("Forbidden.", 403);
    } catch {
      return fail("Forbidden.", 403);
    }
  }
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return fail("Too many requests. Please try again later.", 429);
  }

  // --- Parse body ------------------------------------------------------------
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const field = (key: keyof typeof MAX_LEN) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  const name = field("name");
  const phone = field("phone");
  const email = field("email");
  const subject = field("subject") || "Website Enquiry";
  const message = field("message");

  // --- Validation ------------------------------------------------------------
  if (!name || !phone || !email || !message) {
    return fail("Please fill in your name, phone, email and message.", 400);
  }
  if (!EMAIL_RE.test(email)) {
    return fail("Please enter a valid email address.", 400);
  }
  if (!PHONE_RE.test(phone)) {
    return fail("Please enter a valid phone number.", 400);
  }
  const values = { name, phone, email, subject, message };
  for (const key of Object.keys(MAX_LEN) as (keyof typeof MAX_LEN)[]) {
    if (values[key].length > MAX_LEN[key]) {
      return fail(`"${key}" is too long.`, 400);
    }
  }

  // --- SMTP configuration ----------------------------------------------------
  const SMTP_USER = process.env.SMTP_USER || "contact@shivshaktiwaterequipment.com";
  const SMTP_PASS = process.env.SMTP_PASS;
  const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || 465);

  if (!SMTP_PASS) {
    console.error(
      "[contact] SMTP_PASS is not set on the server. Add SMTP_PASS (and optionally SMTP_USER, SMTP_HOST, SMTP_PORT, CONTACT_TO_EMAIL) to the app's environment variables and restart the app."
    );
    return fail("Our email service is temporarily unavailable.", 503);
  }
  if (!Number.isInteger(port) || port <= 0) {
    console.error(`[contact] SMTP_PORT is invalid: "${process.env.SMTP_PORT}"`);
    return fail("Our email service is temporarily unavailable.", 503);
  }

  const to = process.env.CONTACT_TO_EMAIL || SMTP_USER;
  const from = process.env.SMTP_FROM || SMTP_USER;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit SSL/TLS (Hostinger); 587 uses STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const text = [
    "New website enquiry",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <h2>New website enquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><b>Phone</b></td><td>${escapeHtml(phone)}</td></tr>
      <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><b>Subject</b></td><td>${escapeHtml(subject)}</td></tr>
    </table>
    <p><b>Message:</b></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  // --- Send ------------------------------------------------------------------
  try {
    await transporter.sendMail({
      from: `"Shiv Shakti Website" <${from}>`,
      to,
      replyTo: `"${name.replace(/["\r\n]/g, "")}" <${email}>`,
      subject: `[Website Enquiry] ${subject} - ${name}`.replace(/[\r\n]+/g, " "),
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const e = err as { code?: string; responseCode?: number; response?: string; command?: string; message?: string };
    // Real reason goes to the server log (never to the visitor)
    console.error(
      `[contact] Failed to send email via ${SMTP_HOST}:${port} as ${SMTP_USER} ->`,
      JSON.stringify({ code: e.code, responseCode: e.responseCode, command: e.command, response: e.response, message: e.message })
    );
    if (e.code === "EAUTH") {
      console.error("[contact] SMTP login rejected: check SMTP_USER / SMTP_PASS (mailbox password) in the server environment.");
    }
    return fail(
      "We could not send your message right now. Please try again in a few minutes.",
      502
    );
  }
}
