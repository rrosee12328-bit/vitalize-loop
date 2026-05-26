import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground } from "./VoiceChrome";
import { VektissMark } from "./VektissMark";

// 6s — Quiet close. Wordmark + tagline + URL, lots of negative space.
export const Scene17Close: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dot = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 180 } });
  const word = spring({ frame: frame - 14, fps, config: { damping: 22, stiffness: 130 } });
  const tag = spring({ frame: frame - 36, fps, config: { damping: 200 }, durationInFrames: 24 });
  const url = spring({ frame: frame - 70, fps, config: { damping: 200 }, durationInFrames: 24 });

  return (
    <AbsoluteFill>
      <VoiceBackground />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_SANS,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <VektissMark
            size={96}
            style={{
              transform: `scale(${dot})`,
              filter: "drop-shadow(0 6px 24px rgba(0,136,255,0.35))",
            }}
          />
          <div
            style={{
              opacity: word,
              transform: `translateY(${interpolate(word, [0, 1], [10, 0])}px)`,
              fontSize: 120,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              color: COLORS.ink,
              lineHeight: 0.9,
            }}
          >
            Vektiss
          </div>
        </div>

        <div
          style={{
            opacity: tag,
            marginTop: 28,
            fontSize: 22,
            color: COLORS.muted,
            letterSpacing: "-0.005em",
          }}
        >
          AI Voice that never misses a call.
        </div>

        <div
          style={{
            opacity: url,
            marginTop: 60,
            fontFamily: FONT_MONO,
            fontSize: 14,
            letterSpacing: "0.3em",
            color: COLORS.accent,
          }}
        >
          VEKTISS.COM
        </div>
      </div>
    </AbsoluteFill>
  );
};
