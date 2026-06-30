"use client";

import { useMemo, useState } from "react";
import { flagshipServices, additionalServices } from "../lib/services";

type Dial = { iso: string; label: string; code: string; min: number; max: number };

// Dial codes for the markets City Commerce Finance serves (UAE, GCC, Asia,
// Africa, Europe) plus common international. `min`/`max` = national-number
// digit lengths, used to validate that a number stays within limits.
const DIAL_CODES: Dial[] = [
  { iso: "AE", label: "United Arab Emirates", code: "+971", min: 8, max: 9 },
  { iso: "SA", label: "Saudi Arabia", code: "+966", min: 8, max: 9 },
  { iso: "QA", label: "Qatar", code: "+974", min: 7, max: 8 },
  { iso: "OM", label: "Oman", code: "+968", min: 8, max: 8 },
  { iso: "KW", label: "Kuwait", code: "+965", min: 8, max: 8 },
  { iso: "BH", label: "Bahrain", code: "+973", min: 8, max: 8 },
  { iso: "IN", label: "India", code: "+91", min: 10, max: 10 },
  { iso: "PK", label: "Pakistan", code: "+92", min: 10, max: 10 },
  { iso: "BD", label: "Bangladesh", code: "+880", min: 8, max: 10 },
  { iso: "LK", label: "Sri Lanka", code: "+94", min: 9, max: 9 },
  { iso: "SG", label: "Singapore", code: "+65", min: 8, max: 8 },
  { iso: "MY", label: "Malaysia", code: "+60", min: 8, max: 10 },
  { iso: "ID", label: "Indonesia", code: "+62", min: 9, max: 12 },
  { iso: "HK", label: "Hong Kong", code: "+852", min: 8, max: 8 },
  { iso: "CN", label: "China", code: "+86", min: 11, max: 11 },
  { iso: "GB", label: "United Kingdom", code: "+44", min: 10, max: 10 },
  { iso: "DE", label: "Germany", code: "+49", min: 10, max: 11 },
  { iso: "FR", label: "France", code: "+33", min: 9, max: 9 },
  { iso: "NL", label: "Netherlands", code: "+31", min: 9, max: 9 },
  { iso: "CH", label: "Switzerland", code: "+41", min: 9, max: 9 },
  { iso: "TR", label: "Türkiye", code: "+90", min: 10, max: 10 },
  { iso: "EG", label: "Egypt", code: "+20", min: 9, max: 10 },
  { iso: "NG", label: "Nigeria", code: "+234", min: 8, max: 10 },
  { iso: "KE", label: "Kenya", code: "+254", min: 9, max: 9 },
  { iso: "ZA", label: "South Africa", code: "+27", min: 9, max: 9 },
  { iso: "US", label: "USA / Canada", code: "+1", min: 10, max: 10 },
];

// Countries in the regions the firm serves, for the Country field.
const SERVED_COUNTRIES = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain",
  "India", "Pakistan", "Bangladesh", "Sri Lanka",
  "Singapore", "Malaysia", "Indonesia", "Hong Kong", "China",
  "United Kingdom", "Germany", "France", "Netherlands", "Switzerland", "Türkiye",
  "Egypt", "Nigeria", "Kenya", "South Africa",
  "Other (not listed)",
];

const POSITIONS = [
  "CEO / CFO / Director",
  "Accountant / Analyst / Assistant",
  "Banker / Asset Manager",
  "Other",
];

// USD turnover bands (optional field).
const TURNOVER_RANGES = [
  "Under US$1M",
  "US$1M – US$5M",
  "US$5M – US$25M",
  "US$25M – US$100M",
  "US$100M – US$500M",
  "Over US$500M",
];

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [positionOther, setPositionOther] = useState("");
  const [dial, setDial] = useState("+971");
  const [phone, setPhone] = useState("");
  const [turnover, setTurnover] = useState("");
  const [country, setCountry] = useState("");
  const [service, setService] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — must stay empty
  const [startedAt] = useState(() => Date.now()); // time-trap baseline

  const activeDial = useMemo(
    () => DIAL_CODES.find((d) => d.code === dial) ?? DIAL_CODES[0],
    [dial]
  );

  // Keep only digits and never let the number exceed the country's max length.
  const onPhoneChange = (v: string) => setPhone(v.replace(/\D/g, "").slice(0, activeDial.max));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid company email.";
    if (!position) e.position = "Please select your position.";
    if (position === "Other" && !positionOther.trim())
      e.positionOther = "Please specify your position.";
    if (!phone) e.phone = "Please enter your phone number.";
    else if (phone.length < activeDial.min || phone.length > activeDial.max)
      e.phone =
        activeDial.min === activeDial.max
          ? `${activeDial.label} numbers are ${activeDial.max} digits.`
          : `${activeDial.label} numbers are ${activeDial.min}–${activeDial.max} digits.`;
    if (!country) e.country = "Please select your country.";
    if (!service) e.service = "Please select a service you're interested in.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          position: position === "Other" ? `Other: ${positionOther.trim()}` : position,
          phone: `${dial} ${phone}`,
          interestedService: service,
          annualTurnover: turnover || "Not provided",
          country,
          website, // honeypot
          _t: startedAt,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Sorry, something went wrong sending your enquiry. Please try again, or email info@citycommercefinance.com."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="lead-form lead-form--done" role="status">
        <h3>Thank you — we&rsquo;ve received your details.</h3>
        <p>Our team will be in touch shortly to discuss your financing requirement.</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate aria-label="Enquiry form">
      <div className="lf-row two">
        <div className="lf-field">
          <label className="lf-label" htmlFor="lf-name">Full name</label>
          <input
            id="lf-name" className={`lf-input${errors.name ? " err" : ""}`} type="text"
            autoComplete="name" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
          />
          {errors.name && <span className="lf-err">{errors.name}</span>}
        </div>
        <div className="lf-field">
          <label className="lf-label" htmlFor="lf-email">Company email</label>
          <input
            id="lf-email" className={`lf-input${errors.email ? " err" : ""}`} type="email"
            autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
          />
          {errors.email && <span className="lf-err">{errors.email}</span>}
        </div>
      </div>

      <div className="lf-row two">
        <div className="lf-field">
          <label className="lf-label" htmlFor="lf-position">Position</label>
          <select
            id="lf-position" className={`lf-select${errors.position ? " err" : ""}`}
            value={position} onChange={(e) => setPosition(e.target.value)}
          >
            <option value="" disabled>Select your role…</option>
            {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.position && <span className="lf-err">{errors.position}</span>}
        </div>
        <div className="lf-field">
          <label className="lf-label" htmlFor="lf-country">Country</label>
          <select
            id="lf-country" className={`lf-select${errors.country ? " err" : ""}`}
            value={country} onChange={(e) => setCountry(e.target.value)}
          >
            <option value="" disabled>Select your country…</option>
            {SERVED_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <span className="lf-err">{errors.country}</span>}
        </div>
      </div>

      {position === "Other" && (
        <div className="lf-field">
          <label className="lf-label" htmlFor="lf-position-other">Please specify your position</label>
          <input
            id="lf-position-other" className={`lf-input${errors.positionOther ? " err" : ""}`}
            type="text" value={positionOther} onChange={(e) => setPositionOther(e.target.value)}
            placeholder="e.g. Head of Treasury"
          />
          {errors.positionOther && <span className="lf-err">{errors.positionOther}</span>}
        </div>
      )}

      <div className="lf-field">
        <label className="lf-label" htmlFor="lf-service">Interested service</label>
        <select
          id="lf-service" className={`lf-select${errors.service ? " err" : ""}`}
          value={service} onChange={(e) => setService(e.target.value)}
        >
          <option value="" disabled>Select a service…</option>
          <optgroup label="Core services">
            {flagshipServices.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          </optgroup>
          <optgroup label="More services">
            {additionalServices.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          </optgroup>
          <option value="Still exploring">Still exploring</option>
        </select>
        {errors.service && <span className="lf-err">{errors.service}</span>}
      </div>

      <div className="lf-row two">
        <div className="lf-field">
          <label className="lf-label" htmlFor="lf-phone">Phone number</label>
          <div className="lf-phone">
            <select
              className="lf-select lf-dial" aria-label="Country code"
              value={dial} onChange={(e) => { setDial(e.target.value); setPhone(""); }}
            >
              {DIAL_CODES.map((d) => (
                <option key={d.iso} value={d.code}>{d.iso} {d.code}</option>
              ))}
            </select>
            <input
              id="lf-phone" className={`lf-input${errors.phone ? " err" : ""}`}
              type="tel" inputMode="numeric" autoComplete="tel-national"
              value={phone} onChange={(e) => onPhoneChange(e.target.value)}
              placeholder={"#".repeat(activeDial.max)}
            />
          </div>
          {errors.phone && <span className="lf-err">{errors.phone}</span>}
        </div>
        <div className="lf-field">
          <label className="lf-label" htmlFor="lf-turnover">
            Annual turnover <span className="opt">(optional)</span>
          </label>
          <select
            id="lf-turnover" className="lf-select"
            value={turnover} onChange={(e) => setTurnover(e.target.value)}
          >
            <option value="">Prefer not to say</option>
            {TURNOVER_RANGES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <input
        type="text" name="website" className="lf-hp" tabIndex={-1} autoComplete="off"
        value={website} onChange={(e) => setWebsite(e.target.value)} aria-hidden="true"
      />

      <button type="submit" className="lf-submit" disabled={submitting}>
        {submitting ? "Sending…" : "Submit enquiry"}
      </button>
      {submitError && <p className="lf-submit-error" role="alert">{submitError}</p>}
      <p className="lf-consent">
        By submitting, you agree to be contacted about your enquiry. We respect your privacy and never share your details.
      </p>
    </form>
  );
}
