import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LEN = { name: 100, phone: 30, email: 150, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const field = (key: keyof typeof MAX_LEN) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  const name = field("name");
  const phone = field("phone");
  const email = field("email");
  const subject = field("subject");
  const message = field("message");

  if (!name || !phone || !email || !subject || !message) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const values = { name, phone, email, subject, message };
  for (const key of Object.keys(MAX_LEN) as (keyof typeof MAX_LEN)[]) {
    if (values[key].length > MAX_LEN[key]) {
      return NextResponse.json({ error: `"${key}" is too long.` }, { status: 400 });
    }
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact API: SMTP environment variables are not configured.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = process.env.CONTACT_TO_EMAIL || "contact@shivshaktiwaterequipment.com";
  const from = process.env.SMTP_FROM || SMTP_USER;

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
    console.error("Contact API: failed to send email", err);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
