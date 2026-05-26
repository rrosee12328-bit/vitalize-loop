import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD } from "./VoiceChrome";

// 0:02.9 - 0:08.6 (171f) — Three responsibility cards stagger in like dashboard tiles.
export const Scene2Owner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { label: "Work the jobs", icon: "wrench" as const, start: 8 },
    { label: "Manage the team", icon: "team" as const, start: 44 },
    { label: "Handle the clients", icon: "handshake" as const, start: 84 },
  ];

  const eyebrowO = spring({ frame: frame - 2, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill>
      <VoiceBackground />
      <VoiceHUD eyebrow="01 · THE OWNER" />

      <div style={{ position: "absolute", left: 110, top: 130 }}>
        <div
          style={{
            opacity: eyebrowO,
            fontFamily: FONT_MONO,
            fontSize: 12,
            letterSpacing: "0.24em",
            color: COLORS.accent,
            marginBottom: 18,
          }}
        >
          YOU BUILT IT FROM THE GROUND UP
        </div>
        <div
          style={{
            opacity: eyebrowO,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 56,
            letterSpacing: "-0.025em",
            color: COLORS.ink,
            maxWidth: 900,
            lineHeight: 1.05,
          }}
        >
          You work the jobs, manage the team, handle the clients.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 380,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 22,
        }}
      >
        {items.map((it, i) => {
          const localF = frame - it.start;
          const s = spring({ frame: localF, fps, config: { damping: 22, stiffness: 140 } });
          const o = spring({ frame: localF, fps, config: { damping: 200 } });
          const y = interpolate(s, [0, 1], [24, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: o,
                transform: `translateY(${y}px)`,
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 26,
                boxShadow: "0 20px 40px -24px rgba(10,22,40,0.18), 0 4px 12px -6px rgba(10,22,40,0.06)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(0,136,255,0.10)",
                  color: COLORS.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon kind={it.icon} />
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: COLORS.muted,
                }}
              >
                ROLE {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: FONT_SANS,
                  fontWeight: 600,
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  color: COLORS.ink,
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

const Icon: React.FC<{ kind: "wrench" | "team" | "handshake" }> = ({ kind }) => {
  const c = { stroke: "currentColor", strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={22} height={22} viewBox="0 0 24 24">
      {kind === "wrench" && <path {...c} d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.1-.6-.6-2.1z" />}
      {kind === "team" && (
        <>
          <circle cx={9} cy={8} r={3} {...c} />
          <circle cx={15} cy={8} r={3} {...c} />
          <path {...c} d="M3 20c1-3 3-5 6-5s5 2 6 5M15 20c1-3 3-5 5-5" />
        </>
      )}
      {kind === "handshake" && <path {...c} d="M2 12l4-4 3 1 3-3 3 3 3-1 4 4-4 4-2-1-3 2-3-2-2 1z" />}
    </svg>
  );
};
