import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_SANS } from "../fonts";
import { BRAND } from "./tokens";
import { BrandBackground } from "./BrandBackground";
import { SectionLabel } from "./SectionLabel";

// Scene 4 — VOICE. 600f / 20s.
// Pulsing phone icon center, expanding sound rings, transcript panel from right.
const PULSE_EVERY = 60; // every 2s

const LINES = [
  { t: "00:01", who: "CALLER", text: "Hi, do y'all do same-day appointments?" },
  { t: "00:02", who: "VEKTISS", text: "Yes — we have an opening at 3:40 PM today." },
  { t: "00:04", who: "CALLER", text: "Perfect. Can you text me the details?" },
  { t: "00:05", who: "VEKTISS", text: "Sending the intake form now." },
  { t: "00:07", who: "SYSTEM", text: "✓ Intake form delivered" },
  { t: "00:08", who: "SYSTEM", text: "✓ Owner alert sent" },
];

export const Scene4Voice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulse intensity
  const pulsePhase = (frame % PULSE_EVERY) / PULSE_EVERY;
  const phoneScale = 1 + Math.max(0, Math.sin(pulsePhase * Math.PI)) * 0.08;

  return (
    <AbsoluteFill>
      <BrandBackground />
      <SectionLabel index="02" label="VOICE" />

      {/* Concentric rings */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const ringDelay = i * 18;
          const local = (frame - ringDelay) % 90;
          if (local < 0) return null;
          const p = local / 90;
          const size = 200 + p * 700;
          const op = (1 - p) * 0.55;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size,
                height: size,
                left: "50%",
                top: "50%",
                marginLeft: -size / 2,
                marginTop: -size / 2,
                borderRadius: "50%",
                border: `1.5px solid ${BRAND.blue}`,
                opacity: op,
              }}
            />
          );
        })}

        {/* Phone icon */}
        <div
          style={{
            position: "absolute",
            left: 660,
            top: 380,
            width: 240,
            height: 320,
            borderRadius: 32,
            background: "rgba(10,20,40,0.75)",
            border: `2px solid ${BRAND.blue}`,
            boxShadow: `0 0 ${40 + phoneScale * 40}px rgba(37,99,235,0.55)`,
            transform: `scale(${phoneScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT_SANS,
            color: BRAND.white,
          }}
        >
          <svg width={80} height={80} viewBox="0 0 24 24" fill="none">
            <path
              d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.24 1.05l-2.21 2.17z"
              fill={BRAND.blue}
            />
          </svg>
          <div
            style={{
              marginTop: 16,
              fontSize: 11,
              letterSpacing: "0.3em",
              color: BRAND.textDim,
            }}
          >
            ON CALL · LIVE
          </div>
          <div style={{ marginTop: 6, fontSize: 22, fontWeight: 600 }}>
            {String(Math.floor(frame / 30)).padStart(2, "0")}:
            {String(frame % 30 * 3 % 60).padStart(2, "0")}
          </div>
        </div>
      </AbsoluteFill>

      {/* Transcript panel from right */}
      <TranscriptPanel />
    </AbsoluteFill>
  );
};

const TranscriptPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panel = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
    durationInFrames: 36,
  });
  const x = interpolate(panel, [0, 1], [120, 0]);
  return (
    <div
      style={{
        position: "absolute",
        right: 80,
        top: 200,
        width: 560,
        opacity: panel,
        transform: `translateX(${x}px)`,
        padding: "24px 24px",
        borderRadius: 18,
        background: "rgba(10,20,40,0.7)",
        border: `1px solid ${BRAND.hairline}`,
        boxShadow: `0 30px 60px rgba(0,0,0,0.45)`,
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            color: BRAND.textDim,
            fontSize: 11,
            letterSpacing: "0.28em",
            fontWeight: 600,
          }}
        >
          CALL TRANSCRIPT
        </div>
        <div
          style={{
            color: BRAND.blue,
            fontSize: 11,
            letterSpacing: "0.22em",
          }}
        >
          ● RECORDING
        </div>
      </div>

      {LINES.map((l, i) => {
        const delay = 70 + i * 50;
        const s = spring({
          frame: frame - delay,
          fps,
          config: { damping: 200 },
          durationInFrames: 22,
        });
        const isSystem = l.who === "SYSTEM";
        const isAI = l.who === "VEKTISS";
        return (
          <div
            key={i}
            style={{
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
              display: "flex",
              gap: 12,
              padding: "10px 0",
              borderTop: i === 0 ? "none" : `1px solid ${BRAND.hairline}`,
            }}
          >
            <span
              style={{
                color: BRAND.textMute,
                fontSize: 11,
                fontVariantNumeric: "tabular-nums",
                width: 44,
                paddingTop: 3,
              }}
            >
              {l.t}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: isAI ? BRAND.blue : isSystem ? BRAND.textDim : BRAND.white,
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                {l.who}
              </div>
              <div
                style={{
                  color: isSystem ? BRAND.blue : BRAND.white,
                  fontSize: 15,
                  lineHeight: 1.4,
                }}
              >
                {l.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
