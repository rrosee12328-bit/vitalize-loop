import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 7s — Calendar / week-grid of missed calls. Bars stack up week over week.
export const Scene7Calendar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  const weeks = ["W1", "W2", "W3", "W4"];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  // missed-call counts per (week, day)
  const data = [
    [2, 3, 1, 4, 2, 0, 0],
    [3, 4, 5, 3, 4, 1, 1],
    [4, 5, 6, 5, 6, 2, 0],
    [6, 7, 8, 7, 9, 3, 1],
  ];

  const totalDelay = 18;

  return (
    <AbsoluteFill>
      <VoiceBackground />
      <VoiceHUD eyebrow="06 · 30 DAYS OF MISSED" />

      <div style={{ position: "absolute", left: 110, top: 130, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          A 30-DAY LOOKBACK
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          top: 180,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 52,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
          maxWidth: 1000,
        }}
      >
        Every red square is a customer you never met.
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 330,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 18,
          padding: 28,
          fontFamily: FONT_SANS,
          boxShadow: "0 20px 50px -25px rgba(10,22,40,0.15)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted }}>
            MISSED CALLS · DEC
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#E11D48" }}>
            TOTAL 96 MISSED
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", gap: 10 }}>
          <div />
          {days.map((d, i) => (
            <div key={i} style={{ fontSize: 11, color: COLORS.muted, textAlign: "center", fontFamily: FONT_MONO }}>
              {d}
            </div>
          ))}

          {weeks.map((w, wi) =>
            <React.Fragment key={w}>
              <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: FONT_MONO, alignSelf: "center" }}>{w}</div>
              {data[wi].map((count, di) => {
                const idx = wi * 7 + di;
                const delay = totalDelay + idx * 1.4;
                const s = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 200 } });
                const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 12 });
                const intensity = count / 9;
                const bg = count === 0
                  ? COLORS.surface
                  : `rgba(225,29,72,${0.18 + intensity * 0.78})`;
                return (
                  <div
                    key={di}
                    style={{
                      opacity: o,
                      transform: `scale(${0.85 + s * 0.15})`,
                      height: 56,
                      borderRadius: 10,
                      background: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: count > 5 ? "#fff" : COLORS.ink,
                      fontWeight: 600,
                      fontSize: count > 0 ? 18 : 12,
                    }}
                  >
                    {count > 0 ? count : "·"}
                  </div>
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
