import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, Img, staticFile } from "remotion";

const BLUE = "#2563EB";

// 150 frames - 4 closeups, ~37f each
const SHOT = 37;

export const HeroScene3Closeups: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0F1E" }}>
      <Img src={staticFile("brand/vektiss-lockup-light.png")} style={{
        position: "absolute", top: 32, left: 56, width: 180, height: 50, objectFit: "contain", zIndex: 10,
      }} />
      <AbsoluteFill style={{
        backgroundImage: `linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      <Sequence from={0} durationInFrames={SHOT}><ShotWrap label="INTELLIGENCE"><IntelClose /></ShotWrap></Sequence>
      <Sequence from={SHOT} durationInFrames={SHOT}><ShotWrap label="VOICE"><VoiceClose /></ShotWrap></Sequence>
      <Sequence from={SHOT * 2} durationInFrames={SHOT}><ShotWrap label="SITES"><SitesClose /></ShotWrap></Sequence>
      <Sequence from={SHOT * 3} durationInFrames={SHOT + 2}><ShotWrap label="MEDIA"><MediaClose /></ShotWrap></Sequence>
    </AbsoluteFill>
  );
};

const ShotWrap: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 6, SHOT - 6, SHOT], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o, alignItems: "center", justifyContent: "center" }}>
      <div style={{
        position: "absolute", top: 100, left: 80,
        fontFamily: "Inter, sans-serif", color: BLUE, fontWeight: 700, fontSize: 14,
        letterSpacing: 6, textShadow: `0 0 10px ${BLUE}66`,
      }}>{label}</div>
      {children}
    </AbsoluteFill>
  );
};

const IntelClose: React.FC = () => {
  const frame = useCurrentFrame();
  const value = Math.floor(interpolate(frame, [0, SHOT], [1180, 1287], { extrapolateRight: "clamp" }));
  return (
    <div style={{
      background: "rgba(13,20,36,0.95)", border: `1.5px solid ${BLUE}`, borderRadius: 18,
      padding: 48, display: "flex", flexDirection: "column", gap: 20, minWidth: 720,
      boxShadow: `0 0 60px rgba(37,99,235,0.4)`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%", background: "#22c55e",
          boxShadow: "0 0 10px #22c55e", opacity: 0.6 + 0.4 * Math.sin(frame / 4),
        }} />
        <span style={{ fontFamily: "Inter, sans-serif", color: "#22c55e", fontSize: 13, letterSpacing: 3, fontWeight: 700 }}>LIVE</span>
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 14, letterSpacing: 3 }}>CALLS TODAY</div>
      <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 800, fontSize: 120, letterSpacing: -3, lineHeight: 1 }}>
        {value.toLocaleString()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        {[0, 1, 2].map((i) => {
          const o = interpolate(frame, [8 + i * 5, 16 + i * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              opacity: o, padding: "8px 14px", borderRadius: 6,
              background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.3)",
              display: "flex", justifyContent: "space-between",
              fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 14,
            }}>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>Lead #{2847 + i}</span>
              <span style={{ color: BLUE, fontWeight: 700 }}>+ captured</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const VoiceClose: React.FC = () => {
  const frame = useCurrentFrame();
  const line1 = "Caller: Do you have availability today?";
  const line2 = "AI: Yes — I can help get you scheduled.";
  const t1 = Math.floor(interpolate(frame, [2, 16], [0, line1.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const t2 = Math.floor(interpolate(frame, [18, 30], [0, line2.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const tag = interpolate(frame, [30, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      background: "rgba(13,20,36,0.95)", border: `1.5px solid ${BLUE}`, borderRadius: 18,
      padding: 40, display: "flex", flexDirection: "column", gap: 16, minWidth: 820,
      boxShadow: `0 0 60px rgba(37,99,235,0.4)`,
    }}>
      <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 13, letterSpacing: 3 }}>CALL TRANSCRIPT</div>
      <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 26, fontWeight: 500, minHeight: 38 }}>
        {line1.slice(0, t1)}{t1 < line1.length && frame % 6 < 3 ? "|" : ""}
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", color: BLUE, fontSize: 26, fontWeight: 600, minHeight: 38, textShadow: `0 0 10px ${BLUE}33` }}>
        {line2.slice(0, t2)}{t2 > 0 && t2 < line2.length && frame % 6 < 3 ? "|" : ""}
      </div>
      <div style={{
        alignSelf: "flex-start", marginTop: 8, padding: "10px 18px",
        background: BLUE, borderRadius: 8, opacity: tag,
        boxShadow: `0 0 20px ${BLUE}`,
        fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: 2,
      }}>✓ LEAD CAPTURED</div>
    </div>
  );
};

const SitesClose: React.FC = () => {
  const frame = useCurrentFrame();
  const snap = interpolate(frame, [0, 12], [0.92, 1], { extrapolateRight: "clamp" });
  const o = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", transform: `scale(${snap})`, opacity: o }}>
      {/* desktop */}
      <div style={{
        width: 820, height: 480, background: "rgba(8,12,22,0.95)",
        border: `1.5px solid ${BLUE}`, borderRadius: 14, padding: 18,
        display: "flex", flexDirection: "column", gap: 14,
        boxShadow: `0 0 60px rgba(37,99,235,0.4)`,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.6 }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
          <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 800, fontSize: 36 }}>Premium systems.</div>
          <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 16 }}>Built in-house. Built for you.</div>
          <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 70, background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: 6 }} />
            ))}
          </div>
          <div style={{
            marginTop: "auto", alignSelf: "flex-start", padding: "10px 20px",
            background: BLUE, borderRadius: 6, color: "#fff",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2,
            boxShadow: `0 0 16px ${BLUE}`,
          }}>GET STARTED</div>
        </div>
      </div>
      {/* mobile */}
      <div style={{
        width: 180, height: 380, background: "rgba(8,12,22,0.95)",
        border: `1.5px solid ${BLUE}`, borderRadius: 22, padding: 12,
        display: "flex", flexDirection: "column", gap: 8,
        boxShadow: `0 0 40px rgba(37,99,235,0.35)`,
      }}>
        <div style={{ height: 60, background: `linear-gradient(135deg, ${BLUE}, rgba(37,99,235,0.2))`, borderRadius: 8 }} />
        <div style={{ height: 30, background: "rgba(37,99,235,0.15)", borderRadius: 6 }} />
        <div style={{ height: 30, background: "rgba(37,99,235,0.15)", borderRadius: 6 }} />
        <div style={{ marginTop: "auto", height: 32, background: BLUE, borderRadius: 6 }} />
      </div>
    </div>
  );
};

const MediaClose: React.FC = () => {
  const frame = useCurrentFrame();
  const cards = [
    { text: "Always Answered.", x: -360, y: -80, delay: 0 },
    { text: "Systems, not deliverables.", x: 360, y: -120, delay: 5 },
    { text: "3.2x lead capture.", x: -300, y: 120, delay: 10 },
    { text: "Behind the Build.", x: 320, y: 100, delay: 15 },
  ];
  return (
    <div style={{ position: "relative", width: 1, height: 1 }}>
      {cards.map((c, i) => {
        const sp = interpolate(frame, [c.delay, c.delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const z = interpolate(sp, [0, 1], [0.7, 1]);
        return (
          <div key={i} style={{
            position: "absolute",
            left: c.x, top: c.y,
            transform: `translate(-50%, -50%) scale(${z})`,
            opacity: sp,
            padding: "26px 36px",
            background: "rgba(13,20,36,0.95)",
            border: `1.5px solid ${BLUE}`,
            borderRadius: 14,
            boxShadow: `0 0 30px rgba(37,99,235,0.4)`,
            fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 700, fontSize: 28,
            whiteSpace: "nowrap",
          }}>
            "{c.text}"
          </div>
        );
      })}
    </div>
  );
};
