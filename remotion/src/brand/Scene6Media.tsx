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
import { SectionLabel } from "./SectionLabel";
import { Chevron } from "./Chevron";

// Scene 6 — MEDIA. 480f / 16s.
// Content tiles orbit a central glowing chevron.

const TILES = [
  { kind: "video", label: "REEL · 0:24", accent: "Always Answered" },
  { kind: "card", label: "POST", accent: "85% never call back" },
  { kind: "video", label: "SHORT · 0:42", accent: "Behind the build" },
  { kind: "card", label: "AD", accent: "Vektiss Voice" },
  { kind: "video", label: "REEL · 0:18", accent: "How it routes" },
  { kind: "card", label: "QUOTE", accent: "Systems, not deliverables." },
  { kind: "video", label: "DEMO · 1:02", accent: "Dashboard tour" },
  { kind: "card", label: "STAT", accent: "↑ 3.2x lead capture" },
];

const RADIUS_X = 520;
const RADIUS_Y = 280;
const CENTER_X = 960;
const CENTER_Y = 540;
const ROT_SPEED = 0.004; // rad per frame

export const Scene6Media: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <BrandBackground />
      <SectionLabel index="04" label="MEDIA" />

      {/* Central chevron with glow bloom */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            transform: `scale(${1 + Math.sin(frame * 0.05) * 0.04})`,
          }}
        >
          <Chevron size={220} />
        </div>
      </AbsoluteFill>

      {/* Orbiting tiles */}
      {TILES.map((tile, i) => {
        const baseAngle = (i / TILES.length) * Math.PI * 2;
        const angle = baseAngle + frame * ROT_SPEED;
        const x = CENTER_X + Math.cos(angle) * RADIUS_X;
        const y = CENTER_Y + Math.sin(angle) * RADIUS_Y;
        const depth = (Math.sin(angle) + 1) / 2; // 0 back, 1 front
        const scale = 0.7 + depth * 0.55;
        const op = 0.35 + depth * 0.65;

        const enter = spring({
          frame: frame - 15 - i * 6,
          fps,
          config: { damping: 200 },
          durationInFrames: 28,
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%,-50%) scale(${scale * enter})`,
              opacity: op * enter,
              zIndex: Math.floor(depth * 100),
            }}
          >
            <Tile tile={tile} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Tile: React.FC<{
  tile: { kind: string; label: string; accent: string };
}> = ({ tile }) => {
  return (
    <div
      style={{
        width: 240,
        height: 320,
        borderRadius: 18,
        background:
          tile.kind === "video"
            ? "linear-gradient(160deg, rgba(37,99,235,0.16), rgba(10,15,30,0.85))"
            : "rgba(10,20,40,0.85)",
        border: `1px solid rgba(37,99,235,0.45)`,
        boxShadow: `0 0 30px rgba(37,99,235,0.25)`,
        overflow: "hidden",
        fontFamily: FONT_SANS,
        position: "relative",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {tile.kind === "video" ? (
        <>
          <div
            style={{
              alignSelf: "flex-end",
              color: BRAND.blue,
              fontSize: 10,
              letterSpacing: "0.28em",
              fontWeight: 600,
            }}
          >
            ▶ {tile.label}
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: `2px solid ${BRAND.blue}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: BRAND.blue,
            }}
          >
            ▶
          </div>
          <div
            style={{
              color: BRAND.white,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {tile.accent}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              color: BRAND.blue,
              fontSize: 10,
              letterSpacing: "0.32em",
              fontWeight: 600,
            }}
          >
            {tile.label}
          </div>
          <div
            style={{
              color: BRAND.white,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.015em",
              lineHeight: 1.2,
            }}
          >
            {tile.accent}
          </div>
          <div
            style={{
              color: BRAND.textDim,
              fontSize: 11,
              letterSpacing: "0.22em",
              fontWeight: 600,
            }}
          >
            VEKTISS · 2026
          </div>
        </>
      )}
    </div>
  );
};
