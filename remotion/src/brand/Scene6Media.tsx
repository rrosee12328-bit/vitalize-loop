import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BRAND } from "./tokens";
import { Chevron } from "./Chevron";
import { SectionTag } from "./Scene3Intelligence";

// 300 frames — Media: large floating content cards orbiting slowly
type Card = {
  baseAngle: number; // rad
  radius: number;
  size: { w: number; h: number };
  z: number; // depth offset
  render: () => React.ReactNode;
};

export const Scene6Media: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // slow orbit
  const orbit = frame / 300; // 0..1 over scene
  const cameraIn = interpolate(frame, [0, 280], [1, 1.18], { extrapolateRight: "clamp" });

  const cards: Card[] = [
    {
      baseAngle: -1.2, radius: 520, size: { w: 360, h: 540 }, z: 1.0,
      render: () => (
        <BigStat
          big="85%"
          line="of businesses never call back."
          footer="VEKTISS · 2026"
        />
      ),
    },
    {
      baseAngle: -0.3, radius: 480, size: { w: 420, h: 420 }, z: 0.6,
      render: () => <VideoCard title="Behind the Build" sub="SHORT · 0:42 · VEKTISS" />,
    },
    {
      baseAngle: 0.55, radius: 540, size: { w: 380, h: 380 }, z: 0.9,
      render: () => <QuoteCard text="Systems, not deliverables." withMark />,
    },
    {
      baseAngle: 1.3, radius: 600, size: { w: 320, h: 520 }, z: 1.1,
      render: () => <VideoCard title="Always Answered." sub="" centered />,
    },
    {
      baseAngle: -2.0, radius: 580, size: { w: 320, h: 320 }, z: 0.4,
      render: () => <MetricCard up="↑ 3.2x" label="lead capture" footer="VEKTISS · 2026" />,
    },
    {
      baseAngle: 2.3, radius: 520, size: { w: 340, h: 340 }, z: 0.5,
      render: () => <PlayCard title="Dashboard tour →" />,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg, overflow: "hidden" }}>
      <BgGrid />
      <SectionTag num="04" label="MEDIA" />

      {/* center vignette */}
      <AbsoluteFill style={{
        background: `radial-gradient(circle at center, rgba(37,99,235,0.18), transparent 60%)`,
      }} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 1, height: 1, transform: `scale(${cameraIn})` }}>
          {cards.map((c, i) => {
            const a = c.baseAngle + orbit * Math.PI * 2 * 0.06; // slow counterclockwise-ish
            const x = Math.cos(a) * c.radius;
            const y = Math.sin(a) * c.radius * 0.55; // flatter orbit
            const depthScale = 0.7 + c.z * 0.4;
            const blur = c.z < 0.55 ? 2 : 0;
            const appear = spring({ frame: frame - 10 - i * 6, fps, config: { damping: 18, stiffness: 90 } });
            return (
              <div key={i} style={{
                position: "absolute",
                left: x - c.size.w * depthScale / 2,
                top: y - c.size.h * depthScale / 2,
                width: c.size.w * depthScale,
                height: c.size.h * depthScale,
                opacity: appear * (0.55 + c.z * 0.45),
                filter: `blur(${blur}px)`,
                transform: `translateZ(0)`,
              }}>
                <div style={{
                  width: "100%", height: "100%",
                  background: "rgba(13,20,36,0.95)",
                  border: `1.5px solid ${BRAND.blue}`,
                  borderRadius: 16,
                  boxShadow: `0 0 30px ${BRAND.blue}66, inset 0 0 30px rgba(37,99,235,0.08)`,
                  overflow: "hidden",
                  padding: 32,
                  display: "flex",
                }}>
                  {c.render()}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BigStat: React.FC<{ big: string; line: string; footer: string }> = ({ big, line, footer }) => (
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
    <div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 88, color: "#fff", lineHeight: 1, letterSpacing: -2 }}>
        {big}
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 26, color: "#fff", marginTop: 16, lineHeight: 1.2 }}>
        {line}
      </div>
    </div>
    <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 3 }}>
      {footer}
    </div>
  </div>
);

const VideoCard: React.FC<{ title: string; sub: string; centered?: boolean }> = ({ title, sub, centered }) => (
  <div style={{
    display: "flex", flexDirection: "column",
    alignItems: centered ? "center" : "flex-start",
    justifyContent: "center", width: "100%", gap: 18,
  }}>
    <PlayButton />
    <div style={{
      fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 28, color: "#fff",
      textAlign: centered ? "center" : "left",
    }}>
      {title}
    </div>
    {sub && (
      <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 12, letterSpacing: 3 }}>
        {sub}
      </div>
    )}
  </div>
);

const QuoteCard: React.FC<{ text: string; withMark?: boolean }> = ({ text, withMark }) => (
  <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{
      fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 30, color: "#fff",
      textAlign: "center", lineHeight: 1.25, padding: "0 8px",
    }}>
      "{text}"
    </div>
    {withMark && (
      <div style={{ position: "absolute", right: 12, bottom: 8 }}>
        <Chevron size={42} glow={false} />
      </div>
    )}
  </div>
);

const MetricCard: React.FC<{ up: string; label: string; footer: string }> = ({ up, label, footer }) => (
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
    <div>
      <div style={{
        fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 56, color: BRAND.blue,
        textShadow: `0 0 16px ${BRAND.blue}66`, letterSpacing: -1,
      }}>
        {up}
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 22, color: "#fff", marginTop: 6 }}>
        {label}
      </div>
    </div>
    <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 3 }}>
      {footer}
    </div>
  </div>
);

const PlayCard: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", gap: 18 }}>
    <PlayButton />
    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", textAlign: "center" }}>
      {title}
    </div>
  </div>
);

const PlayButton: React.FC = () => (
  <div style={{
    width: 84, height: 84, borderRadius: "50%",
    background: BRAND.blue, boxShadow: `0 0 30px ${BRAND.blue}, 0 0 60px ${BRAND.blue}55`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <svg width={32} height={32} viewBox="0 0 24 24" fill="#fff">
      <path d="M8 5v14l11-7z" />
    </svg>
  </div>
);

const BgGrid: React.FC = () => (
  <AbsoluteFill style={{
    backgroundImage:
      `linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
       linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)`,
    backgroundSize: "80px 80px",
    opacity: 0.6,
  }} />
);
