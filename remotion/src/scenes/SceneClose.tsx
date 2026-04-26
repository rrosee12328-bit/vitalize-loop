import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";

// Final scene — VEKTISS wordmark + tagline. Calm hero close.
export const SceneClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const dotIn = spring({ frame: frame - 4, fps, config: { damping: 12, stiffness: 180 } });
  const wordIn = spring({ frame: frame - 18, fps, config: { damping: 22, stiffness: 130 } });
  const wordY = interpolate(wordIn, [0, 1], [30, 0]);
  const tagIn = spring({ frame: frame - 40, fps, config: { damping: 200 }, durationInFrames: 30 });

  // Sweep underline across tagline
  const sweep = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Soft outro fade on the very last beats
  const fadeOut = interpolate(frame, [durationInFrames - 18, durationInFrames - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Centered wordmark */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              transform: `scale(${dotIn})`,
              width: 38,
              height: 38,
              borderRadius: 999,
              background: COLORS.accent,
              boxShadow: `0 0 0 12px rgba(0,85,255,0.12)`,
            }}
          />
          <div
            style={{
              opacity: wordIn,
              transform: `translateY(${wordY}px)`,
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: 188,
              letterSpacing: "-0.04em",
              color: COLORS.ink,
              lineHeight: 1,
            }}
          >
            VEKTISS
          </div>
        </div>

        <div
          style={{
            opacity: tagIn,
            marginTop: 56,
            position: "relative",
            display: "inline-block",
            fontFamily: FONT_SANS,
            fontWeight: 500,
            fontSize: 42,
            letterSpacing: "-0.015em",
            color: COLORS.ink,
          }}
        >
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: 6,
                height: 14,
                width: `${sweep * 100}%`,
                background: "rgba(0,85,255,0.22)",
                zIndex: -1,
              }}
            />
            Systems, not deliverables.
          </span>
        </div>

        <div
          style={{
            opacity: tagIn * 0.9,
            marginTop: 40,
            fontFamily: FONT_MONO,
            fontSize: 13,
            letterSpacing: "0.28em",
            color: COLORS.muted,
          }}
        >
          VEKTISS.COM
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
