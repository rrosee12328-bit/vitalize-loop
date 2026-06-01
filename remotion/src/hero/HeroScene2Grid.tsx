import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

const BLUE = "#2563EB";

// 150 frames - 2x2 product panels slide in
export const HeroScene2Grid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panels = [
    { x: 0, y: 0, label: "INTELLIGENCE", render: () => <IntelligencePanel frame={frame} /> },
    { x: 1, y: 0, label: "VOICE", render: () => <VoicePanel frame={frame} /> },
    { x: 0, y: 1, label: "SITES", render: () => <SitesPanel frame={frame} /> },
    { x: 1, y: 1, label: "MEDIA", render: () => <MediaPanel frame={frame} /> },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0F1E" }}>
      {/* Logo bug top-left */}
      <Img src={staticFile("brand/vektiss-lockup-light.png")} style={{
        position: "absolute", top: 32, left: 56, width: 180, height: 50, objectFit: "contain",
      }} />

      {/* Subtle grid */}
      <AbsoluteFill style={{
        backgroundImage: `linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      <div style={{
        position: "absolute", inset: "120px 80px 60px 80px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 28,
      }}>
        {panels.map((p, i) => {
          const delay = i * 6;
          const sp = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 110 } });
          const dx = (p.x === 0 ? -1 : 1) * (1 - sp) * 60;
          const dy = (p.y === 0 ? -1 : 1) * (1 - sp) * 40;
          return (
            <div key={i} style={{
              opacity: sp,
              transform: `translate(${dx}px, ${dy}px)`,
              background: "rgba(13,20,36,0.85)",
              border: `1.5px solid ${BLUE}`,
              borderRadius: 18,
              boxShadow: `0 0 40px rgba(37,99,235,0.35), inset 0 0 40px rgba(37,99,235,0.06)`,
              padding: 28,
              display: "flex", flexDirection: "column", gap: 18, overflow: "hidden",
            }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{
                  fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 16,
                  letterSpacing: 4, color: BLUE, textShadow: `0 0 10px ${BLUE}66`,
                }}>{p.label}</div>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: BLUE,
                  boxShadow: `0 0 10px ${BLUE}`,
                  opacity: 0.6 + 0.4 * Math.sin(frame / 6),
                }} />
              </div>
              <div style={{ flex: 1, display: "flex" }}>{p.render()}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Row: React.FC<{ label: string; value: string; delay?: number; frame: number }> = ({ label, value, delay = 0, frame }) => {
  const o = interpolate(frame, [30 + delay, 45 + delay], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 14px", background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(37,99,235,0.2)", borderRadius: 8, opacity: o,
    }}>
      <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 13, letterSpacing: 1 }}>{label}</span>
      <span style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 18, fontWeight: 700 }}>{value}</span>
    </div>
  );
};

const IntelligencePanel: React.FC<{ frame: number }> = ({ frame }) => {
  const calls = Math.floor(interpolate(frame, [20, 130], [0, 1287], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const leads = Math.floor(interpolate(frame, [25, 130], [0, 94], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      <Row label="Calls Today" value={calls.toLocaleString()} delay={0} frame={frame} />
      <Row label="Leads Captured" value={String(leads)} delay={6} frame={frame} />
      <Row label="Answer Rate" value="99.2%" delay={12} frame={frame} />
      <Row label="Avg Response" value="1.4s" delay={18} frame={frame} />
    </div>
  );
};

const VoicePanel: React.FC<{ frame: number }> = ({ frame }) => {
  const items = ["Incoming Call", "Live Transcript", "Intake Form Sent", "New Lead Captured"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      {items.map((t, i) => {
        const o = interpolate(frame, [25 + i * 12, 40 + i * 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, opacity: o,
            padding: "10px 14px", borderRadius: 8,
            background: i === 3 ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${i === 3 ? BLUE : "rgba(37,99,235,0.2)"}`,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: BLUE, boxShadow: `0 0 8px ${BLUE}` }} />
            <span style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 15, fontWeight: 500 }}>{t}</span>
          </div>
        );
      })}
    </div>
  );
};

const SitesPanel: React.FC<{ frame: number }> = ({ frame }) => {
  const o = interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", gap: 14, width: "100%", alignItems: "stretch", opacity: o }}>
      {/* desktop */}
      <div style={{
        flex: 2, background: "rgba(8,12,22,0.9)", border: "1px solid rgba(37,99,235,0.3)",
        borderRadius: 10, padding: 10, display: "flex", flexDirection: "column", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 4 }}>
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.5 }} />
          ))}
        </div>
        <div style={{ height: 32, background: `linear-gradient(90deg, ${BLUE}, transparent)`, borderRadius: 4, opacity: 0.7 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 40, background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: 4 }} />
          ))}
        </div>
        <div style={{ marginTop: "auto", height: 22, width: 80, background: BLUE, borderRadius: 4, boxShadow: `0 0 12px ${BLUE}` }} />
      </div>
      {/* mobile */}
      <div style={{
        width: 70, background: "rgba(8,12,22,0.9)", border: "1px solid rgba(37,99,235,0.3)",
        borderRadius: 10, padding: 6, display: "flex", flexDirection: "column", gap: 4,
      }}>
        <div style={{ height: 18, background: `linear-gradient(90deg, ${BLUE}, transparent)`, borderRadius: 3, opacity: 0.7 }} />
        <div style={{ height: 14, background: "rgba(37,99,235,0.15)", borderRadius: 3 }} />
        <div style={{ height: 14, background: "rgba(37,99,235,0.15)", borderRadius: 3 }} />
        <div style={{ marginTop: "auto", height: 14, background: BLUE, borderRadius: 3 }} />
      </div>
    </div>
  );
};

const MediaPanel: React.FC<{ frame: number }> = ({ frame }) => {
  const cards = [
    { w: 90, h: 130, label: "REEL" },
    { w: 110, h: 110, label: "POST" },
    { w: 90, h: 130, label: "SHORT" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
        {cards.map((c, i) => {
          const o = interpolate(frame, [25 + i * 8, 40 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = interpolate(frame, [25 + i * 8, 40 + i * 8], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              width: c.w, height: c.h, opacity: o, transform: `translateY(${y}px)`,
              background: "rgba(37,99,235,0.18)", border: `1px solid ${BLUE}`, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 11, letterSpacing: 2, fontWeight: 700,
            }}>{c.label}</div>
          );
        })}
      </div>
      <div style={{
        marginTop: "auto", padding: "10px 14px", borderRadius: 8,
        background: "rgba(37,99,235,0.18)", border: `1px solid ${BLUE}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: 12, letterSpacing: 2 }}>ENGAGEMENT</span>
        <span style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 800, fontSize: 18 }}>↑ 3.2x</span>
      </div>
    </div>
  );
};
