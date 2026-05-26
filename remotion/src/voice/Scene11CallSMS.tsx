import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 10s — Split view: live AI call (left) + SMS lead summary (right) appearing in real-time.
export const Scene11CallSMS: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  // Transcript lines appear progressively
  const lines = [
    { who: "AI", t: "Hi, this is Vektiss for ProFix Plumbing — how can I help?" },
    { who: "Caller", t: "Yeah, my water heater is leaking. It’s bad." },
    { who: "AI", t: "Got it. What zip code are you in?" },
    { who: "Caller", t: "92122. Can someone come today?" },
    { who: "AI", t: "Booking you Tuesday at 2pm. Texting confirmation now." },
  ];

  const smsItems = [
    { k: "Name", v: "Marcus W." },
    { k: "Issue", v: "Water heater leak — urgent" },
    { k: "Zip", v: "92122" },
    { k: "Booked", v: "Tue · 2:00 PM" },
    { k: "Lead score", v: "94" },
  ];

  return (
    <AbsoluteFill>

      <VoiceHUD eyebrow="09 · ANATOMY OF A LEAD" />

      <div style={{ position: "absolute", left: 110, top: 130, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          REAL TIME · CALL → CRM
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 175,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 46,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
        }}
      >
        From hello to booked — in 38 seconds.
      </div>

      {/* LEFT: call card */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 300,
          width: 560,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 20,
          padding: 24,
          fontFamily: FONT_SANS,
          boxShadow: "0 20px 50px -30px rgba(10,22,40,0.18)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: COLORS.accent }} />
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted }}>
              LIVE · 00:38
            </div>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.accent }}>VEKTISS AI</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {lines.map((l, i) => {
            const delay = 20 + i * 28;
            const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 18 });
            const y = interpolate(o, [0, 1], [10, 0]);
            const isAI = l.who === "AI";
            return (
              <div
                key={i}
                style={{
                  opacity: o,
                  transform: `translateY(${y}px)`,
                  alignSelf: isAI ? "flex-start" : "flex-end",
                  maxWidth: "85%",
                  background: isAI ? "rgba(0,136,255,0.08)" : COLORS.surface,
                  border: isAI ? `1px solid rgba(0,136,255,0.25)` : `1px solid ${COLORS.border}`,
                  color: COLORS.ink,
                  padding: "10px 14px",
                  borderRadius: 14,
                  fontSize: 14,
                  lineHeight: 1.4,
                }}
              >
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: isAI ? COLORS.accent : COLORS.muted, letterSpacing: "0.15em", marginBottom: 4 }}>
                  {l.who.toUpperCase()}
                </div>
                {l.t}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: SMS lead summary */}
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 300,
          width: 480,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 20,
          padding: 24,
          fontFamily: FONT_SANS,
          boxShadow: "0 20px 50px -30px rgba(10,22,40,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted }}>
            SMS TO OWNER
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.accent }}>NEW LEAD</div>
        </div>

        <div style={{ fontSize: 18, fontWeight: 600, color: COLORS.ink, marginBottom: 16 }}>
          New booking from Vektiss
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {smsItems.map((row, i) => {
            const delay = 60 + i * 14;
            const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 18 });
            const x = interpolate(o, [0, 1], [12, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity: o,
                  transform: `translateX(${x}px)`,
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: `1px dashed ${COLORS.border}`,
                  paddingBottom: 8,
                  fontSize: 15,
                }}
              >
                <span style={{ color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.1em", alignSelf: "center" }}>
                  {row.k.toUpperCase()}
                </span>
                <span style={{ color: row.k === "Lead score" ? COLORS.accent : COLORS.ink, fontWeight: row.k === "Lead score" ? 700 : 500 }}>
                  {row.v}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
