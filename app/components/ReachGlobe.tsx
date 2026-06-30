"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

const DUBAI = { lat: 25.2, lng: 55.27 };

const CITIES = [
  { name: "Riyadh", lat: 24.71, lng: 46.68 },
  { name: "Cairo", lat: 30.04, lng: 31.24 },
  { name: "Nairobi", lat: -1.29, lng: 36.82 },
  { name: "London", lat: 51.5, lng: -0.12 },
  { name: "Frankfurt", lat: 50.11, lng: 8.68 },
  { name: "Mumbai", lat: 19.08, lng: 72.88 },
  { name: "Singapore", lat: 1.35, lng: 103.82 },
  { name: "Istanbul", lat: 41.01, lng: 28.98 },
];

const points = [
  { lat: DUBAI.lat, lng: DUBAI.lng, color: "#5DB734", r: 0.85 },
  ...CITIES.map((c) => ({ lat: c.lat, lng: c.lng, color: "#7Fc3e8", r: 0.5 })),
];

const arcs = CITIES.map((c) => ({
  startLat: DUBAI.lat,
  startLng: DUBAI.lng,
  endLat: c.lat,
  endLng: c.lng,
}));

const rings = [{ lat: DUBAI.lat, lng: DUBAI.lng }];

export default function ReachGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const globeEl = useRef<any>(null);
  const [size, setSize] = useState(0);

  // measure container (square)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setSize(Math.min(el.clientWidth, 460));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // configure controls + framing once the globe is mounted
  useEffect(() => {
    const g = globeEl.current;
    if (!g || !size) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = g.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.55;
    controls.rotateSpeed = 0.7;
    g.pointOfView({ lat: 22, lng: 54, altitude: 2.3 }, 0);
  }, [size]);

  const globeMaterial = new THREE.MeshPhongMaterial({
    color: "#16294F",
    emissive: "#0c1c33",
    emissiveIntensity: 0.9,
    shininess: 6,
  });

  return (
    <div ref={wrapRef} className="globe-wrap">
      {size > 0 && (
        <Globe
          ref={globeEl}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          showGlobe
          globeMaterial={globeMaterial}
          showAtmosphere
          atmosphereColor="#4DA8D0"
          atmosphereAltitude={0.16}
          arcsData={arcs}
          arcColor={() => ["rgba(93,183,52,0.95)", "rgba(77,168,208,0.35)"]}
          arcAltitudeAutoScale={0.42}
          arcStroke={0.5}
          arcDashLength={0.5}
          arcDashGap={0.25}
          arcDashInitialGap={() => Math.random()}
          arcDashAnimateTime={2200}
          pointsData={points}
          pointColor={(d: any) => d.color}
          pointAltitude={0.012}
          pointRadius={(d: any) => d.r}
          pointsMerge={false}
          ringsData={rings}
          ringColor={() => (t: number) => `rgba(93,183,52,${1 - t})`}
          ringMaxRadius={4}
          ringPropagationSpeed={2.2}
          ringRepeatPeriod={1100}
        />
      )}
    </div>
  );
}
