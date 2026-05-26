import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BRAND } from "./brand";
import { FONT_SANS } from "../fonts";

// 0:13.3 - 0:16.5  (96 frames)
// Glitch. "Here's the truth" white, "truth" flashes red 1 frame. Slow zoom.
export const Scene4Truth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const o = spring({ frame: frame - 4, fps, config: { damping: 200 } });
  const zoom = interpolate(frame, [0, 96], [1.0, 1.08]);

  // glitch shake first 8 frames
  const glitchX = frame < 10 ? (Math.random() < 0.5 ? -4 : 4) * (1 - frame / 10) : 0;
  const glitchY = frame < 10 ? (Math.random() < 0.5 ? -2 : 2) * (1 - frame / 10) : 0;

  const truthRed = frame === 40 || frame === 41;

  return (
    <AbsoluteFill style={{ background: BRAND.navy }}>
      {/* faint scanline glitch */}
      {frame < 12 && (
        <AbsoluteFill
          style={{
            background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 6px)",
            opacity: 1 - frame / 12,
          }}
        />
      )}

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `scale(${zoom}) translate(${glitchX}px, ${glitchY}px)` }}>
        <div
          style={{
            opacity: o,
            fontFamily: FONT_SANS,
            fontWeight: 700,
            fontSize: 86,
            letterSpacing: "-0.025em",
            color: BRAND.white,
            textAlign: "center",
            lineHeight: 1.05,
          }}
        >
          Here's the{" "}
          <span style={{ color: truthRed ? BRAND.red : BRAND.white }}>truth</span>
          <br />
          <span style={{ fontSize: 42, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
            most business owners don't want to hear.
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
