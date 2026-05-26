import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceHUD } from "./VoiceChrome";

// 18.8s (564f) — Anatomy of the call, on beat with the narration.
//   0.0 – 4.8s   (0–144f)   Sub-beat A: First-ring greeting
//   4.8 – 15.8s  (144–474f) Sub-beat B: New lead → intake form sent
//   15.8 – 18.8s (474–564f) Sub-beat C: Urgent → transfer to owner
export const Scene12Routing: React.FC = () => {
  return (
    <AbsoluteFill>
      <VoiceHUD eyebrow="10 · ON THE CALL" />

      <Sequence from={0} durationInFrames={144}>
        <SubA />
      </Sequence>
      <Sequence from={144} durationInFrames={330}>
        <SubB />
      </Sequence>
      <Sequence from={474} durationInFrames={90}>
        <SubC />
      </Sequence>
    </AbsoluteFill>
  );
};

/* ---------- Sub-beat A: First-ring greeting ---------- */
const SubA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleO = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 14 });
  const ringPulse = 0.5 + Math.abs(Math.sin(frame * 0.45)) * 0.5;
  // Single bell ring then connect at f ~30
  const connected = frame >= 30;
  const bubbleIn = spring({ frame: frame - 36, fps, config: { damping: 18, stiffness: 160 } });
  const bubbleO = spring({ frame: frame - 36, fps, config: { damping: 200 }, durationInFrames: 18 });

  // Typewriter for greeting
  const greeting = "Hi, thanks for calling Vektiss — how can I help today?";
  const startF = 48;
  const charsPerFrame = 1.4;
  const visibleChars = Math.max(0, Math.floor((frame - startF) * charsPerFrame));
  const shown = greeting.slice(0, Math.min(visibleChars, greeting.length));

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 110, top: 110, opacity: titleO }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          FIRST RING · YOUR NAME · YOUR VOICE
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 46,
            letterSpacing: "-0.03em",
            color: COLORS.ink,
          }}
        >
          Answered on the <span style={{ color: COLORS.accent }}>first ring</span>.
        </div>
      </div>

      {/* Phone */}
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 290,
          width: 220,
          height: 320,
          borderRadius: 28,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          boxShadow: `0 20px 50px -28px rgba(10,22,40,${connected ? 0.18 : 0.12 + ringPulse * 0.18}), 0 0 ${connected ? 0 : 16 + ringPulse * 32}px rgba(0,136,255,${connected ? 0 : 0.25 * ringPulse})`,
          fontFamily: FONT_SANS,
          padding: 20,
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: "0.2em" }}>
          {connected ? "ANSWERED" : "INCOMING"}
        </div>
        <div style={{ marginTop: 10, fontSize: 22, fontWeight: 600, color: COLORS.ink }}>
          {connected ? "Vektiss AI" : "Unknown"}
        </div>
        <div style={{ marginTop: 6, fontSize: 13, color: COLORS.muted }}>
          {connected ? "Connected · 00:01" : "+1 (832) 555-0142"}
        </div>

        {/* Pulse ring */}
        {!connected && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 175,
              width: 100,
              height: 100,
              borderRadius: 999,
              border: `2px solid ${COLORS.accent}`,
              opacity: ringPulse,
              transform: `translate(-50%, -50%) scale(${1 + ringPulse * 0.4})`,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 175,
            transform: "translate(-50%, -50%)",
            width: 56,
            height: 56,
            borderRadius: 999,
            background: COLORS.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 26,
          }}
        >
          ☎
        </div>
      </div>

      {/* Greeting bubble */}
      <div
        style={{
          position: "absolute",
          left: 400,
          top: 320,
          right: 110,
          opacity: bubbleO,
          transform: `translateY(${interpolate(bubbleIn, [0, 1], [16, 0])}px)`,
          background: "rgba(0,136,255,0.08)",
          border: `1px solid rgba(0,136,255,0.30)`,
          borderRadius: 18,
          padding: "20px 24px",
          fontFamily: FONT_SANS,
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.accent, letterSpacing: "0.2em", marginBottom: 8 }}>
          VEKTISS AI
        </div>
        <div style={{ fontSize: 24, color: COLORS.ink, lineHeight: 1.35, fontWeight: 500 }}>
          "{shown}
          {shown.length < greeting.length && (
            <span style={{ borderRight: `2px solid ${COLORS.accent}`, marginLeft: 2, opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0 }}>&nbsp;</span>
          )}"
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Sub-beat B: New lead → warms up → intake form sent ---------- */
const SubB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleO = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 14 });

  // Chat bubbles (caller / AI back and forth)
  const lines = [
    { who: "Caller", at: 24, t: "Yeah, my water heater is leaking — bad." },
    { who: "AI", at: 60, t: "Got it. What zip are you in?" },
    { who: "Caller", at: 96, t: "92122. Today possible?" },
    { who: "AI", at: 130, t: "Texting an intake form right now." },
  ];

  // Form card slides in
  const formIn = spring({ frame: frame - 175, fps, config: { damping: 22, stiffness: 130 } });
  const formO = spring({ frame: frame - 175, fps, config: { damping: 200 }, durationInFrames: 22 });
  const sentStamp = spring({ frame: frame - 235, fps, config: { damping: 8, stiffness: 220 } });
  const sentO = spring({ frame: frame - 235, fps, config: { damping: 200 }, durationInFrames: 12 });

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 110, top: 100, opacity: titleO }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          NEW LEAD · WARMED UP · INTAKE SENT
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 42,
            letterSpacing: "-0.03em",
            color: COLORS.ink,
          }}
        >
          It warms them up and sends the <span style={{ color: COLORS.accent }}>intake form</span> on the call.
        </div>
      </div>

      {/* LEFT — chat */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 230,
          width: 560,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 20,
          padding: 22,
          fontFamily: FONT_SANS,
          boxShadow: "0 20px 50px -30px rgba(10,22,40,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 9, height: 9, borderRadius: 999, background: COLORS.accent }} />
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.muted, letterSpacing: "0.2em" }}>
              LIVE CALL
            </div>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.accent }}>VEKTISS AI</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lines.map((l, i) => {
            const o = spring({ frame: frame - l.at, fps, config: { damping: 200 }, durationInFrames: 14 });
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
                  fontSize: 15,
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

      {/* RIGHT — intake form */}
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 230,
          width: 460,
          opacity: formO,
          transform: `translateX(${interpolate(formIn, [0, 1], [40, 0])}px)`,
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
            INTAKE FORM
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.accent }}>SMS</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.ink, marginBottom: 14 }}>
          Water heater — emergency
        </div>
        {[
          { k: "Name", v: "Marcus W." },
          { k: "Phone", v: "(832) 555-0142" },
          { k: "Zip", v: "92122" },
          { k: "Issue", v: "Heater leak · urgent" },
          { k: "Window", v: "Today · earliest" },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: `1px dashed ${COLORS.border}`,
              padding: "8px 0",
              fontSize: 14,
            }}
          >
            <span style={{ color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.1em" }}>
              {r.k.toUpperCase()}
            </span>
            <span style={{ color: COLORS.ink, fontWeight: 500 }}>{r.v}</span>
          </div>
        ))}

        {/* SENT stamp */}
        <div
          style={{
            position: "absolute",
            right: -10,
            top: -10,
            opacity: sentO,
            transform: `scale(${interpolate(sentStamp, [0, 0.6, 1], [1.6, 1.06, 1])}) rotate(${interpolate(sentStamp, [0, 1], [-22, -8])}deg)`,
            padding: "8px 16px",
            borderRadius: 999,
            background: COLORS.accent,
            color: "#fff",
            fontFamily: FONT_MONO,
            fontSize: 14,
            letterSpacing: "0.22em",
            boxShadow: "0 8px 20px -8px rgba(0,136,255,0.5)",
          }}
        >
          SENT ✓
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Sub-beat C: Urgent → transfer ---------- */
const SubC: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleO = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 14 });
  const lineP = interpolate(frame, [16, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pill = spring({ frame: frame - 28, fps, config: { damping: 14, stiffness: 200 } });
  const pillO = spring({ frame: frame - 28, fps, config: { damping: 200 }, durationInFrames: 14 });
  const owner = spring({ frame: frame - 10, fps, config: { damping: 200 }, durationInFrames: 16 });

  const aiX = 220, aiY = 380;
  const ownerX = 1020, ownerY = 380;

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 110, top: 110, opacity: titleO }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: "#E11D48" }}>
          URGENT · TRANSFER NOW
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 46,
            letterSpacing: "-0.03em",
            color: COLORS.ink,
          }}
        >
          Urgent calls go <span style={{ color: COLORS.accent }}>straight to you</span>.
        </div>
      </div>

      <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
        {/* AI node */}
        <g>
          <rect x={aiX - 90} y={aiY - 40} width={180} height={80} rx={16} fill={COLORS.accent} />
          <text x={aiX} y={aiY - 8} textAnchor="middle" fontFamily={FONT_MONO} fontSize={10} fill="rgba(255,255,255,0.75)" letterSpacing="2">
            VEKTISS AI
          </text>
          <text x={aiX} y={aiY + 20} textAnchor="middle" fontFamily={FONT_SANS} fontSize={22} fontWeight={700} fill="#fff">
            Live Call
          </text>
        </g>

        {/* Owner node */}
        <g opacity={owner}>
          <rect x={ownerX - 100} y={ownerY - 40} width={200} height={80} rx={16} fill={COLORS.white} stroke={COLORS.border} />
          <circle cx={ownerX - 60} cy={ownerY} r={18} fill="rgba(0,136,255,0.10)" stroke={COLORS.accent} strokeWidth={1.5} />
          <text x={ownerX - 60} y={ownerY + 5} textAnchor="middle" fontFamily={FONT_SANS} fontSize={14} fontWeight={700} fill={COLORS.accent}>
            M
          </text>
          <text x={ownerX - 30} y={ownerY - 6} fontFamily={FONT_MONO} fontSize={10} fill={COLORS.muted} letterSpacing="2">
            OWNER
          </text>
          <text x={ownerX - 30} y={ownerY + 18} fontFamily={FONT_SANS} fontSize={18} fontWeight={600} fill={COLORS.ink}>
            Mike
          </text>
        </g>

        {/* Route line */}
        <line
          x1={aiX + 90}
          y1={aiY}
          x2={aiX + 90 + (ownerX - 100 - (aiX + 90)) * lineP}
          y2={aiY}
          stroke={COLORS.accent}
          strokeWidth={3}
          strokeDasharray="8 6"
        />
        {lineP > 0.05 && (
          <circle
            cx={aiX + 90 + (ownerX - 100 - (aiX + 90)) * lineP}
            cy={aiY}
            r={8}
            fill={COLORS.accent}
          />
        )}
      </svg>

      {/* TRANSFERRING pill on the line */}
      <div
        style={{
          position: "absolute",
          left: aiX + 90 + (ownerX - 100 - (aiX + 90)) * lineP - 80,
          top: aiY - 70,
          opacity: pillO,
          transform: `scale(${pill})`,
          padding: "10px 18px",
          borderRadius: 999,
          background: "#E11D48",
          color: "#fff",
          fontFamily: FONT_MONO,
          fontSize: 12,
          letterSpacing: "0.22em",
          boxShadow: "0 10px 24px -10px rgba(225,29,72,0.6)",
        }}
      >
        TRANSFERRING…
      </div>
    </AbsoluteFill>
  );
};
