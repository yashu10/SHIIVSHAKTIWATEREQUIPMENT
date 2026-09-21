import nodemailer from "nodemailer";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Sends a mail to the company inbox using the SMTP_* environment variables. */
export async function sendCompanyMail(opts: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP environment variables are not configured.");
  }

  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Shiv Shakti Website" <${process.env.SMTP_FROM || SMTP_USER}>`,
    to: process.env.CONTACT_TO_EMAIL || "contact@shivshaktiwaterequipment.com",
    replyTo: opts.replyTo,
    subject: opts.subject.replace(/[\r\n]+/g, " "),
    text: opts.text,
    html: opts.html,
  });
}
