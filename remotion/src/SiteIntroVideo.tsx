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
} from "remotion";
import { COLORS } from "./theme";
import { FONT_MONO, FONT_SANS } from "./fonts";
import { PersistentBackground } from "./components/PersistentBackground";

// 43s @ 30fps = 1290 frames
// Beats follow the user's timestamped script.

type BeatProps = {
  durationInFrames: number;
  eyebrow?: string;
  children: React.ReactNode;
};

const Beat: React.FC<BeatProps> = ({ durationInFrames, eyebrow, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inSp = spring({ frame: frame - 2, fps, config: { damping: 22, stiffness: 140 } });
  const y = interpolate(inSp, [0, 1], [28, 0]);
  const outFade = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const eyebrowIn = spring({ frame: frame - 1, fps, config: { damping: 200 }, durationInFrames: 24 });

  return (
    <AbsoluteFill style={{ opacity: outFade }}>
      <div
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {eyebrow && (
          <div
            style={{
              opacity: eyebrowIn,
              fontFamily: FONT_MONO,
              fontSize: 14,
              letterSpacing: "0.22em",
              color: COLORS.accent,
              marginBottom: 32,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            opacity: inSp,
            transform: `translateY(${y}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Headline: React.FC<{
  size?: number;
  children: React.ReactNode;
}> = ({ size = 108, children }) => (
  <div
    style={{
      fontFamily: FONT_SANS,
      fontWeight: 600,
      fontSize: size,
      lineHeight: 1.02,
      letterSpacing: "-0.035em",
      color: COLORS.ink,
    }}
  >
    {children}
  </div>
);

const Sweep: React.FC<{ children: React.ReactNode; start?: number; end?: number }> = ({
  children,
  start = 14,
  end = 44,
}) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: 10,
          height: 28,
          width: `${sweep * 100}%`,
          background: "rgba(0,85,255,0.22)",
          zIndex: -1,
        }}
      />
      {children}
    </span>
  );
};

// Chip list with staggered entrance for the "operates across" beats.
const Chips: React.FC<{ items: string[] }> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 36 }}>
      {items.map((label, i) => {
        const sp = spring({
          frame: frame - 6 - i * 4,
          fps,
          config: { damping: 18, stiffness: 160 },
        });
        const y = interpolate(sp, [0, 1], [20, 0]);
        return (
          <div
            key={label}
            style={{
              opacity: sp,
              transform: `translateY(${y}px)`,
              fontFamily: FONT_SANS,
              fontWeight: 500,
              fontSize: 30,
              padding: "14px 24px",
              borderRadius: 999,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.white,
              color: COLORS.ink,
              boxShadow: "0 1px 0 rgba(15,23,42,0.04)",
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
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
        bottom: 60,
        fontFamily: FONT_MONO,
        fontSize: 14,
        letterSpacing: "0.22em",
        color: COLORS.muted,
      }}
    >
      {mm}:{ss}
    </div>
  );
};

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

export const SiteIntroVideo: React.FC = () => {
  // Beat schedule (frames @ 30fps) — matches the user's timestamps.
  // [from, duration, eyebrow, node]
  const beats: Array<{
    from: number;
    dur: number;
    eyebrow?: string;
    node: React.ReactNode;
  }> = [
    {
      from: 0,
      dur: 60,
      eyebrow: "00 · WHY",
      node: (
        <Headline size={132}>
          And this is why we built{" "}
          <Sweep>Vektiss.</Sweep>
        </Headline>
      ),
    },
    {
      from: 60,
      dur: 90,
      eyebrow: "01 · WHAT WE DO",
      node: (
        <Headline>
          At Vektiss, we help businesses leverage{" "}
          <Sweep>AI</Sweep>
        </Headline>
      ),
    },
    {
      from: 150,
      dur: 60,
      node: (
        <Headline>
          to amplify their <Sweep>voice</Sweep>,<br />
          improve their <Sweep start={32} end={62}>systems</Sweep>,
        </Headline>
      ),
    },
    {
      from: 210,
      dur: 90,
      node: (
        <Headline>
          and prepare for where{" "}
          <Sweep>business is going.</Sweep>
        </Headline>
      ),
    },
    {
      from: 300,
      dur: 60,
      eyebrow: "02 · WHAT WE'RE BUILDING",
      node: <Headline>One of the things we've been building</Headline>,
    },
    {
      from: 360,
      dur: 60,
      node: (
        <Headline size={148}>
          is called{" "}
          <Sweep>Vektiss Intelligence.</Sweep>
        </Headline>
      ),
    },
    {
      from: 420,
      dur: 60,
      eyebrow: "03 · WHAT IT DOES",
      node: (
        <Headline>
          Vektiss Intelligence is designed to help a company
        </Headline>
      ),
    },
    {
      from: 480,
      dur: 60,
      node: (
        <Headline size={148}>
          understand{" "}
          <Sweep>how it actually works,</Sweep>
        </Headline>
      ),
    },
    {
      from: 540,
      dur: 120,
      node: (
        <Headline size={92}>
          not how it looks on paper,<br />
          not how it looks in a meeting,
        </Headline>
      ),
    },
    {
      from: 660,
      dur: 90,
      eyebrow: "04 · HOW IT REALLY OPERATES",
      node: (
        <>
          <Headline size={84}>
            but how it really operates across…
          </Headline>
          <Chips items={["Calls", "Customers", "Tasks"]} />
        </>
      ),
    },
    {
      from: 750,
      dur: 90,
      node: (
        <>
          <Headline size={84}>…and the work that follows.</Headline>
          <Chips items={["Approvals", "Billings", "Projects", "Communications"]} />
        </>
      ),
    },
    {
      from: 840,
      dur: 30,
      node: (
        <Headline size={160}>
          and <Sweep start={6} end={22}>decisions.</Sweep>
        </Headline>
      ),
    },
    {
      from: 870,
      dur: 60,
      eyebrow: "05 · BUILT INSIDE OUR OWN COMPANY",
      node: (
        <Headline>
          Inside our own company,<br />we built a system
        </Headline>
      ),
    },
    {
      from: 930,
      dur: 120,
      node: (
        <>
          <Headline size={72}>that connects…</Headline>
          <Chips items={["Admin", "Operations", "Clients", "Tasks", "Proposals"]} />
        </>
      ),
    },
    {
      from: 1050,
      dur: 90,
      node: (
        <>
          <Headline size={72}>and the way value flows…</Headline>
          <Chips items={["Billing", "Profitability", "Approvals", "Communication"]} />
        </>
      ),
    },
    {
      from: 1140,
      dur: 150,
      eyebrow: "06 · ONE OPERATING LAYER",
      node: (
        <Headline size={120}>
          and AI decision support into{" "}
          <Sweep start={30} end={80}>one operating layer.</Sweep>
        </Headline>
      ),
    },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <PersistentBackground />
      <TopBar />

      {beats.map((b, i) => (
        <Sequence key={i} from={b.from} durationInFrames={b.dur}>
          <Beat durationInFrames={b.dur} eyebrow={b.eyebrow}>
            {b.node}
          </Beat>
        </Sequence>
      ))}

      <Counter />
    </AbsoluteFill>
  );
};
