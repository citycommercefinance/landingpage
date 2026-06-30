import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Lead = {
  name: string;
  email: string;
  position: string;
  phone: string;
  interestedService: string;
  annualTurnover: string;
  country: string;
};

const SHEET_TAB = process.env.GOOGLE_SHEET_TAB || "Leads";

// ---------- Google Sheet ----------
async function appendToSheet(row: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_TAB}!A:H`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

// ---------- Zoho SMTP ----------
function transporter() {
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
  });
}

function mailFrom() {
  const from = process.env.MAIL_FROM || process.env.ZOHO_SMTP_USER || "";
  return `"City Commerce Finance" <${from}>`;
}

function thankYouEmail(firstName: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a1626;font-family:Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a1626;"><tr><td align="center" style="padding:40px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0f1f3d;border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden;">
    <tr><td style="height:4px;background:linear-gradient(90deg,#2E6CA5,#5DB734);font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td align="center" style="padding:44px 48px 6px;">
      <div style="font-weight:700;font-size:22px;letter-spacing:8px;color:#ffffff;">CITY</div>
      <div style="font-weight:700;font-size:11px;letter-spacing:5px;color:#9fb3cc;margin-top:5px;">COMMERCE FINANCE</div>
    </td></tr>
    <tr><td style="padding:30px 48px 0;">
      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#ffffff;">Thank you, ${firstName}.</h1>
    </td></tr>
    <tr><td style="padding:18px 48px 8px;color:#cfe0f2;font-size:15px;line-height:1.7;">
      <p style="margin:0 0 16px;">We&rsquo;ve received your enquiry, and a member of our team will be in touch shortly to discuss your financing requirement and the best route forward.</p>
      <p style="margin:0 0 16px;">If anything is time-sensitive, reach us directly at <a href="mailto:info@citycommercefinance.com" style="color:#8fdc63;text-decoration:none;">info@citycommercefinance.com</a> or <a href="tel:+97145525640" style="color:#8fdc63;text-decoration:none;">+971 4 552 5640</a>.</p>
    </td></tr>
    <tr><td style="padding:14px 48px 44px;">
      <div style="width:40px;height:1px;background:rgba(255,255,255,.25);margin:0 0 18px;font-size:0;line-height:0;">&nbsp;</div>
      <p style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:16px;">The City Commerce Finance Team</p>
      <p style="margin:4px 0 0;color:#9fb3cc;font-size:13px;">Trade &amp; Shariah-compliant finance &middot; Dubai, UAE</p>
    </td></tr>
  </table>
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;"><tr>
    <td align="center" style="padding:20px;color:#5b6b82;font-size:12px;line-height:1.6;">
      You&rsquo;re receiving this because you submitted an enquiry at <a href="https://citycommercefinance.com" style="color:#5b6b82;">citycommercefinance.com</a>.
    </td></tr></table>
</td></tr></table></body></html>`;
}

function salesNotifyEmail(lead: Lead, when: string): string {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:160px;vertical-align:top;">${k}</td><td style="padding:8px 0;color:#0f1b2d;font-size:14px;font-weight:600;">${v || "&mdash;"}</td></tr>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f8fa;font-family:Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #e7edf2;border-radius:12px;overflow:hidden;">
    <tr><td style="background:#16294F;padding:20px 28px;color:#fff;font-size:16px;font-weight:700;">New website enquiry</td></tr>
    <tr><td style="padding:24px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Received", when + " (GST)")}
        ${row("Name", lead.name)}
        ${row("Company email", lead.email)}
        ${row("Position", lead.position)}
        ${row("Phone", lead.phone)}
        ${row("Interested service", lead.interestedService)}
        ${row("Annual turnover", lead.annualTurnover)}
        ${row("Country", lead.country)}
      </table>
    </td></tr>
    <tr><td style="padding:14px 28px 26px;color:#475569;font-size:13px;line-height:1.6;">
      This lead has also been added to the leads Google Sheet. Reply to this email to respond to the prospect directly.
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}

async function sendThankYou(lead: Lead) {
  const t = transporter();
  if (!t) return;
  const firstName = lead.name.split(" ")[0] || lead.name;
  await t.sendMail({
    from: mailFrom(),
    to: lead.email,
    subject: `Thank you for contacting City Commerce Finance, ${firstName}`,
    html: thankYouEmail(firstName),
  });
}

async function sendSalesNotification(lead: Lead, when: string) {
  const t = transporter();
  if (!t) throw new Error("SMTP not configured (ZOHO_SMTP_USER / ZOHO_SMTP_PASS).");
  const to = process.env.SALES_NOTIFY_EMAIL || process.env.ZOHO_SMTP_USER || "";
  if (!to) throw new Error("No SALES_NOTIFY_EMAIL / ZOHO_SMTP_USER recipient.");
  await t.sendMail({
    from: mailFrom(),
    to,
    replyTo: `"${lead.name}" <${lead.email}>`,
    subject: `New enquiry: ${lead.name} — ${lead.interestedService}`,
    html: salesNotifyEmail(lead, when),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, position, phone, interestedService, annualTurnover, country, website, _t } = body;

    // Bot protection: honeypot must be empty, and the form must have been open >= 3s.
    if (website) return NextResponse.json({ ok: true });
    const elapsed = _t ? Date.now() - Number(_t) : Infinity;
    if (elapsed < 3000) return NextResponse.json({ ok: true });

    // Server-side validation (never trust the client).
    if (
      !name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)) ||
      !position || !phone || !interestedService || !country
    ) {
      return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
    }

    const lead: Lead = {
      name: String(name).trim(),
      email: String(email).trim(),
      position: String(position).trim(),
      phone: String(phone).trim(),
      interestedService: String(interestedService).trim(),
      annualTurnover: String(annualTurnover || "Not provided").trim(),
      country: String(country).trim(),
    };

    const when = new Date()
      .toLocaleString("en-AE", {
        timeZone: "Asia/Dubai", year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      })
      .replace(",", "");

    const results = await Promise.allSettled([
      appendToSheet([
        when, lead.name, lead.email, lead.position, lead.phone,
        lead.interestedService, lead.annualTurnover, lead.country,
      ]),
      sendSalesNotification(lead, when),
      sendThankYou(lead),
    ]);

    const labels = ["sheet", "sales-notify", "thank-you"];
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        const reason = r.reason as { message?: string };
        console.error(`[lead] ${labels[i]} failed:`, reason?.message || r.reason);
      }
    });

    // The lead is captured if it reached the sheet OR the sales inbox.
    const sheetOk = results[0].status === "fulfilled";
    const notifyOk = results[1].status === "fulfilled";
    if (!sheetOk && !notifyOk) {
      return NextResponse.json(
        { error: "Could not record your enquiry. Please email info@citycommercefinance.com." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
