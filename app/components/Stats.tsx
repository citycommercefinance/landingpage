"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; prefix?: string; suffix: string; label: string };

const STATS: Stat[] = [
  { value: 50, suffix: "+", label: "Partner banks & financial institutions" },
  { value: 400, suffix: "+", label: "Deals completed" },
  { value: 950, prefix: "US$", suffix: "M+", label: "Total deal value" },
];

// One rolling digit column per digit — spins through 3 cycles and settles (slot-machine feel).
function Rolling({ value, play }: { value: number; play: boolean }) {
  const digits = String(value).split("");
  return (
    <span className="roll">
      {digits.map((d, i) => (
        <span
          key={i}
          className="roll-col"
          style={{
            transitionDelay: `${i * 120}ms`,
            transform: play ? `translateY(-${20 + Number(d)}em)` : "translateY(0)",
          }}
        >
          {Array.from({ length: 30 }).map((_, n) => (
            <span className="roll-d" key={n}>
              {n % 10}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    const el = ref.current;
    if (!el) return;
    if (r) {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setPlay(true);
            io.disconnect();
          }
        }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats-band" id="track-record" ref={ref}>
      <div className="stats-inner">
        <p className="eyebrow light">Our track record</p>
        <h2>Trusted delivery, at scale</h2>
        <div className="stats-grid">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-num" aria-label={`${s.prefix ?? ""}${s.value}${s.suffix}`}>
                {s.prefix && <span className="stat-affix">{s.prefix}</span>}
                {reduce ? <span>{s.value}</span> : <Rolling value={s.value} play={play} />}
                <span className="stat-affix">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
