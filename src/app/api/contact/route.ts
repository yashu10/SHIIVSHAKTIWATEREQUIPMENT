import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact form -> Web3Forms (https://web3forms.com).
 *
 * Environment variable (see .env.example):
 *   WEB3FORMS_KEY  (required) your Web3Forms access key. Server-side only, never sent to the browser.
 */

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
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

  // --- Web3Forms key ---------------------------------------------------------
  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    console.error(
      "[contact] WEB3FORMS_KEY is not set in the running app. Add WEB3FORMS_KEY in the server environment variables (exact name, no quotes/spaces) and restart the app."
    );
    return fail("Our contact service is temporarily unavailable.", 503);
  }

  // --- Send ------------------------------------------------------------------
  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email, // Web3Forms uses this as the Reply-To address
        phone,
        subject: `[Website Enquiry] ${subject} - ${name}`.replace(/[\r\n]+/g, " "),
        message,
        from_name: "Shiv Shakti Website",
      }),
      signal: AbortSignal.timeout(15_000),
    });

    const raw = await res.text();
    let data: { success?: boolean; message?: string } = {};
    try {
      data = JSON.parse(raw);
    } catch {
      /* non-JSON response, logged below */
    }

    if (!res.ok || data.success !== true) {
      const detail = (data.message || raw || "").replace(accessKey, "***").slice(0, 500);
      console.error(`[contact] Web3Forms rejected the submission: HTTP ${res.status} - ${detail}`);
      return fail("We could not send your message right now. Please try again in a few minutes.", 502);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const e = err as { name?: string; message?: string };
    const msg = (e.message || "").replace(accessKey, "***");
    console.error(`[contact] Could not reach Web3Forms (${e.name || "Error"}): ${msg}`);
    return fail("We could not send your message right now. Please try again in a few minutes.", 502);
  }
}
