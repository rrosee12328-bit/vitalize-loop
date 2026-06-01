import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_SANS } from "../fonts";
import { BRAND } from "./tokens";
import { Chevron } from "./Chevron";

// Scene 2 — BRAND STATEMENT. 300f / 10s.
// 0-60f: white circuit grid (continues from intro). Logo centered.
//        Background inverts to dark navy. Logo scales down and drifts to top-left.
// 60-150f: massive headline materializes letter by letter.
// 150-200f: blue rule draws across screen.
// 200-300f: pillars fade in, particles drift, hold.

const LINE1 = "THE OPERATING SYSTEM";
const LINE2 = "YOUR BUSINESS NEEDS.";
const PILLARS = ["INTELLIGENCE", "VOICE", "SITES", "MEDIA"];

export const Scene2WhoWeAre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background inversion: white -> navy over frames 10-60
  const invert = interpolate(frame, [10, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgColor = interpolateColor(invert, "#F5F7FA", BRAND.bg);
  const gridColor = interpolateColor(
    invert,
    "rgba(20,40,90,0.18)",
    "rgba(120,160,255,0.06)"
  );

  // Logo drift: center (held 0-20), then drift to TL (20-65)
  const drift = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
    durationInFrames: 45,
  });
  const logoX = interpolate(drift, [0, 1], [960, 130]);
  const logoY = interpolate(drift, [0, 1], [540, 70]);
  const logoScale = interpolate(drift, [0, 1], [1, 0.22]);

  // Wordmark color also inverts: black on white -> white on navy
  const wordmarkColor = interpolateColor(invert, "#0A0F1E", "#FFFFFF");
  const wordmarkOpacity = interpolate(drift, [0.4, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline timing
  const headStart = 75;
  const charStagger = 1.6;

  // Rule
  const ruleProgress = interpolate(
    frame,
    [160, 200],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const pillarsStart = 205;

  // Particles only visible once dark
  const particleOp = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Circuit grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Radial wash that appears with the dark */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(1200px 800px at 50% 55%, rgba(37,99,235,0.18), transparent 65%)",
          opacity: invert,
        }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
          opacity: invert,
        }}
      />

      {/* Particles */}
      <Particles frame={frame} opacity={particleOp} />

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          left: logoX,
          top: logoY,
          transform: `translate(-50%,-50%) scale(${logoScale})`,
          transformOrigin: "center",
          display: "flex",
          alignItems: "center",
          gap: 28,
          fontFamily: FONT_SANS,
        }}
      >
        <Chevron size={140} glow={invert > 0.5} />
        <span
          style={{
            color: wordmarkColor,
            fontWeight: 800,
            fontSize: 120,
            letterSpacing: "-0.02em",
            opacity: wordmarkOpacity,
          }}
        >
          VEKTISS
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_SANS,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          paddingTop: 40,
        }}
      >
        <HeadlineLine
          text={LINE1}
          color="#FFFFFF"
          start={headStart}
          stagger={charStagger}
          frame={frame}
          fps={fps}
        />
        <div style={{ height: 18 }} />
        <HeadlineLine
          text={LINE2}
          color={BRAND.blue}
          start={headStart + LINE1.length * charStagger + 8}
          stagger={charStagger}
          frame={frame}
          fps={fps}
        />

        {/* Blue rule */}
        <div
          style={{
            marginTop: 56,
            height: 2,
            width: 1100,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: BRAND.blue,
              boxShadow: `0 0 20px ${BRAND.blue}`,
              transformOrigin: "left",
              transform: `scaleX(${ruleProgress})`,
            }}
          />
        </div>

        {/* Pillars */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            gap: 64,
            fontFamily: FONT_SANS,
          }}
        >
          {PILLARS.map((p, i) => {
            const s = spring({
              frame: frame - pillarsStart - i * 7,
              fps,
              config: { damping: 200 },
              durationInFrames: 24,
            });
            return (
              <span
                key={p}
                style={{
                  color: "#FFFFFF",
                  opacity: s * 0.95,
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: "0.36em",
                  transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
                }}
              >
                {p}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const HeadlineLine: React.FC<{
  text: string;
  color: string;
  start: number;
  stagger: number;
  frame: number;
  fps: number;
}> = ({ text, color, start, stagger, frame, fps }) => (
  <div
    style={{
      fontSize: 96,
      lineHeight: 1.05,
      display: "flex",
      justifyContent: "center",
      whiteSpace: "pre",
    }}
  >
    {text.split("").map((ch, i) => {
      const s = spring({
        frame: frame - start - i * stagger,
        fps,
        config: { damping: 200 },
        durationInFrames: 22,
      });
      return (
        <span
          key={i}
          style={{
            color,
            opacity: s,
            textShadow:
              s > 0.1
                ? `0 0 ${interpolate(s, [0, 1], [24, 0])}px ${color}`
                : undefined,
            display: "inline-block",
          }}
        >
          {ch}
        </span>
      );
    })}
  </div>
);

const PARTICLES = Array.from({ length: 50 }, (_, i) => {
  const seed = i * 9301 + 49297;
  const r = (seed % 233280) / 233280;
  const r2 = ((seed * 7) % 233280) / 233280;
  const r3 = ((seed * 13) % 233280) / 233280;
  return {
    x: r * 1920,
    offsetY: r2 * 1080,
    speed: 0.3 + r3 * 0.8,
    size: 1 + r * 2.2,
    opacity: 0.2 + r2 * 0.4,
  };
});

const Particles: React.FC<{ frame: number; opacity: number }> = ({
  frame,
  opacity,
}) => (
  <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
    {PARTICLES.map((p, i) => {
      const y = ((p.offsetY - frame * p.speed + 1200) % 1200) - 60;
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

function interpolateColor(t: number, a: string, b: string): string {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const r = Math.round(pa.r + (pb.r - pa.r) * t);
  const g = Math.round(pa.g + (pb.g - pa.g) * t);
  const bl = Math.round(pa.b + (pb.b - pa.b) * t);
  return `rgb(${r},${g},${bl})`;
}
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
