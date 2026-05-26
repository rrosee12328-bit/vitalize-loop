import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VektissMark } from "./VektissMark";

// 20.9s (627f) — Pricing & final close.
// Per spec: deep navy background, Vektiss top center, pricing huge, phone
// number pulses, vektiss.com fades in at bottom, fade to black at the end.
export const Scene17Close: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Navy crossfade in
  const navy = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // Logo
  const logoIn = spring({ frame: frame - 6, fps, config: { damping: 18, stiffness: 70 } });
  const logoO = spring({ frame: frame - 6, fps, config: { damping: 200 }, durationInFrames: 28 });

  // Pricing
  const priceLabelIn = spring({ frame: frame - 26, fps, config: { damping: 22, stiffness: 75 } });
  const priceLabelO = spring({ frame: frame - 26, fps, config: { damping: 200 }, durationInFrames: 32 });
  const priceIn = spring({ frame: frame - 40, fps, config: { damping: 18, stiffness: 60 } });
  const priceO = spring({ frame: frame - 40, fps, config: { damping: 200 }, durationInFrames: 34 });

  // Phone
  const phoneIn = spring({ frame: frame - 90, fps, config: { damping: 22, stiffness: 70 } });
  const phoneO = spring({ frame: frame - 90, fps, config: { damping: 200 }, durationInFrames: 34 });
  const phoneGlow = 0.4 + (Math.sin((frame - 90) * 0.16) + 1) / 2 * 0.6;

  // Call Now label
  const callIn = spring({ frame: frame - 140, fps, config: { damping: 200 }, durationInFrames: 34 });
  const arrowShift = Math.sin((frame - 140) * 0.18) * 4;

  // URL — fades in late (~6.5s in)
  const urlIn = spring({ frame: frame - 195, fps, config: { damping: 200 }, durationInFrames: 30 });

  // Subtle scale-down emphasis near end
  const emphasize = interpolate(frame, [260, 320], [1, 0.97], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Fade to black at very end (last ~1.5s — f 290 → 334)
  const fadeBlack = interpolate(frame, [290, 334], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  void emphasize;

  return (
    <AbsoluteFill>
      {/* Navy bg (covers the whole content canvas) */}
      <AbsoluteFill style={{ backgroundColor: "#0A1628", opacity: navy }} />
      {/* Subtle radial glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(700px 500px at 50% 65%, rgba(0,136,255,0.18), transparent 65%)",
          opacity: navy,
        }}
      />

      {/* Logo + wordmark top center (inside left content zone) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 405,
          top: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          opacity: logoO,
          transform: `translateY(${interpolate(logoIn, [0, 1], [-12, 0])}px)`,
          fontFamily: FONT_SANS,
        }}
      >
        <VektissMark size={42} />
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em" }}>
          VEKTISS
        </span>
      </div>

      {/* Pricing */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 405,
          top: 170,
          textAlign: "center",
          fontFamily: FONT_SANS,
        }}
      >
        <div
          style={{
            opacity: priceLabelO,
            transform: `translateY(${interpolate(priceLabelIn, [0, 1], [10, 0])}px)`,
            fontFamily: FONT_MONO,
            fontSize: 13,
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.55)",
            marginBottom: 18,
          }}
        >
          PLANS START AT
        </div>
        <div
          style={{
            opacity: priceO,
            transform: `translateY(${interpolate(priceIn, [0, 1], [16, 0])}px)`,
            color: "#fff",
            fontWeight: 700,
            fontSize: 96,
            letterSpacing: "-0.045em",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#0088FF" }}>$45.99</span>
          <span style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500 }}> / mo</span>
        </div>
      </div>

      {/* Phone number + Call Now */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 405,
          top: 380,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: FONT_SANS,
        }}
      >
        <div
          style={{
            opacity: callIn,
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
            color: "#0088FF",
            fontFamily: FONT_MONO,
            fontSize: 13,
            letterSpacing: "0.32em",
          }}
        >
          <span style={{ display: "inline-block", transform: `translateX(${arrowShift}px)` }}>↓</span>
          CALL NOW
          <span style={{ display: "inline-block", transform: `translateX(${-arrowShift}px)` }}>↓</span>
        </div>
        <div
          style={{
            opacity: phoneO,
            transform: `translateY(${interpolate(phoneIn, [0, 1], [16, 0])}px)`,
            padding: "20px 44px",
            borderRadius: 24,
            background: "rgba(0,136,255,0.12)",
            border: `1.5px solid rgba(0,136,255,${0.4 + phoneGlow * 0.4})`,
            boxShadow: `0 0 ${40 + phoneGlow * 60}px rgba(0,136,255,${0.18 + phoneGlow * 0.25})`,
            color: "#fff",
            fontWeight: 700,
            fontSize: 64,
            letterSpacing: "-0.02em",
          }}
        >
          (346) 594-7686
        </div>
      </div>

      {/* URL bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 405,
          bottom: 50,
          textAlign: "center",
          opacity: urlIn,
          fontFamily: FONT_MONO,
          fontSize: 16,
          letterSpacing: "0.32em",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        VEKTISS.COM
      </div>

      {/* Fade to black */}
      <AbsoluteFill style={{ background: "#000", opacity: fadeBlack, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
