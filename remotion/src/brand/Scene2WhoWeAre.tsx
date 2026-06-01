import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile, Img } from "remotion";
import { BRAND } from "./tokens";
import { Chevron } from "./Chevron";

// 240 frames (8s) — invert from white-circuit shot, reveal headline, pillars
export const Scene2WhoWeAre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 0-45: invert background light->dark
  const bgT = interpolate(frame, [0, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bgColor = `rgb(${Math.round(245 - bgT * (245 - 10))}, ${Math.round(247 - bgT * (247 - 15))}, ${Math.round(250 - bgT * (250 - 30))})`;
  const gridOpacity = interpolate(frame, [0, 50], [0.5, 0], { extrapolateRight: "clamp" });

  // logo drift to top-left + scale down
  const driftT = interpolate(frame, [10, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoScale = interpolate(driftT, [0, 1], [1, 0.22]);
  const logoX = interpolate(driftT, [0, 1], [width / 2, 130]);
  const logoY = interpolate(driftT, [0, 1], [height / 2, 70]);

  // headline appear after invert
  const h1Start = 65;
  const h2Start = 95;
  const lineStart = 135;
  const pillarsStart = 165;

  const rulerW = interpolate(frame, [lineStart, lineStart + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // particles
  const particles = React.useMemo(
    () => new Array(40).fill(0).map((_, i) => ({
      x: (i * 137) % 1920,
      y: ((i * 311) % 1080),
      speed: 0.3 + ((i * 17) % 10) / 20,
      size: 1 + ((i * 7) % 3),
      o: 0.15 + ((i * 13) % 40) / 100,
    })),
    []
  );

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* circuit grid fading out */}
      <AbsoluteFill style={{ opacity: gridOpacity }}>
        <Img src={staticFile("intro-frames/f_0151.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      {/* particles drifting up on dark */}
      {frame > 50 && (
        <AbsoluteFill>
          {particles.map((p, i) => {
            const y = (p.y - (frame - 50) * p.speed) % 1080;
            const yy = y < 0 ? y + 1080 : y;
            return (
              <div key={i} style={{
                position: "absolute", left: p.x, top: yy,
                width: p.size, height: p.size, borderRadius: "50%",
                background: BRAND.blue, opacity: p.o, boxShadow: `0 0 6px ${BRAND.blue}`,
              }} />
            );
          })}
        </AbsoluteFill>
      )}

      {/* logo: animates from center -> top-left watermark */}
      <div style={{
        position: "absolute",
        left: logoX, top: logoY,
        transform: `translate(-50%, -50%) scale(${logoScale})`,
        display: "flex", alignItems: "center", gap: 24,
      }}>
        <Chevron size={140} glow={frame > 40} />
        <div style={{
          fontFamily: "Inter, Helvetica Neue, sans-serif",
          fontWeight: 800, fontSize: 110, letterSpacing: 6,
          color: frame < 40 ? "#0A0F1E" : "#FFFFFF",
          transition: "none",
        }}>
          VEKTISS
        </div>
      </div>

      {/* Headline lines */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
        <Headline text="THE OPERATING SYSTEM" color="#FFFFFF" startFrame={h1Start} fps={fps} />
        <Headline text="YOUR BUSINESS NEEDS." color={BRAND.blue} startFrame={h2Start} fps={fps} />

        {/* ruler */}
        <div style={{
          marginTop: 40, height: 2, width: `${rulerW * 70}%`,
          background: BRAND.blue, boxShadow: `0 0 18px ${BRAND.blue}`,
          maxWidth: 1400,
        }} />

        {/* pillars */}
        <div style={{
          marginTop: 32, display: "flex", gap: 60,
          opacity: interpolate(frame, [pillarsStart, pillarsStart + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          {["INTELLIGENCE", "VOICE", "SITES", "MEDIA"].map((p, i) => (
            <div key={p} style={{
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 18,
              letterSpacing: 4, color: "#FFFFFF",
              opacity: interpolate(frame, [pillarsStart + i * 5, pillarsStart + i * 5 + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              {p}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Headline: React.FC<{ text: string; color: string; startFrame: number; fps: number }> = ({ text, color, startFrame, fps }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 0, perspective: 1200 }}>
      {text.split("").map((ch, i) => {
        const f = frame - startFrame - i * 1.2;
        const o = interpolate(f, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const blur = interpolate(f, [0, 14], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <span key={i} style={{
            fontFamily: "Inter, Helvetica Neue, sans-serif",
            fontWeight: 800, fontSize: 92, letterSpacing: 2,
            color, opacity: o, filter: `blur(${blur}px)`,
            textShadow: `0 0 ${o * 18}px ${color}66`,
            display: "inline-block", whiteSpace: "pre",
          }}>
            {ch}
          </span>
        );
      })}
    </div>
  );
};
