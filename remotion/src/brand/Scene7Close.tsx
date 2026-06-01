import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BRAND } from "./tokens";
import { Chevron } from "./Chevron";

// 300 frames — Close: central chevron, shockwave, 4 orbiting icons, headline + button
export const Scene7Close: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chevronAppear = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 90 } });

  // shockwave at ~frame 30
  const waveStart = 35;
  const wavePhase = interpolate(frame, [waveStart, waveStart + 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const waveSize = 100 + wavePhase * 1600;
  const waveOp = (1 - wavePhase) * 0.65;

  // orbiting icons appear after wave
  const iconsStart = 70;
  const orbitAngle = interpolate(frame, [iconsStart, 300], [0, Math.PI * 0.5]);

  // headline + button
  const headStart = 150;
  const btnStart = 195;

  // zoom out slightly
  const zoom = interpolate(frame, [200, 300], [1, 0.92], { extrapolateRight: "clamp" });

  const particles = React.useMemo(
    () => new Array(50).fill(0).map((_, i) => ({
      x: (i * 191) % 1920, y: (i * 311) % 1080,
      speed: 0.25 + ((i * 11) % 10) / 25,
      o: 0.1 + ((i * 17) % 30) / 100,
    })),
    []
  );

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg }}>
      {/* particles upward */}
      <AbsoluteFill>
        {particles.map((p, i) => {
          const y = (p.y - frame * p.speed) % 1080;
          const yy = y < 0 ? y + 1080 : y;
          return (
            <div key={i} style={{
              position: "absolute", left: p.x, top: yy,
              width: 2, height: 2, borderRadius: "50%",
              background: BRAND.blue, opacity: p.o, boxShadow: `0 0 4px ${BRAND.blue}`,
            }} />
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", transform: `scale(${zoom})` }}>
          {/* shockwave */}
          <div style={{
            position: "absolute", left: -waveSize / 2, top: -waveSize / 2,
            width: waveSize, height: waveSize, borderRadius: "50%",
            border: `3px solid ${BRAND.blue}`, opacity: waveOp,
            boxShadow: `0 0 80px ${BRAND.blue}, inset 0 0 80px ${BRAND.blue}`,
          }} />

          {/* center chevron */}
          <div style={{
            transform: `scale(${chevronAppear * (1 + (frame >= waveStart && frame < waveStart + 8 ? 0.15 : 0))})`,
            opacity: chevronAppear,
          }}>
            <Chevron size={240} glow={true} />
          </div>

          {/* orbiting icons — fixed cross positions */}
          {[
            { pos: "top", icon: "network", label: "Intelligence" },
            { pos: "right", icon: "phone", label: "Voice" },
            { pos: "bottom", icon: "browser", label: "Sites" },
            { pos: "left", icon: "play", label: "Media" },
          ].map((cfg, i) => {
            const baseA = (i * Math.PI) / 2 - Math.PI / 2;
            const a = baseA + orbitAngle;
            const r = 360;
            const x = Math.cos(a) * r;
            const y = Math.sin(a) * r;
            const appear = spring({ frame: frame - iconsStart - i * 8, fps, config: { damping: 18, stiffness: 100 } });
            return (
              <div key={i} style={{
                position: "absolute", left: x - 40, top: y - 40,
                width: 80, height: 80, borderRadius: "50%",
                background: "rgba(10,15,30,0.85)", border: `1.5px solid ${BRAND.blue}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: appear,
                transform: `scale(${appear})`,
                boxShadow: `0 0 24px ${BRAND.blue}77`,
              }}>
                <OrbitIcon kind={cfg.icon} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* headline */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 240, textAlign: "center",
        opacity: interpolate(frame, [headStart, headStart + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(frame, [headStart, headStart + 25], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        fontFamily: "Inter, Helvetica Neue, sans-serif",
        fontWeight: 700, fontSize: 42, color: "#fff", letterSpacing: 8,
      }}>
        BUILT IN-HOUSE.&nbsp;&nbsp;BUILT FOR YOU.
      </div>

      {/* button */}
      <div style={{
        position: "absolute", left: "50%", bottom: 150,
        transform: `translateX(-50%) scale(${spring({ frame: frame - btnStart, fps, config: { damping: 14, stiffness: 110 } })})`,
        opacity: interpolate(frame, [btnStart, btnStart + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        background: BRAND.blue, color: "#fff",
        padding: "18px 36px", borderRadius: 8,
        fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 3,
        boxShadow: `0 0 40px ${BRAND.blue}, inset 0 0 20px rgba(255,255,255,0.1)`,
      }}>
        SEE WHAT WE BUILD →
      </div>
    </AbsoluteFill>
  );
};

const OrbitIcon: React.FC<{ kind: string }> = ({ kind }) => {
  const color = "#fff";
  if (kind === "network") {
    return (
      <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
        <circle cx="12" cy="6" r="2" fill={color} />
        <circle cx="6" cy="17" r="2" fill={color} />
        <circle cx="18" cy="17" r="2" fill={color} />
        <line x1="12" y1="8" x2="6" y2="15" />
        <line x1="12" y1="8" x2="18" y2="15" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    );
  }
  if (kind === "phone") {
    return (
      <svg width={32} height={32} viewBox="0 0 24 24" fill={color}>
        <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.5.1.4 0 .8-.2 1l-2.3 2.3z"/>
      </svg>
    );
  }
  if (kind === "browser") {
    return (
      <svg width={36} height={32} viewBox="0 0 24 20" fill="none" stroke={color} strokeWidth={1.8}>
        <rect x="2" y="2" width="20" height="16" rx="2" />
        <line x1="2" y1="6" x2="22" y2="6" />
        <circle cx="5" cy="4" r="0.6" fill={color} />
        <circle cx="7.5" cy="4" r="0.6" fill={color} />
        <circle cx="10" cy="4" r="0.6" fill={color} />
      </svg>
    );
  }
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill={color}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
};
