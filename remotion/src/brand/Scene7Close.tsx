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

// Scene 7 — CLOSE. 540f / 18s.
// 2x2 icon grid → chevron returns large center, icons orbit, tagline + CTA.

const ICONS = [
  { key: "intel", label: "INTELLIGENCE" },
  { key: "voice", label: "VOICE" },
  { key: "sites", label: "SITES" },
  { key: "media", label: "MEDIA" },
];

export const Scene7Close: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phases
  // 0-90    grid forms + each icon pulses
  // 90-180  icons fly to orbit, chevron grows center
  // 180-300 tagline + CTA
  // 300-end slow zoom out, fade
  const gridToOrbit = interpolate(frame, [90, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chevronEnter = spring({
    frame: frame - 110,
    fps,
    config: { damping: 200 },
    durationInFrames: 40,
  });
  const taglineEnter = spring({
    frame: frame - 200,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });
  const ctaEnter = spring({
    frame: frame - 245,
    fps,
    config: { damping: 200 },
    durationInFrames: 28,
  });

  const zoomOut = interpolate(frame, [380, durationInFrames - 20], [1, 0.92]);
  const fade = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 1],
    [1, 0]
  );

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <BrandBackground />

      <AbsoluteFill style={{ transform: `scale(${zoomOut})`, transformOrigin: "center" }}>
        {/* Chevron */}
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              opacity: chevronEnter,
              transform: `scale(${interpolate(chevronEnter, [0, 1], [0.6, 1])})`,
            }}
          >
            <Chevron size={260} />
          </div>
        </AbsoluteFill>

        {/* Icon grid → orbit */}
        {ICONS.map((ic, i) => {
          // Grid position (2x2 around center)
          const col = i % 2;
          const row = Math.floor(i / 2);
          const gridX = 960 + (col === 0 ? -220 : 220);
          const gridY = 540 + (row === 0 ? -180 : 180);

          // Orbit position
          const baseAngle = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const angle = baseAngle + frame * 0.01;
          const orbitX = 960 + Math.cos(angle) * 360;
          const orbitY = 540 + Math.sin(angle) * 240;

          const x = gridX + (orbitX - gridX) * gridToOrbit;
          const y = gridY + (orbitY - gridY) * gridToOrbit;

          const enter = spring({
            frame: frame - 10 - i * 8,
            fps,
            config: { damping: 200 },
            durationInFrames: 28,
          });
          const pulse =
            0.85 +
            Math.max(
              0,
              Math.sin(((frame - 30 - i * 12) % 120) * (Math.PI / 60))
            ) *
              0.15;
          const labelOpacity = interpolate(gridToOrbit, [0, 0.6], [1, 0]);

          return (
            <div
              key={ic.key}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%,-50%) scale(${enter * pulse})`,
                opacity: enter,
                fontFamily: FONT_SANS,
                textAlign: "center",
              }}
            >
              <IconSymbol kind={ic.key} />
              <div
                style={{
                  marginTop: 12,
                  color: BRAND.blue,
                  fontSize: 11,
                  letterSpacing: "0.32em",
                  fontWeight: 600,
                  opacity: labelOpacity,
                }}
              >
                {ic.label}
              </div>
            </div>
          );
        })}

        {/* Tagline */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 760,
            textAlign: "center",
            fontFamily: FONT_SANS,
            opacity: taglineEnter,
            transform: `translateY(${interpolate(taglineEnter, [0, 1], [16, 0])}px)`,
          }}
        >
          <div
            style={{
              color: BRAND.white,
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            BUILT IN-HOUSE. BUILT FOR YOU.
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 880,
            display: "flex",
            justifyContent: "center",
            opacity: ctaEnter,
            transform: `translateY(${interpolate(ctaEnter, [0, 1], [12, 0])}px)`,
          }}
        >
          <div
            style={{
              padding: "18px 36px",
              borderRadius: 8,
              background: BRAND.blue,
              color: BRAND.white,
              fontFamily: FONT_SANS,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "0.22em",
              boxShadow: `0 0 40px rgba(37,99,235,0.55)`,
            }}
          >
            SEE WHAT WE BUILD →
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const IconSymbol: React.FC<{ kind: string }> = ({ kind }) => {
  const size = 72;
  const c = BRAND.blue;
  if (kind === "intel") {
    return (
      <svg width={size} height={size} viewBox="0 0 60 60" style={{ filter: `drop-shadow(0 0 12px ${c})` }}>
        <circle cx="30" cy="30" r="4" fill={c} />
        <circle cx="10" cy="14" r="3" fill={c} />
        <circle cx="50" cy="14" r="3" fill={c} />
        <circle cx="10" cy="46" r="3" fill={c} />
        <circle cx="50" cy="46" r="3" fill={c} />
        <g stroke={c} strokeWidth="1" opacity="0.6">
          <line x1="30" y1="30" x2="10" y2="14" />
          <line x1="30" y1="30" x2="50" y2="14" />
          <line x1="30" y1="30" x2="10" y2="46" />
          <line x1="30" y1="30" x2="50" y2="46" />
        </g>
      </svg>
    );
  }
  if (kind === "voice") {
    return (
      <svg width={size} height={size} viewBox="0 0 60 60" style={{ filter: `drop-shadow(0 0 12px ${c})` }}>
        <path d="M14 26a16 16 0 0 1 32 0" stroke={c} strokeWidth="2" fill="none" />
        <path d="M20 30a10 10 0 0 1 20 0" stroke={c} strokeWidth="2" fill="none" opacity="0.7" />
        <path
          d="M22 36c2 6 8 10 8 10s6-4 8-10"
          stroke={c}
          strokeWidth="2"
          fill="none"
        />
        <circle cx="30" cy="42" r="3" fill={c} />
      </svg>
    );
  }
  if (kind === "sites") {
    return (
      <svg width={size} height={size} viewBox="0 0 60 60" style={{ filter: `drop-shadow(0 0 12px ${c})` }}>
        <rect x="10" y="14" width="40" height="32" rx="3" stroke={c} strokeWidth="2" fill="none" />
        <line x1="10" y1="22" x2="50" y2="22" stroke={c} strokeWidth="2" />
        <circle cx="14" cy="18" r="1.2" fill={c} />
        <circle cx="18" cy="18" r="1.2" fill={c} />
        <circle cx="22" cy="18" r="1.2" fill={c} />
        <rect x="16" y="28" width="22" height="3" fill={c} opacity="0.5" />
        <rect x="16" y="34" width="14" height="3" fill={c} opacity="0.4" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ filter: `drop-shadow(0 0 12px ${c})` }}>
      <circle cx="30" cy="30" r="22" stroke={c} strokeWidth="2" fill="none" />
      <polygon points="25,20 25,40 42,30" fill={c} />
    </svg>
  );
};
