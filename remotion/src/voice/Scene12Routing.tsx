import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 11s — Routing diagram. Caller → Vektiss → CRM / Calendar / SMS / Email.
export const Scene12Routing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  const nodes = [
    { label: "CRM", x: 1080, y: 240 },
    { label: "Calendar", x: 1080, y: 360 },
    { label: "SMS", x: 1080, y: 480 },
    { label: "Email", x: 1080, y: 600 },
  ];

  return (
    <AbsoluteFill>
      <VoiceBackground />
      <VoiceHUD eyebrow="10 · WHERE IT GOES" />

      <div style={{ position: "absolute", left: 110, top: 130, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          ROUTING
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
          fontSize: 50,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
          maxWidth: 700,
          lineHeight: 1.05,
        }}
      >
        One call. Every tool you already use.
      </div>

      {/* SVG diagram */}
      <svg
        width={1280}
        height={720}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {/* Caller node */}
        <g>
          {(() => {
            const o = spring({ frame: frame - 22, fps, config: { damping: 200 }, durationInFrames: 18 });
            return (
              <g opacity={o}>
                <rect x={120} y={400} width={170} height={70} rx={14} fill={COLORS.white} stroke={COLORS.border} />
                <text x={205} y={428} fontFamily={FONT_MONO} fontSize={10} fill={COLORS.muted} textAnchor="middle" letterSpacing="2">
                  CALLER
                </text>
                <text x={205} y={455} fontFamily={FONT_SANS} fontSize={20} fontWeight={600} fill={COLORS.ink} textAnchor="middle">
                  Incoming
                </text>
              </g>
            );
          })()}
        </g>

        {/* Vektiss center node */}
        {(() => {
          const o = spring({ frame: frame - 38, fps, config: { damping: 200 }, durationInFrames: 18 });
          const pulse = 1 + Math.sin(frame / 8) * 0.04;
          return (
            <g opacity={o} transform={`translate(540 380) scale(${pulse})`}>
              <rect x={0} y={0} width={240} height={110} rx={18} fill={COLORS.accent} />
              <text x={120} y={36} fontFamily={FONT_MONO} fontSize={10} fill="rgba(255,255,255,0.7)" textAnchor="middle" letterSpacing="2.5">
                VEKTISS · AI VOICE
              </text>
              <text x={120} y={78} fontFamily={FONT_SANS} fontSize={32} fontWeight={700} fill="#fff" textAnchor="middle" letterSpacing="-1">
                Vektiss
              </text>
            </g>
          );
        })()}

        {/* Line: caller -> vektiss */}
        {(() => {
          const p = interpolate(frame, [44, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <line
              x1={290}
              y1={435}
              x2={290 + (540 - 290) * p}
              y2={435}
              stroke={COLORS.accent}
              strokeWidth={2}
              strokeDasharray="6 6"
            />
          );
        })()}

        {/* Lines: vektiss -> nodes */}
        {nodes.map((n, i) => {
          const start = 70 + i * 8;
          const p = interpolate(frame, [start, start + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x1 = 780, y1 = 435, x2 = n.x, y2 = n.y + 35;
          const cx = x1 + (x2 - x1) * p;
          const cy = y1 + (y2 - y1) * p;
          return (
            <g key={i}>
              <path
                d={`M ${x1} ${y1} L ${cx} ${cy}`}
                stroke={COLORS.accent}
                strokeWidth={2}
                strokeDasharray="6 6"
                fill="none"
              />
              {p > 0.9 && (
                <circle cx={cx} cy={cy} r={4} fill={COLORS.accent}>
                  <animate attributeName="r" values="4;7;4" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* Node cards */}
        {nodes.map((n, i) => {
          const delay = 92 + i * 8;
          const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 18 });
          const x = interpolate(o, [0, 1], [12, 0]);
          return (
            <g key={`n-${i}`} opacity={o} transform={`translate(${x} 0)`}>
              <rect x={n.x} y={n.y} width={160} height={70} rx={14} fill={COLORS.white} stroke={COLORS.border} />
              <text x={n.x + 16} y={n.y + 28} fontFamily={FONT_MONO} fontSize={10} fill={COLORS.muted} letterSpacing="2">
                NODE 0{i + 1}
              </text>
              <text x={n.x + 16} y={n.y + 52} fontFamily={FONT_SANS} fontSize={20} fontWeight={600} fill={COLORS.ink}>
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
