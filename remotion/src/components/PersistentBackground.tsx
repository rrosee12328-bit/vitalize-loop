import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../theme";

// Persistent layer: subtle warm-paper grain + slow drifting blue dot accent.
// Visible across every scene to bind the piece together.
export const PersistentBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow horizontal drift across the whole video
  const drift = interpolate(frame, [0, durationInFrames], [0, 1]);
  const dotX = interpolate(drift, [0, 1], [-200, 200]);
  const dotY = interpolate(drift, [0, 1], [-100, 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Soft radial wash */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 700px at ${50 + dotX / 20}% ${40 + dotY / 20}%, rgba(0,85,255,0.08), transparent 60%)`,
        }}
      />
      {/* Hairline grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(23,23,23,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,23,23,0.04) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          opacity: 0.7,
        }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(10,22,40,0.06) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
