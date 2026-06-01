import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BRAND } from "./tokens";
import { SectionTag } from "./Scene3Intelligence";

// 300 frames — Voice: phone card center, sonar rings, transcript panel right
export const Scene4Voice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardAppear = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 110 } });
  const seconds = Math.max(3, Math.floor(frame / 30));
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  // Sonar rings
  const ringCount = 5;

  const transcriptStart = 70;
  const lines = [
    { speaker: "CALLER", text: "Hi, do y'all do same-day appointments?", t: 0 },
    { speaker: "AI", text: "Absolutely — let me grab your info real quick.", t: 50 },
    { speaker: "AI", text: "What's the best name for your account?", t: 100 },
  ];

  const tagStart = transcriptStart + 170;
  const emailStart = tagStart + 30;

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg }}>
      <BgGridDots />
      <SectionTag num="02" label="VOICE" />

      {/* Sonar rings */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 1, height: 1 }}>
          {Array.from({ length: ringCount }).map((_, i) => {
            const cycle = 90;
            const phase = ((frame + i * (cycle / ringCount)) % cycle) / cycle;
            const size = 200 + phase * 1500;
            const op = (1 - phase) * 0.45;
            return (
              <div key={i} style={{
                position: "absolute",
                left: -size / 2, top: -size / 2,
                width: size, height: size, borderRadius: "50%",
                border: `2px solid ${BRAND.blue}`, opacity: op,
                boxShadow: `0 0 30px ${BRAND.blue}, inset 0 0 30px ${BRAND.blue}`,
              }} />
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Phone card center */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 420, height: 320, borderRadius: 28,
          background: "rgba(10,15,30,0.85)",
          border: `1.5px solid ${BRAND.blue}`,
          boxShadow: `0 0 60px rgba(37,99,235,0.5), inset 0 0 40px rgba(37,99,235,0.15)`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 22, padding: 32, opacity: cardAppear,
          transform: `scale(${0.85 + cardAppear * 0.15})`,
        }}>
          <PhoneIcon pulse={frame} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
            <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 18, letterSpacing: 4, fontWeight: 600 }}>
              ON CALL · LIVE
            </div>
          </div>
          <div style={{
            fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 42,
            color: BRAND.blue, letterSpacing: 4, fontVariantNumeric: "tabular-nums",
            textShadow: `0 0 14px ${BRAND.blue}66`,
          }}>
            {mm}:{ss}
          </div>
        </div>
      </AbsoluteFill>

      {/* Transcript panel right */}
      <div style={{
        position: "absolute", right: 70, top: 200, width: 640,
        background: "rgba(10,15,30,0.85)",
        border: `1px solid ${BRAND.blueSoft}`, borderRadius: 14,
        padding: 28, opacity: interpolate(frame, [transcriptStart - 10, transcriptStart + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        transform: `translateX(${interpolate(frame, [transcriptStart - 20, transcriptStart + 10], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        boxShadow: `0 0 40px rgba(37,99,235,0.15)`,
      }}>
        <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 11, letterSpacing: 4, marginBottom: 18 }}>
          CALL TRANSCRIPT
        </div>
        {lines.map((line, i) => (
          <TranscriptLine key={i} line={line} startFrame={transcriptStart + line.t} />
        ))}

        {/* Intake form sent tag */}
        <div style={{
          marginTop: 24,
          display: "inline-flex", alignItems: "center", gap: 10,
          background: BRAND.blue, color: "#fff",
          padding: "10px 18px", borderRadius: 6,
          fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2,
          opacity: interpolate(frame, [tagStart, tagStart + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(frame, [tagStart, tagStart + 12], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          boxShadow: `0 0 20px ${BRAND.blue}`,
        }}>
          ✓ INTAKE FORM SENT
        </div>
      </div>

      {/* email notification drops from top */}
      <div style={{
        position: "absolute", top: interpolate(frame, [emailStart, emailStart + 20], [-100, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        left: 80, width: 460,
        background: "rgba(15,23,42,0.95)",
        border: `1px solid ${BRAND.blue}`, borderRadius: 10,
        padding: 18, opacity: interpolate(frame, [emailStart, emailStart + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        boxShadow: `0 8px 30px rgba(0,0,0,0.6), 0 0 20px ${BRAND.blue}55`,
        fontFamily: "Inter, sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: BRAND.blue, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>✉</div>
          <div style={{ color: BRAND.blue, fontSize: 11, letterSpacing: 3, fontWeight: 700 }}>NEW LEAD ALERT</div>
        </div>
        <div style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Form Delivered</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 2 }}>Just now</div>
      </div>
    </AbsoluteFill>
  );
};

const PhoneIcon: React.FC<{ pulse: number }> = ({ pulse }) => {
  const s = 1 + Math.sin(pulse / 8) * 0.06;
  return (
    <div style={{
      width: 76, height: 76, borderRadius: "50%",
      background: BRAND.blue,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 30px ${BRAND.blue}, 0 0 60px ${BRAND.blue}66`,
      transform: `scale(${s})`,
    }}>
      <svg width={36} height={36} viewBox="0 0 24 24" fill="#fff">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.5.1.4 0 .8-.2 1l-2.3 2.3z"/>
      </svg>
    </div>
  );
};

const TranscriptLine: React.FC<{ line: { speaker: string; text: string }; startFrame: number }> = ({ line, startFrame }) => {
  const frame = useCurrentFrame();
  const chars = Math.max(0, Math.floor((frame - startFrame) * 1.4));
  const visible = line.text.slice(0, chars);
  const o = interpolate(frame, [startFrame - 5, startFrame + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const isAI = line.speaker === "AI";
  return (
    <div style={{ marginBottom: 16, opacity: o, fontFamily: "Inter, sans-serif" }}>
      <div style={{ fontSize: 11, letterSpacing: 3, color: isAI ? BRAND.blue : "rgba(255,255,255,0.55)", marginBottom: 4 }}>
        {line.speaker}
      </div>
      <div style={{ color: "#fff", fontSize: 19, lineHeight: 1.4 }}>
        {visible}
        {chars < line.text.length && <span style={{ opacity: 0.6 }}>▌</span>}
      </div>
    </div>
  );
};

const BgGridDots: React.FC = () => (
  <AbsoluteFill style={{
    backgroundImage: `radial-gradient(rgba(37,99,235,0.18) 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
    opacity: 0.5,
  }} />
);
