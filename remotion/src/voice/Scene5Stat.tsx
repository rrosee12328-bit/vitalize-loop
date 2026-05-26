import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD } from "./VoiceChrome";

// 0:16.9 - 0:21.8 (147f) — Editorial 85% stat as a dashboard card.
// Big number left, bar chart visualization right showing 85/100 with blue accent bar.
export const Scene5Stat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyeO = spring({ frame: frame - 2, fps, config: { damping: 200 } });
  const counter = Math.round(interpolate(frame, [6, 40], [0, 85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const subO = spring({ frame: frame - 46, fps, config: { damping: 200 }, durationInFrames: 24 });
  const cardIn = spring({ frame: frame - 16, fps, config: { damping: 22, stiffness: 130 } });
  const cardO = spring({ frame: frame - 16, fps, config: { damping: 200 } });
  const cardX = interpolate(cardIn, [0, 1], [40, 0]);

  // bars showing 100 callers — 85 missed (blue), 15 answered (border)
  const bars = Array.from({ length: 20 });
  const fillProgress = interpolate(frame, [22, 60], [0, 17], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>

      <VoiceHUD eyebrow="04 · THE NUMBER" />

      {/* LEFT: editorial stat */}
      <div style={{ position: "absolute", left: 110, top: 200, maxWidth: 620 }}>
        <div
          style={{
            opacity: eyeO,
            fontFamily: FONT_MONO,
            fontSize: 12,
            letterSpacing: "0.24em",
            color: COLORS.accent,
            marginBottom: 24,
          }}
        >
          MISSED CALL DATA · INDUSTRY AVG
        </div>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 220,
            lineHeight: 0.95,
            letterSpacing: "-0.05em",
            color: COLORS.ink,
          }}
        >
          {counter}
          <span style={{ color: COLORS.accent }}>%</span>
        </div>
        <div
          style={{
            opacity: subO,
            marginTop: 18,
            fontFamily: FONT_SANS,
            fontSize: 24,
            color: COLORS.muted,
            maxWidth: 520,
            lineHeight: 1.4,
          }}
        >
          of callers who reach voicemail{" "}
          <span style={{ color: COLORS.ink, fontWeight: 600 }}>never leave a message.</span>{" "}
          They call the next business on Google.
        </div>
      </div>

      {/* RIGHT: chart card */}
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 200,
          width: 460,
          opacity: cardO,
          transform: `translateX(${cardX}px)`,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 18,
          boxShadow: "0 30px 60px -30px rgba(10,22,40,0.18), 0 8px 20px -10px rgba(10,22,40,0.08)",
          padding: 26,
          fontFamily: FONT_SANS,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted }}>
            100 INBOUND CALLERS
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.accent, letterSpacing: "0.1em" }}>
            LIVE
          </div>
        </div>

        <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.ink, letterSpacing: "-0.02em" }}>
          85 lost · 15 reached
        </div>
        <div style={{ marginTop: 4, fontSize: 13, color: COLORS.muted }}>
          Voicemail conversion across service industries
        </div>

        {/* Grid of 20 dots in 4 rows of 5 — each represents 5 callers */}
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
          {bars.map((_, i) => {
            const isMissed = i < 17; // 17/20 = 85%
            const reveal = i < Math.round(fillProgress);
            return (
              <div
                key={i}
                style={{
                  height: 48,
                  borderRadius: 8,
                  background: reveal ? (isMissed ? COLORS.accent : COLORS.border) : COLORS.surface,
                  opacity: reveal ? 1 : 0.5,
                  transition: "all 0.1s",
                }}
              />
            );
          })}
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 18, fontSize: 12, color: COLORS.muted }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: COLORS.accent }} /> Missed · 85
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: COLORS.border }} /> Reached · 15
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
