import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceHUD, useFadeUp } from "./VoiceChrome";

// 11s (330f) — "It knows your business, your services, your hours, and your team
// — handles it the right way whether you're on a job, in a meeting, or asleep."
//
// 4 chips stagger on the words, then a 3-icon row lands on the closing line.
export const Scene11CallSMS: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(6);

  // Word timings (relative to scene start, words occur ~0.0s "it knows", chips
  // land at "business / services / hours / team": 0.5 / 1.4 / 2.3 / 3.2s)
  const chips = [
    { label: "Your Business", caption: "name · brand · greeting", at: 18 },
    { label: "Your Services", caption: "what you offer · pricing", at: 45 },
    { label: "Your Hours", caption: "open · closed · holidays", at: 75 },
    { label: "Your Team", caption: "who handles what", at: 105 },
  ];

  // "Job / meeting / asleep" row lands around 6.5s — relative frame 195
  const rowStart = 195;
  const icons = [
    { kind: "hardhat" as const, label: "On a job" },
    { kind: "calendar" as const, label: "In a meeting" },
    { kind: "moon" as const, label: "Asleep" },
  ];

  // Closing line "handles it the right way every time" at ~9s → f 270
  const closeIn = spring({ frame: frame - 270, fps, config: { damping: 200 }, durationInFrames: 34 });

  return (
    <AbsoluteFill>
      <VoiceHUD eyebrow="09 · IT KNOWS YOU" />

      <div style={{ position: "absolute", left: 110, top: 110, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          IT KNOWS YOU
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 150,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 48,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
          maxWidth: 900,
          lineHeight: 1.0,
        }}
      >
        It already <span style={{ color: COLORS.accent }}>knows your business</span>.
      </div>

      {/* 4 chips */}
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 280,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {chips.map((c, i) => {
          const localF = frame - c.at;
          const s = spring({ frame: localF, fps, config: { damping: 22, stiffness: 75 } });
          const o = spring({ frame: localF, fps, config: { damping: 200 }, durationInFrames: 26 });
          const y = interpolate(s, [0, 1], [22, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: o,
                transform: `translateY(${y}px)`,
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 22,
                boxShadow: "0 18px 38px -26px rgba(10,22,40,0.18)",
                fontFamily: FONT_SANS,
                minHeight: 150,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(0,136,255,0.10)",
                  color: COLORS.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  fontFamily: FONT_MONO,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                0{i + 1}
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.ink, letterSpacing: "-0.01em" }}>
                {c.label}
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: COLORS.muted, fontFamily: FONT_MONO, letterSpacing: "0.04em" }}>
                {c.caption}
              </div>
            </div>
          );
        })}
      </div>

      {/* Job / meeting / asleep row */}
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 510,
          display: "flex",
          gap: 18,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icons.map((it, i) => {
          const localF = frame - (rowStart + i * 18);
          const s = spring({ frame: localF, fps, config: { damping: 18, stiffness: 85 } });
          const o = spring({ frame: localF, fps, config: { damping: 200 }, durationInFrames: 14 });
          const sc = interpolate(s, [0, 1], [0.85, 1]);
          return (
            <div
              key={i}
              style={{
                opacity: o,
                transform: `scale(${sc})`,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 22px",
                borderRadius: 999,
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 10px 24px -16px rgba(10,22,40,0.18)",
                fontFamily: FONT_SANS,
                fontSize: 18,
                color: COLORS.ink,
              }}
            >
              <RowIcon kind={it.kind} />
              {it.label}
            </div>
          );
        })}
      </div>

      {/* Closing line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 60,
          textAlign: "center",
          opacity: closeIn,
          fontFamily: FONT_SANS,
          fontSize: 22,
          color: COLORS.muted,
          letterSpacing: "-0.005em",
        }}
      >
        It handles every call the right way — every time.
      </div>
    </AbsoluteFill>
  );
};

const RowIcon: React.FC<{ kind: "hardhat" | "calendar" | "moon" }> = ({ kind }) => {
  const c = {
    stroke: COLORS.accent,
    strokeWidth: 2,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={22} height={22} viewBox="0 0 24 24">
      {kind === "hardhat" && (
        <>
          <path {...c} d="M3 17h18M5 17a7 7 0 0 1 14 0M9 10v3M15 10v3" />
        </>
      )}
      {kind === "calendar" && (
        <>
          <rect {...c} x={3} y={5} width={18} height={16} rx={2} />
          <path {...c} d="M3 9h18M8 3v4M16 3v4" />
        </>
      )}
      {kind === "moon" && <path {...c} d="M21 12.8A8 8 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />}
    </svg>
  );
};
