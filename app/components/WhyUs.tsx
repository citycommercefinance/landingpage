"use client";

import { useEffect, useRef, useState } from "react";

const CERT_IMG = "/certifications/Center-of-islamic-banking-certificate.png";

type QA = {
  chip: string;
  q: string;
  a?: string;
  bullets?: string[];
  cta?: { label: string; href: string };
};

const QUESTIONS: QA[] = [
  {
    chip: "Why choose you?",
    q: "Why choose City Commerce Finance?",
    bullets: [
      "A trusted global banking network",
      "Speedy turnaround and clear decisions",
      "100% secure, compliant transactions",
      "Custom-tailored financial packages",
      "Regulatory & compliance expertise",
    ],
    cta: { label: "Explore our services", href: "/services" },
  },
  {
    chip: "Working capital",
    q: "Need working capital to weather short-term stress?",
    a: "Through our network of partner banks and financial institutions, you can arrange short-term facilities — bill discounting, export packing credit or unsecured lines — structured to fit your capital structure and keep finance costs in check.",
    cta: { label: "Explore working-capital options", href: "/services/bill-discount-facilities" },
  },
  {
    chip: "Trade payment risk",
    q: "Importing or exporting and worried about payment risk?",
    a: "We issue bank-backed instruments — Letters of Credit, SBLCs and Bank Guarantees — so your counterparties are protected and your goods keep moving, with fast issuance through our global banking network.",
    cta: { label: "See Trade Facilities", href: "/services/trade-facilities" },
  },
  {
    chip: "Shariah-compliant",
    q: "Want funding that's fully Shariah-compliant?",
    a: "Our scholars and structurers design verified Islamic structures — Sukuk, Murabaha, Ijarah and more — so you grow on principle-aligned terms, with certification to back it.",
    cta: { label: "See Sukuk & Shariah Advisory", href: "/services/sukuk-shariah-advisory" },
  },
  {
    chip: "Monetize an instrument",
    q: "Holding a bank instrument but need liquidity?",
    a: "We connect eligible instruments — Bank Guarantees and SBLCs — to trusted monetization desks worldwide, releasing working capital quickly and compliantly.",
    cta: { label: "See Instrument Monetization", href: "/services/instrument-monetization" },
  },
  {
    chip: "Project finance",
    q: "Financing a large project or infrastructure build?",
    a: "We arrange syndicated and bilateral project finance with repayment matched to your project's cash flows — from construction through to long-term funding.",
    cta: { label: "See Project Finance", href: "/services/project-finance" },
  },
  {
    chip: "Equipment or property",
    q: "Acquiring machinery or property without draining cash?",
    a: "Asset-backed equipment and property finance lets you acquire what you need while preserving working capital, with terms matched to the asset's useful life.",
    cta: { label: "See Equipment Finance", href: "/services/equipment-finance" },
  },
];

const plainAnswer = (item: QA) => item.a ?? (item.bullets ? item.bullets.join("; ") + "." : "");

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QUESTIONS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: plainAnswer(item) },
  })),
};

function MiniMark({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 240 230" width={size} height={size} aria-hidden="true">
      <polygon points="116,34 30,198 100,198 116,150" fill="#fff" />
      <polygon points="116,150 100,198 64,198" fill="#fff" />
      <polygon points="124,34 210,198 140,198 124,150" fill="#fff" />
      <polygon points="124,150 140,198 176,198" fill="#fff" />
      <polygon points="120,150 101,192 120,180" fill="#fff" />
      <polygon points="120,150 139,192 120,180" fill="#fff" />
    </svg>
  );
}

type Msg = { role: "bot" | "user"; key: string; text?: string; bullets?: string[]; cta?: QA["cta"] };

const WELCOME: Msg = {
  role: "bot",
  key: "welcome",
  text: "Hello. What are you looking to solve today? Tap a question below and I'll show you how City Commerce Finance can help.",
};

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const [used, setUsed] = useState<number[]>([]);
  const [lightbox, setLightbox] = useState(false);

  // scroll-reveal
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("reveal-in");
          io.disconnect();
        }
      }),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // keep the chat scrolled to the latest message
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  // certificate lightbox
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    if (lightbox) closeRef.current?.focus();
    else if (used.length) triggerRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightbox) setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]); // eslint-disable-line react-hooks/exhaustive-deps

  const ask = (i: number) => {
    const item = QUESTIONS[i];
    setUsed((u) => (u.includes(i) ? u : [...u, i]));
    setMsgs((m) => [...m, { role: "user", key: `u${i}-${m.length}`, text: item.q }]);
    const reveal = () =>
      setMsgs((m) => [...m, { role: "bot", key: `b${i}-${m.length}`, text: item.a, bullets: item.bullets, cta: item.cta }]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      reveal();
    }, 720);
  };

  return (
    <section className="whyus reveal" id="why-us" ref={ref}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="whyus-wrap">
        <div className="whyus-head">
          <p className="eyebrow light">Why City Commerce Finance</p>
          <h2>Tell us what you need</h2>
          <p className="lead">Tap your situation and our assistant shows you exactly how we can help.</p>
        </div>

        {/* Crawlable / accessible equivalent of the assistant content (for SEO/AEO + screen readers) */}
        <div className="sr-only">
          <h3>Why City Commerce Finance — common questions</h3>
          <dl>
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{plainAnswer(item)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="assistant" aria-hidden="true">
          <div className="assistant-head">
            <span className="assistant-av">
              <MiniMark size={22} />
            </span>
            <span className="assistant-id">
              <strong>City Commerce Finance</strong>
              <span className="assistant-status">
                <i className="dot" /> Financing Assistant
              </span>
            </span>
          </div>

          <div className="assistant-body" ref={bodyRef}>
            {msgs.map((m) => (
              <div className={`msg ${m.role}`} key={m.key}>
                {m.role === "bot" && (
                  <span className="msg-av">
                    <MiniMark size={15} />
                  </span>
                )}
                <div className="bubble">
                  {m.bullets ? (
                    <ul>
                      {m.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{m.text}</p>
                  )}
                  {m.cta && (
                    <a className="bubble-cta" href={m.cta.href}>
                      {m.cta.label} →
                    </a>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="msg bot">
                <span className="msg-av">
                  <MiniMark size={15} />
                </span>
                <div className="bubble typing">
                  <span /> <span /> <span />
                </div>
              </div>
            )}
          </div>

          <div className="assistant-replies">
            <span className="replies-label">Ask:</span>
            {QUESTIONS.map((item, i) => (
              <button
                key={item.chip}
                type="button"
                className={`chip-reply${used.includes(i) ? " used" : ""}`}
                onClick={() => ask(i)}
              >
                {item.chip}
              </button>
            ))}
          </div>
        </div>

        <p className="markets">
          Serving <strong>UAE · GCC · Africa · Europe · South Asia · Southeast Asia</strong>
        </p>

        <button
          type="button"
          className="cert-card"
          ref={triggerRef}
          onClick={() => setLightbox(true)}
          aria-haspopup="dialog"
          aria-label="View our Center of Islamic Banking & Economics certificate"
        >
          <div className="cert-seal" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="cert-text">
            <span className="chip">Shariah-Compliant</span>
            <span className="cert-title">Certified in Islamic Banking</span>
            <p>
              Our Shariah-compliance credentials are independently certified by the Center of Islamic
              Banking &amp; Economics — the assurance behind every compliant structure we build.
            </p>
          </div>
          <span className="cert-fold" aria-hidden="true" />
        </button>
      </div>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Center of Islamic Banking & Economics certificate"
          onClick={() => setLightbox(false)}
        >
          <button ref={closeRef} type="button" className="lightbox-close" aria-label="Close" onClick={() => setLightbox(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lightbox-img"
            src={CERT_IMG}
            alt="City Commerce Finance — Center of Islamic Banking & Economics certificate"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
