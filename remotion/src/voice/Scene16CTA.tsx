import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceHUD } from "./VoiceChrome";

// 8s (240f) — No Questions Asked. The badge stays anchored. Calm + confident.
export const Scene16CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = spring({ frame: frame - 0, fps, config: { damping: 22, stiffness: 70 } });
  const line = spring({ frame: frame - 26, fps, config: { damping: 22, stiffness: 75 } });
  const lineO = spring({ frame: frame - 26, fps, config: { damping: 200 }, durationInFrames: 34 });
  const sub = spring({ frame: frame - 60, fps, config: { damping: 200 }, durationInFrames: 34 });
  const check = spring({ frame: frame - 80, fps, config: { damping: 14, stiffness: 85 } });
  const checkPulse = 1 + Math.sin((frame - 80) * 0.12) * 0.06;

  return (
    <AbsoluteFill>
      <VoiceHUD eyebrow="14 · NO QUESTIONS" />

      {/* Badge — anchored upper center of the content zone */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 405, // stay inside the 875 content zone
          top: 130,
          display: "flex",
          justifyContent: "center",
          opacity: badge,
          transform: `scale(${interpolate(badge, [0, 1], [0.9, 1])})`,
          transformOrigin: "center",
        }}
      >
        <svg width={220} height={220} viewBox="0 0 260 260">
          <defs>
            <path id="nq-ring" d="M 130 130 m -100 0 a 100 100 0 1 1 200 0 a 100 100 0 1 1 -200 0" />
          </defs>
          <circle cx={130} cy={130} r={108} fill="none" stroke={COLORS.accent} strokeWidth={2.5} />
          <circle cx={130} cy={130} r={92} fill={COLORS.accent} />
          <text x={130} y={120} textAnchor="middle" fontFamily={FONT_MONO} fontSize={10} fill="rgba(255,255,255,0.75)" letterSpacing="3">
            30-DAY
          </text>
          <text x={130} y={146} textAnchor="middle" fontFamily={FONT_SANS} fontSize={22} fontWeight={700} fill="#fff" letterSpacing="-0.5">
            MONEY-BACK
          </text>
          <text x={130} y={170} textAnchor="middle" fontFamily={FONT_SANS} fontSize={22} fontWeight={700} fill="#fff" letterSpacing="-0.5">
            GUARANTEE
          </text>
          <text fontFamily={FONT_MONO} fontSize={9} fill={COLORS.accent} letterSpacing="3">
            <textPath href="#nq-ring" startOffset="0">
              VEKTISS VOICE · GUARANTEED · VEKTISS VOICE · GUARANTEED ·
            </textPath>
          </text>
        </svg>
      </div>

      {/* "No Questions Asked." */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 405,
          top: 400,
          textAlign: "center",
          opacity: lineO,
          transform: `translateY(${interpolate(line, [0, 1], [16, 0])}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 700,
          fontSize: 84,
          letterSpacing: "-0.04em",
          color: COLORS.ink,
          lineHeight: 1,
        }}
      >
        No Questions <span style={{ color: COLORS.accent }}>Asked.</span>
      </div>

      {/* Checkmark + supporting line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 405,
          top: 530,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          opacity: sub,
          fontFamily: FONT_SANS,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "#10B981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${check * checkPulse})`,
            boxShadow: `0 0 0 8px rgba(16,185,129,${0.15 + Math.sin((frame - 80) * 0.12) * 0.08})`,
          }}
        >
          <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
            <path d="M5 12l4 4L19 7" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 22, color: COLORS.muted, letterSpacing: "-0.005em" }}>
          If it doesn't perform, you don't pay.
        </div>
      </div>
    </AbsoluteFill>
  );
};
