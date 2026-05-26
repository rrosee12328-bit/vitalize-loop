import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceHUD, useFadeUp } from "./VoiceChrome";
import { VektissMark } from "./VektissMark";

// 20s (600f) — Scale, CRM, Bilingual.
// Three sequential beats over a continuous routing diagram:
//   0–7s   routing to multiple locations
//   7–13s  CRM chips connect (HubSpot, Salesforce, GoHighLevel)
//   13–20s EN ↔ ES bilingual toggle
export const Scene14Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  // Beat windows
  const beatA = interpolate(frame, [0, 210], [0, 1], { extrapolateRight: "clamp" });          // routing
  const beatB = interpolate(frame, [210, 390], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // CRM
  const beatC = interpolate(frame, [390, 540], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // bilingual

  const cx = 470;
  const cy = 430;

  // Location pins
  const pins = [
    { label: "Houston", x: cx - 240, y: cy - 110, delay: 24 },
    { label: "Austin",  x: cx + 240, y: cy - 130, delay: 40 },
    { label: "Dallas",  x: cx - 200, y: cy + 110, delay: 56 },
    { label: "Remote",  x: cx + 220, y: cy + 100, delay: 72 },
  ];

  // CRM chips appear from frame ~210 onward
  const crms = [
    { name: "HubSpot",     x: cx - 320, y: cy + 230, delay: 220 },
    { name: "Salesforce",  x: cx,       y: cy + 250, delay: 240 },
    { name: "GoHighLevel", x: cx + 320, y: cy + 230, delay: 260 },
  ];

  // Bilingual toggle — flips every 36 frames
  const toggleEN = ((frame - 400) % 72) < 36 || frame < 400;

  return (
    <AbsoluteFill>
      <VoiceHUD eyebrow="12 · BUILT TO SCALE" />

      {/* Eyebrow + headline */}
      <div style={{ position: "absolute", left: 80, top: 110, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          GROWS WITH YOU
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
          maxWidth: 800,
          lineHeight: 1.0,
        }}
      >
        Built to scale. <span style={{ color: COLORS.accent }}>With you.</span>
      </div>

      {/* Diagram */}
      <svg width={940} height={560} viewBox="0 0 940 560" style={{ position: "absolute", left: 0, top: 240 }}>
        {/* Branches to pins */}
        {pins.map((p, i) => {
          const t = spring({ frame: frame - p.delay, fps, config: { damping: 22, stiffness: 60 } });
          const dx = (p.x - cx) * t;
          const dy = (p.y - cy) * t;
          return (
            <line
              key={`branch-${i}`}
              x1={cx}
              y1={cy}
              x2={cx + dx}
              y2={cy + dy}
              stroke={COLORS.accent}
              strokeOpacity={0.45 * t}
              strokeWidth={2}
            />
          );
        })}

        {/* CRM connector lines */}
        {crms.map((c, i) => {
          const t = spring({ frame: frame - (c.delay - 12), fps, config: { damping: 22, stiffness: 55 } });
          const dx = (c.x - cx) * t;
          const dy = (c.y - cy) * t;
          return (
            <line
              key={`crm-line-${i}`}
              x1={cx}
              y1={cy}
              x2={cx + dx}
              y2={cy + dy}
              stroke={COLORS.accent}
              strokeOpacity={0.5 * t}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Pins */}
        {pins.map((p, i) => {
          const t = spring({ frame: frame - p.delay - 6, fps, config: { damping: 18, stiffness: 75 } });
          const pulse = 1 + Math.sin((frame - p.delay) * 0.18) * 0.08;
          return (
            <g key={`pin-${i}`} opacity={t}>
              <circle cx={p.x} cy={p.y} r={18 * pulse} fill="rgba(0,136,255,0.18)" />
              <circle cx={p.x} cy={p.y} r={9} fill={COLORS.accent} />
            </g>
          );
        })}

        {/* Central Vektiss node */}
        <g>
          <circle cx={cx} cy={cy} r={56} fill="#fff" stroke={COLORS.accent} strokeWidth={2} />
          <circle cx={cx} cy={cy} r={66 + Math.sin(frame * 0.14) * 3} fill="none" stroke={COLORS.accent} strokeOpacity={0.25} strokeWidth={1.5} />
        </g>
      </svg>

      {/* Vektiss logo at center node */}
      <div
        style={{
          position: "absolute",
          left: cx - 28,
          top: 240 + cy - 28,
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <VektissMark size={42} />
      </div>

      {/* Pin labels */}
      {pins.map((p, i) => {
        const t = spring({ frame: frame - p.delay - 14, fps, config: { damping: 200 }, durationInFrames: 28 });
        return (
          <div
            key={`label-${i}`}
            style={{
              position: "absolute",
              left: p.x - 50,
              top: 240 + p.y + 22,
              width: 100,
              textAlign: "center",
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: "0.18em",
              color: COLORS.ink,
              opacity: t,
            }}
          >
            {p.label.toUpperCase()}
          </div>
        );
      })}

      {/* CRM chips */}
      {crms.map((c, i) => {
        const t = spring({ frame: frame - c.delay, fps, config: { damping: 22, stiffness: 70 } });
        const o = spring({ frame: frame - c.delay, fps, config: { damping: 200 }, durationInFrames: 34 });
        const y = interpolate(t, [0, 1], [12, 0]);
        return (
          <div
            key={`chip-${i}`}
            style={{
              position: "absolute",
              left: c.x - 75,
              top: 240 + c.y - 22,
              width: 150,
              padding: "10px 16px",
              borderRadius: 999,
              background: "#fff",
              border: `1px solid ${COLORS.border}`,
              fontFamily: FONT_SANS,
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.ink,
              textAlign: "center",
              opacity: o,
              transform: `translateY(${y}px)`,
              boxShadow: "0 10px 28px -16px rgba(10,22,40,0.25)",
              letterSpacing: "-0.005em",
            }}
          >
            <span style={{ color: COLORS.accent, marginRight: 6 }}>◆</span>
            {c.name}
          </div>
        );
      })}

      {/* Bilingual toggle (right side) */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 280,
          opacity: beatC,
          transform: `translateY(${interpolate(beatC, [0, 1], [16, 0])}px)`,
          fontFamily: FONT_SANS,
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.22em", color: COLORS.accent, marginBottom: 14 }}>
          BILINGUAL · NATIVE
        </div>
        <div
          style={{
            display: "inline-flex",
            background: "#fff",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 999,
            padding: 6,
            boxShadow: "0 14px 36px -22px rgba(10,22,40,0.25)",
          }}
        >
          <div
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              background: toggleEN ? COLORS.accent : "transparent",
              color: toggleEN ? "#fff" : COLORS.muted,
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: "0.1em",
            }}
          >
            EN
          </div>
          <div
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              background: !toggleEN ? COLORS.accent : "transparent",
              color: !toggleEN ? "#fff" : COLORS.muted,
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: "0.1em",
            }}
          >
            ES
          </div>
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 14,
            color: COLORS.muted,
            maxWidth: 200,
            lineHeight: 1.45,
          }}
        >
          Recognizes returning callers. Personalizes every call.
        </div>
      </div>

      {/* Subtle beat indicator (debug-free) — keeps composition feeling alive */}
      <div style={{ display: "none" }}>{beatA.toFixed(2)}{beatB.toFixed(2)}</div>
    </AbsoluteFill>
  );
};
