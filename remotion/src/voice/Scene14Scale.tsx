import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, random } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 10s — Scalability node map. Concurrent calls light up across a dotted field.
export const Scene14Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  const cols = 18;
  const rows = 9;
  const W = 1060;
  const H = 360;
  const dx = W / (cols - 1);
  const dy = H / (rows - 1);

  const counter = Math.round(interpolate(frame, [20, 80], [1, 247], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill>
      <VoiceBackground />
      <VoiceHUD eyebrow="12 · BUILT TO SCALE" />

      <div style={{ position: "absolute", left: 110, top: 130, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          ANY NUMBER OF CALLS. AT ONCE.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 175,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 48,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
          maxWidth: 900,
          lineHeight: 1.05,
        }}
      >
        Fifty calls at 7am? <span style={{ color: COLORS.accent }}>Every one answered.</span>
      </div>

      {/* Node field */}
      <svg width={W} height={H} style={{ position: "absolute", left: 110, top: 310 }}>
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const seed = random(`n-${r}-${c}`);
            const lightUp = seed < interpolate(frame, [10, 90], [0.05, 0.55], { extrapolateRight: "clamp" });
            const phase = (frame / 12) + seed * 6;
            const pulse = lightUp ? 0.6 + Math.sin(phase) * 0.4 : 0.2;
            return (
              <circle
                key={`${r}-${c}`}
                cx={c * dx}
                cy={r * dy}
                r={lightUp ? 5 : 3}
                fill={lightUp ? COLORS.accent : COLORS.border}
                opacity={lightUp ? pulse : 0.5}
              />
            );
          })
        )}
      </svg>

      {/* Counter chip */}
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 250,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: "16px 22px",
          fontFamily: FONT_SANS,
          boxShadow: "0 16px 40px -25px rgba(10,22,40,0.18)",
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", color: COLORS.muted }}>
          CONCURRENT CALLS
        </div>
        <div style={{ fontSize: 56, fontWeight: 600, color: COLORS.accent, letterSpacing: "-0.03em", lineHeight: 1 }}>
          {counter}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>Live · across all customers</div>
      </div>
    </AbsoluteFill>
  );
};
