import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS } from "./theme";
import { FONT_MONO, FONT_SANS } from "./fonts";

// 1080x1920, 30fps, ~73s = 2194 frames.
// The speaker video is the audio source AND the visual source. We always
// render the OffthreadVideo so audio plays continuously; the visual style
// shifts between full-bleed, picture-in-picture, and tucked-away states so
// graphic scenes can take the stage at chosen moments.

type Segment = {
  start: number; // seconds
  end: number;
  mode: "full" | "pip" | "graphic";
  scene?: React.ReactNode;
};

const F = (s: number) => Math.round(s * 30);

export const SpeakerVerticalVideo: React.FC = () => {
  const segments: Segment[] = [
    { start: 0, end: 10, mode: "full" }, // intro hook on camera
    { start: 10, end: 14, mode: "graphic", scene: <SceneOS /> },
    { start: 14, end: 23, mode: "graphic", scene: <SceneNetwork /> },
    { start: 23, end: 27, mode: "pip" },
    { start: 27, end: 31, mode: "graphic", scene: <SceneToolVsLeverage /> },
    { start: 31, end: 35, mode: "graphic", scene: <SceneToolVsLeverage highlight /> },
    { start: 35, end: 44, mode: "graphic", scene: <SceneFitTheBox /> },
    { start: 44, end: 54, mode: "pip" },
    { start: 54, end: 62, mode: "graphic", scene: <SceneShoe /> },
    { start: 62, end: 66, mode: "full" },
    { start: 66, end: 73.1, mode: "graphic", scene: <SceneFuture /> },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <BrandedBackdrop />
      <SpeakerLayer segments={segments} />
      {segments
        .filter((s) => s.scene)
        .map((s, i) => (
          <Sequence key={i} from={F(s.start)} durationInFrames={F(s.end) - F(s.start)}>
            {s.scene}
          </Sequence>
        ))}
      <Chrome />
    </AbsoluteFill>
  );
};

// --- speaker layer with mode-driven transform -------------------------
const SpeakerLayer: React.FC<{ segments: Segment[] }> = ({ segments }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const seg = segments.find((s) => t >= s.start && t < s.end) ?? segments[0];

  // animate transitions between modes via a per-segment local frame
  const segStartF = F(seg.start);
  const local = frame - segStartF;
  const ease = spring({ frame: local, fps: 30, config: { damping: 22, stiffness: 140 } });

  let target: React.CSSProperties = {};
  if (seg.mode === "full") {
    target = { transform: "translate(0px, 0px) scale(1)", borderRadius: 0, opacity: 1 };
  } else if (seg.mode === "pip") {
    // PiP: small rounded circle top-right
    const tx = interpolate(ease, [0, 1], [0, 360]);
    const ty = interpolate(ease, [0, 1], [0, -700]);
    const sc = interpolate(ease, [0, 1], [1, 0.32]);
    target = {
      transform: `translate(${tx}px, ${ty}px) scale(${sc})`,
      borderRadius: 400,
      opacity: 1,
      boxShadow: "0 30px 60px -20px rgba(10,22,40,0.35)",
    };
  } else {
    // graphic: tuck away to a tiny chip bottom-left
    const tx = interpolate(ease, [0, 1], [0, -360]);
    const ty = interpolate(ease, [0, 1], [0, 760]);
    const sc = interpolate(ease, [0, 1], [1, 0.18]);
    target = {
      transform: `translate(${tx}px, ${ty}px) scale(${sc})`,
      borderRadius: 400,
      opacity: interpolate(ease, [0, 1], [1, 0.95]),
      boxShadow: "0 20px 40px -20px rgba(10,22,40,0.3)",
    };
  }

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          transformOrigin: "center center",
          transition: "none",
          ...target,
        }}
      >
        <OffthreadVideo src={staticFile("video/speaker.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </AbsoluteFill>
  );
};

// --- branded backdrop visible during graphic scenes -------------------
const BrandedBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (frame % 900) / 900;
  const x = interpolate(drift, [0, 1], [-120, 120]);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 700px at ${50 + x / 10}% 35%, rgba(0,136,255,0.18), transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(23,23,23,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,23,23,0.05) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};

// --- persistent brand chrome ------------------------------------------
const Chrome: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: FONT_SANS,
        }}
      >
        <Img src={staticFile("images/vektiss-logo.png")} style={{ width: 44, height: 44, objectFit: "contain" }} />
        <span style={{ color: COLORS.ink, fontWeight: 600, fontSize: 30, letterSpacing: "-0.01em" }}>VEKTISS</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: FONT_MONO,
          fontSize: 16,
          letterSpacing: "0.22em",
          color: COLORS.muted,
        }}
      >
        <span>AI · OPERATING SYSTEMS</span>
        <span>VEKTISS.COM</span>
      </div>
    </AbsoluteFill>
  );
};

// ============= Graphic Scenes =============

const SceneShell: React.FC<{ eyebrow?: string; children: React.ReactNode }> = ({ eyebrow, children }) => {
  const frame = useCurrentFrame();
  const fadeIn = spring({ frame: frame - 2, fps: 30, config: { damping: 200 }, durationInFrames: 20 });
  return (
    <AbsoluteFill style={{ padding: "260px 80px 240px", opacity: fadeIn }}>
      {eyebrow && (
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 22,
            letterSpacing: "0.22em",
            color: COLORS.accent,
            marginBottom: 36,
          }}
        >
          {eyebrow}
        </div>
      )}
      {children}
    </AbsoluteFill>
  );
};

// 0:10–0:14 — Operating System reveal
const SceneOS: React.FC = () => {
  const frame = useCurrentFrame();
  const l1 = spring({ frame: frame - 4, fps: 30, config: { damping: 22, stiffness: 140 } });
  const l2 = spring({ frame: frame - 22, fps: 30, config: { damping: 22, stiffness: 140 } });
  const sweep = interpolate(frame, [40, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneShell eyebrow="01 · THE OS">
      <div style={{ opacity: l1, transform: `translateY(${interpolate(l1, [0, 1], [40, 0])}px)`, fontFamily: FONT_SANS, fontWeight: 600, fontSize: 150, lineHeight: 0.96, letterSpacing: "-0.04em", color: COLORS.ink }}>
        An operating
      </div>
      <div style={{ opacity: l2, transform: `translateY(${interpolate(l2, [0, 1], [40, 0])}px)`, fontFamily: FONT_SANS, fontWeight: 600, fontSize: 150, lineHeight: 0.96, letterSpacing: "-0.04em", color: COLORS.ink, position: "relative", display: "inline-block" }}>
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ position: "absolute", left: 0, bottom: 18, height: 40, width: `${sweep * 100}%`, background: "rgba(0,136,255,0.28)", zIndex: -1 }} />
          system.
        </span>
      </div>
      <div style={{ marginTop: 60, fontFamily: FONT_SANS, fontSize: 40, lineHeight: 1.35, color: COLORS.muted, opacity: l2 }}>
        Not an app. Not a dashboard. Not a chatbot.
      </div>
    </SceneShell>
  );
};

// 0:14–0:23 — Network of nodes
const NODES = ["Work", "People", "Customers", "Data", "Decisions"];
const SceneNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const titleIn = spring({ frame: frame - 2, fps: 30, config: { damping: 22, stiffness: 140 } });
  return (
    <AbsoluteFill style={{ padding: "240px 80px 240px" }}>
      <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [30, 0])}px)`, fontFamily: FONT_MONO, fontSize: 22, letterSpacing: "0.22em", color: COLORS.accent, marginBottom: 24 }}>
        02 · CONNECTED
      </div>
      <div style={{ opacity: titleIn, fontFamily: FONT_SANS, fontWeight: 600, fontSize: 110, lineHeight: 0.98, letterSpacing: "-0.035em", color: COLORS.ink, marginBottom: 80 }}>
        One system.<br />Connected.
      </div>
      <div style={{ position: "relative", width: 920, height: 920, marginTop: 20 }}>
        <svg viewBox="0 0 920 920" width={920} height={920} style={{ position: "absolute", inset: 0 }}>
          {NODES.map((_, i) => {
            const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
            const r = 380;
            const x = 460 + Math.cos(angle) * r;
            const y = 460 + Math.sin(angle) * r;
            const len = spring({ frame: frame - 10 - i * 4, fps: 30, config: { damping: 22, stiffness: 130 } });
            return (
              <line
                key={i}
                x1={460}
                y1={460}
                x2={460 + (x - 460) * len}
                y2={460 + (y - 460) * len}
                stroke="#0088FF"
                strokeOpacity={0.45}
                strokeWidth={2}
              />
            );
          })}
          <circle cx={460} cy={460} r={50} fill="#0088FF" opacity={0.95} />
          <circle cx={460} cy={460} r={70 + (Math.sin(frame / 6) + 1) * 6} fill="none" stroke="#0088FF" strokeOpacity={0.4} strokeWidth={2} />
        </svg>
        {NODES.map((n, i) => {
          const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          const r = 380;
          const x = 460 + Math.cos(angle) * r;
          const y = 460 + Math.sin(angle) * r;
          const sp = spring({ frame: frame - 20 - i * 5, fps: 30, config: { damping: 22, stiffness: 130 } });
          return (
            <div
              key={n}
              style={{
                position: "absolute",
                left: x - 110,
                top: y - 40,
                width: 220,
                opacity: sp,
                transform: `translateY(${interpolate(sp, [0, 1], [20, 0])}px)`,
                textAlign: "center",
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: 38,
                color: COLORS.ink,
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 18,
                padding: "18px 10px",
                boxShadow: "0 14px 30px -16px rgba(10,22,40,0.18)",
              }}
            >
              {n}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 0:27–0:35 — Tool vs Leverage split
const SceneToolVsLeverage: React.FC<{ highlight?: boolean }> = ({ highlight }) => {
  const frame = useCurrentFrame();
  const left = spring({ frame: frame - 2, fps: 30, config: { damping: 22, stiffness: 140 } });
  const right = spring({ frame: frame - 14, fps: 30, config: { damping: 22, stiffness: 140 } });
  return (
    <AbsoluteFill style={{ padding: "260px 80px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 40 }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 22, letterSpacing: "0.22em", color: COLORS.accent }}>
        TOOL · vs · LEVERAGE
      </div>
      <div style={{ opacity: left, transform: `translateX(${interpolate(left, [0, 1], [-60, 0])}px)`, padding: 50, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 24, boxShadow: "0 14px 30px -16px rgba(10,22,40,0.18)" }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 20, letterSpacing: "0.22em", color: COLORS.muted, marginBottom: 16 }}>TOOL</div>
        <div style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 80, lineHeight: 1, letterSpacing: "-0.03em", color: COLORS.ink }}>Does one thing.</div>
      </div>
      <div style={{ opacity: right, transform: `translateX(${interpolate(right, [0, 1], [60, 0])}px)`, padding: 50, background: highlight ? "#0088FF" : COLORS.ink, color: COLORS.white, borderRadius: 24, boxShadow: "0 22px 50px -20px rgba(0,136,255,0.45)" }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 20, letterSpacing: "0.22em", color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>LEVERAGE</div>
        <div style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 80, lineHeight: 1, letterSpacing: "-0.03em" }}>Moves the whole business.</div>
      </div>
    </AbsoluteFill>
  );
};

// 0:35–0:44 — "Fit your business into it" vs the inverse
const SceneFitTheBox: React.FC = () => {
  const frame = useCurrentFrame();
  const boxIn = spring({ frame: frame - 4, fps: 30, config: { damping: 22, stiffness: 140 } });
  const stampIn = spring({ frame: frame - 80, fps: 30, config: { damping: 12, stiffness: 180 } });
  return (
    <AbsoluteFill style={{ padding: "240px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 22, letterSpacing: "0.22em", color: COLORS.accent, marginBottom: 30 }}>
        WHERE THEY MISSED IT
      </div>
      <div style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 96, lineHeight: 1, letterSpacing: "-0.035em", color: COLORS.ink, marginBottom: 60 }}>
        "Fit your business<br />into our platform."
      </div>
      <div style={{ opacity: boxIn, transform: `scale(${boxIn})`, position: "relative", alignSelf: "center", width: 700, height: 480, border: `4px solid ${COLORS.ink}`, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.white }}>
        <div style={{ width: 360, height: 220, borderRadius: 999, background: "#0088FF", opacity: 0.8 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(-8deg) scale(${stampIn})`, opacity: stampIn }}>
          <div style={{ border: "8px solid #c0392b", color: "#c0392b", padding: "20px 50px", fontFamily: FONT_SANS, fontWeight: 700, fontSize: 80, letterSpacing: "0.05em", borderRadius: 12, background: "rgba(255,255,255,0.6)" }}>
            BACKWARDS
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 0:54–1:02 — Shoe metaphor
const SceneShoe: React.FC = () => {
  const frame = useCurrentFrame();
  const a = spring({ frame: frame - 4, fps: 30, config: { damping: 22, stiffness: 140 } });
  const b = spring({ frame: frame - 80, fps: 30, config: { damping: 22, stiffness: 140 } });
  return (
    <AbsoluteFill style={{ padding: "240px 80px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 50 }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 22, letterSpacing: "0.22em", color: COLORS.accent }}>
        THE METAPHOR
      </div>
      <div style={{ opacity: a, transform: `translateY(${interpolate(a, [0, 1], [30, 0])}px)`, padding: 44, background: COLORS.surface, borderRadius: 22, border: `1px solid ${COLORS.border}` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 18, letterSpacing: "0.22em", color: COLORS.muted, marginBottom: 12 }}>OLD WAY</div>
        <div style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 64, lineHeight: 1.05, color: COLORS.ink }}>
          "Make your foot fit this shoe."
        </div>
      </div>
      <div style={{ opacity: b, transform: `translateY(${interpolate(b, [0, 1], [30, 0])}px)`, padding: 44, background: "#0088FF", borderRadius: 22, color: COLORS.white, boxShadow: "0 22px 50px -20px rgba(0,136,255,0.45)" }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 18, letterSpacing: "0.22em", color: "rgba(255,255,255,0.75)", marginBottom: 12 }}>VEKTISS WAY</div>
        <div style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 64, lineHeight: 1.05 }}>
          Build the shoe around the foot.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 1:06–1:13 — Future
const FUTURE_CHIPS = ["Workflows", "Data", "Customers", "Staff", "Decisions"];
const SceneFuture: React.FC = () => {
  const frame = useCurrentFrame();
  const titleIn = spring({ frame: frame - 2, fps: 30, config: { damping: 22, stiffness: 140 } });
  return (
    <AbsoluteFill style={{ padding: "260px 80px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 50 }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 22, letterSpacing: "0.22em", color: COLORS.accent }}>
        WHERE IT IS GOING
      </div>
      <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [30, 0])}px)`, fontFamily: FONT_SANS, fontWeight: 600, fontSize: 130, lineHeight: 0.96, letterSpacing: "-0.04em", color: COLORS.ink }}>
        Built around<br />
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ position: "absolute", left: 0, bottom: 14, height: 32, width: "100%", background: "rgba(0,136,255,0.28)", zIndex: -1 }} />
          your business.
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
        {FUTURE_CHIPS.map((c, i) => {
          const sp = spring({ frame: frame - 20 - i * 5, fps: 30, config: { damping: 22, stiffness: 140 } });
          return (
            <div
              key={c}
              style={{
                opacity: sp,
                transform: `translateY(${interpolate(sp, [0, 1], [24, 0])}px)`,
                padding: "22px 36px",
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 999,
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: 42,
                color: COLORS.ink,
                boxShadow: "0 14px 30px -18px rgba(10,22,40,0.2)",
              }}
            >
              {c}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
