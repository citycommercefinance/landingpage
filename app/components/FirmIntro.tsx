"use client";

import { useEffect, useRef } from "react";

const POINTS: [string, string][] = [
  ["Tailored Financial Solutions", "Structured around your goals — not off-the-shelf products."],
  ["Global Reach, Local Expertise", "A worldwide banking network with on-the-ground Dubai insight."],
  ["Efficient Capital Access", "Secure, streamlined funding with fast, clear decisions."],
  ["Dedicated Client Support", "A team that manages the process end-to-end."],
];

export default function FirmIntro() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="intro-band reveal" id="about" ref={ref}>
      <div className="intro-wrap">
        <p className="eyebrow">Who we are</p>
        <h2>A Dubai finance partner built for ambitious businesses</h2>
        <p className="lead">
          City Commerce Finance LLC delivers secure, efficient and Shariah-compliant funding — from
          trade facilities to project, property and instrument finance — connecting your business to a
          trusted global banking network.
        </p>
        <p className="intro-sub">
          Whether you&apos;re expanding across borders, funding a project or unlocking working capital,
          our specialists design the right structure and manage the bank dialogue end-to-end.
        </p>
        <div className="intro-points">
          {POINTS.map(([title, desc]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{desc}</span>
            </div>
          ))}
        </div>
        <div className="intro-cta">
          <a className="btn-primary" href="/services">
            Explore our services
          </a>
        </div>
      </div>
    </section>
  );
}
