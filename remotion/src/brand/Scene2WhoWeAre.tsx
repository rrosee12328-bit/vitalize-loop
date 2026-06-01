import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_SANS } from "../fonts";
import { BRAND } from "./tokens";
import { BrandBackground } from "./BrandBackground";
import { Chevron } from "./Chevron";

// Scene 2 — WHO WE ARE. 300f / 10s.
// Logo drifts from center to top-left, headline materializes word-by-word,
// blue rule draws, four pillars fade in. Ends with fade-to-black handled by transition.
const LINE1 = ["THE", "OPERATING", "SYSTEM"];
const LINE2 = ["YOUR", "BUSINESS", "NEEDS."];
const PILLARS = ["INTELLIGENCE", "VOICE", "SITES", "MEDIA"];

export const Scene2WhoWeAre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo: hold center 0-30, drift to TL 30-75.
  const drift = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
    durationInFrames: 45,
  });
  const logoX = interpolate(drift, [0, 1], [960, 110]);
  const logoY = interpolate(drift, [0, 1], [430, 56]);
  const logoScale = interpolate(drift, [0, 1], [1, 0.28]);
  const wordmarkOpacity = interpolate(drift, [0.4, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline words start landing once logo settles
  const headStart = 80;
  const wordStagger = 5;

  // Rule + pillars
  const ruleProgress = interpolate(
    frame,
    [headStart + 50, headStart + 90],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const pillarsStart = headStart + 95;

  return (
    <AbsoluteFill>
      <BrandBackground />

      {/* Logo: chevron + wordmark, drifts from center to TL */}
      <div
        style={{
          position: "absolute",
          left: logoX,
          top: logoY,
          transform: `translate(-50%,-50%) scale(${logoScale})`,
          transformOrigin: "center",
          display: "flex",
          alignItems: "center",
          gap: 28,
          fontFamily: FONT_SANS,
        }}
      >
        <Chevron size={120} />
        <span
          style={{
            color: BRAND.white,
            fontWeight: 700,
            fontSize: 96,
            letterSpacing: "-0.02em",
            opacity: wordmarkOpacity,
          }}
        >
          VEKTISS
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_SANS,
          fontWeight: 700,
          letterSpacing: "-0.025em",
        }}
      >
        <HeadlineLine
          words={LINE1}
          color={BRAND.white}
          start={headStart}
          stagger={wordStagger}
          frame={frame}
          fps={fps}
        />
        <HeadlineLine
          words={LINE2}
          color={BRAND.blue}
          start={headStart + LINE1.length * wordStagger + 4}
          stagger={wordStagger}
          frame={frame}
          fps={fps}
        />

        {/* Blue rule */}
        <div
          style={{
            marginTop: 56,
            height: 2,
            width: 760,
            background:
              "linear-gradient(to right, transparent, rgba(37,99,235,0.9), transparent)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: BRAND.blue,
              boxShadow: `0 0 20px ${BRAND.blue}`,
              transformOrigin: "left",
              transform: `scaleX(${ruleProgress})`,
            }}
          />
        </div>

        {/* Pillars */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 56,
            fontFamily: FONT_SANS,
          }}
        >
          {PILLARS.map((p, i) => {
            const s = spring({
              frame: frame - pillarsStart - i * 6,
              fps,
              config: { damping: 200 },
              durationInFrames: 24,
            });
            return (
              <span
                key={p}
                style={{
                  color: BRAND.white,
                  opacity: s * 0.95,
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "0.32em",
                  transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
                }}
              >
                {p}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const HeadlineLine: React.FC<{
  words: string[];
  color: string;
  start: number;
  stagger: number;
  frame: number;
  fps: number;
}> = ({ words, color, start, stagger, frame, fps }) => (
  <div style={{ display: "flex", gap: 28, fontSize: 96, lineHeight: 1.05 }}>
    {words.map((w, i) => {
      const s = spring({
        frame: frame - start - i * stagger,
        fps,
        config: { damping: 200 },
        durationInFrames: 22,
      });
      return (
        <span
          key={w + i}
          style={{
            color,
            opacity: s,
            transform: `translateY(${interpolate(s, [0, 1], [22, 0])}px)`,
            display: "inline-block",
          }}
        >
          {w}
        </span>
      );
    })}
  </div>
);
