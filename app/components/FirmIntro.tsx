"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ReachGlobe = dynamic(() => import("./ReachGlobe"), {
  ssr: false,
  loading: () => <div className="globe-skeleton" aria-hidden="true" />,
});

const POINTS: [string, string][] = [
  ["Tailored solutions", "Structured around your goals."],
  ["Global reach", "A worldwide banking network."],
  ["Efficient access", "Fast, clear decisions."],
  ["Dedicated support", "Guidance end-to-end."],
];

export default function FirmIntro() {
  const ref = useRef<HTMLElement>(null);
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("reveal-in");
      setShowGlobe(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("reveal-in");
          setShowGlobe(true);
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

        <div className="reach" aria-hidden="true">
          {showGlobe ? <ReachGlobe /> : <div className="globe-skeleton" />}
          <p className="reach-caption">Connecting the UAE to clients across the globe — drag to explore</p>
        </div>
      </div>
    </section>
  );
}
