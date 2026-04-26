import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";

type Props = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  // 0 = left layout, 1 = right layout
  align?: "left" | "right";
  // Decorative mockup variant
  variant: "intelligence" | "assistants";
};

// Scene template for pillars 01 and 02 — full-bleed editorial with side mockup card.
export const ScenePillarSolo: React.FC<Props> = ({ number, eyebrow, title, body, align = "left", variant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyeIn = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 24 });
  const numIn = spring({ frame: frame - 2, fps, config: { damping: 18, stiffness: 140 } });
  const titleIn = spring({ frame: frame - 12, fps, config: { damping: 22, stiffness: 140 } });
  const bodyIn = spring({ frame: frame - 26, fps, config: { damping: 200 }, durationInFrames: 30 });
  const cardIn = spring({ frame: frame - 16, fps, config: { damping: 20, stiffness: 130 } });

  const titleY = interpolate(titleIn, [0, 1], [40, 0]);
  const cardX = interpolate(cardIn, [0, 1], [align === "left" ? 80 : -80, 0]);

  const isLeft = align === "left";

  return (
    <AbsoluteFill>
      {/* Giant ghost number */}
      <div
        style={{
          position: "absolute",
          top: 60,
          [isLeft ? "right" : "left"]: 80,
          fontFamily: FONT_SANS,
          fontWeight: 700,
          fontSize: 520,
          lineHeight: 1,
          color: "rgba(23,23,23,0.04)",
          letterSpacing: "-0.05em",
          transform: `translateY(${interpolate(numIn, [0, 1], [60, 0])}px)`,
          opacity: numIn,
        }}
      >
        {number}
      </div>

      {/* Text block */}
      <div
        style={{
          position: "absolute",
          top: 320,
          [isLeft ? "left" : "right"]: 140,
          maxWidth: 820,
          textAlign: isLeft ? "left" : "right",
        }}
      >
        <div
          style={{
            opacity: eyeIn,
            fontFamily: FONT_MONO,
            fontSize: 14,
            letterSpacing: "0.22em",
            color: COLORS.accent,
            marginBottom: 28,
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
            fontSize: 104,
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
            marginTop: 32,
            fontFamily: FONT_SANS,
            fontSize: 26,
            lineHeight: 1.4,
            color: COLORS.muted,
            maxWidth: 620,
            marginLeft: isLeft ? 0 : "auto",
          }}
        >
          {body}
        </div>
      </div>

      {/* Decorative mockup card */}
      <div
        style={{
          position: "absolute",
          top: 360,
          [isLeft ? "right" : "left"]: 120,
          width: 560,
          height: 380,
          transform: `translateX(${cardX}px)`,
          opacity: cardIn,
        }}
      >
        <MockupCard variant={variant} frame={frame} />
      </div>
    </AbsoluteFill>
  );
};

const MockupCard: React.FC<{ variant: Props["variant"]; frame: number }> = ({ variant, frame }) => {
  const baseStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    background: COLORS.white,
    borderRadius: 18,
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 30px 60px -30px rgba(10,22,40,0.18), 0 8px 20px -10px rgba(10,22,40,0.08)",
    padding: 28,
    overflow: "hidden",
    fontFamily: FONT_SANS,
  };

  if (variant === "intelligence") {
    // Bar-chart-y dashboard
    const heights = [60, 90, 50, 110, 80, 130, 95];
    return (
      <div style={baseStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontFamily: FONT_MONO, color: COLORS.muted, letterSpacing: "0.15em" }}>
            PROJECT INTELLIGENCE
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.border }} />
            <div style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.border }} />
            <div style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.accent }} />
          </div>
        </div>
        <div style={{ fontSize: 44, fontWeight: 600, color: COLORS.ink, letterSpacing: "-0.02em" }}>
          94% on-track
        </div>
        <div style={{ fontSize: 14, color: COLORS.muted, marginTop: 4 }}>across 28 active workstreams</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 150, marginTop: 32 }}>
          {heights.map((h, i) => {
            const grow = Math.max(0, Math.min(1, (frame - 18 - i * 3) / 18));
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch", gap: 6 }}>
                <div
                  style={{
                    height: h * grow,
                    background: i === 5 ? COLORS.accent : COLORS.surface,
                    borderRadius: 6,
                  }}
                />
                <div style={{ height: 4, background: COLORS.surface, borderRadius: 2 }} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // assistants variant — chat / call mockup
  const messages = [
    { from: "ai", text: "Inbound call · 9:42am" },
    { from: "ai", text: "Lead qualified — booked Tue 2pm." },
    { from: "you", text: "Routing to Sarah." },
    { from: "ai", text: "Summary sent to Slack ✓" },
  ];
  return (
    <div style={baseStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontFamily: FONT_MONO, color: COLORS.muted, letterSpacing: "0.15em" }}>
          AI ASSISTANT · LIVE
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: COLORS.accent,
              opacity: 0.6 + 0.4 * Math.sin(frame / 6),
            }}
          />
          <span style={{ fontSize: 12, fontFamily: FONT_MONO, color: COLORS.ink }}>ON</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
        {messages.map((m, i) => {
          const reveal = Math.max(0, Math.min(1, (frame - 22 - i * 14) / 12));
          return (
            <div
              key={i}
              style={{
                alignSelf: m.from === "you" ? "flex-end" : "flex-start",
                maxWidth: "78%",
                background: m.from === "you" ? COLORS.accent : COLORS.surface,
                color: m.from === "you" ? COLORS.white : COLORS.ink,
                padding: "12px 18px",
                borderRadius: 14,
                fontSize: 17,
                opacity: reveal,
                transform: `translateY(${(1 - reveal) * 12}px)`,
              }}
            >
              {m.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
