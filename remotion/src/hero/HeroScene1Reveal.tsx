import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from "remotion";

const BLUE = "#2563EB";
const NAVY = "#0A0F1E";

// 90 frames (3s) - intro frame → navy, logo shrinks to top-left, headline + sub, scan line
export const HeroScene1Reveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Background invert 0-25
  const bgT = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const bg = `rgb(${Math.round(245 - bgT * (245 - 10))}, ${Math.round(247 - bgT * (247 - 15))}, ${Math.round(250 - bgT * (250 - 30))})`;
  const gridOpacity = interpolate(frame, [0, 30], [0.85, 0], { extrapolateRight: "clamp" });

  // Logo drift
  const driftT = interpolate(frame, [5, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoX = interpolate(driftT, [0, 1], [960, 140]);
  const logoY = interpolate(driftT, [0, 1], [540, 60]);
  const logoScale = interpolate(driftT, [0, 1], [1, 0.2]);

  // Headline
  const h1Start = 38;
  const subStart = 56;
  const scanStart = 30;

  const scanX = interpolate(frame, [scanStart, scanStart + 35], [-200, 2120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scanOpacity = interpolate(frame, [scanStart, scanStart + 5, scanStart + 30, scanStart + 35], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      {/* circuit grid intro frame fading out */}
      <AbsoluteFill style={{ opacity: gridOpacity }}>
        <Img src={staticFile("intro-frames/f_0151.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      {/* Subtle dark grid after invert */}
      {frame > 20 && (
        <AbsoluteFill style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" }),
        }} />
      )}

      {/* Scan line */}
      <div style={{
        position: "absolute", top: 0, left: scanX, width: 3, height: "100%",
        background: BLUE, boxShadow: `0 0 24px ${BLUE}, 0 0 60px ${BLUE}`,
        opacity: scanOpacity,
      }} />

      {/* Lockup crossfade */}
      <div style={{
        position: "absolute", left: logoX, top: logoY,
        transform: `translate(-50%, -50%) scale(${logoScale})`,
        width: 900, height: 260,
      }}>
        <Img src={staticFile("brand/vektiss-lockup-dark.png")} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain",
          opacity: interpolate(frame, [0, 20, 30], [1, 1, 0], { extrapolateRight: "clamp" }),
        }} />
        <Img src={staticFile("brand/vektiss-lockup-light.png")} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain",
          opacity: interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          filter: `drop-shadow(0 0 24px rgba(37,99,235,0.5))`,
        }} />
      </div>

      {/* Headline */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24 }}>
        <div style={{
          fontFamily: "Inter, Helvetica Neue, sans-serif",
          fontWeight: 800, fontSize: 84, letterSpacing: 1, color: "#FFFFFF",
          opacity: interpolate(frame, [h1Start, h1Start + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [h1Start, h1Start + 18], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          textAlign: "center",
        }}>
          AI SYSTEMS FOR MODERN BUSINESSES
        </div>
        <div style={{
          fontFamily: "Inter, Helvetica Neue, sans-serif",
          fontWeight: 600, fontSize: 26, letterSpacing: 8, color: BLUE,
          opacity: interpolate(frame, [subStart, subStart + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          textShadow: `0 0 18px ${BLUE}66`,
        }}>
          VOICE  ·  SITES  ·  MEDIA  ·  INTELLIGENCE
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
