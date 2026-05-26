import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceHUD } from "./VoiceChrome";

// 1.4s (42f) — snap-cut. "They call the next person on Google."
// Query snaps in, 3 SERP rows slam, second row gets ringed + tapped.
export const Scene6Search: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const queryO = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 6 });
  const rowS = (i: number) =>
    spring({ frame: frame - 4 - i * 3, fps, config: { damping: 22, stiffness: 120 } });
  const rowO = (i: number) =>
    spring({ frame: frame - 4 - i * 3, fps, config: { damping: 200 }, durationInFrames: 6 });
  const ringIn = spring({ frame: frame - 18, fps, config: { damping: 14, stiffness: 120 } });
  // Tap ripple
  const tapT = Math.max(0, Math.min(1, (frame - 24) / 12));
  const callBadge = spring({ frame: frame - 22, fps, config: { damping: 14, stiffness: 120 } });

  const results = [
    { name: "AAA Plumbing Co.", url: "aaaplumbing.com" },
    { name: "Reliable Plumbers — Open Now", url: "reliable-plumbers.com", hi: true },
    { name: "Quick Fix Plumbing", url: "quickfix.io" },
  ];

  return (
    <AbsoluteFill>
      <VoiceHUD eyebrow="05 · NEXT ON GOOGLE" />

      {/* Query bar */}
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 140,
          padding: "16px 22px",
          borderRadius: 14,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 10px 30px -20px rgba(10,22,40,0.25)",
          fontFamily: FONT_SANS,
          fontSize: 28,
          color: COLORS.ink,
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: queryO,
          transform: `translateY(${interpolate(queryO, [0, 1], [-10, 0])}px)`,
        }}
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <circle cx={11} cy={11} r={7} stroke={COLORS.muted} strokeWidth={2} />
          <path d="M20 20l-4-4" stroke={COLORS.muted} strokeWidth={2} strokeLinecap="round" />
        </svg>
        <span style={{ color: COLORS.ink }}>plumber near me</span>
        <span style={{ marginLeft: "auto", fontFamily: FONT_MONO, fontSize: 12, color: COLORS.muted, letterSpacing: "0.18em" }}>
          GOOGLE
        </span>
      </div>

      {/* Results */}
      <div style={{ position: "absolute", left: 110, right: 110, top: 240 }}>
        {results.map((r, i) => {
          const s = rowS(i);
          const o = rowO(i);
          const y = interpolate(s, [0, 1], [16, 0]);
          const isHi = !!r.hi;
          const ringScale = isHi ? interpolate(ringIn, [0, 1], [1.06, 1]) : 1;
          return (
            <div
              key={i}
              style={{
                position: "relative",
                opacity: o * (!isHi && frame > 22 ? 0.45 : 1),
                transform: `translateY(${y}px) scale(${ringScale})`,
                padding: "20px 24px",
                marginBottom: 14,
                borderRadius: 14,
                background: isHi ? "rgba(0,136,255,0.10)" : COLORS.white,
                border: isHi
                  ? `2px solid ${COLORS.accent}`
                  : `1px solid ${COLORS.border}`,
                boxShadow: isHi
                  ? `0 0 0 ${4 + ringIn * 6}px rgba(0,136,255,${0.18 - ringIn * 0.1})`
                  : "0 6px 18px -14px rgba(10,22,40,0.15)",
                fontFamily: FONT_SANS,
                overflow: "hidden",
              }}
            >
              <div style={{ fontSize: 13, color: COLORS.muted, fontFamily: FONT_MONO, letterSpacing: "0.1em" }}>
                {r.url}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: isHi ? COLORS.accent : COLORS.ink,
                  marginTop: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{r.name}</span>
                {isHi && (
                  <span
                    style={{
                      opacity: callBadge,
                      transform: `scale(${interpolate(callBadge, [0, 1], [0.7, 1])})`,
                      padding: "6px 14px",
                      borderRadius: 999,
                      background: COLORS.accent,
                      color: "#fff",
                      fontSize: 14,
                      fontFamily: FONT_MONO,
                      letterSpacing: "0.18em",
                    }}
                  >
                    CALL
                  </span>
                )}
              </div>
              {/* tap ripple */}
              {isHi && tapT > 0 && (
                <div
                  style={{
                    position: "absolute",
                    right: 60,
                    top: "50%",
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    border: `2px solid ${COLORS.accent}`,
                    transform: `translate(50%, -50%) scale(${1 + tapT * 4})`,
                    opacity: 1 - tapT,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
