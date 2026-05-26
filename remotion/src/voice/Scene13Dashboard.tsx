import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 12s — Dashboard panel with KPI tiles, lead-score gauge, and an animated line chart.
export const Scene13Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  // Line chart values
  const points = [22, 28, 31, 36, 34, 41, 47, 52, 58, 64, 68, 76];
  const max = 80;

  const lineProgress = spring({ frame: frame - 24, fps, config: { damping: 200 }, durationInFrames: 60 });

  // Gauge
  const gaugeP = interpolate(frame, [30, 75], [0, 0.94], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>

      <VoiceHUD eyebrow="11 · YOUR DASHBOARD" />

      <div style={{ position: "absolute", left: 110, top: 120, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          PERFORMANCE · LAST 30 DAYS
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 162,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 44,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
        }}
      >
        See every lead. Every call. Every dollar saved.
      </div>

      {/* Chart card */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 270,
          width: 760,
          height: 360,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 18,
          padding: 22,
          fontFamily: FONT_SANS,
          boxShadow: "0 20px 50px -30px rgba(10,22,40,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted }}>
            CALLS CAPTURED
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.accent }}>+312% vs LAST MONTH</div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 600, color: COLORS.ink, letterSpacing: "-0.03em", marginTop: 6 }}>
          1,284
          <span style={{ color: COLORS.accent }}>.</span>
        </div>

        {/* SVG line chart */}
        <svg width="100%" height="220" viewBox="0 0 720 220" style={{ marginTop: 10 }}>
          {/* gridlines */}
          {[0, 1, 2, 3].map((g) => (
            <line key={g} x1={0} x2={720} y1={40 + g * 50} y2={40 + g * 50} stroke={COLORS.border} strokeDasharray="2 4" />
          ))}
          {/* Area path */}
          {(() => {
            const reveal = points.length * lineProgress;
            const visible = points.slice(0, Math.ceil(reveal));
            const path = visible
              .map((v, i) => {
                const x = (i / (points.length - 1)) * 720;
                const y = 200 - (v / max) * 160;
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ");
            const area = path + ` L ${(Math.ceil(reveal) - 1) / (points.length - 1) * 720} 200 L 0 200 Z`;
            return (
              <>
                <path d={area} fill="rgba(0,136,255,0.12)" />
                <path d={path} stroke={COLORS.accent} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {visible.map((v, i) => (
                  <circle
                    key={i}
                    cx={(i / (points.length - 1)) * 720}
                    cy={200 - (v / max) * 160}
                    r={4}
                    fill={COLORS.white}
                    stroke={COLORS.accent}
                    strokeWidth={2}
                  />
                ))}
              </>
            );
          })()}
        </svg>
      </div>

      {/* Gauge card */}
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 270,
          width: 320,
          height: 360,
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 18,
          padding: 22,
          fontFamily: FONT_SANS,
          boxShadow: "0 20px 50px -30px rgba(10,22,40,0.18)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted }}>
          AVG LEAD SCORE
        </div>

        <svg width="100%" height="220" viewBox="0 0 260 220" style={{ marginTop: 10 }}>
          {/* arc bg */}
          <path d="M 30 180 A 100 100 0 0 1 230 180" stroke={COLORS.border} strokeWidth={18} fill="none" strokeLinecap="round" />
          {/* arc fg */}
          <path
            d="M 30 180 A 100 100 0 0 1 230 180"
            stroke={COLORS.accent}
            strokeWidth={18}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${314 * gaugeP} 314`}
          />
          <text x={130} y={150} textAnchor="middle" fontFamily={FONT_SANS} fontSize={68} fontWeight={600} fill={COLORS.ink} letterSpacing="-2">
            {Math.round(gaugeP * 100)}
          </text>
          <text x={130} y={180} textAnchor="middle" fontFamily={FONT_MONO} fontSize={11} fill={COLORS.muted} letterSpacing="2">
            /100
          </text>
        </svg>

        <div style={{ fontSize: 14, color: COLORS.muted, marginTop: 4 }}>
          Higher than 92% of Vektiss accounts.
        </div>
      </div>
    </AbsoluteFill>
  );
};
