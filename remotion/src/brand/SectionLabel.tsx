import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_SANS } from "../fonts";
import { BRAND } from "./tokens";

export const SectionLabel: React.FC<{
  index: string;
  label: string;
  delay?: number;
}> = ({ index, label, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 22,
  });
  const x = interpolate(s, [0, 1], [-20, 0]);
  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        left: 64,
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity: s,
        transform: `translateX(${x}px)`,
        fontFamily: FONT_SANS,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          background: BRAND.blue,
          boxShadow: `0 0 14px ${BRAND.blue}`,
        }}
      />
      <span
        style={{
          color: BRAND.blue,
          fontSize: 13,
          letterSpacing: "0.36em",
          fontWeight: 600,
        }}
      >
        {index}
      </span>
      <span
        style={{
          width: 36,
          height: 1,
          background: "rgba(37,99,235,0.4)",
        }}
      />
      <span
        style={{
          color: BRAND.white,
          fontSize: 13,
          letterSpacing: "0.36em",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
};
