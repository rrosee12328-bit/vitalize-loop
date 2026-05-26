import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 8s — Three stat cards staggering in. Vektiss results-at-a-glance.
export const Scene9StatCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  const cards = [
    { kpi: "24/7", label: "Always on", sub: "Answers in under 2 rings" },
    { kpi: "100%", label: "Every call captured", sub: "Voicemail eliminated" },
    { kpi: "<1s", label: "Routed to your CRM", sub: "Real-time lead score" },
  ];

  return (
    <AbsoluteFill>

      <VoiceHUD eyebrow="07 · WHAT YOU GET" />

      <div style={{ position: "absolute", left: 110, top: 140, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          VEKTISS VOICE
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 190,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 56,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
          lineHeight: 1.05,
        }}
      >
        Built so no call ever drops.
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 340,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {cards.map((c, i) => {
          const delay = 22 + i * 10;
          const s = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 70 } });
          const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 32 });
          const y = interpolate(s, [0, 1], [24, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: o,
                transform: `translateY(${y}px)`,
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 20,
                padding: 30,
                fontFamily: FONT_SANS,
                boxShadow: "0 20px 50px -30px rgba(10,22,40,0.18)",
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.22em", color: COLORS.muted }}>
                0{i + 1}
              </div>
              <div
                style={{
                  fontSize: 88,
                  fontWeight: 600,
                  letterSpacing: "-0.05em",
                  color: COLORS.accent,
                  lineHeight: 1,
                  marginTop: 10,
                }}
              >
                {c.kpi}
              </div>
              <div style={{ marginTop: 16, fontSize: 22, color: COLORS.ink, fontWeight: 600 }}>{c.label}</div>
              <div style={{ marginTop: 6, fontSize: 14, color: COLORS.muted }}>{c.sub}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
