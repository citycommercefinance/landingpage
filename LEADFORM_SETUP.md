# Lead form — backend setup

The enquiry form (`/api/lead`) does three things on submit:

1. **Appends the lead to a Google Sheet** (via a Google service account)
2. **Sends a notification email** to the sales inbox (Zoho SMTP) so the team knows to check the sheet
3. **Sends a branded thank-you email** to the prospect (Zoho SMTP)

It is resilient: if the sheet write fails, the sales notification email still acts as a record (and vice-versa). Bot protection is built in (honeypot field + a 3-second time-trap).

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production + Preview), and in a local **`.env.local`** for local testing.

| Variable | Required | Notes |
|----------|----------|-------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | ✅ | The service account email, e.g. `leads@your-project.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | ✅ | The service account private key. Paste with `\n` for line breaks (the code converts them). Wrap in quotes. |
| `GOOGLE_SHEET_ID` | ✅ | The ID from the sheet URL: `docs.google.com/spreadsheets/d/<THIS>/edit` |
| `GOOGLE_SHEET_TAB` | ⬜ | Tab/worksheet name. Defaults to `Leads`. |
| `ZOHO_SMTP_USER` | ✅ | The Zoho mailbox that sends mail, e.g. `info@citycommercefinance.com` |
| `ZOHO_SMTP_PASS` | ✅ | A Zoho **app-specific password** (not your login password) |
| `ZOHO_SMTP_HOST` | ⬜ | Defaults to `smtp.zoho.com`. Use `smtp.zoho.eu`/regional host if your Zoho is in another DC. |
| `MAIL_FROM` | ⬜ | "From" address. Defaults to `ZOHO_SMTP_USER`. Must be an address the mailbox can send as. |
| `SALES_NOTIFY_EMAIL` | ⬜ | Where sales notifications go. Defaults to `ZOHO_SMTP_USER`. |

## Google Sheet steps

1. Create a Google Sheet. Name the first tab **`Leads`** (or set `GOOGLE_SHEET_TAB`).
2. Add a header row in `A1:H1`:
   `Received | Name | Company Email | Position | Phone | Interested Service | Annual Turnover | Country`
3. In Google Cloud, create a **service account** and a **JSON key**; enable the **Google Sheets API**.
4. **Share the sheet** with the service account email (`GOOGLE_SERVICE_ACCOUNT_EMAIL`) as **Editor**.
5. Copy `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `private_key` → `GOOGLE_PRIVATE_KEY`, sheet ID → `GOOGLE_SHEET_ID`.

> Tip: you can reuse the same service account as Kuber Trade — just share *this* sheet with it.

## Zoho steps

1. In Zoho Mail, generate an **app-specific password** for `info@citycommercefinance.com`.
2. Set `ZOHO_SMTP_USER=info@citycommercefinance.com` and `ZOHO_SMTP_PASS=<app password>`.
3. (Optional) Point `SALES_NOTIFY_EMAIL` at whoever should get the lead notifications.

## Columns written to the sheet (A–H)

`Received (GST) · Name · Company Email · Position · Phone · Interested Service · Annual Turnover · Country`
