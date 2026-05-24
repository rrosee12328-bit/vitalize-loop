import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  random,
} from "remotion";
import { COLORS } from "./theme";
import { FONT_MONO, FONT_SANS } from "./fonts";
import { PersistentBackground } from "./components/PersistentBackground";

// 43s @ 30fps = 1290 frames
// Graphic-led scenes that visually support a voiceover instead of word-for-word text.

/* -------------------------------------------------------------------------- */
/* Shared chrome                                                              */
/* -------------------------------------------------------------------------- */

const TopBar: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 60,
      left: 80,
      right: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: FONT_MONO,
      fontSize: 14,
      letterSpacing: "0.22em",
      color: COLORS.muted,
      zIndex: 5,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <Img
        src={staticFile("images/vektiss-logo.png")}
        style={{ width: 32, height: 32, objectFit: "contain" }}
      />
      <span style={{ color: COLORS.ink, fontWeight: 600 }}>VEKTISS</span>
    </div>
    <div>SITE PREVIEW</div>
  </div>
);

const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const seconds = Math.min(
    Math.floor(durationInFrames / fps),
    Math.floor(frame / fps),
  );
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <div
      style={{
        position: "absolute",
        right: 80,
        bottom: 50,
        fontFamily: FONT_MONO,
        fontSize: 14,
        letterSpacing: "0.22em",
        color: COLORS.muted,
        zIndex: 5,
      }}
    >
      {mm}:{ss}
    </div>
  );
};

// Tiny caption strip at bottom — quietly mirrors the voiceover line.
const Caption: React.FC<{ children: React.ReactNode; durationInFrames: number }> = ({
  children,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 110,
        textAlign: "center",
        opacity: fadeIn * fadeOut,
        fontFamily: FONT_MONO,
        fontSize: 18,
        letterSpacing: "0.04em",
        color: COLORS.muted,
        zIndex: 4,
      }}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Scene 01 — Hero logo + VEKTISS                                             */
/* -------------------------------------------------------------------------- */

const Scene01_Hero: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoIn = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 160 } });
  const wordIn = spring({ frame: frame - 14, fps, config: { damping: 22, stiffness: 130 } });
  const wordY = interpolate(wordIn, [0, 1], [40, 0]);
  const outFade = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: outFade,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <Img
          src={staticFile("images/vektiss-logo.png")}
          style={{
            width: 200,
            height: 200,
            objectFit: "contain",
            transform: `scale(${logoIn})`,
          }}
        />
        <div
          style={{
            opacity: wordIn,
            transform: `translateY(${wordY}px)`,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 220,
            letterSpacing: "-0.04em",
            color: COLORS.ink,
            lineHeight: 1,
          }}
        >
          VEKTISS
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Helpers — card chrome                                                       */
/* -------------------------------------------------------------------------- */

const Card: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  children: React.ReactNode;
  label?: string;
}> = ({ x, y, w, h, delay, children, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 140 } });
  const ty = interpolate(sp, [0, 1], [40, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        opacity: sp,
        transform: `translateY(${ty}px)`,
        background: COLORS.white,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 24,
        boxShadow: "0 20px 60px -30px rgba(10,22,40,0.25)",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {label && (
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            letterSpacing: "0.22em",
            color: COLORS.accent,
            marginBottom: 14,
          }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Scene 02 — Three capability cards (Voice / Systems / Future)               */
/* -------------------------------------------------------------------------- */

const VoiceWaveform: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = 38;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        height: 140,
        marginTop: 24,
      }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const phase = frame * 0.18 + i * 0.45;
        const h =
          26 +
          Math.abs(Math.sin(phase)) * 80 +
          Math.abs(Math.sin(phase * 0.5 + i)) * 18;
        const isAccent = i % 5 === 0;
        return (
          <span
            key={i}
            style={{
              width: 6,
              height: h,
              borderRadius: 3,
              background: isAccent ? COLORS.accent : "rgba(23,23,23,0.55)",
            }}
          />
        );
      })}
    </div>
  );
};

const SystemsFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (frame % 90) / 90;
  return (
    <svg viewBox="0 0 260 140" style={{ width: "100%", height: 140, marginTop: 24 }}>
      {/* Nodes */}
      {[
        { x: 20, y: 30, label: "INTAKE" },
        { x: 130, y: 70, label: "ENGINE" },
        { x: 240, y: 30, label: "OUTPUT" },
        { x: 20, y: 110, label: "RULES" },
        { x: 240, y: 110, label: "LOG" },
      ].map((n, i) => (
        <g key={i}>
          <rect
            x={n.x - 22}
            y={n.y - 10}
            width={44}
            height={20}
            rx={4}
            fill={i === 1 ? COLORS.accent : COLORS.white}
            stroke={COLORS.border}
          />
          <text
            x={n.x}
            y={n.y + 4}
            fontSize={7}
            textAnchor="middle"
            fontFamily="monospace"
            fill={i === 1 ? COLORS.white : COLORS.ink}
            letterSpacing={1}
          >
            {n.label}
          </text>
        </g>
      ))}
      {/* Connections */}
      {[
        ["M42,30 L108,68"],
        ["M152,68 L218,30"],
        ["M42,110 L108,75"],
        ["M152,75 L218,110"],
      ].map((d, i) => (
        <path
          key={i}
          d={d[0]}
          stroke={COLORS.muted}
          strokeWidth={1}
          fill="none"
          strokeDasharray="3 4"
        />
      ))}
      {/* Flowing dot */}
      {[0, 0.25, 0.5, 0.75].map((offset, i) => {
        const tt = (t + offset) % 1;
        const x = 42 + (218 - 42) * tt;
        const y = 30 + Math.sin(tt * Math.PI) * 50;
        return <circle key={i} cx={x} cy={y} r={3} fill={COLORS.accent} />;
      })}
    </svg>
  );
};

const FutureChart: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const points = [
    [0, 110],
    [40, 95],
    [80, 100],
    [120, 80],
    [160, 70],
    [200, 50],
    [240, 30],
    [280, 18],
  ];
  const path = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
    .join(" ");
  const pathLen = 320;
  return (
    <svg viewBox="0 0 290 140" style={{ width: "100%", height: 140, marginTop: 24 }}>
      {/* Grid */}
      {[30, 60, 90, 120].map((y) => (
        <line
          key={y}
          x1={0}
          x2={290}
          y1={y}
          y2={y}
          stroke={COLORS.border}
          strokeDasharray="2 4"
        />
      ))}
      {/* Area */}
      <path
        d={`${path} L280,130 L0,130 Z`}
        fill={COLORS.accent}
        opacity={0.12 * reveal}
      />
      {/* Line */}
      <path
        d={path}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={3}
        strokeDasharray={pathLen}
        strokeDashoffset={pathLen * (1 - reveal)}
      />
      {/* Last dot */}
      <circle cx={280 * reveal} cy={130 - 112 * reveal} r={6} fill={COLORS.accent} />
    </svg>
  );
};

const Scene02_Cards: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const outFade = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill style={{ opacity: outFade }}>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 140,
          right: 140,
          fontFamily: FONT_SANS,
          fontSize: 60,
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: COLORS.ink,
          lineHeight: 1.05,
        }}
      >
        <span style={{ color: COLORS.muted, fontWeight: 500 }}>We help businesses leverage</span>{" "}
        <span>AI to amplify their voice,</span>
        <br />
        <span style={{ color: COLORS.muted, fontWeight: 500 }}>improve their systems, and prepare</span>{" "}
        <span>for where business is going.</span>
      </div>

      <Card x={140} y={500} w={500} h={300} delay={6} label="AMPLIFY · VOICE">
        <VoiceWaveform />
        <div
          style={{
            marginTop: "auto",
            fontFamily: FONT_SANS,
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.ink,
          }}
        >
          AI Voice Assistants
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: COLORS.muted }}>
          24/7 inbound · qualified · routed
        </div>
      </Card>

      <Card x={710} y={500} w={500} h={300} delay={18} label="IMPROVE · SYSTEMS">
        <SystemsFlow />
        <div
          style={{
            marginTop: "auto",
            fontFamily: FONT_SANS,
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.ink,
          }}
        >
          Connected Operations
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: COLORS.muted }}>
          Intake → engine → output
        </div>
      </Card>

      <Card x={1280} y={500} w={500} h={300} delay={30} label="PREPARE · FUTURE">
        <FutureChart />
        <div
          style={{
            marginTop: "auto",
            fontFamily: FONT_SANS,
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.ink,
          }}
        >
          Built for what's next
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: COLORS.muted }}>
          Where business is going
        </div>
      </Card>
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Scene 03 — Vektiss Intelligence reveal                                     */
/* -------------------------------------------------------------------------- */

const Scene03_IntelligenceTitle: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eyebrowIn = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 24 });
  const logoIn = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 160 } });
  const wordIn = spring({ frame: frame - 20, fps, config: { damping: 22, stiffness: 130 } });
  const wordY = interpolate(wordIn, [0, 1], [40, 0]);
  const sweep = interpolate(frame, [38, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outFade = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: outFade,
      }}
    >
      <div
        style={{
          opacity: eyebrowIn,
          fontFamily: FONT_MONO,
          fontSize: 14,
          letterSpacing: "0.28em",
          color: COLORS.accent,
          marginBottom: 36,
        }}
      >
        02 · WHAT WE'RE BUILDING
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <Img
          src={staticFile("images/vektiss-logo.png")}
          style={{
            width: 140,
            height: 140,
            objectFit: "contain",
            transform: `scale(${logoIn})`,
          }}
        />
        <div
          style={{
            opacity: wordIn,
            transform: `translateY(${wordY}px)`,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 140,
            letterSpacing: "-0.04em",
            color: COLORS.ink,
            lineHeight: 1,
            position: "relative",
          }}
        >
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: 14,
                height: 28,
                width: `${sweep * 100}%`,
                background: "rgba(0,85,255,0.22)",
                zIndex: -1,
              }}
            />
            Vektiss Intelligence
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Scene 04 — Network graph "how a company actually works"                    */
/* -------------------------------------------------------------------------- */

const Scene04_Network: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eyebrowIn = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 24 });

  // Define a constellation of nodes
  const nodes = [
    { id: "calls", x: 360, y: 360, label: "CALLS" },
    { id: "tasks", x: 580, y: 240, label: "TASKS" },
    { id: "billing", x: 760, y: 380, label: "BILLING" },
    { id: "people", x: 520, y: 540, label: "PEOPLE" },
    { id: "data", x: 320, y: 580, label: "DATA" },
    { id: "ops", x: 820, y: 600, label: "OPS" },
    { id: "core", x: 580, y: 400, label: "" }, // central
  ];
  const links: Array<[number, number]> = [
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [0, 1],
    [1, 2],
    [3, 4],
    [3, 5],
  ];

  const outFade = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: outFade }}>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 140,
          right: 140,
          opacity: eyebrowIn,
          fontFamily: FONT_MONO,
          fontSize: 14,
          letterSpacing: "0.28em",
          color: COLORS.accent,
        }}
      >
        03 · HOW IT ACTUALLY WORKS
      </div>
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 140,
          right: 800,
          fontFamily: FONT_SANS,
          fontSize: 72,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.02,
          color: COLORS.ink,
        }}
      >
        Understand how a company{" "}
        <span style={{ color: COLORS.accent }}>actually works.</span>
      </div>

      {/* Graph canvas */}
      <svg
        viewBox="0 0 1200 800"
        style={{
          position: "absolute",
          top: 120,
          right: 60,
          width: 900,
          height: 700,
        }}
      >
        {/* Links */}
        {links.map(([a, b], i) => {
          const reveal = interpolate(frame, [10 + i * 3, 30 + i * 3], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const A = nodes[a];
          const B = nodes[b];
          const dx = B.x - A.x;
          const dy = B.y - A.y;
          return (
            <line
              key={i}
              x1={A.x}
              y1={A.y}
              x2={A.x + dx * reveal}
              y2={A.y + dy * reveal}
              stroke={COLORS.accent}
              strokeOpacity={0.35}
              strokeWidth={1.5}
              strokeDasharray="4 6"
            />
          );
        })}

        {/* Pulse circles around core */}
        {[0, 1, 2].map((i) => {
          const t = ((frame + i * 30) % 90) / 90;
          const r = interpolate(t, [0, 1], [20, 120]);
          const o = interpolate(t, [0, 1], [0.35, 0]);
          return (
            <circle
              key={i}
              cx={580}
              cy={400}
              r={r}
              fill="none"
              stroke={COLORS.accent}
              strokeOpacity={o}
              strokeWidth={1.5}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const sp = spring({
            frame: frame - 6 - i * 5,
            fps,
            config: { damping: 14, stiffness: 180 },
          });
          const isCore = n.id === "core";
          const r = isCore ? 28 : 18;
          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y}) scale(${sp})`}
            >
              <circle
                r={r}
                fill={isCore ? COLORS.accent : COLORS.white}
                stroke={isCore ? COLORS.accent : COLORS.ink}
                strokeWidth={isCore ? 0 : 1.5}
              />
              {!isCore && (
                <text
                  y={r + 22}
                  textAnchor="middle"
                  fontSize={14}
                  fontFamily="monospace"
                  letterSpacing={2}
                  fill={COLORS.muted}
                >
                  {n.label}
                </text>
              )}
              {isCore && (
                <circle r={10} fill={COLORS.white} />
              )}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Scene 05 — Not paper, not in a meeting                                     */
/* -------------------------------------------------------------------------- */

const FakeOrgChart: React.FC = () => (
  <svg viewBox="0 0 280 180" style={{ width: "100%", height: 180, marginTop: 8 }}>
    {[
      { x: 110, y: 20 },
      { x: 40, y: 90 },
      { x: 110, y: 90 },
      { x: 180, y: 90 },
      { x: 20, y: 150 },
      { x: 60, y: 150 },
      { x: 110, y: 150 },
      { x: 160, y: 150 },
      { x: 200, y: 150 },
    ].map((n, i) => (
      <rect
        key={i}
        x={n.x}
        y={n.y}
        width={60}
        height={26}
        rx={3}
        fill={COLORS.white}
        stroke={COLORS.muted}
      />
    ))}
    <g stroke={COLORS.muted} strokeWidth={1}>
      <line x1={140} y1={46} x2={140} y2={70} />
      <line x1={70} y1={70} x2={210} y2={70} />
      <line x1={70} y1={70} x2={70} y2={90} />
      <line x1={140} y1={70} x2={140} y2={90} />
      <line x1={210} y1={70} x2={210} y2={90} />
    </g>
  </svg>
);

const FakeMeeting: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      {[
        { speaker: "AVA", line: "We need an update on the Q3 plan…" },
        { speaker: "JON", line: "Pipeline is up. I think." },
        { speaker: "MEL", line: "We'll circle back next week." },
        { speaker: "AVA", line: "Cool. Any blockers?" },
      ].map((m, i) => {
        const sp = interpolate(frame, [i * 18, i * 18 + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              opacity: sp,
              transform: `translateX(${(1 - sp) * 12}px)`,
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 11,
                letterSpacing: "0.2em",
                color: COLORS.accent,
                width: 36,
                marginTop: 4,
              }}
            >
              {m.speaker}
            </div>
            <div
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: "8px 14px",
                fontFamily: FONT_SANS,
                fontSize: 18,
                color: COLORS.ink,
              }}
            >
              {m.line}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CrossOut: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [delay, delay + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <line
        x1={5}
        y1={8}
        x2={5 + 90 * draw}
        y2={8 + 84 * draw}
        stroke={COLORS.accent}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
};

const Scene05_NotPaper: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const outFade = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill style={{ opacity: outFade }}>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 140,
          right: 140,
          fontFamily: FONT_SANS,
          fontSize: 64,
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.04,
          color: COLORS.ink,
        }}
      >
        Not how it looks on{" "}
        <span style={{ color: COLORS.muted }}>paper.</span>
        <br />
        Not how it sounds in a{" "}
        <span style={{ color: COLORS.muted }}>meeting.</span>
      </div>

      <Card x={200} y={500} w={680} h={360} delay={4} label="THE ORG CHART">
        <div style={{ position: "relative" }}>
          <FakeOrgChart />
          <CrossOut delay={36} />
        </div>
        <div style={{ marginTop: "auto", fontFamily: FONT_MONO, fontSize: 12, color: COLORS.muted }}>
          Tidy. And not how it actually works.
        </div>
      </Card>

      <Card x={1040} y={500} w={680} h={360} delay={16} label="THE STATUS MEETING">
        <div style={{ position: "relative" }}>
          <FakeMeeting />
          <CrossOut delay={62} />
        </div>
        <div style={{ marginTop: "auto", fontFamily: FONT_MONO, fontSize: 12, color: COLORS.muted }}>
          Optimistic. And not how it actually works.
        </div>
      </Card>
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Scene 06 — Streams of operational chips flow into a central hub            */
/* -------------------------------------------------------------------------- */

const STREAM_ITEMS = [
  "Calls",
  "Customers",
  "Tasks",
  "Approvals",
  "Billings",
  "Projects",
  "Communications",
  "Decisions",
];

const Scene06_Streams: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const outFade = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const hubIn = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 160 } });

  // Each chip flies from an edge into the hub at center.
  const cx = 960;
  const cy = 540;
  const starts: Array<{ x: number; y: number; color: string }> = [
    { x: 80, y: 240, color: COLORS.ink },
    { x: 1820, y: 200, color: COLORS.ink },
    { x: 100, y: 540, color: COLORS.accent },
    { x: 1840, y: 540, color: COLORS.ink },
    { x: 120, y: 820, color: COLORS.ink },
    { x: 1820, y: 800, color: COLORS.accent },
    { x: 760, y: 100, color: COLORS.ink },
    { x: 1140, y: 980, color: COLORS.ink },
  ];

  return (
    <AbsoluteFill style={{ opacity: outFade }}>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT_MONO,
          fontSize: 14,
          letterSpacing: "0.28em",
          color: COLORS.accent,
        }}
      >
        04 · HOW IT REALLY OPERATES
      </div>

      {/* Hub */}
      <div
        style={{
          position: "absolute",
          left: cx - 140,
          top: cy - 140,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: COLORS.accent,
          opacity: hubIn,
          transform: `scale(${hubIn})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 30px 80px -30px rgba(0,85,255,0.55)",
        }}
      >
        <Img
          src={staticFile("images/vektiss-logo.png")}
          style={{
            width: 150,
            height: 150,
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>

      {/* Pulse rings */}
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 24) % 72) / 72;
        const r = interpolate(t, [0, 1], [150, 360]);
        const o = interpolate(t, [0, 1], [0.35, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - r,
              top: cy - r,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              border: `2px solid ${COLORS.accent}`,
              opacity: o,
            }}
          />
        );
      })}

      {/* Streaming chips */}
      {STREAM_ITEMS.map((label, i) => {
        const delay = 6 + i * 6;
        const sp = spring({
          frame: frame - delay,
          fps,
          config: { damping: 28, stiffness: 70 },
        });
        const s = starts[i];
        const x = interpolate(sp, [0, 1], [s.x, cx]);
        const y = interpolate(sp, [0, 1], [s.y, cy]);
        const op = interpolate(sp, [0, 0.6, 1], [0, 1, 0]);
        const scale = interpolate(sp, [0, 1], [1, 0.4]);
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: op,
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: 30,
              padding: "14px 26px",
              borderRadius: 999,
              background: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              color: s.color,
              boxShadow: "0 12px 36px -16px rgba(10,22,40,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Scene 07 — Internal dashboard: "one operating layer"                        */
/* -------------------------------------------------------------------------- */

const MiniBar: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const bars = [60, 35, 80, 50, 70, 45, 90];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 70, marginTop: 12 }}>
      {bars.map((b, i) => {
        const h = interpolate(
          frame,
          [delay + i * 2, delay + 14 + i * 2],
          [0, b],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <span
            key={i}
            style={{
              width: 14,
              height: h,
              borderRadius: 3,
              background: i === bars.length - 1 ? COLORS.accent : "rgba(23,23,23,0.35)",
            }}
          />
        );
      })}
    </div>
  );
};

const MiniList: React.FC<{ items: string[]; delay: number }> = ({ items, delay }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((it, i) => {
        const op = interpolate(frame, [delay + i * 4, delay + 14 + i * 4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const tx = interpolate(op, [0, 1], [10, 0]);
        return (
          <div
            key={i}
            style={{
              opacity: op,
              transform: `translateX(${tx}px)`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: FONT_SANS,
              fontSize: 16,
              color: COLORS.ink,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: i % 3 === 0 ? COLORS.accent : COLORS.muted,
              }}
            />
            {it}
          </div>
        );
      })}
    </div>
  );
};

const MiniKPI: React.FC<{ label: string; value: string; delay: number; accent?: boolean }> = ({
  label,
  value,
  delay,
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 140 } });
  return (
    <div
      style={{
        opacity: sp,
        transform: `translateY(${(1 - sp) * 16}px)`,
        flex: 1,
        padding: 14,
        borderRadius: 12,
        background: accent ? COLORS.accent : COLORS.surface,
        color: accent ? COLORS.white : COLORS.ink,
      }}
    >
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 10,
          letterSpacing: "0.2em",
          opacity: 0.8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: FONT_SANS,
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: "-0.02em",
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  );
};

const Scene07_Dashboard: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eyebrowIn = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 24 });

  // Final hero text appears at the back half
  const heroStart = durationInFrames - 130;
  const heroIn = spring({ frame: frame - heroStart, fps, config: { damping: 22, stiffness: 130 } });
  const heroY = interpolate(heroIn, [0, 1], [40, 0]);
  const sweep = interpolate(
    frame,
    [heroStart + 24, heroStart + 78],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const dashOpacity = interpolate(
    frame,
    [heroStart - 10, heroStart + 30],
    [1, 0.18],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const outFade = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: outFade }}>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: eyebrowIn,
          fontFamily: FONT_MONO,
          fontSize: 14,
          letterSpacing: "0.28em",
          color: COLORS.accent,
        }}
      >
        05 · INSIDE OUR OWN COMPANY
      </div>

      {/* Dashboard frame */}
      <div
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: 200,
          bottom: 220,
          borderRadius: 28,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 40px 120px -50px rgba(10,22,40,0.35)",
          padding: 28,
          display: "grid",
          gridTemplateColumns: "260px 1fr 1fr",
          gridTemplateRows: "auto 1fr 1fr",
          gap: 18,
          opacity: dashOpacity,
        }}
      >
        {/* App rail */}
        <div
          style={{
            gridRow: "1 / span 3",
            background: COLORS.surface,
            borderRadius: 18,
            padding: 18,
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              color: COLORS.muted,
              marginBottom: 14,
            }}
          >
            VEKTISS · INTELLIGENCE
          </div>
          <MiniList
            delay={6}
            items={[
              "Admin",
              "Operations",
              "Clients",
              "Tasks",
              "Proposals",
              "Billing",
              "Profitability",
              "Approvals",
              "Communication",
              "AI Decisions",
            ]}
          />
        </div>

        {/* KPI strip */}
        <div style={{ gridColumn: "2 / span 2", display: "flex", gap: 14 }}>
          <MiniKPI label="ACTIVE PROJECTS" value="42" delay={10} />
          <MiniKPI label="OPEN APPROVALS" value="7" delay={14} />
          <MiniKPI label="MARGIN" value="38%" delay={18} accent />
          <MiniKPI label="AI DECISIONS / WK" value="318" delay={22} />
        </div>

        {/* Operations panel */}
        <div
          style={{
            background: COLORS.surface,
            borderRadius: 18,
            padding: 18,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              color: COLORS.muted,
            }}
          >
            OPERATIONS · LAST 7 DAYS
          </div>
          <MiniBar delay={12} />
          <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 14, color: COLORS.muted }}>
            Tasks closed across the team
          </div>
        </div>

        <div
          style={{
            background: COLORS.surface,
            borderRadius: 18,
            padding: 18,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              color: COLORS.muted,
            }}
          >
            CLIENTS · ACTIVITY
          </div>
          <MiniBar delay={20} />
          <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 14, color: COLORS.muted }}>
            Calls, replies, proposals, billings
          </div>
        </div>
        <div
          style={{
            background: COLORS.surface,
            borderRadius: 18,
            padding: 18,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              color: COLORS.muted,
            }}
          >
            AI DECISION QUEUE
          </div>
          <MiniList
            delay={28}
            items={[
              "Approve invoice · ACME · $4,200",
              "Reroute call · After-hours rule",
              "Flag scope risk · Project 117",
              "Draft reply · 6 inbound emails",
            ]}
          />
        </div>
        <div
          style={{
            background: COLORS.surface,
            borderRadius: 18,
            padding: 18,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              color: COLORS.muted,
            }}
          >
            PROFITABILITY
          </div>
          <MiniBar delay={34} />
          <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 14, color: COLORS.muted }}>
            Per project, per client, per week
          </div>
        </div>
      </div>

      {/* Hero close text */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: `translateY(calc(-50% + ${heroY}px))`,
          textAlign: "center",
          opacity: heroIn,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 14,
            letterSpacing: "0.28em",
            color: COLORS.accent,
            marginBottom: 24,
          }}
        >
          ONE OPERATING LAYER
        </div>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 140,
            letterSpacing: "-0.04em",
            color: COLORS.ink,
            lineHeight: 1,
          }}
        >
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: 14,
                height: 32,
                width: `${sweep * 100}%`,
                background: "rgba(0,85,255,0.22)",
                zIndex: -1,
              }}
            />
            One operating layer.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Main composition                                                           */
/* -------------------------------------------------------------------------- */

type SceneSpec = {
  from: number;
  dur: number;
  caption: string;
  Comp: React.FC<{ durationInFrames: number }>;
};

const SCENES: SceneSpec[] = [
  { from: 0, dur: 60, caption: "And this is why we built Vektiss.", Comp: Scene01_Hero },
  {
    from: 60,
    dur: 240,
    caption:
      "We help businesses leverage AI to amplify their voice, improve their systems, and prepare for where business is going.",
    Comp: Scene02_Cards,
  },
  {
    from: 300,
    dur: 120,
    caption: "One of the things we've been building is called Vektiss Intelligence.",
    Comp: Scene03_IntelligenceTitle,
  },
  {
    from: 420,
    dur: 120,
    caption:
      "Vektiss Intelligence is designed to help a company understand how it actually works.",
    Comp: Scene04_Network,
  },
  {
    from: 540,
    dur: 120,
    caption: "Not how it looks on paper. Not how it sounds in a meeting.",
    Comp: Scene05_NotPaper,
  },
  {
    from: 660,
    dur: 210,
    caption:
      "But how it really operates — across calls, customers, tasks, approvals, billings, projects, communications, and decisions.",
    Comp: Scene06_Streams,
  },
  {
    from: 870,
    dur: 420,
    caption:
      "Inside our own company we built a system that connects admin, operations, clients, tasks, proposals, billing, profitability, approvals, communication, and AI decision support — into one operating layer.",
    Comp: Scene07_Dashboard,
  },
];

export const SiteIntroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <PersistentBackground />
      <TopBar />

      {SCENES.map((s, i) => {
        const Comp = s.Comp;
        return (
          <Sequence key={i} from={s.from} durationInFrames={s.dur}>
            <Comp durationInFrames={s.dur} />
            <Caption durationInFrames={s.dur}>{s.caption}</Caption>
          </Sequence>
        );
      })}

      <Counter />
    </AbsoluteFill>
  );
};
