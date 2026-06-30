"use client";

import { useEffect, useRef, useState } from "react";

const NAV = [
  { label: "Home", href: "#", current: true },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
];

function MarkWhite() {
  return (
    <svg className="mark mark-white" viewBox="0 0 240 230" aria-hidden="true">
      <polygon points="116,34 30,198 100,198 116,150" fill="#fff" />
      <polygon points="116,150 100,198 64,198" fill="#fff" />
      <polygon points="124,34 210,198 140,198 124,150" fill="#fff" />
      <polygon points="124,150 140,198 176,198" fill="#fff" />
      <polygon points="120,150 101,192 120,180" fill="#fff" />
      <polygon points="120,150 139,192 120,180" fill="#fff" />
    </svg>
  );
}

function MarkColour() {
  return (
    <svg className="mark mark-colour" viewBox="0 0 240 230" aria-hidden="true">
      <defs>
        <linearGradient id="nbl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4DA8D0" />
          <stop offset="1" stopColor="#2E6CA5" />
        </linearGradient>
        <linearGradient id="ngr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6BC23E" />
          <stop offset="1" stopColor="#1C5430" />
        </linearGradient>
      </defs>
      <polygon points="116,34 30,198 100,198 116,150" fill="url(#nbl)" />
      <polygon points="116,150 100,198 64,198" fill="#16294F" />
      <polygon points="124,34 210,198 140,198 124,150" fill="url(#ngr)" />
      <polygon points="124,150 140,198 176,198" fill="#1C5430" />
      <polygon points="120,30 113,150 120,150" fill="#fff" />
      <polygon points="120,30 120,150 127,150" fill="#fff" />
      <polygon points="120,150 101,192 120,180" fill="#4DA8D0" />
      <polygon points="120,150 139,192 120,180" fill="#5DB734" />
    </svg>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Frost the bar as soon as scrolling begins.
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + focus management + Escape to close while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) drawerRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="nav-wrap">
          <a className="brand" href="#" aria-label="City Commerce Finance — home">
            <MarkWhite />
            <MarkColour />
            <span className="wordmark">
              <span className="l1">CITY</span>
              <span className="l2">COMMERCE FINANCE</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} aria-current={n.current ? "page" : undefined}>
                {n.label}
              </a>
            ))}
          </nav>

          <a className="nav-cta" href="#contact">
            Contact Us
          </a>

          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobileDrawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </header>

      <div
        className={`scrim${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        className={`drawer${open ? " open" : ""}`}
        id="mobileDrawer"
        aria-label="Mobile menu"
        aria-hidden={!open}
      >
        <button
          className="drawer-close"
          aria-label="Close menu"
          onClick={() => {
            setOpen(false);
            toggleRef.current?.focus();
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5 L19 19 M19 5 L5 19" stroke="#16294F" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>

        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            aria-current={n.current ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          Contact Us
        </a>
      </aside>
    </>
  );
}
