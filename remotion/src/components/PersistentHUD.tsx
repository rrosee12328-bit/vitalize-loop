import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";

// Persistent HUD: tiny mono frame info — feels like a product spec sheet.
export const PersistentHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const inOpacity = spring({ frame: frame - 6, fps, config: { damping: 200 }, durationInFrames: 30 });
  const outOpacity = interpolate(frame, [durationInFrames - 30, durationInFrames - 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(inOpacity, outOpacity);

  const sec = (frame / fps).toFixed(2);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {/* top-left wordmark */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 64,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: FONT_SANS,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: COLORS.accent,
            boxShadow: `0 0 0 4px rgba(0,85,255,0.12)`,
          }}
        />
        <span
          style={{
            color: COLORS.ink,
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: "-0.01em",
          }}
        >
          VEKTISS
        </span>
      </div>

      {/* top-right eyebrow */}
      <div
        style={{
          position: "absolute",
          top: 64,
          right: 64,
          fontFamily: FONT_MONO,
          fontSize: 12,
          letterSpacing: "0.18em",
          color: COLORS.muted,
        }}
      >
        SYSTEMS · NOT DELIVERABLES
      </div>

      {/* bottom-left timecode */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 64,
          fontFamily: FONT_MONO,
          fontSize: 12,
          letterSpacing: "0.18em",
          color: COLORS.muted,
        }}
      >
        T+{sec}s
      </div>

      {/* bottom-right counter */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          right: 64,
          fontFamily: FONT_MONO,
          fontSize: 12,
          letterSpacing: "0.18em",
          color: COLORS.muted,
        }}
      >
        VEKTISS / 2026
      </div>
    </AbsoluteFill>
  );
};
