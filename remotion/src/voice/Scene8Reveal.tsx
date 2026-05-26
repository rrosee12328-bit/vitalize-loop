import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground } from "./VoiceChrome";
import { VektissMark } from "./VektissMark";

// 6s — Vektiss logo reveal at the 0:31 mark. From here, the brand bug
// stays pinned top-right for the rest of the video (via VoiceHUDPinned in later scenes).
export const Scene8Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrow = spring({ frame: frame - 4, fps, config: { damping: 200 }, durationInFrames: 20 });
  const dot = spring({ frame: frame - 14, fps, config: { damping: 12, stiffness: 180 } });
  const word = spring({ frame: frame - 26, fps, config: { damping: 22, stiffness: 130 } });
  const wordX = interpolate(word, [0, 1], [-24, 0]);
  const sub = spring({ frame: frame - 60, fps, config: { damping: 200 }, durationInFrames: 24 });
  const ringScale = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 80 } });

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
        <div
          style={{
            opacity: eyebrow,
            fontFamily: FONT_MONO,
            fontSize: 13,
            letterSpacing: "0.32em",
            color: COLORS.muted,
            marginBottom: 36,
          }}
        >
          MEET THE FIX
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* Logo mark */}
          <div style={{ position: "relative", width: 130, height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: `2px solid ${COLORS.accent}`,
                transform: `scale(${1 + ringScale * 1.1})`,
                opacity: Math.max(0, 1 - ringScale),
              }}
            />
            <VektissMark
              size={130}
              style={{
                transform: `scale(${0.4 + dot * 0.6})`,
                opacity: dot,
                filter: "drop-shadow(0 8px 30px rgba(0,136,255,0.35))",
              }}
            />
          </div>

          {/* Wordmark */}
          <div
            style={{
              opacity: word,
              transform: `translateX(${wordX}px)`,
              fontWeight: 700,
              fontSize: 180,
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
            opacity: sub,
            marginTop: 28,
            fontSize: 24,
            color: COLORS.muted,
            letterSpacing: "-0.01em",
          }}
        >
          AI Voice that answers every call. <span style={{ color: COLORS.accent, fontWeight: 600 }}>Day or night.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
