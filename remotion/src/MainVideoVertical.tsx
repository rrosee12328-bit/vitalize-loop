import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { PersistentBackground } from "./components/PersistentBackground";
import { COLORS } from "./theme";
import { FONT_MONO, FONT_SANS } from "./fonts";

// 1080x1920 portrait. ~20s @ 30fps = 600 frames.
// Scenes are inlined here, tuned for vertical canvas — large stacked type,
// generous vertical rhythm, no horizontal mockup cards.

export const MainVideoVertical: React.FC = () => {
  return (
    <AbsoluteFill>
      <PersistentBackground />
      <VerticalHUD />

      <Sequence from={0} durationInFrames={140}>
        <VHook />
      </Sequence>
      <Sequence from={140} durationInFrames={130}>
        <VPillar
          number="01"
          eyebrow="01 · PROJECT INTELLIGENCE"
          title="See every project, every signal."
          body="Live visibility across budget, time, risk, and team load."
        />
      </Sequence>
      <Sequence from={270} durationInFrames={130}>
        <VPillar
          number="02"
          eyebrow="02 · AI PHONE & EMAIL"
          title="Never miss another lead."
          body="AI assistants qualify, draft, and route — 24/7."
        />
      </Sequence>
      <Sequence from={400} durationInFrames={70}>
        <VPillarsGrid />
      </Sequence>
      <Sequence from={470} durationInFrames={130}>
        <VClose />
      </Sequence>
    </AbsoluteFill>
  );
};

const VerticalHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const inO = spring({ frame: frame - 6, fps, config: { damping: 200 }, durationInFrames: 30 });
  const outO = interpolate(frame, [durationInFrames - 30, durationInFrames - 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(inO, outO);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: FONT_SANS,
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 999, background: COLORS.accent, boxShadow: `0 0 0 6px rgba(0,85,255,0.12)` }} />
        <span style={{ color: COLORS.ink, fontWeight: 600, fontSize: 32, letterSpacing: "-0.01em" }}>VEKTISS</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: FONT_MONO,
          fontSize: 18,
          letterSpacing: "0.18em",
          color: COLORS.muted,
        }}
      >
        <span>SYSTEMS · NOT DELIVERABLES</span>
        <span>VEKTISS / 2026</span>
      </div>
    </AbsoluteFill>
  );
};

// --- Hook ---------------------------------------------------------------
const VHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eyeIn = spring({ frame: frame - 4, fps, config: { damping: 200 }, durationInFrames: 30 });
  const l1 = spring({ frame: frame - 10, fps, config: { damping: 22, stiffness: 140 } });
  const l2 = spring({ frame: frame - 26, fps, config: { damping: 22, stiffness: 140 } });
  const l3 = spring({ frame: frame - 42, fps, config: { damping: 22, stiffness: 140 } });
  const sweep = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: "0 80px", justifyContent: "center" }}>
      <div style={{ opacity: eyeIn, fontFamily: FONT_MONO, fontSize: 22, letterSpacing: "0.22em", color: COLORS.accent, marginBottom: 60 }}>
        01 · THE PROBLEM
      </div>
      {[
        { sp: l1, txt: "Stop running" },
        { sp: l2, txt: "your business on" },
        { sp: l3, txt: "duct-taped tools.", underline: true },
      ].map((line, i) => (
        <div
          key={i}
          style={{
            opacity: line.sp,
            transform: `translateY(${interpolate(line.sp, [0, 1], [40, 0])}px)`,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 140,
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            color: COLORS.ink,
            position: "relative",
            display: "inline-block",
          }}
        >
          {line.underline ? (
            <span style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 18,
                  height: 40,
                  width: `${sweep * 100}%`,
                  background: "rgba(0,85,255,0.22)",
                  zIndex: -1,
                }}
              />
              {line.txt}
            </span>
          ) : (
            line.txt
          )}
        </div>
      ))}
    </AbsoluteFill>
  );
};

// --- Pillar Solo --------------------------------------------------------
const VPillar: React.FC<{ number: string; eyebrow: string; title: string; body: string }> = ({
  number,
  eyebrow,
  title,
  body,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eyeIn = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 24 });
  const numIn = spring({ frame: frame - 2, fps, config: { damping: 18, stiffness: 140 } });
  const titleIn = spring({ frame: frame - 14, fps, config: { damping: 22, stiffness: 140 } });
  const bodyIn = spring({ frame: frame - 30, fps, config: { damping: 200 }, durationInFrames: 30 });
  const titleY = interpolate(titleIn, [0, 1], [40, 0]);

  return (
    <AbsoluteFill>
      {/* Giant ghost number */}
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 80,
          fontFamily: FONT_SANS,
          fontWeight: 700,
          fontSize: 720,
          lineHeight: 1,
          color: "rgba(23,23,23,0.05)",
          letterSpacing: "-0.05em",
          transform: `translateY(${interpolate(numIn, [0, 1], [60, 0])}px)`,
          opacity: numIn,
        }}
      >
        {number}
      </div>

      <div style={{ position: "absolute", top: 720, left: 80, right: 80 }}>
        <div
          style={{
            opacity: eyeIn,
            fontFamily: FONT_MONO,
            fontSize: 22,
            letterSpacing: "0.22em",
            color: COLORS.accent,
            marginBottom: 36,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            opacity: titleIn,
            transform: `translateY(${titleY}px)`,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 116,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            color: COLORS.ink,
          }}
        >
          {title}
        </div>
        <div
          style={{
            opacity: bodyIn,
            marginTop: 44,
            fontFamily: FONT_SANS,
            fontSize: 38,
            lineHeight: 1.4,
            color: COLORS.muted,
          }}
        >
          {body}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- Pillars grid (2x2) -------------------------------------------------
const PILLARS = [
  { num: "01", name: "Project Intelligence" },
  { num: "02", name: "AI Phone & Email" },
  { num: "03", name: "Websites & Apps" },
  { num: "04", name: "Business Media" },
];

const VPillarsGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eyeIn = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 24 });
  const titleIn = spring({ frame: frame - 8, fps, config: { damping: 22, stiffness: 140 } });
  const titleY = interpolate(titleIn, [0, 1], [36, 0]);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 220, left: 80, right: 80 }}>
        <div
          style={{
            opacity: eyeIn,
            fontFamily: FONT_MONO,
            fontSize: 22,
            letterSpacing: "0.22em",
            color: COLORS.accent,
            marginBottom: 32,
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
            fontSize: 110,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            color: COLORS.ink,
          }}
        >
          One system.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 800,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
        }}
      >
        {PILLARS.map((p, i) => {
          const sp = spring({ frame: frame - 20 - i * 6, fps, config: { damping: 22, stiffness: 130 } });
          const y = interpolate(sp, [0, 1], [50, 0]);
          return (
            <div
              key={p.num}
              style={{
                opacity: sp,
                transform: `translateY(${y}px)`,
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 22,
                padding: 38,
                minHeight: 360,
                boxShadow: "0 20px 40px -20px rgba(10,22,40,0.12)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 18,
                  letterSpacing: "0.2em",
                  color: COLORS.accent,
                }}
              >
                {p.num}
              </div>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 600,
                  fontSize: 42,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: COLORS.ink,
                }}
              >
                {p.name}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// --- Close --------------------------------------------------------------
const VClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const dotIn = spring({ frame: frame - 4, fps, config: { damping: 12, stiffness: 180 } });
  const wordIn = spring({ frame: frame - 18, fps, config: { damping: 22, stiffness: 130 } });
  const wordY = interpolate(wordIn, [0, 1], [30, 0]);
  const tagIn = spring({ frame: frame - 40, fps, config: { damping: 200 }, durationInFrames: 30 });
  const sweep = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 18, durationInFrames - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 60 }}>
        <div
          style={{
            transform: `scale(${dotIn})`,
            width: 46,
            height: 46,
            borderRadius: 999,
            background: COLORS.accent,
            boxShadow: `0 0 0 14px rgba(0,85,255,0.12)`,
          }}
        />
      </div>
      <div
        style={{
          opacity: wordIn,
          transform: `translateY(${wordY}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 180,
          letterSpacing: "-0.04em",
          color: COLORS.ink,
          lineHeight: 1,
        }}
      >
        VEKTISS
      </div>
      <div
        style={{
          opacity: tagIn,
          marginTop: 60,
          position: "relative",
          fontFamily: FONT_SANS,
          fontWeight: 500,
          fontSize: 56,
          letterSpacing: "-0.015em",
          color: COLORS.ink,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <span style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: 8,
              height: 18,
              width: `${sweep * 100}%`,
              background: "rgba(0,85,255,0.22)",
              zIndex: -1,
            }}
          />
          Systems, not deliverables.
        </span>
      </div>
      <div
        style={{
          opacity: tagIn * 0.9,
          marginTop: 56,
          fontFamily: FONT_MONO,
          fontSize: 20,
          letterSpacing: "0.28em",
          color: COLORS.muted,
        }}
      >
        VEKTISS.COM
      </div>
    </AbsoluteFill>
  );
};
