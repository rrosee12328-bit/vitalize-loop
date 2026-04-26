import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";

type Pillar = { num: string; name: string; tag: string };

const PILLARS: Pillar[] = [
  { num: "01", name: "Project Intelligence", tag: "Visibility" },
  { num: "02", name: "AI Phone & Email Assistants", tag: "Coverage" },
  { num: "03", name: "Websites, Portals & Apps", tag: "Systems" },
  { num: "04", name: "Business Media", tag: "Compounding" },
];

// Scene 4 — All four pillars revealed as a coherent system.
// Header eyebrow + headline, then 4-up grid that staggers in.
export const SceneAllPillars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyeIn = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 24 });
  const titleIn = spring({ frame: frame - 8, fps, config: { damping: 22, stiffness: 140 } });
  const titleY = interpolate(titleIn, [0, 1], [36, 0]);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 160, left: 140, right: 140 }}>
        <div
          style={{
            opacity: eyeIn,
            fontFamily: FONT_MONO,
            fontSize: 14,
            letterSpacing: "0.22em",
            color: COLORS.accent,
            marginBottom: 24,
          }}
        >
          THE FOUR WORKING PARTS
        </div>
        <div
          style={{
            opacity: titleIn,
            transform: `translateY(${titleY}px)`,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 96,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            color: COLORS.ink,
            maxWidth: 1300,
          }}
        >
          One system.{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: 12,
                height: 28,
                width: "100%",
                background: "rgba(0,85,255,0.22)",
                zIndex: -1,
              }}
            />
            Four working parts.
          </span>
        </div>
      </div>

      {/* Pillar grid */}
      <div
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: 540,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {PILLARS.map((p, i) => {
          const cardSpring = spring({
            frame: frame - 26 - i * 8,
            fps,
            config: { damping: 22, stiffness: 130 },
          });
          const y = interpolate(cardSpring, [0, 1], [50, 0]);
          return (
            <div
              key={p.num}
              style={{
                opacity: cardSpring,
                transform: `translateY(${y}px)`,
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 18,
                padding: 32,
                minHeight: 320,
                boxShadow: "0 20px 40px -20px rgba(10,22,40,0.12)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    color: COLORS.accent,
                    marginBottom: 22,
                  }}
                >
                  {p.num}
                </div>
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontWeight: 600,
                    fontSize: 30,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: COLORS.ink,
                  }}
                >
                  {p.name}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  color: COLORS.muted,
                  marginTop: 32,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: 999, background: COLORS.accent }} />
                {p.tag.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
