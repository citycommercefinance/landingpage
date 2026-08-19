"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReachGlobe = dynamic(() => import("./ReachGlobe"), {
  ssr: false,
  loading: () => <div className="globe-skeleton" aria-hidden="true" />,
});

export default function Hero() {
  // Only mount the WebGL globe on larger screens. On phones it stays out of the
  // DOM entirely, so the heavy three.js / globe bundle is never downloaded.
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 901px)");
    const update = () => setShowGlobe(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <section className="hero2">
      <div className="hero2-grid">
        <div className="hero2-copy">
          <p className="hero2-eyebrow">Dubai · Trade &amp; Shariah-Compliant Finance</p>
          <h1>Global trade &amp; Shariah-compliant finance, arranged fast.</h1>
          <p className="hero2-sub">
            City Commerce Finance structures trade facilities, Sukuk and instrument monetization —
            connecting your business to a trusted global banking network out of Dubai.
          </p>
          <div className="hero2-cta">
            <a className="btn-primary" href="#contact">Speak to our team</a>
            <a className="btn-ghost" href="/services">Explore services</a>
          </div>
          <ul className="hero2-trust">
            <li>Shariah-Certified</li>
            <li>Global banking network</li>
            <li>Dubai-licensed</li>
          </ul>
        </div>

        {showGlobe && (
          <div className="reach hero2-visual" aria-hidden="true">
            <ReachGlobe />
          </div>
        )}
      </div>
    </section>
  );
}
