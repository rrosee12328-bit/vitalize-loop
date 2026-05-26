import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceHUD, useFadeUp } from "./VoiceChrome";

// 12s (360f) — "The moment the call ends, you get an instant alert: name, number,
// what they asked, form sent, lead score hot/warm/cold. Everything is logged
// automatically in your dashboard. You stop guessing. You start knowing."
export const Scene13Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(6);

  // Alert card slides in at f 8
  const alertIn = spring({ frame: frame - 8, fps, config: { damping: 22, stiffness: 75 } });
  const alertO = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 28 });

  // Alert rows type in
  const rows = [
    { k: "NAME", v: "Marcus W.", at: 26 },
    { k: "NUMBER", v: "(832) 555-0142", at: 38 },
    { k: "ASKED", v: "Water heater leak", at: 50 },
    { k: "FORM", v: "Sent ✓", at: 62, accent: true },
  ];

  // Lead-score chip cycles HOT/WARM/COLD then settles on HOT at f ~110
  const chipPhase = Math.max(0, frame - 78);
  let chipLabel = "HOT", chipColor = "#E11D48", chipBg = "rgba(225,29,72,0.12)";
  if (chipPhase < 28) {
    const i = Math.floor(chipPhase / 9) % 3;
    if (i === 0) { chipLabel = "HOT"; chipColor = "#E11D48"; chipBg = "rgba(225,29,72,0.12)"; }
    if (i === 1) { chipLabel = "WARM"; chipColor = "#F59E0B"; chipBg = "rgba(245,158,11,0.14)"; }
    if (i === 2) { chipLabel = "COLD"; chipColor = "#3B82F6"; chipBg = "rgba(59,130,246,0.12)"; }
  }
  const chipPulse = chipPhase < 28 ? 1 : 1 + Math.sin((chipPhase - 28) * 0.15) * 0.04;
  const chipO = spring({ frame: frame - 76, fps, config: { damping: 200 }, durationInFrames: 14 });

  // Dashboard table rows fill in starting at f 140
  const tableStart = 140;
  const tableRows = [
    { time: "9:42 AM", who: "Marcus W.", what: "Water heater leak", score: "HOT", c: "#E11D48" },
    { time: "10:18", who: "Lisa P.", what: "Quote · bathroom remodel", score: "WARM", c: "#F59E0B" },
    { time: "11:04", who: "Dan R.", what: "Annual service inquiry", score: "WARM", c: "#F59E0B" },
    { time: "12:31", who: "Jess H.", what: "Drain backed up", score: "HOT", c: "#E11D48" },
    { time: "1:47 PM", who: "Carlos M.", what: "Pricing question", score: "COLD", c: "#3B82F6" },
  ];

  // Final tagline "STOP GUESSING — START KNOWING" at f 270
  const taglineIn = spring({ frame: frame - 270, fps, config: { damping: 22, stiffness: 75 } });
  const taglineO = spring({ frame: frame - 270, fps, config: { damping: 200 }, durationInFrames: 28 });

  return (
    <AbsoluteFill>
      <VoiceHUD eyebrow="11 · INSTANT ALERT" />

      <div style={{ position: "absolute", left: 110, top: 100, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          THE MOMENT THE CALL ENDS
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 138,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 42,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
          maxWidth: 900,
          lineHeight: 1.0,
        }}
      >
        You get an <span style={{ color: COLORS.accent }}>instant alert</span>.
      </div>

      {/* LEFT: Phone alert card */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 230,
          width: 470,
          opacity: alertO,
          transform: `translate(${interpolate(alertIn, [0, 1], [-30, 0])}px, ${interpolate(alertIn, [0, 1], [16, 0])}px)`,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 20,
          padding: 22,
          fontFamily: FONT_SANS,
          boxShadow: "0 24px 60px -28px rgba(10,22,40,0.22)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: COLORS.accent,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              V
            </div>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: "0.2em" }}>
                VEKTISS · NEW LEAD
              </div>
              <div style={{ fontSize: 13, color: COLORS.ink, fontWeight: 600 }}>now</div>
            </div>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.accent, letterSpacing: "0.15em" }}>
            ALERT
          </div>
        </div>

        {rows.map((r, i) => {
          const o = spring({ frame: frame - r.at, fps, config: { damping: 200 }, durationInFrames: 32 });
          const y = interpolate(o, [0, 1], [8, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: o,
                transform: `translateY(${y}px)`,
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: `1px dashed ${COLORS.border}`,
              }}
            >
              <span style={{ color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.12em" }}>
                {r.k}
              </span>
              <span
                style={{
                  color: r.accent ? COLORS.accent : COLORS.ink,
                  fontWeight: r.accent ? 700 : 500,
                  fontSize: 15,
                }}
              >
                {r.v}
              </span>
            </div>
          );
        })}

        {/* Lead score chip */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: chipO,
          }}
        >
          <span style={{ color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.12em" }}>
            LEAD SCORE
          </span>
          <span
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              background: chipBg,
              color: chipColor,
              fontFamily: FONT_MONO,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.2em",
              transform: `scale(${chipPulse})`,
              boxShadow: chipPhase >= 28 ? `0 0 0 6px ${chipBg}` : "none",
            }}
          >
            {chipLabel}
          </span>
        </div>
      </div>

      {/* RIGHT: Dashboard table with rows logging in */}
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 230,
          width: 540,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 20,
          padding: 22,
          fontFamily: FONT_SANS,
          boxShadow: "0 20px 50px -30px rgba(10,22,40,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.muted, letterSpacing: "0.2em" }}>
            DASHBOARD · TODAY
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.accent }}>EVERYTHING LOGGED</div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 600, color: COLORS.ink, letterSpacing: "-0.02em" }}>
          5 leads · today
        </div>

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column" }}>
          {tableRows.map((r, i) => {
            const at = tableStart + i * 22;
            const o = spring({ frame: frame - at, fps, config: { damping: 200 }, durationInFrames: 14 });
            const x = interpolate(o, [0, 1], [12, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity: o,
                  transform: `translateX(${x}px)`,
                  display: "grid",
                  gridTemplateColumns: "70px 1fr 70px",
                  gap: 12,
                  padding: "10px 6px",
                  borderBottom: `1px solid ${COLORS.border}`,
                  alignItems: "center",
                  fontSize: 13,
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.muted }}>{r.time}</span>
                <span style={{ color: COLORS.ink }}>
                  <strong style={{ fontWeight: 600 }}>{r.who}</strong>
                  <span style={{ color: COLORS.muted }}> · {r.what}</span>
                </span>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    color: r.c,
                    letterSpacing: "0.18em",
                    textAlign: "right",
                  }}
                >
                  {r.score}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 36,
          textAlign: "center",
          opacity: taglineO,
          transform: `translateY(${interpolate(taglineIn, [0, 1], [8, 0])}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: "-0.02em",
          color: COLORS.ink,
        }}
      >
        Stop guessing. <span style={{ color: COLORS.accent }}>Start knowing.</span>
      </div>
    </AbsoluteFill>
  );
};
