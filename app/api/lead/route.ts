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
    // RAW (not USER_ENTERED) so values like "+971 …" aren't parsed as formulas,
    // and to prevent spreadsheet formula/CSV injection from untrusted form input.
    valueInputOption: "RAW",
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
  const logo = "https://citycommercefinance.com/brand/email-logo.png";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef3f9;font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef3f9;"><tr><td align="center" style="padding:40px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e7edf2;border-radius:16px;overflow:hidden;box-shadow:0 18px 40px rgba(22,41,79,.08);">
    <tr><td style="height:4px;background:linear-gradient(90deg,#2E6CA5,#5DB734);font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td align="center" style="padding:38px 48px 4px;">
      <img src="${logo}" alt="City Commerce Finance" width="200" style="display:block;border:0;outline:0;width:200px;max-width:60%;height:auto;">
    </td></tr>
    <tr><td style="padding:20px 48px 0;">
      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#16294F;">Thank you, ${firstName}.</h1>
    </td></tr>
    <tr><td style="padding:16px 48px 8px;color:#475569;font-size:15px;line-height:1.7;">
      <p style="margin:0 0 16px;">We&rsquo;ve received your enquiry, and a member of our team will be in touch shortly to discuss your financing requirement and the best route forward.</p>
      <p style="margin:0 0 16px;">If anything is time-sensitive, reach us directly at <a href="mailto:info@citycommercefinance.com" style="color:#2C7A3D;text-decoration:none;font-weight:600;">info@citycommercefinance.com</a> or <a href="tel:+97145525640" style="color:#2C7A3D;text-decoration:none;font-weight:600;">+971 4 552 5640</a>.</p>
    </td></tr>
    <tr><td style="padding:14px 48px 40px;">
      <div style="width:42px;height:2px;background:#5DB734;margin:0 0 18px;font-size:0;line-height:0;">&nbsp;</div>
      <p style="margin:0;color:#16294F;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:16px;">The City Commerce Finance Team</p>
      <p style="margin:4px 0 0;color:#64748b;font-size:13px;">Trade &amp; Shariah-compliant finance &middot; Dubai, UAE</p>
    </td></tr>
  </table>
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;"><tr>
    <td align="center" style="padding:20px;color:#94a3b8;font-size:12px;line-height:1.6;">
      You&rsquo;re receiving this because you submitted an enquiry at <a href="https://citycommercefinance.com" style="color:#94a3b8;">citycommercefinance.com</a>.
    </td></tr></table>
</td></tr></table></body></html>`;
}

function salesNotifyEmail(lead: Lead, when: string): string {
  const logo = "https://citycommercefinance.com/brand/email-logo.png";
  const row = (k: string, v: string) =>
    `<tr><td style="padding:9px 0;color:#64748b;font-size:13px;width:150px;vertical-align:top;border-bottom:1px solid #eef2f6;">${k}</td><td style="padding:9px 0;color:#0f1b2d;font-size:14px;font-weight:600;border-bottom:1px solid #eef2f6;">${v || "&mdash;"}</td></tr>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef3f9;font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef3f9;"><tr><td align="center" style="padding:36px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e7edf2;border-radius:16px;overflow:hidden;box-shadow:0 18px 40px rgba(22,41,79,.08);">
    <tr><td style="height:4px;background:linear-gradient(90deg,#2E6CA5,#5DB734);font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td align="center" style="padding:30px 28px 2px;">
      <img src="${logo}" alt="City Commerce Finance" width="170" style="display:block;border:0;outline:0;width:170px;max-width:55%;height:auto;">
    </td></tr>
    <tr><td align="center" style="padding:10px 28px 0;">
      <span style="display:inline-block;background:#eef6e9;color:#2C7A3D;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 14px;border-radius:999px;">New website enquiry</span>
    </td></tr>
    <tr><td style="padding:22px 28px 6px;">
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
    <tr><td style="padding:16px 28px 30px;color:#475569;font-size:13px;line-height:1.6;">
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
