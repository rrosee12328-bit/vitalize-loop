import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Video,
  Sequence,
  staticFile,
  useCurrentFrame,
  spring,
  interpolate,
} from "remotion";
import { COLORS } from "./theme";
import { FONT_MONO, FONT_SANS } from "./fonts";

// 1080x1920, 30fps, ~73s = 2194 frames.
// Speaker stays PIP for the entire video. Motion graphics fill the rest of
// the canvas and change across the timeline.

const F = (s: number) => Math.round(s * 30);

// Re-encoded version avoids full-video decode glitches in Remotion renders.
const SPEAKER_TRIM_FRAMES = 0;

export const SpeakerVerticalVideo: React.FC = () => {
  const scenes: { start: number; end: number; node: React.ReactNode }[] = [
    { start: 0, end: 10, node: <SceneIntro /> },
    { start: 10, end: 14, node: <SceneOS /> },
    { start: 14, end: 23, node: <SceneNetwork /> },
    { start: 23, end: 27, node: <SceneBeat text="Not a tool. Leverage." /> },
    { start: 27, end: 35, node: <SceneToolVsLeverage /> },
    { start: 35, end: 44, node: <SceneFitTheBox /> },
    { start: 44, end: 54, node: <SceneBackwards /> },
    { start: 54, end: 62, node: <SceneShoe /> },
    { start: 62, end: 66, node: <SceneBeat text="This is where the market is going." /> },
    { start: 66, end: 73.1, node: <SceneFuture /> },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <BrandedBackdrop />
      {scenes.map((s, i) => (
        <Sequence key={i} from={F(s.start)} durationInFrames={F(s.end) - F(s.start)}>
          {s.node}
        </Sequence>
      ))}
      <SpeakerPiP />
      <Chrome />
    </AbsoluteFill>
  );
};

// --- speaker PiP (always visible, top-right) --------------------------
const SpeakerPiP: React.FC = () => {
  const frame = useCurrentFrame();
  const pop = spring({ frame, fps: 30, config: { damping: 18, stiffness: 140 } });
  const size = 460;
  return (
    <div
      style={{
        position: "absolute",
        top: 140,
        right: 60,
        width: size,
        height: size,
        borderRadius: size,
        overflow: "hidden",
        border: `4px solid ${COLORS.white}`,
        boxShadow: "0 30px 60px -20px rgba(10,22,40,0.45), 0 0 0 6px rgba(0,136,255,0.18)",
        transform: `scale(${pop})`,
        transformOrigin: "top right",
      }}
    >
      <Video
        src={staticFile("video/speaker_stable.mp4")}
        startFrom={SPEAKER_TRIM_FRAMES}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Audio src={staticFile("video/speaker.m4a")} startFrom={SPEAKER_TRIM_FRAMES} />
    </div>
  );
};

// --- backdrop ---------------------------------------------------------
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
const Chrome: React.FC = () => (
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

// ============= Graphic Scenes (lower 2/3 of canvas) =============
// Layout reserves the top ~640px for the PiP. Scene content lives below.

const SceneShell: React.FC<{ eyebrow?: string; children: React.ReactNode }> = ({ eyebrow, children }) => {
  const frame = useCurrentFrame();
  const fadeIn = spring({ frame: frame - 2, fps: 30, config: { damping: 200 }, durationInFrames: 20 });
  return (
    <AbsoluteFill style={{ padding: "720px 80px 200px", opacity: fadeIn }}>
      {eyebrow && (
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 22,
            letterSpacing: "0.22em",
            color: COLORS.accent,
            marginBottom: 30,
          }}
        >
          {eyebrow}
        </div>
      )}
      {children}
    </AbsoluteFill>
  );
};

// 0:00–0:10 — opener: building motif
const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const a = spring({ frame: frame - 6, fps: 30, config: { damping: 22, stiffness: 140 } });
  const b = spring({ frame: frame - 30, fps: 30, config: { damping: 22, stiffness: 140 } });
  const c = spring({ frame: frame - 60, fps: 30, config: { damping: 22, stiffness: 140 } });
  const strike = ["apps", "dashboards", "chatbots"];
  const reveals = [a, b, c];
  return (
    <SceneShell eyebrow="THE NEXT WAVE">
      <div
        style={{
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 110,
          lineHeight: 0.98,
          letterSpacing: "-0.035em",
          color: COLORS.ink,
        }}
      >
        Not just{" "}
        {strike.map((w, i) => (
          <span key={w} style={{ position: "relative", display: "inline-block", marginRight: 14, opacity: reveals[i] }}>
            {w}
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "55%",
                height: 8,
                background: "#0088FF",
                transform: `scaleX(${reveals[i]})`,
                transformOrigin: "left",
              }}
            />
            {i < strike.length - 1 ? "," : "."}
          </span>
        ))}
      </div>
    </SceneShell>
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
      <div
        style={{
          opacity: l1,
          transform: `translateY(${interpolate(l1, [0, 1], [40, 0])}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 140,
          lineHeight: 0.96,
          letterSpacing: "-0.04em",
          color: COLORS.ink,
        }}
      >
        An operating
      </div>
      <div
        style={{
          opacity: l2,
          transform: `translateY(${interpolate(l2, [0, 1], [40, 0])}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 140,
          lineHeight: 0.96,
          letterSpacing: "-0.04em",
          color: COLORS.ink,
        }}
      >
        <span style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: 14,
              height: 36,
              width: `${sweep * 100}%`,
              background: "rgba(0,136,255,0.28)",
              zIndex: -1,
            }}
          />
          system.
        </span>
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
    <AbsoluteFill style={{ padding: "720px 80px 200px" }}>
      <div
        style={{
          opacity: titleIn,
          fontFamily: FONT_MONO,
          fontSize: 22,
          letterSpacing: "0.22em",
          color: COLORS.accent,
          marginBottom: 20,
        }}
      >
        02 · CONNECTED
      </div>
      <div
        style={{
          opacity: titleIn,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 96,
          lineHeight: 0.98,
          letterSpacing: "-0.035em",
          color: COLORS.ink,
          marginBottom: 40,
        }}
      >
        One system.
      </div>
      <div style={{ position: "relative", width: 920, height: 700, marginLeft: -20 }}>
        <svg viewBox="0 0 920 700" width={920} height={700} style={{ position: "absolute", inset: 0 }}>
          {NODES.map((_, i) => {
            const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
            const rx = 360;
            const ry = 270;
            const x = 460 + Math.cos(angle) * rx;
            const y = 350 + Math.sin(angle) * ry;
            const len = spring({ frame: frame - 10 - i * 4, fps: 30, config: { damping: 22, stiffness: 130 } });
            return (
              <line
                key={i}
                x1={460}
                y1={350}
                x2={460 + (x - 460) * len}
                y2={350 + (y - 350) * len}
                stroke="#0088FF"
                strokeOpacity={0.45}
                strokeWidth={2}
              />
            );
          })}
          <circle cx={460} cy={350} r={48} fill="#0088FF" opacity={0.95} />
          <circle
            cx={460}
            cy={350}
            r={68 + (Math.sin(frame / 6) + 1) * 6}
            fill="none"
            stroke="#0088FF"
            strokeOpacity={0.4}
            strokeWidth={2}
          />
        </svg>
        {NODES.map((n, i) => {
          const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          const rx = 360;
          const ry = 270;
          const x = 460 + Math.cos(angle) * rx;
          const y = 350 + Math.sin(angle) * ry;
          const sp = spring({ frame: frame - 20 - i * 5, fps: 30, config: { damping: 22, stiffness: 130 } });
          return (
            <div
              key={n}
              style={{
                position: "absolute",
                left: x - 110,
                top: y - 36,
                width: 220,
                opacity: sp,
                transform: `translateY(${interpolate(sp, [0, 1], [20, 0])}px)`,
                textAlign: "center",
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: 34,
                color: COLORS.ink,
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: "14px 10px",
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

// Beat text — short emphasis card
const SceneBeat: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const sp = spring({ frame: frame - 2, fps: 30, config: { damping: 22, stiffness: 140 } });
  return (
    <SceneShell>
      <div
        style={{
          opacity: sp,
          transform: `translateY(${interpolate(sp, [0, 1], [30, 0])}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 110,
          lineHeight: 1.0,
          letterSpacing: "-0.035em",
          color: COLORS.ink,
        }}
      >
        {text}
      </div>
    </SceneShell>
  );
};

// 0:27–0:35 — Tool vs Leverage split
const SceneToolVsLeverage: React.FC = () => {
  const frame = useCurrentFrame();
  const left = spring({ frame: frame - 2, fps: 30, config: { damping: 22, stiffness: 140 } });
  const right = spring({ frame: frame - 28, fps: 30, config: { damping: 22, stiffness: 140 } });
  return (
    <SceneShell eyebrow="TOOL · vs · LEVERAGE">
      <div
        style={{
          opacity: left,
          transform: `translateX(${interpolate(left, [0, 1], [-60, 0])}px)`,
          padding: 42,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 22,
          boxShadow: "0 14px 30px -16px rgba(10,22,40,0.18)",
          marginBottom: 30,
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 18, letterSpacing: "0.22em", color: COLORS.muted, marginBottom: 12 }}>
          TOOL
        </div>
        <div style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 70, lineHeight: 1, letterSpacing: "-0.03em", color: COLORS.ink }}>
          Does one thing.
        </div>
      </div>
      <div
        style={{
          opacity: right,
          transform: `translateX(${interpolate(right, [0, 1], [60, 0])}px)`,
          padding: 42,
          background: "#0088FF",
          color: COLORS.white,
          borderRadius: 22,
          boxShadow: "0 22px 50px -20px rgba(0,136,255,0.45)",
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 18, letterSpacing: "0.22em", color: "rgba(255,255,255,0.75)", marginBottom: 12 }}>
          LEVERAGE
        </div>
        <div style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 70, lineHeight: 1, letterSpacing: "-0.03em" }}>
          Moves the whole business.
        </div>
      </div>
    </SceneShell>
  );
};

// 0:35–0:44 — Fit the box
const SceneFitTheBox: React.FC = () => {
  const frame = useCurrentFrame();
  const boxIn = spring({ frame: frame - 4, fps: 30, config: { damping: 22, stiffness: 140 } });
  const stampIn = spring({ frame: frame - 80, fps: 30, config: { damping: 12, stiffness: 180 } });
  return (
    <SceneShell eyebrow="WHERE THEY MISSED IT">
      <div
        style={{
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 78,
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: COLORS.ink,
          marginBottom: 40,
        }}
      >
        "Fit your business
        <br />
        into our platform."
      </div>
      <div
        style={{
          opacity: boxIn,
          transform: `scale(${boxIn})`,
          position: "relative",
          alignSelf: "center",
          width: 620,
          height: 360,
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.white,
          margin: "0 auto",
        }}
      >
        <div style={{ width: 320, height: 200, borderRadius: 999, background: "#0088FF", opacity: 0.8 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(-8deg) scale(${stampIn})`,
            opacity: stampIn,
          }}
        >
          <div
            style={{
              border: "8px solid #c0392b",
              color: "#c0392b",
              padding: "16px 40px",
              fontFamily: FONT_SANS,
              fontWeight: 700,
              fontSize: 68,
              letterSpacing: "0.05em",
              borderRadius: 10,
              background: "rgba(255,255,255,0.6)",
            }}
          >
            BACKWARDS
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

// 0:44–0:54 — counter-statement
const SceneBackwards: React.FC = () => {
  const frame = useCurrentFrame();
  const a = spring({ frame: frame - 2, fps: 30, config: { damping: 22, stiffness: 140 } });
  return (
    <SceneShell eyebrow="THE FIX">
      <div
        style={{
          opacity: a,
          transform: `translateY(${interpolate(a, [0, 1], [30, 0])}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 92,
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
          color: COLORS.ink,
        }}
      >
        Build the system
        <br />
        around the way
        <br />
        you{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ position: "absolute", left: 0, right: 0, bottom: 8, height: 24, background: "rgba(0,136,255,0.28)", zIndex: -1 }} />
          actually work.
        </span>
      </div>
    </SceneShell>
  );
};

// 0:54–1:02 — Shoe metaphor
const SceneShoe: React.FC = () => {
  const frame = useCurrentFrame();
  const a = spring({ frame: frame - 4, fps: 30, config: { damping: 22, stiffness: 140 } });
  const b = spring({ frame: frame - 80, fps: 30, config: { damping: 22, stiffness: 140 } });
  return (
    <SceneShell eyebrow="THE METAPHOR">
      <div
        style={{
          opacity: a,
          transform: `translateY(${interpolate(a, [0, 1], [30, 0])}px)`,
          padding: 36,
          background: COLORS.surface,
          borderRadius: 20,
          border: `1px solid ${COLORS.border}`,
          marginBottom: 30,
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 16, letterSpacing: "0.22em", color: COLORS.muted, marginBottom: 10 }}>OLD WAY</div>
        <div style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 56, lineHeight: 1.05, color: COLORS.ink }}>
          "Make your foot fit this shoe."
        </div>
      </div>
      <div
        style={{
          opacity: b,
          transform: `translateY(${interpolate(b, [0, 1], [30, 0])}px)`,
          padding: 36,
          background: "#0088FF",
          borderRadius: 20,
          color: COLORS.white,
          boxShadow: "0 22px 50px -20px rgba(0,136,255,0.45)",
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 16, letterSpacing: "0.22em", color: "rgba(255,255,255,0.75)", marginBottom: 10 }}>
          VEKTISS WAY
        </div>
        <div style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 56, lineHeight: 1.05 }}>
          Build the shoe around the foot.
        </div>
      </div>
    </SceneShell>
  );
};

// 1:06–1:13 — Future
const FUTURE_CHIPS = ["Workflows", "Data", "Customers", "Staff", "Decisions"];
const SceneFuture: React.FC = () => {
  const frame = useCurrentFrame();
  const titleIn = spring({ frame: frame - 2, fps: 30, config: { damping: 22, stiffness: 140 } });
  return (
    <SceneShell eyebrow="WHERE IT IS GOING">
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [30, 0])}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 110,
          lineHeight: 0.96,
          letterSpacing: "-0.04em",
          color: COLORS.ink,
          marginBottom: 40,
        }}
      >
        Built around
        <br />
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ position: "absolute", left: 0, bottom: 10, height: 28, width: "100%", background: "rgba(0,136,255,0.28)", zIndex: -1 }} />
          your business.
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {FUTURE_CHIPS.map((c, i) => {
          const sp = spring({ frame: frame - 20 - i * 5, fps: 30, config: { damping: 22, stiffness: 140 } });
          return (
            <div
              key={c}
              style={{
                opacity: sp,
                transform: `translateY(${interpolate(sp, [0, 1], [24, 0])}px)`,
                padding: "18px 30px",
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 999,
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: 36,
                color: COLORS.ink,
                boxShadow: "0 14px 30px -18px rgba(10,22,40,0.2)",
              }}
            >
              {c}
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
