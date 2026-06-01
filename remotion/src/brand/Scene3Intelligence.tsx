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
import { BrandBackground } from "./BrandBackground";
import { SectionLabel } from "./SectionLabel";

// Scene 3 — INTELLIGENCE. 540f / 18s.
// Node network + glass dashboard cards with ticking metrics.

// Deterministic node positions in a centered cluster.
const NODES = Array.from({ length: 22 }, (_, i) => {
  const seed = i * 9301 + 49297;
  const a = ((seed * 11) % 360) * (Math.PI / 180);
  const r = 80 + ((seed * 7) % 360);
  return {
    x: 960 + Math.cos(a) * r * (1 + ((seed * 5) % 100) / 400),
    y: 540 + Math.sin(a) * r * (0.6 + ((seed * 3) % 100) / 400),
  };
});

const EDGES: Array<[number, number]> = [];
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    const dx = NODES[i].x - NODES[j].x;
    const dy = NODES[i].y - NODES[j].y;
    if (Math.hypot(dx, dy) < 240) EDGES.push([i, j]);
  }
}

export const Scene3Intelligence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera drift forward (subtle zoom)
  const camScale = interpolate(frame, [0, 540], [1.02, 1.12]);
  const camX = interpolate(frame, [0, 540], [0, -30]);

  return (
    <AbsoluteFill>
      <BrandBackground />
      <SectionLabel index="01" label="INTELLIGENCE" />

      {/* Node network */}
      <AbsoluteFill
        style={{
          transform: `translateX(${camX}px) scale(${camScale})`,
          transformOrigin: "center",
        }}
      >
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          {EDGES.map(([a, b], i) => {
            const delay = 30 + (i % 30) * 1.5;
            const p = interpolate(frame, [delay, delay + 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const A = NODES[a];
            const B = NODES[b];
            const ex = A.x + (B.x - A.x) * p;
            const ey = A.y + (B.y - A.y) * p;
            return (
              <line
                key={i}
                x1={A.x}
                y1={A.y}
                x2={ex}
                y2={ey}
                stroke={BRAND.blue}
                strokeOpacity={0.35}
                strokeWidth={1}
              />
            );
          })}
          {NODES.map((n, i) => {
            const s = spring({
              frame: frame - 10 - i * 2,
              fps,
              config: { damping: 200 },
              durationInFrames: 24,
            });
            const pulse = 0.6 + (Math.sin((frame + i * 8) * 0.08) + 1) * 0.2;
            return (
              <g key={i} opacity={s}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={3 + pulse * 2}
                  fill={BRAND.blue}
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={10 + pulse * 6}
                  fill={BRAND.blue}
                  opacity={0.15}
                />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Dashboard cards */}
      <div
        style={{
          position: "absolute",
          left: 1140,
          top: 200,
          width: 680,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          fontFamily: FONT_SANS,
        }}
      >
        <MetricCard
          label="CALLS TODAY"
          target={1287}
          delay={60}
          unit=""
          accent
        />
        <MetricCard label="LEADS / HOT" target={94} delay={80} unit="" />
        <MetricCard label="ANSWER RATE" target={99.2} delay={100} unit="%" />
        <MetricCard label="AVG RESPONSE" target={1.4} delay={120} unit="s" />
      </div>

      {/* Pipeline list card */}
      <PipelineCard delay={140} />
    </AbsoluteFill>
  );
};

const MetricCard: React.FC<{
  label: string;
  target: number;
  delay: number;
  unit: string;
  accent?: boolean;
}> = ({ label, target, delay, unit, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 28,
  });
  const tick = interpolate(frame, [delay, delay + 90], [0, target], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isFloat = target % 1 !== 0;
  const value = isFloat ? tick.toFixed(1) : Math.floor(tick).toString();
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
        padding: "22px 24px",
        borderRadius: 14,
        background: "rgba(10,20,40,0.55)",
        border: `1px solid ${accent ? "rgba(37,99,235,0.4)" : BRAND.hairline}`,
        boxShadow: accent
          ? `0 0 24px rgba(37,99,235,0.18)`
          : `0 0 16px rgba(0,0,0,0.35)`,
      }}
    >
      <div
        style={{
          color: BRAND.textDim,
          fontSize: 11,
          letterSpacing: "0.28em",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 10,
          color: accent ? BRAND.blue : BRAND.white,
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
        <span style={{ color: BRAND.textDim, fontSize: 22, fontWeight: 500 }}>
          {unit}
        </span>
      </div>
      <div
        style={{
          marginTop: 10,
          height: 4,
          borderRadius: 2,
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${interpolate(frame, [delay, delay + 110], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
            background: accent ? BRAND.blue : "rgba(255,255,255,0.5)",
          }}
        />
      </div>
    </div>
  );
};

const ROWS = [
  { name: "Acme Roofing", score: 92, status: "HOT" },
  { name: "Northbridge Dental", score: 81, status: "HOT" },
  { name: "Lone Star Plumbing", score: 73, status: "WARM" },
  { name: "Cedar Park Auto", score: 64, status: "WARM" },
  { name: "Hill Country Law", score: 58, status: "WARM" },
];

const PipelineCard: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 1140,
        top: 540,
        width: 680,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
        padding: "20px 24px",
        borderRadius: 14,
        background: "rgba(10,20,40,0.6)",
        border: `1px solid ${BRAND.hairline}`,
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            color: BRAND.textDim,
            fontSize: 11,
            letterSpacing: "0.28em",
            fontWeight: 600,
          }}
        >
          LIVE PIPELINE
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            color: BRAND.blue,
            fontSize: 11,
            letterSpacing: "0.22em",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: BRAND.blue,
              boxShadow: `0 0 10px ${BRAND.blue}`,
            }}
          />
          LIVE
        </div>
      </div>
      {ROWS.map((r, i) => {
        const rs = spring({
          frame: frame - delay - 10 - i * 7,
          fps,
          config: { damping: 200 },
          durationInFrames: 22,
        });
        return (
          <div
            key={r.name}
            style={{
              opacity: rs,
              transform: `translateX(${interpolate(rs, [0, 1], [12, 0])}px)`,
              display: "grid",
              gridTemplateColumns: "1fr 80px 70px",
              alignItems: "center",
              padding: "10px 0",
              borderTop: i === 0 ? "none" : `1px solid ${BRAND.hairline}`,
              color: BRAND.white,
              fontSize: 15,
            }}
          >
            <span>{r.name}</span>
            <span style={{ color: BRAND.textDim, fontVariantNumeric: "tabular-nums" }}>
              {r.score}
            </span>
            <span
              style={{
                justifySelf: "end",
                color: r.status === "HOT" ? BRAND.blue : BRAND.textDim,
                fontSize: 10,
                letterSpacing: "0.24em",
                fontWeight: 600,
                padding: "4px 8px",
                border: `1px solid ${
                  r.status === "HOT" ? "rgba(37,99,235,0.5)" : BRAND.hairline
                }`,
                borderRadius: 4,
              }}
            >
              {r.status}
            </span>
          </div>
        );
      })}
    </div>
  );
};
