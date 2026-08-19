"use client";

import { useEffect, useRef } from "react";

const POINTS: [string, string][] = [
  ["Tailored solutions", "Structured around your goals."],
  ["Global reach", "A worldwide banking network."],
  ["Efficient access", "Fast, clear decisions."],
  ["Dedicated support", "Guidance end-to-end."],
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
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("reveal-in");
          io.disconnect();
        }
      }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="intro-band reveal" id="about" ref={ref}>
      <div className="intro-grid">
        <div className="intro-copy">
          <p className="eyebrow">Who we are</p>
          <h2>A Dubai finance partner built for ambitious businesses</h2>
          <p className="lead">
            City Commerce Finance delivers secure, efficient and Shariah-compliant funding —
            connecting your business to a trusted global banking network across the UAE, the GCC and
            beyond.
          </p>
          <ul className="intro-points">
            {POINTS.map(([title, desc]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
          <div className="intro-cta">
            <a className="btn-primary" href="/services">
              Explore our services
            </a>
          </div>
        </div>

        <aside className="founder-brief">
          <div className="fb-body">
            <p className="eyebrow">Our founder</p>
            <h3>Masiar Rahaman</h3>
            <p className="fb-role">Founder, City Commerce Finance LLC</p>
            <p className="fb-bio">
              A double-MBA in Banking &amp; Finance and Islamic Banking, Masiar leads City Commerce
              Finance&rsquo;s trade and Shariah-compliant advisory in Dubai.
            </p>
            <a href="/about/masiar-rahaman">Read his full profile &rarr;</a>
          </div>
        </aside>
      </div>
    </section>
  );
}
