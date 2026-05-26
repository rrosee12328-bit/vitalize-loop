import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, random } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 9s — Live waveform with labeled checkpoints (Greeting → Qualify → Book → Notify).
export const Scene10Waveform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  const bars = 60;
  const checkpoints = [
    { x: 0.12, label: "GREETING", t: "“Hi, this is Vektiss for…”" },
    { x: 0.36, label: "QUALIFY", t: "Captures name, issue, urgency" },
    { x: 0.62, label: "BOOK", t: "Drops slot straight in calendar" },
    { x: 0.88, label: "NOTIFY", t: "Texts you the lead summary" },
  ];

  return (
    <AbsoluteFill>

      <VoiceHUD eyebrow="08 · INSIDE THE CALL" />

      <div style={{ position: "absolute", left: 110, top: 140, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          ONE CONVERSATION · FOUR JOBS
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 190,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 52,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
          lineHeight: 1.05,
        }}
      >
        It greets. Qualifies. Books. Notifies you.
      </div>

      {/* Waveform card */}
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 320,
          height: 220,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 18,
          padding: 24,
          fontFamily: FONT_SANS,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted }}>
            LIVE CALL · WAVEFORM
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.accent }}>00:42</div>
        </div>

        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", height: 110 }}>
          {Array.from({ length: bars }).map((_, i) => {
            const reveal = spring({ frame: frame - 14 - i * 0.7, fps, config: { damping: 200 }, durationInFrames: 14 });
            const wobble = Math.sin((frame / 6) + i * 0.4) * 0.15;
            const seed = random(`bar-${i}`) * 0.8 + 0.2;
            const h = (seed + wobble) * 90 * reveal;
            const isCp = checkpoints.some((c) => Math.abs(c.x - i / bars) < 0.02);
            return (
              <div
                key={i}
                style={{
                  width: 6,
                  height: Math.max(6, h),
                  borderRadius: 3,
                  background: isCp ? COLORS.accent : "rgba(0,136,255,0.5)",
                }}
              />
            );
          })}

          {/* Playhead */}
          <div
            style={{
              position: "absolute",
              left: `${interpolate(frame, [10, 230], [0, 100], { extrapolateRight: "clamp" })}%`,
              top: -8,
              bottom: -8,
              width: 2,
              background: COLORS.accent,
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      {/* Checkpoint labels */}
      <div style={{ position: "absolute", left: 134, right: 134, top: 560, display: "flex", justifyContent: "space-between" }}>
        {checkpoints.map((c, i) => {
          const delay = 40 + i * 18;
          const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 28 });
          const y = interpolate(o, [0, 1], [12, 0]);
          return (
            <div key={i} style={{ opacity: o, transform: `translateY(${y}px)`, maxWidth: 220, fontFamily: FONT_SANS }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: COLORS.accent }}>
                0{i + 1} · {c.label}
              </div>
              <div style={{ marginTop: 6, fontSize: 15, color: COLORS.ink }}>{c.t}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
