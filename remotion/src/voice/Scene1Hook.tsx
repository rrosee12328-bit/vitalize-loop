import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BRAND } from "./brand";
import { FONT_SANS } from "../fonts";

// 0:00 - 0:02.8  (84 frames)
// Pure black. Pulsing white dot. "If you own a business" slams in letter-by-letter.
// "this is for you." fades in blue below.
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulsing dot for first ~12 frames
  const dotPulse = 1 + Math.sin(frame * 0.45) * 0.25;
  const dotOpacity = interpolate(frame, [0, 4, 14, 18], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  const line1 = "If you own a business";
  const line1Start = 16;
  const perChar = 1.4;

  const line2Start = 56;
  const line2O = spring({ frame: frame - line2Start, fps, config: { damping: 200 }, durationInFrames: 18 });
  const line2Y = interpolate(spring({ frame: frame - line2Start, fps, config: { damping: 22, stiffness: 140 } }), [0, 1], [16, 0]);

  // Subtle vibrate
  const vibX = Math.sin(frame * 3.1) * 0.6;
  const vibY = Math.cos(frame * 2.7) * 0.6;

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* pulsing dot */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 14,
          height: 14,
          marginLeft: -7,
          marginTop: -7,
          borderRadius: 999,
          background: BRAND.white,
          opacity: dotOpacity,
          transform: `scale(${dotPulse})`,
          boxShadow: `0 0 ${20 * dotPulse}px rgba(255,255,255,0.6)`,
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `translate(${vibX}px, ${vibY}px)` }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 800,
              fontSize: 84,
              letterSpacing: "-0.03em",
              color: BRAND.white,
              lineHeight: 1.0,
            }}
          >
            {line1.split("").map((ch, i) => {
              const charFrame = line1Start + i * perChar;
              const o = interpolate(frame, [charFrame, charFrame + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const y = interpolate(frame, [charFrame, charFrame + 4], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <span key={i} style={{ display: "inline-block", opacity: o, transform: `translateY(${y}px)`, whiteSpace: "pre" }}>
                  {ch}
                </span>
              );
            })}
          </div>
          <div
            style={{
              marginTop: 22,
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: 52,
              letterSpacing: "-0.02em",
              color: BRAND.blue,
              opacity: line2O,
              transform: `translateY(${line2Y}px)`,
            }}
          >
            this is for you.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
