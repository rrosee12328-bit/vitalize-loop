import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { BRAND } from "./brand";
import { FONT_SANS, FONT_MONO } from "../fonts";

// 0:02.9 - 0:08.6  (171 frames)
// Deep navy. Three line-art icons draw in: wrench, team, handshake. Stacked left-aligned.
export const Scene2Owner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { label: "Work the jobs", start: 10, icon: "wrench" as const },
    { label: "Manage the team", start: 50, icon: "team" as const },
    { label: "Handle the clients", start: 95, icon: "handshake" as const },
  ];

  // navy intro
  const bgO = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ background: BRAND.navy, opacity: bgO }} />

      <div style={{ position: "absolute", left: 110, top: 110, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.22em", color: "rgba(255,255,255,0.5)" }}>
        OWNER · OPERATOR · EVERYTHING
      </div>

      <div style={{ position: "absolute", left: 110, top: 180, display: "flex", flexDirection: "column", gap: 36 }}>
        {items.map((it, i) => {
          const localF = frame - it.start;
          const draw = interpolate(localF, [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const textO = spring({ frame: localF - 8, fps, config: { damping: 200 }, durationInFrames: 20 });
          const textX = interpolate(spring({ frame: localF - 8, fps, config: { damping: 22, stiffness: 140 } }), [0, 1], [-16, 0]);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <IconBox draw={draw} kind={it.icon} />
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 600,
                  fontSize: 54,
                  letterSpacing: "-0.02em",
                  color: BRAND.white,
                  opacity: textO,
                  transform: `translateX(${textX}px)`,
                }}
              >
                {it.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const IconBox: React.FC<{ draw: number; kind: "wrench" | "team" | "handshake" }> = ({ draw, kind }) => {
  const stroke = BRAND.white;
  const sw = 4;
  const common = {
    stroke,
    strokeWidth: sw,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  // Use stroke-dash trick: pathLength normalized to 1
  const dashProps = (len = 1) => ({
    strokeDasharray: len,
    strokeDashoffset: (1 - draw) * len,
    pathLength: len,
  });
  return (
    <svg width={92} height={92} viewBox="0 0 100 100">
      {kind === "wrench" && (
        <path
          {...common}
          {...dashProps()}
          d="M70 18a16 16 0 0 0-21 21l-30 30a6 6 0 0 0 8 8l30-30a16 16 0 0 0 21-21l-9 9-8-2-2-8z"
        />
      )}
      {kind === "team" && (
        <>
          <circle cx={30} cy={36} r={10} {...common} {...dashProps()} />
          <circle cx={70} cy={36} r={10} {...common} {...dashProps()} />
          <circle cx={50} cy={28} r={11} {...common} {...dashProps()} />
          <path {...common} {...dashProps()} d="M12 82c2-12 12-20 18-22m40 0c6 2 16 10 18 22M30 82c2-14 12-22 20-22s18 8 20 22" />
        </>
      )}
      {kind === "handshake" && (
        <path
          {...common}
          {...dashProps()}
          d="M8 52l16-16 12 6 14-12 14 12 12-6 16 16-14 14-10-6-12 10-12-10-10 6z"
        />
      )}
    </svg>
  );
};
