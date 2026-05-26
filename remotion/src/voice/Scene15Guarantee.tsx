import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceHUD, useFadeUp } from "./VoiceChrome";

// 14s (420f) — Custom Build + Guarantee Stamp.
//   0–9s   Blueprint floor-plan draws + three text overlays stagger in
//   9–14s  Guarantee badge stamps in from above
export const Scene15Guarantee: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  // Blueprint paths — draw via strokeDashoffset
  const drawLen = 1400;
  const drawProgress = interpolate(frame, [20, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fill = interpolate(frame, [110, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Text overlays
  const overlays = [
    "Fully Custom Build",
    "Done-For-You Setup",
    "Keep Your Number",
  ];

  // Stamp — drop in at frame 240 (~8s)
  const stamp = spring({ frame: frame - 240, fps, config: { damping: 8, stiffness: 120 } });
  const stampOpacity = spring({ frame: frame - 240, fps, config: { damping: 200 }, durationInFrames: 26 });
  const stampY = interpolate(stamp, [0, 1], [-160, 0]);
  const stampScale = interpolate(stamp, [0, 0.6, 1], [1.6, 1.08, 1]);
  const stampRot = interpolate(stamp, [0, 1], [-18, -6]);
  const ringPulse = 1 + Math.sin((frame - 240) * 0.18) * 0.04;

  return (
    <AbsoluteFill>
      <VoiceHUD eyebrow="13 · CUSTOM BUILD" />

      <div style={{ position: "absolute", left: 80, top: 110, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          BUILT FOR YOUR OPERATION
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 150,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 52,
          letterSpacing: "-0.035em",
          color: COLORS.ink,
          maxWidth: 760,
          lineHeight: 1.0,
        }}
      >
        We build it. <span style={{ color: COLORS.accent }}>You keep your number.</span>
      </div>

      {/* Blueprint */}
      <svg width={520} height={420} viewBox="0 0 520 420" style={{ position: "absolute", left: 60, top: 270 }}>
        <defs>
          <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(0,136,255,0.12)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x={20} y={20} width={480} height={380} fill="url(#bp-grid)" opacity={drawProgress} />
        {/* Outer walls */}
        <rect
          x={20}
          y={20}
          width={480}
          height={380}
          fill={`rgba(0,136,255,${0.06 * fill})`}
          stroke={COLORS.accent}
          strokeWidth={3}
          strokeDasharray={drawLen}
          strokeDashoffset={drawLen * (1 - drawProgress)}
        />
        {/* Inner divider */}
        <line
          x1={260}
          y1={20}
          x2={260}
          y2={400}
          stroke={COLORS.accent}
          strokeWidth={2}
          strokeDasharray={400}
          strokeDashoffset={400 * (1 - drawProgress)}
        />
        <line
          x1={20}
          y1={220}
          x2={260}
          y2={220}
          stroke={COLORS.accent}
          strokeWidth={2}
          strokeDasharray={260}
          strokeDashoffset={260 * (1 - drawProgress)}
        />
        {/* Reception desk */}
        <rect
          x={320}
          y={70}
          width={140}
          height={50}
          fill={`rgba(0,136,255,${0.18 * fill})`}
          stroke={COLORS.accent}
          strokeWidth={1.5}
          opacity={drawProgress}
          rx={4}
        />
        <text x={390} y={100} textAnchor="middle" fontFamily={FONT_MONO} fontSize={9} fill={COLORS.muted} opacity={fill} letterSpacing="2">
          RECEPTION
        </text>
        {/* Phone icon room */}
        <rect
          x={320}
          y={160}
          width={140}
          height={80}
          fill={`rgba(0,136,255,${0.1 * fill})`}
          stroke={COLORS.accent}
          strokeWidth={1.5}
          opacity={drawProgress}
          rx={4}
        />
        <text x={390} y={205} textAnchor="middle" fontFamily={FONT_MONO} fontSize={9} fill={COLORS.muted} opacity={fill} letterSpacing="2">
          AI VOICE
        </text>
        {/* Meeting */}
        <rect
          x={70}
          y={260}
          width={150}
          height={100}
          fill={`rgba(0,136,255,${0.08 * fill})`}
          stroke={COLORS.accent}
          strokeWidth={1.5}
          opacity={drawProgress}
          rx={4}
        />
        <text x={145} y={315} textAnchor="middle" fontFamily={FONT_MONO} fontSize={9} fill={COLORS.muted} opacity={fill} letterSpacing="2">
          BOOKED
        </text>
        {/* Office */}
        <rect
          x={320}
          y={280}
          width={140}
          height={80}
          fill={`rgba(0,136,255,${0.06 * fill})`}
          stroke={COLORS.accent}
          strokeWidth={1.5}
          opacity={drawProgress}
          rx={4}
        />
        <text x={390} y={325} textAnchor="middle" fontFamily={FONT_MONO} fontSize={9} fill={COLORS.muted} opacity={fill} letterSpacing="2">
          YOU
        </text>
      </svg>

      {/* Text overlays right */}
      <div
        style={{
          position: "absolute",
          left: 620,
          top: 290,
          right: 0,
          fontFamily: FONT_SANS,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {overlays.map((label, i) => {
          const delay = 70 + i * 30;
          const s = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 70 } });
          const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 28 });
          const x = interpolate(s, [0, 1], [16, 0]);
          // Items fade out a bit as the badge takes over
          const fadeForStamp = interpolate(frame, [230, 270], [1, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                opacity: o * fadeForStamp,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 24,
                color: COLORS.ink,
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 999, background: COLORS.accent }} />
              {label}
            </div>
          );
        })}
      </div>

      {/* Guarantee stamp badge */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 260,
          opacity: stampOpacity,
          transform: `translateY(${stampY}px) scale(${stampScale}) rotate(${stampRot}deg)`,
          transformOrigin: "center center",
        }}
      >
        <svg width={260} height={260} viewBox="0 0 260 260">
          <defs>
            <path id="stamp-ring" d="M 130 130 m -100 0 a 100 100 0 1 1 200 0 a 100 100 0 1 1 -200 0" />
          </defs>
          {/* Glow ring */}
          <circle cx={130} cy={130} r={118 * ringPulse} fill="none" stroke={COLORS.accent} strokeOpacity={0.25} strokeWidth={2} />
          <circle cx={130} cy={130} r={108} fill="none" stroke={COLORS.accent} strokeWidth={2.5} />
          <circle cx={130} cy={130} r={92} fill={COLORS.accent} />
          <text x={130} y={120} textAnchor="middle" fontFamily={FONT_MONO} fontSize={10} fill="rgba(255,255,255,0.75)" letterSpacing="3">
            30-DAY
          </text>
          <text x={130} y={146} textAnchor="middle" fontFamily={FONT_SANS} fontSize={22} fontWeight={700} fill="#fff" letterSpacing="-0.5">
            MONEY-BACK
          </text>
          <text x={130} y={170} textAnchor="middle" fontFamily={FONT_SANS} fontSize={22} fontWeight={700} fill="#fff" letterSpacing="-0.5">
            GUARANTEE
          </text>
          <text fontFamily={FONT_MONO} fontSize={9} fill={COLORS.accent} letterSpacing="3">
            <textPath href="#stamp-ring" startOffset="0">
              VEKTISS VOICE · GUARANTEED · VEKTISS VOICE · GUARANTEED ·
            </textPath>
          </text>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
