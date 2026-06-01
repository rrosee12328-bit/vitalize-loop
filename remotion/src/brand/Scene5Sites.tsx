import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_SANS } from "../fonts";
import { BRAND } from "./tokens";
import { BrandBackground } from "./BrandBackground";
import { SectionLabel } from "./SectionLabel";

// Scene 5 — SITES. 540f / 18s.
// Grid assembles → wireframe → filled dark site. Desktop + mobile side-by-side, 3D parallax.

export const Scene5Sites: React.FC = () => {
  const frame = useCurrentFrame();

  // Phases:
  // 0-60   grid forms
  // 60-130 wireframe blocks appear
  // 130-220 wireframe fills with content
  // 220-end slow rotate + parallax
  const wirePhase = interpolate(frame, [60, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fillPhase = interpolate(frame, [130, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotateY = interpolate(frame, [220, 540], [-6, 6]);

  return (
    <AbsoluteFill>
      <BrandBackground />
      <SectionLabel index="03" label="SITES" />

      {/* Assembly grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(37,99,235,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.18) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: interpolate(frame, [0, 60, 200, 260], [0, 0.8, 0.8, 0.15], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 70%)",
        }}
      />

      {/* Devices */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
          perspective: 1400,
          fontFamily: FONT_SANS,
        }}
      >
        <DesktopMockup
          wirePhase={wirePhase}
          fillPhase={fillPhase}
          rotateY={rotateY}
        />
        <PhoneMockup
          wirePhase={wirePhase}
          fillPhase={fillPhase}
          rotateY={-rotateY}
        />
      </div>
    </AbsoluteFill>
  );
};

const DesktopMockup: React.FC<{
  wirePhase: number;
  fillPhase: number;
  rotateY: number;
}> = ({ wirePhase, fillPhase, rotateY }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });
  return (
    <div
      style={{
        width: 880,
        height: 540,
        borderRadius: 18,
        background: "#070B16",
        border: `1px solid ${BRAND.hairline}`,
        boxShadow: `0 40px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(37,99,235,0.18)`,
        overflow: "hidden",
        opacity: enter,
        transform: `rotateY(${rotateY}deg) translateZ(0) scale(${interpolate(enter, [0, 1], [0.96, 1])})`,
        transformOrigin: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BrowserChrome />
      <div style={{ flex: 1, position: "relative", padding: 28 }}>
        {/* Hero block */}
        <Block
          x={0}
          y={0}
          w={520}
          h={28}
          wirePhase={wirePhase}
          fillPhase={fillPhase}
          content={<TextLine width={520} size={26}>Build your own operating system.</TextLine>}
        />
        <Block
          x={0}
          y={48}
          w={420}
          h={20}
          wirePhase={wirePhase}
          fillPhase={fillPhase}
          content={
            <TextLine width={420} size={14} dim>
              Voice · Sites · Intelligence · Media — connected.
            </TextLine>
          }
        />
        <Block
          x={0}
          y={92}
          w={150}
          h={36}
          wirePhase={wirePhase}
          fillPhase={fillPhase}
          content={
            <div
              style={{
                width: 150,
                height: 36,
                borderRadius: 6,
                background: BRAND.blue,
                color: BRAND.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                letterSpacing: "0.18em",
                fontWeight: 600,
              }}
            >
              GET STARTED →
            </div>
          }
        />

        {/* Cards row */}
        {[0, 1, 2].map((i) => (
          <Block
            key={i}
            x={i * 260}
            y={170}
            w={240}
            h={180}
            wirePhase={wirePhase}
            fillPhase={fillPhase}
            content={
              <div
                style={{
                  width: 240,
                  height: 180,
                  borderRadius: 10,
                  background: "rgba(37,99,235,0.08)",
                  border: `1px solid rgba(37,99,235,0.25)`,
                  padding: 16,
                  color: BRAND.white,
                  fontSize: 13,
                }}
              >
                <div
                  style={{
                    color: BRAND.blue,
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    fontWeight: 600,
                  }}
                >
                  0{i + 1}
                </div>
                <div style={{ marginTop: 8, fontWeight: 600 }}>
                  {["Voice", "Sites", "Intelligence"][i]}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    color: BRAND.textDim,
                    fontSize: 11,
                    lineHeight: 1.5,
                  }}
                >
                  Built in-house. Tuned for operators. Live in your stack.
                </div>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

const PhoneMockup: React.FC<{
  wirePhase: number;
  fillPhase: number;
  rotateY: number;
}> = ({ wirePhase, fillPhase, rotateY }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });
  return (
    <div
      style={{
        width: 240,
        height: 500,
        borderRadius: 36,
        background: "#070B16",
        border: `2px solid rgba(255,255,255,0.08)`,
        boxShadow: `0 30px 60px rgba(0,0,0,0.55)`,
        overflow: "hidden",
        opacity: enter,
        transform: `rotateY(${rotateY}deg) scale(${interpolate(enter, [0, 1], [0.96, 1])})`,
        padding: 14,
      }}
    >
      <div
        style={{
          color: BRAND.blue,
          fontSize: 9,
          letterSpacing: "0.3em",
          fontWeight: 600,
        }}
      >
        CLIENT PORTAL
      </div>
      <div
        style={{
          marginTop: 10,
          color: BRAND.white,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Welcome back, Maria.
      </div>
      {[1, 2, 3].map((i) => (
        <Block
          key={i}
          x={0}
          y={50 + i * 80}
          w={210}
          h={70}
          wirePhase={wirePhase}
          fillPhase={fillPhase}
          content={
            <div
              style={{
                width: 210,
                height: 70,
                borderRadius: 10,
                background: "rgba(37,99,235,0.08)",
                border: `1px solid rgba(37,99,235,0.22)`,
                padding: 10,
              }}
            >
              <div
                style={{
                  color: BRAND.textDim,
                  fontSize: 9,
                  letterSpacing: "0.28em",
                }}
              >
                {["UPCOMING", "BILLING", "MESSAGES"][i - 1]}
              </div>
              <div
                style={{
                  marginTop: 6,
                  color: BRAND.white,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {[
                  "Service · Wed 3:40 PM",
                  "Auto-pay · $245 due",
                  "1 new from Vektiss",
                ][i - 1]}
              </div>
            </div>
          }
        />
      ))}
    </div>
  );
};

const BrowserChrome: React.FC = () => (
  <div
    style={{
      height: 36,
      padding: "0 14px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      borderBottom: `1px solid ${BRAND.hairline}`,
    }}
  >
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
        }}
      />
    ))}
    <div
      style={{
        marginLeft: 16,
        padding: "4px 14px",
        borderRadius: 6,
        background: "rgba(255,255,255,0.06)",
        color: BRAND.textDim,
        fontSize: 11,
        letterSpacing: "0.1em",
      }}
    >
      vektiss.com
    </div>
  </div>
);

const Block: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  wirePhase: number;
  fillPhase: number;
  content: React.ReactNode;
}> = ({ x, y, w, h, wirePhase, fillPhase, content }) => {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      {/* wireframe block */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `1px dashed rgba(37,99,235,${0.4 * wirePhase * (1 - fillPhase)})`,
          background: `rgba(37,99,235,${0.06 * wirePhase * (1 - fillPhase)})`,
        }}
      />
      <div style={{ position: "absolute", inset: 0, opacity: fillPhase }}>
        {content}
      </div>
    </div>
  );
};

const TextLine: React.FC<{
  width: number;
  size: number;
  dim?: boolean;
  children: React.ReactNode;
}> = ({ size, dim, children }) => (
  <div
    style={{
      color: dim ? BRAND.textDim : BRAND.white,
      fontSize: size,
      fontWeight: dim ? 500 : 700,
      letterSpacing: "-0.01em",
    }}
  >
    {children}
  </div>
);
