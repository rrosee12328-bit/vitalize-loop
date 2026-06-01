import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

const BLUE = "#2563EB";

// 90 frames - orbit + CTA + chevron glow
export const HeroScene4Unified: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labels = ["INTELLIGENCE", "VOICE", "SITES", "MEDIA"];
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
  const radius = 280;

  const orbitIn = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });

  const headlineO = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaSp = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 120 } });

  const fadeOut = interpolate(frame, [78, 90], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0F1E", opacity: fadeOut }}>
      <Img src={staticFile("brand/vektiss-lockup-light.png")} style={{
        position: "absolute", top: 32, left: 56, width: 180, height: 50, objectFit: "contain",
      }} />

      {/* radial glow */}
      <AbsoluteFill style={{
        background: `radial-gradient(circle at 50% 45%, rgba(37,99,235,0.22), transparent 55%)`,
      }} />

      {/* Center chevron + orbit */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 1, height: 1, transform: "translateY(-40px)" }}>
          {/* connecting lines */}
          <svg width={800} height={800} style={{
            position: "absolute", left: -400, top: -400, opacity: orbitIn * 0.6,
          }}>
            {angles.map((a, i) => (
              <line key={i}
                x1={400} y1={400}
                x2={400 + Math.cos(a) * radius} y2={400 + Math.sin(a) * radius}
                stroke={BLUE} strokeWidth={1} opacity={0.5}
                strokeDasharray="4 6"
              />
            ))}
          </svg>

          {/* labels orbiting */}
          {labels.map((label, i) => {
            const a = angles[i];
            const x = Math.cos(a) * radius * orbitIn;
            const y = Math.sin(a) * radius * orbitIn;
            return (
              <div key={i} style={{
                position: "absolute",
                left: x, top: y,
                transform: "translate(-50%, -50%)",
                opacity: orbitIn,
                padding: "10px 18px",
                background: "rgba(13,20,36,0.95)",
                border: `1.5px solid ${BLUE}`,
                borderRadius: 8,
                boxShadow: `0 0 20px rgba(37,99,235,0.5)`,
                fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 700, fontSize: 14,
                letterSpacing: 3, whiteSpace: "nowrap",
              }}>{label}</div>
            );
          })}

          {/* chevron center */}
          <div style={{
            position: "absolute", left: 0, top: 0,
            transform: `translate(-50%, -50%) scale(${0.6 + orbitIn * 0.4})`,
            filter: `drop-shadow(0 0 ${20 + 10 * Math.sin(frame / 6)}px ${BLUE})`,
          }}>
            <Img src={staticFile("brand/vektiss-icon.png")} style={{ width: 140, height: 140, objectFit: "contain" }} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Headline + CTA */}
      <div style={{
        position: "absolute", bottom: 110, left: 0, right: 0,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
      }}>
        <div style={{
          fontFamily: "Inter, Helvetica Neue, sans-serif",
          fontWeight: 800, fontSize: 56, color: "#fff", letterSpacing: 1,
          opacity: headlineO,
          transform: `translateY(${interpolate(headlineO, [0, 1], [12, 0])}px)`,
        }}>
          BUILT IN-HOUSE. BUILT FOR YOU.
        </div>
        <div style={{
          opacity: ctaSp,
          transform: `scale(${0.9 + ctaSp * 0.1})`,
          padding: "18px 40px",
          background: BLUE,
          borderRadius: 10,
          boxShadow: `0 0 30px ${BLUE}, 0 0 60px rgba(37,99,235,0.5)`,
          fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 800, fontSize: 20,
          letterSpacing: 3,
        }}>
          SEE WHAT WE BUILD →
        </div>
      </div>
    </AbsoluteFill>
  );
};
