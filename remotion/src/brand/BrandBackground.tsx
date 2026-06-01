import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BRAND } from "./tokens";

// Persistent navy background + faint circuit grid + slow upward particles + soft radial wash.
export const BrandBackground: React.FC<{ withParticles?: boolean }> = ({
  withParticles = true,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg }}>
      {/* radial blue wash */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(1200px 800px at 50% 55%, rgba(37,99,235,0.16), transparent 65%)",
        }}
      />
      {/* faint circuit grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(120,160,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,160,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9), rgba(0,0,0,0.2) 80%, transparent)",
        }}
      />
      {/* hairline accent grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px)",
          backgroundSize: "240px 240px",
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {withParticles && <Particles frame={frame} />}
    </AbsoluteFill>
  );
};

const PARTICLES = Array.from({ length: 60 }, (_, i) => {
  const seed = i * 9301 + 49297;
  const r = (seed % 233280) / 233280;
  const r2 = ((seed * 7) % 233280) / 233280;
  const r3 = ((seed * 13) % 233280) / 233280;
  return {
    x: r * 1920,
    offsetY: r2 * 1080,
    speed: 0.25 + r3 * 0.9,
    size: 1 + r * 2.3,
    opacity: 0.15 + r2 * 0.4,
  };
});

const Particles: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {PARTICLES.map((p, i) => {
        const y = (p.offsetY - frame * p.speed + 1200) % 1200 - 60;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: BRAND.blue,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 4}px ${BRAND.blue}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
