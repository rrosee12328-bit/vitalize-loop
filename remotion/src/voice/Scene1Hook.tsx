import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";
import { VektissMark } from "./VektissMark";

// 0:00 - 0:02.8 (84f) — Editorial cold open.
// Eyebrow "FOR BUSINESS OWNERS", massive headline letter-by-letter, blue dot pulse to the left.
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eye = useFadeUp(2);
  const line2 = useFadeUp(50);

  const line1 = "If you own a business,";
  const perChar = 1.6;
  const line1Start = 14;

  // Pulsing dot
  const pulse = 1 + Math.sin(frame * 0.35) * 0.18;

  return (
    <AbsoluteFill>

      <VoiceHUD eyebrow="00 · COLD OPEN" />

      <div style={{ position: "absolute", left: 110, top: 220, right: 110 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: eye.opacity,
            transform: `translateY(${eye.y}px)`,
            marginBottom: 36,
          }}
        >
          <VektissMark
            size={22}
            style={{
              transform: `scale(${pulse})`,
              filter: `drop-shadow(0 0 ${10 * pulse}px rgba(0,136,255,0.35))`,
            }}
          />
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 12,
              letterSpacing: "0.24em",
              color: COLORS.accent,
            }}
          >
            FOR BUSINESS OWNERS
          </div>
        </div>

        <div
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 96,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            color: COLORS.ink,
          }}
        >
          {line1.split("").map((ch, i) => {
            const f = line1Start + i * perChar;
            const o = interpolate(frame, [f, f + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const y = interpolate(frame, [f, f + 5], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <span key={i} style={{ display: "inline-block", opacity: o, transform: `translateY(${y}px)`, whiteSpace: "pre" }}>
                {ch}
              </span>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 96,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            color: COLORS.accent,
            opacity: line2.opacity,
            transform: `translateY(${line2.y}px)`,
          }}
        >
          this is for you.
        </div>
      </div>
    </AbsoluteFill>
  );
};
