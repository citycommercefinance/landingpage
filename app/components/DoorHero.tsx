"use client";

import { useEffect, useRef } from "react";

type Service = {
  title: string;
  img: string;
  alt: string;
  desc: string;
  bullets: string[];
};

// Images live in /public/services/ and deploy with the repo (see public/services/README.md).
const SERVICES: Service[] = [
  {
    title: "Trade Facilities",
    img: "/services/trade-facilities.png",
    alt: "Global trade and shipping",
    desc: "Keep your international trade moving with secure, bank-backed instruments. From issuance to settlement, we structure the right facility and manage the bank dialogue end-to-end.",
    bullets: ["Letters of Credit (LC) & SBLC", "Bank Guarantees", "Risk mitigation & fast issuance"],
  },
  {
    title: "Sukuk & Shariah Advisory",
    img: "/services/sukuk-shariah-advisory.png",
    alt: "White marble mosque against a blue sky",
    desc: "Verified Shariah-compliant structuring for ethical, principle-aligned growth. Our scholars and structurers ensure every transaction is fully compliant, from Sukuk issuance to ongoing advisory.",
    bullets: ["Sukuk issuance & structuring", "Shariah governance", "Murabaha, Ijarah & more"],
  },
  {
    title: "Instrument Monetization",
    img: "/services/instrument-monetization.png",
    alt: "Financial certificate and currency — instrument monetization",
    desc: "Unlock liquidity from financial instruments through our global banking network. We connect your bank instruments to trusted desks worldwide to release working capital quickly and compliantly.",
    bullets: ["Monetize bank instruments", "Access to global desks", "Structured, compliant deals"],
  },
  {
    title: "Project Finance",
    img: "/services/project-finance.png",
    alt: "Major civil engineering project — bridge and highway",
    desc: "Long-term capital for large-scale infrastructure and industrial projects. We arrange syndicated and bilateral facilities with repayment profiles matched to your project's cash flow.",
    bullets: ["Structured long-term funding", "Infrastructure & industrial", "Tailored repayment"],
  },
  {
    title: "Mortgage & Real Estate",
    img: "/services/mortgage-real-estate.png",
    alt: "Property development under construction",
    desc: "Property-backed funding with flexible terms and competitive rates. Commercial or residential, we secure funding against the asset with fast, transparent decisions.",
    bullets: ["Real-estate-backed loans", "Flexible terms", "Fast turnaround"],
  },
  {
    title: "Equipment Finance",
    img: "/services/equipment-finance.png",
    alt: "Heavy construction machinery in a GCC desert site",
    desc: "Financing for machinery and vehicles, secured by the assets themselves. Preserve working capital while acquiring the equipment your operations need to grow.",
    bullets: ["Asset-secured lending", "Machinery & vehicles", "Preserve working capital"],
  },
];

export default function DoorHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const q = <T extends HTMLElement>(sel: string) => hero.querySelector(sel) as T | null;
    const doors = q<HTMLElement>(".doors");
    const doorL = q<HTMLElement>(".door.left");
    const doorR = q<HTMLElement>(".door.right");
    const headline = q<HTMLElement>(".headline");
    const finalEl = q<HTMLElement>(".final");
    const progress = q<HTMLElement>(".progress");
    const cards = Array.from(hero.querySelectorAll<HTMLElement>(".card"));
    if (!doors || !doorL || !doorR || !headline || !finalEl || !progress) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const map = (v: number, a: number, b: number, c: number, d: number) =>
      clamp((v - a) / (b - a), 0, 1) * (d - c) + c;
    const smooth = (v: number, a: number, b: number) => {
      const t = clamp((v - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };

    // Subtle glass dots — service-navigation hint, synced to the scroll position.
    const dotsWrap = q<HTMLElement>(".dots");
    const dots = Array.from(hero.querySelectorAll<HTMLElement>(".dot"));
    const cardStationP = (i: number) =>
      0.24 + (clamp(i, 0, cards.length - 1) / (cards.length + 0.6)) * (0.97 - 0.24);
    const scrollToCard = (i: number) => {
      const total = hero.offsetHeight - window.innerHeight;
      window.scrollTo({ top: hero.offsetTop + cardStationP(i) * total, behavior: "smooth" });
    };

    const update = () => {
      if (reduce) return;
      const rect = hero.getBoundingClientRect();
      const total = hero.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / total, 0, 1);

      const ang = map(p, 0.02, 0.16, 0, 56);
      const sep = map(p, 0.02, 0.18, 0, Math.max(320, window.innerWidth * 0.36));
      doorL.style.transform = `translateX(${-sep}px) rotateY(${ang}deg)`;
      doorR.style.transform = `translateX(${sep}px) rotateY(${-ang}deg)`;
      doors.style.filter = `blur(${map(p, 0.05, 0.18, 0, 9)}px)`;
      doors.style.opacity = String(1 - smooth(p, 0.03, 0.19));
      headline.style.opacity = String(1 - smooth(p, 0.09, 0.19));

      const N = cards.length;
      const cardF = clamp((p - 0.24) / (0.97 - 0.24), 0, 1) * (N + 0.6);
      const gate = smooth(p, 0.18, 0.27);
      const spacing = Math.min(500, window.innerWidth * 0.82);
      cards.forEach((el, i) => {
        const delta = i - cardF;
        const ad = Math.abs(delta);
        const tx = delta * spacing;
        const sc = clamp(1 - ad * 0.16, 0.66, 1);
        const op = clamp(1.06 - ad * 0.74, 0, 1) * gate;
        el.style.transform = `translate(-50%,-50%) translateX(${tx}px) scale(${sc})`;
        el.style.opacity = String(op);
        el.style.zIndex = String(Math.round(100 - ad * 10));
        const focused = ad < 0.5 && gate > 0.6;
        el.style.pointerEvents = focused ? "auto" : "none";
        if (!focused) el.classList.remove("open");
      });

      const activeCard = clamp(Math.round(cardF), 0, N - 1);
      dots.forEach((d, i) => d.classList.toggle("active", i === activeCard));
      if (dotsWrap) {
        const showDots = gate > 0.6 && p < 0.9;
        dotsWrap.style.opacity = showDots ? "1" : "0";
        dotsWrap.style.pointerEvents = showDots ? "auto" : "none";
      }

      finalEl.style.opacity = String(smooth(p, 0.93, 0.995));
      const btn = finalEl.querySelector<HTMLElement>(".btn");
      if (btn) btn.style.pointerEvents = p > 0.95 ? "auto" : "none";
      progress.style.width = `${(p * 100).toFixed(2)}%`;
      progress.style.opacity = p > 0.16 && p < 0.985 ? "1" : "0";
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    const toggle = (el: HTMLElement) => {
      const isOpen = el.classList.toggle("open");
      el.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };
    const cleanups: Array<() => void> = [];
    cards.forEach((el) => {
      const onClick = (e: Event) => {
        if ((e.target as HTMLElement).closest("a")) return;
        toggle(el);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle(el);
        }
      };
      el.addEventListener("click", onClick);
      el.addEventListener("keydown", onKey);
      cleanups.push(() => {
        el.removeEventListener("click", onClick);
        el.removeEventListener("keydown", onKey);
      });
    });

    const dotHandlers = dots.map((d, i) => {
      const h = () => scrollToCard(i);
      d.addEventListener("click", h);
      return h;
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      dots.forEach((d, i) => d.removeEventListener("click", dotHandlers[i]));
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="stage">
        <div className="glow" />
        <div className="progress" />

        <div className="cards">
          {SERVICES.map((s, i) => (
            <article
              className="card"
              key={s.title}
              tabIndex={0}
              role="button"
              aria-expanded={false}
              data-i={i}
            >
              <div className="photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={s.img} alt={s.alt} />
              </div>
              <div className="bar">
                <h3>{s.title}</h3>
              </div>
              <div className="body">
                <div className="body-inner">
                  <p>{s.desc}</p>
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <a className="more" href="#">
                    Learn more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="doors">
          <div className="door left">
            <svg viewBox="0 0 120 230" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4DA8D0" />
                  <stop offset="1" stopColor="#2E6CA5" />
                </linearGradient>
              </defs>
              <polygon points="116,34 30,198 100,198 116,150" fill="url(#bl)" />
              <polygon points="116,150 100,198 64,198" fill="#16294F" />
              <polygon points="120,30 113,150 120,150" fill="#eaf3fb" />
              <polygon points="120,150 101,192 120,180" fill="#4DA8D0" />
            </svg>
          </div>
          <div className="door right">
            <svg viewBox="120 0 120 230" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#6BC23E" />
                  <stop offset="1" stopColor="#1C5430" />
                </linearGradient>
              </defs>
              <polygon points="124,34 210,198 140,198 124,150" fill="url(#gr)" />
              <polygon points="124,150 140,198 176,198" fill="#1C5430" />
              <polygon points="120,30 120,150 127,150" fill="#eaf3fb" />
              <polygon points="120,150 139,192 120,180" fill="#5DB734" />
            </svg>
          </div>
        </div>

        <div className="headline">
          <span className="firm">City Commerce Finance</span>
          <span className="statement">Open the door to endless possibilities</span>
        </div>

        <div className="final">
          <h2>Open the door to your next opportunity</h2>
          <p>
            Speak with our team about trade finance, Sukuk funding or instrument monetization —
            tailored to your business.
          </p>
          <a href="#contact" className="btn">
            Speak to Our Team
          </a>
        </div>

        <div className="dots" role="group" aria-label="Service navigation">
          {SERVICES.map((s) => (
            <button key={s.title} className="dot" type="button" aria-label={`Go to ${s.title}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
