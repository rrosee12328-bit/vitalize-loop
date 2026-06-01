import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BRAND } from "./tokens";

// 300 frames — Intelligence: neural network left, dashboard right
export const Scene3Intelligence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Network nodes (deterministic)
  const nodes = React.useMemo(() => {
    const arr: { x: number; y: number; r: number; depth: number }[] = [];
    for (let i = 0; i < 38; i++) {
      const a = (i * 2.39996);
      const r = 60 + (i * 19) % 320;
      const cx = 480 + Math.cos(a) * r;
      const cy = 540 + Math.sin(a) * r;
      const depth = (i % 3) / 2;
      arr.push({ x: cx, y: cy, r: 4 + (i % 4) * 2, depth });
    }
    return arr;
  }, []);

  const edges = React.useMemo(() => {
    const arr: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.hypot(dx, dy) < 180) arr.push([i, j]);
      }
    }
    return arr;
  }, [nodes]);

  // explosion progress
  const expl = interpolate(frame, [10, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = 0.6 + Math.sin(frame / 8) * 0.4;

  // dashboard cards stagger from right
  const cardAppear = (delay: number) =>
    spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 110 } });

  // ticking numbers
  const callsToday = 1287 + Math.floor(frame / 6);
  const leads = 94 + Math.floor(frame / 30);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg, overflow: "hidden" }}>
      {/* faint grid */}
      <BgGrid />

      <SectionTag num="01" label="INTELLIGENCE" />

      {/* NETWORK LEFT */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {/* edges */}
        {edges.map(([a, b], k) => {
          const na = nodes[a], nb = nodes[b];
          const cx = (na.x + nb.x) / 2, cy = (na.y + nb.y) / 2;
          const sx = cx + (na.x - cx) * expl;
          const sy = cy + (na.y - cy) * expl;
          const ex = cx + (nb.x - cx) * expl;
          const ey = cy + (nb.y - cy) * expl;
          const flicker = 0.18 + 0.35 * (0.5 + Math.sin((frame + k * 7) / 14) * 0.5);
          return (
            <line key={k} x1={sx} y1={sy} x2={ex} y2={ey}
              stroke={BRAND.blue} strokeWidth={0.8} opacity={flicker * expl} />
          );
        })}
        {nodes.map((n, i) => {
          const breath = 1 + Math.sin((frame + i * 5) / 10) * 0.15;
          const cx = 480 + (n.x - 480) * expl;
          const cy = 540 + (n.y - 540) * expl;
          const op = (0.5 + n.depth * 0.5);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={n.r * 4 * breath} fill={BRAND.blue} opacity={0.06 * op * expl} />
              <circle cx={cx} cy={cy} r={n.r * breath} fill={BRAND.blue} opacity={op * expl}
                style={{ filter: `drop-shadow(0 0 ${6 * pulse}px ${BRAND.blue})` }} />
            </g>
          );
        })}
        {/* central pulse node */}
        <circle cx={480} cy={540} r={10 + pulse * 4} fill="#FFFFFF"
          style={{ filter: `drop-shadow(0 0 22px ${BRAND.blue})` }} />
      </svg>

      {/* DASHBOARD RIGHT */}
      <div style={{ position: "absolute", right: 80, top: 130, width: 880, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 14, letterSpacing: 3, opacity: 0.7 }}>
            VEKTISS · COMMAND
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
              boxShadow: "0 0 10px #22c55e", opacity: 0.5 + Math.sin(frame / 8) * 0.5,
            }} />
            <span style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 12, letterSpacing: 3 }}>LIVE</span>
          </div>
        </div>

        {/* Metric grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card delay={20} appear={cardAppear(20)} title="CALLS TODAY">
            <BigNum value={callsToday.toLocaleString()} color={BRAND.blue} />
            <ProgressBar pct={interpolate(frame, [40, 200], [0.2, 0.78], { extrapolateRight: "clamp" })} />
          </Card>
          <Card delay={30} appear={cardAppear(30)} title="LEADS CAPTURED">
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <BigNum value={String(leads)} color="#FFFFFF" />
              <span style={{ color: "#22c55e", fontSize: 22, fontFamily: "Inter, sans-serif" }}>▲ 12%</span>
            </div>
          </Card>
          <Card delay={40} appear={cardAppear(40)} title="ANSWER RATE">
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <BigNum value="99.2%" color="#FFFFFF" />
              <ArcIndicator pct={0.992} />
            </div>
          </Card>
          <Card delay={50} appear={cardAppear(50)} title="AVG RESPONSE">
            <BigNum value="1.4s" color="#FFFFFF" />
          </Card>
        </div>

        {/* LIVE PIPELINE */}
        <Card delay={60} appear={cardAppear(60)} title="LIVE PIPELINE">
          {[
            { name: "Acme Roofing", score: 92, tag: "HOT" },
            { name: "Northbridge Dental", score: 78, tag: "WARM" },
            { name: "Lone Star Plumbing", score: 88, tag: "HOT" },
            { name: "Cedar Park Auto", score: 71, tag: "WARM" },
            { name: "Hill Country Law", score: 95, tag: "HOT" },
          ].map((r, i) => {
            const o = interpolate(frame, [80 + i * 6, 100 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={r.name} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 4px", borderBottom: "1px solid rgba(255,255,255,0.06)",
                opacity: o, fontFamily: "Inter, sans-serif",
              }}>
                <span style={{ color: "#fff", fontSize: 16 }}>{r.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontVariantNumeric: "tabular-nums" }}>
                    SCORE {r.score}
                  </span>
                  <span style={{
                    padding: "4px 10px", borderRadius: 4, fontSize: 11, letterSpacing: 2,
                    background: r.tag === "HOT" ? BRAND.blue : "rgba(37,99,235,0.25)",
                    color: r.tag === "HOT" ? "#fff" : "#93c5fd",
                    border: r.tag === "HOT" ? "none" : `1px solid ${BRAND.blue}`,
                  }}>
                    {r.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </AbsoluteFill>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode; appear: number; delay: number }> = ({ title, children, appear }) => (
  <div style={{
    background: "rgba(15,23,42,0.55)",
    border: `1px solid ${BRAND.blueSoft}`,
    borderRadius: 14, padding: 20,
    boxShadow: `inset 0 0 30px rgba(37,99,235,0.06), 0 0 30px rgba(37,99,235,0.05)`,
    opacity: appear, transform: `translateX(${(1 - appear) * 40}px)`,
    backdropFilter: "none",
  }}>
    <div style={{
      fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.55)",
      fontSize: 11, letterSpacing: 3, marginBottom: 12,
    }}>
      {title}
    </div>
    {children}
  </div>
);

const BigNum: React.FC<{ value: string; color: string }> = ({ value, color }) => (
  <div style={{
    fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 48,
    color, fontVariantNumeric: "tabular-nums", letterSpacing: 1,
    textShadow: color === BRAND.blue ? `0 0 18px ${BRAND.blue}66` : "none",
  }}>
    {value}
  </div>
);

const ProgressBar: React.FC<{ pct: number }> = ({ pct }) => (
  <div style={{ marginTop: 12, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
    <div style={{ width: `${pct * 100}%`, height: "100%", background: BRAND.blue, boxShadow: `0 0 8px ${BRAND.blue}` }} />
  </div>
);

const ArcIndicator: React.FC<{ pct: number }> = ({ pct }) => {
  const r = 26, c = 2 * Math.PI * r;
  return (
    <svg width={70} height={70}>
      <circle cx={35} cy={35} r={r} stroke="rgba(255,255,255,0.1)" strokeWidth={4} fill="none" />
      <circle cx={35} cy={35} r={r} stroke={BRAND.blue} strokeWidth={4} fill="none"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"
        transform={`rotate(-90 35 35)`} style={{ filter: `drop-shadow(0 0 6px ${BRAND.blue})` }} />
    </svg>
  );
};

export const SectionTag: React.FC<{ num: string; label: string }> = ({ num, label }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [4, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", top: 50, left: 80,
      display: "flex", alignItems: "center", gap: 14, opacity: o,
    }}>
      <div style={{ width: 10, height: 10, background: BRAND.blue, boxShadow: `0 0 10px ${BRAND.blue}` }} />
      <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 13, letterSpacing: 4 }}>
        {num} <span style={{ opacity: 0.4, margin: "0 12px" }}>———</span> {label}
      </div>
    </div>
  );
};

const BgGrid: React.FC = () => (
  <AbsoluteFill style={{
    backgroundImage:
      `linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
       linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
    opacity: 0.6,
  }} />
);
