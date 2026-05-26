import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BRAND } from "./brand";
import { FONT_SANS } from "../fonts";

// 0:16.9 - 0:21.8  (147 frames)
// 85% counter from 0 to 85, massive bold white. Subtitle "never leave a message."
// Dark red glow pulse behind the number.
export const Scene5Stat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // counter races from 0 to 85 across 0-30 frames, then sits
  const counter = Math.round(interpolate(frame, [4, 34], [0, 85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // red glow pulse intensifies as number lands
  const glow = interpolate(frame, [30, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = 0.5 + Math.sin(frame * 0.18) * 0.5;

  const subO = spring({ frame: frame - 44, fps, config: { damping: 200 } });
  const subY = interpolate(spring({ frame: frame - 44, fps, config: { damping: 22, stiffness: 140 } }), [0, 1], [16, 0]);

  // hard stop scale punch when it hits 85
  const punch = frame >= 32 && frame <= 38 ? interpolate(frame, [32, 35, 38], [1.0, 1.06, 1.0]) : 1;

  return (
    <AbsoluteFill style={{ background: BRAND.navy }}>
      {/* red glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(225,29,72,${0.35 * glow * pulse}) 0%, rgba(10,15,44,0) 60%)`,
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 800,
            fontSize: 320,
            letterSpacing: "-0.04em",
            color: BRAND.white,
            lineHeight: 1,
            transform: `scale(${punch})`,
            textShadow: glow > 0 ? `0 0 ${40 * glow * pulse}px rgba(225,29,72,0.5)` : undefined,
          }}
        >
          {counter}%
        </div>
        <div
          style={{
            marginTop: 18,
            opacity: subO,
            transform: `translateY(${subY}px)`,
            fontFamily: FONT_SANS,
            fontWeight: 500,
            fontSize: 36,
            color: "rgba(255,255,255,0.78)",
            letterSpacing: "-0.01em",
          }}
        >
          never leave a message.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
