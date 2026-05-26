import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";

// Persistent editorial background — matches site / MainVideo aesthetic.
// Warm off-white, hairline grid, soft Vektiss-blue radial wash, gentle vignette.
export const VoiceBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const drift = interpolate(frame, [0, durationInFrames], [0, 1]);
  const dotX = interpolate(drift, [0, 1], [-200, 200]);
  const dotY = interpolate(drift, [0, 1], [-100, 100]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 700px at ${50 + dotX / 20}% ${40 + dotY / 20}%, rgba(0,136,255,0.08), transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(23,23,23,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,23,23,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.7,
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(10,22,40,0.05) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Editorial HUD bug — sits top-right like the site logo and top-left wordmark.
export const VoiceHUD: React.FC<{ eyebrow?: string }> = ({ eyebrow = "VEKTISS VOICE · 60s" }) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 36,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: FONT_SANS,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: COLORS.accent,
            boxShadow: "0 0 0 3px rgba(0,136,255,0.12)",
          }}
        />
        <span style={{ color: COLORS.ink, fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>
          VEKTISS
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 32,
          right: 36,
          fontFamily: FONT_MONO,
          fontSize: 10,
          letterSpacing: "0.22em",
          color: COLORS.muted,
        }}
      >
        {eyebrow}
      </div>
    </AbsoluteFill>
  );
};

// Helper: spring-driven y-translate + opacity in
export const useFadeUp = (delay: number, distance = 28) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 140 } });
  const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 24 });
  return { opacity: o, y: interpolate(s, [0, 1], [distance, 0]) };
};
