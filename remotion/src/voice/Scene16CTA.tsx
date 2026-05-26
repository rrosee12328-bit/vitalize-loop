import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 12s — CTA / pricing card. Big editorial type + numbered plan.
export const Scene16CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(10);

  const steps = [
    { n: "01", t: "Book a 15-min strategy call" },
    { n: "02", t: "We build & launch your Vektiss AI" },
    { n: "03", t: "Every call answered. Every lead booked." },
  ];

  return (
    <AbsoluteFill>
      <VoiceBackground />
      <VoiceHUD eyebrow="14 · WHAT'S NEXT" />

      <div style={{ position: "absolute", left: 110, top: 130, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          STOP LOSING CALLS
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          top: 180,
          right: 110,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 92,
          letterSpacing: "-0.05em",
          color: COLORS.ink,
          lineHeight: 0.98,
        }}
      >
        Your next missed call
        <br />
        <span style={{ color: COLORS.accent }}>doesn't have to be one.</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          top: 440,
          right: 110,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
        }}
      >
        {steps.map((s, i) => {
          const delay = 30 + i * 12;
          const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 22 });
          const y = interpolate(o, [0, 1], [16, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: o,
                transform: `translateY(${y}px)`,
                padding: 24,
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 18,
                fontFamily: FONT_SANS,
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: COLORS.accent, letterSpacing: "0.2em" }}>{s.n}</div>
              <div style={{ marginTop: 12, fontSize: 20, color: COLORS.ink, fontWeight: 500 }}>{s.t}</div>
            </div>
          );
        })}
      </div>

      {/* URL bar */}
      {(() => {
        const o = spring({ frame: frame - 80, fps, config: { damping: 22, stiffness: 130 } });
        const oo = spring({ frame: frame - 80, fps, config: { damping: 200 }, durationInFrames: 22 });
        const y = interpolate(o, [0, 1], [16, 0]);
        return (
          <div
            style={{
              position: "absolute",
              left: 110,
              right: 110,
              bottom: 60,
              opacity: oo,
              transform: `translateY(${y}px)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: COLORS.accent,
              color: "#fff",
              padding: "22px 28px",
              borderRadius: 18,
              fontFamily: FONT_SANS,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 600 }}>Book your demo →</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 18, letterSpacing: "0.1em" }}>vektiss.com</div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
