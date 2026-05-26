import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 8s — Guarantee badge: stamped circle with editorial text.
export const Scene15Guarantee: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);

  const ringIn = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 100 } });
  const wordIn = spring({ frame: frame - 22, fps, config: { damping: 22, stiffness: 130 } });
  const wordO = spring({ frame: frame - 22, fps, config: { damping: 200 }, durationInFrames: 24 });

  const claims = [
    "Live in 7 days · or it's free",
    "30-day money-back",
    "We build the AI for you",
  ];

  return (
    <AbsoluteFill>
      <VoiceBackground />
      <VoiceHUD eyebrow="13 · OUR PROMISE" />

      <div style={{ position: "absolute", left: 110, top: 140, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          GUARANTEE
        </div>
      </div>

      {/* Badge */}
      <svg
        width={340}
        height={340}
        style={{ position: "absolute", left: 130, top: 260, transform: `scale(${0.6 + ringIn * 0.4}) rotate(${(1 - ringIn) * 90}deg)`, transformOrigin: "center", opacity: ringIn }}
        viewBox="0 0 340 340"
      >
        <defs>
          <path id="circle-path" d="M 170 170 m -130 0 a 130 130 0 1 1 260 0 a 130 130 0 1 1 -260 0" />
        </defs>
        <circle cx={170} cy={170} r={150} stroke={COLORS.accent} strokeWidth={2} fill="none" />
        <circle cx={170} cy={170} r={110} fill={COLORS.accent} />
        <text x={170} y={158} textAnchor="middle" fontFamily={FONT_MONO} fontSize={11} fill="rgba(255,255,255,0.7)" letterSpacing="3">
          VEKTISS
        </text>
        <text x={170} y={195} textAnchor="middle" fontFamily={FONT_SANS} fontSize={36} fontWeight={700} fill="#fff" letterSpacing="-1">
          GUARANTEED
        </text>
        <text fontFamily={FONT_MONO} fontSize={10} fill={COLORS.muted} letterSpacing="3">
          <textPath href="#circle-path" startOffset="0">
            ANSWERED · QUALIFIED · BOOKED · ANSWERED · QUALIFIED · BOOKED ·
          </textPath>
        </text>
      </svg>

      {/* Text right */}
      <div
        style={{
          position: "absolute",
          left: 540,
          top: 280,
          right: 110,
          opacity: wordO,
          transform: `translateY(${interpolate(wordIn, [0, 1], [20, 0])}px)`,
          fontFamily: FONT_SANS,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            color: COLORS.ink,
            lineHeight: 1,
          }}
        >
          If we don't <span style={{ color: COLORS.accent }}>book real jobs</span>,
          <br />you don't pay.
        </div>

        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          {claims.map((c, i) => {
            const o = spring({ frame: frame - (50 + i * 12), fps, config: { damping: 200 }, durationInFrames: 18 });
            return (
              <div
                key={i}
                style={{
                  opacity: o,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 20,
                  color: COLORS.ink,
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: 999, background: COLORS.accent }} />
                {c}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
