import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "./tokens";

// Scene 1 — Chevron forms from pure black. 150f / 5s.
// Particle streams converge → trace the chevron strokes → settle into the mark
// → bloom → fade-out via TransitionSeries fade. Pure code, no video file.
export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 0-30  black w/ subtle scanning glow
  // 30-80 streams converge & paths draw
  // 80-110 bloom
  // 110+ steady mark with breath
  const drawA = interpolate(frame, [30, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drawB = interpolate(frame, [50, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bloom = interpolate(frame, [80, 105, 130], [0, 1, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const settle = spring({
    frame: frame - 95,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });
  const breath = 1 + Math.sin((frame - 100) * 0.08) * 0.012;
  const finalFade = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Path geometry — two angular chevrons
  // viewBox 0 0 100 100, centered around (50,50)
  const LEN_A = 96; // approx path length
  const LEN_B = 96;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: finalFade }}>
      {/* faint scanning blue wash before draw starts */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(600px 400px at 50% 50%, rgba(37,99,235,0.18), transparent 65%)",
          opacity: interpolate(frame, [0, 25, 80], [0, 1, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* converging particle streams */}
      <ParticleStreams frame={frame} />

      {/* The chevron */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <svg
          width={620}
          height={620}
          viewBox="0 0 100 100"
          style={{
            transform: `scale(${0.96 + settle * 0.04}) scale(${breath})`,
            filter: `drop-shadow(0 0 ${20 + bloom * 60}px rgba(37,99,235,${0.55 + bloom * 0.45}))`,
          }}
        >
          <polyline
            points="22,20 62,50 22,80"
            fill="none"
            stroke={BRAND.blue}
            strokeWidth={14}
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeDasharray={LEN_A * 2}
            strokeDashoffset={LEN_A * 2 * (1 - drawA)}
          />
          <polyline
            points="50,20 90,50 50,80"
            fill="none"
            stroke={BRAND.blue}
            strokeWidth={14}
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity={0.5}
            strokeDasharray={LEN_B * 2}
            strokeDashoffset={LEN_B * 2 * (1 - drawB)}
          />
        </svg>
      </AbsoluteFill>

      {/* bloom flash overlay */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(400px 300px at 50% 50%, rgba(37,99,235,0.6), transparent 60%)",
          opacity: interpolate(frame, [90, 105, 130], [0, 0.55, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

const STREAMS = Array.from({ length: 80 }, (_, i) => {
  const seed = i * 7919 + 1009;
  const angle = ((seed * 7) % 360) * (Math.PI / 180);
  const dist = 600 + ((seed * 11) % 600);
  const startX = 960 + Math.cos(angle) * dist;
  const startY = 540 + Math.sin(angle) * dist;
  const targetX = 960 + (((seed * 13) % 200) - 100);
  const targetY = 540 + (((seed * 17) % 200) - 100);
  return {
    startX,
    startY,
    targetX,
    targetY,
    size: 1 + ((seed * 3) % 100) / 50,
    delay: (seed * 5) % 25,
  };
});

const ParticleStreams: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {STREAMS.map((p, i) => {
        const f = frame - p.delay;
        const t = interpolate(f, [20, 72], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        // ease-out for converging
        const eased = 1 - Math.pow(1 - t, 3);
        const x = p.startX + (p.targetX - p.startX) * eased;
        const y = p.startY + (p.targetY - p.startY) * eased;
        const op = interpolate(t, [0, 0.2, 0.9, 1], [0, 0.9, 0.9, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: BRAND.blue,
              opacity: op,
              boxShadow: `0 0 ${p.size * 6}px ${BRAND.blue}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
