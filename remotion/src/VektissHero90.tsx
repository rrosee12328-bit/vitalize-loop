import React from "react";
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
  Sequence,
} from "remotion";

const BG = "#0A0F1E";
const BLUE = "#2563EB";
const WHITE = "#FFFFFF";
const FONT = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

// ---------- shared bits ----------
const Grid: React.FC<{ opacity?: number; light?: boolean }> = ({ opacity = 1, light = false }) => (
  <AbsoluteFill
    style={{
      opacity,
      backgroundImage: light
        ? `linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)`
        : `linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)`,
      backgroundSize: "80px 80px",
    }}
  />
);

const LogoBug: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <Img
    src={staticFile("brand/vektiss-lockup-light.png")}
    style={{
      position: "absolute",
      top: 36,
      left: 60,
      width: 180,
      height: 50,
      objectFit: "contain",
      opacity,
      zIndex: 50,
    }}
  />
);

const Caption: React.FC<{ lines: string[]; from?: number; sub?: string }> = ({
  lines,
  from = 0,
  sub,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 90,
        left: 80,
        right: 80,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        zIndex: 40,
      }}
    >
      {lines.map((l, i) => {
        const start = from + i * 12;
        const o = interpolate(frame, [start, start + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [start, start + 18], [12, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              opacity: o,
              transform: `translateY(${y}px)`,
              fontFamily: FONT,
              color: WHITE,
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: -0.5,
              lineHeight: 1.25,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {l}
          </div>
        );
      })}
      {sub && (
        <div
          style={{
            marginTop: 8,
            opacity: interpolate(frame, [from + lines.length * 12 + 8, from + lines.length * 12 + 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: FONT,
            color: "rgba(255,255,255,0.55)",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

// ---------- Scene 1: Open / Who we are (180f) ----------
const Scene1Open: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // White bg fades to navy around frame 60-100
  const bgT = interpolate(frame, [55, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bgColor = bgT < 0.5 ? "#F4F6FA" : BG;
  const navyOverlay = bgT;

  // Logo lockup: center -> top-left at frame 130
  const moveT = interpolate(frame, [125, 165], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoScale = interpolate(moveT, [0, 1], [1, 0.28]);
  // center coords: 1920/2, 1080/2; target top-left bug: (60+90, 36+25) = (150, 61)
  const cx = interpolate(moveT, [0, 1], [960, 150]);
  const cy = interpolate(moveT, [0, 1], [540, 61]);

  // Pick which lockup based on bg
  const useDark = bgT < 0.5;

  // Glow pulse
  const glow = 0.4 + 0.3 * Math.sin(frame / 12);

  return (
    <AbsoluteFill style={{ backgroundColor: "#F4F6FA" }}>
      <Grid light opacity={1 - navyOverlay} />
      <AbsoluteFill style={{ backgroundColor: BG, opacity: navyOverlay }} />
      <Grid opacity={navyOverlay * 0.7} />

      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          filter: useDark
            ? `drop-shadow(0 0 ${30 * glow}px rgba(37,99,235,${0.3 * glow}))`
            : `drop-shadow(0 0 ${24 * glow}px rgba(37,99,235,${0.6 * glow}))`,
        }}
      >
        <Img
          src={staticFile(useDark ? "brand/vektiss-lockup-dark.png" : "brand/vektiss-lockup-light.png")}
          style={{ width: 640, height: 180, objectFit: "contain" }}
        />
      </div>

      {/* Headline appears after bg flip */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 540,
          textAlign: "center",
          fontFamily: FONT,
          color: WHITE,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: -0.5,
          opacity: interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [130, 160], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        }}
      >
        Vektiss builds the operating system
        <br />
        <span style={{ color: BLUE }}>your business actually needs.</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Scene 2: The Problem (240f) ----------
const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const tiles = [
    { label: "Missed call · 14m ago", x: 240, y: 200, w: 280 },
    { label: "Draft post — unscheduled", x: 1380, y: 180, w: 320 },
    { label: "Landing page v3", x: 1450, y: 460, w: 320 },
    { label: "CSV export.xlsx", x: 200, y: 520, w: 260 },
    { label: "New lead → uncontacted", x: 760, y: 760, w: 360 },
    { label: "Project: Kitchen Reno", x: 280, y: 820, w: 320 },
    { label: "Invoice #1284", x: 1480, y: 800, w: 280 },
    { label: "Voicemail unheard", x: 900, y: 180, w: 300 },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Grid opacity={0.6} />
      <LogoBug />
      {tiles.map((t, i) => {
        const delay = i * 5;
        const o = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const drift = Math.sin((frame + i * 20) / 30) * 6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: t.x,
              top: t.y + drift,
              width: t.w,
              padding: "14px 18px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              opacity: o * 0.9,
              fontFamily: FONT,
              color: "rgba(255,255,255,0.75)",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
              backdropFilter: "none",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />
            {t.label}
          </div>
        );
      })}
      <Caption from={70} lines={["Most businesses do not need more tools.", "They need systems that work together."]} />
    </AbsoluteFill>
  );
};

// ---------- Scene 3: The Solution (180f) ----------
const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const labels = [
    { name: "Intelligence", x: 960 + 360, y: 540 - 180 },
    { name: "Voice", x: 960 + 380, y: 540 + 160 },
    { name: "Sites", x: 960 - 380, y: 540 + 160 },
    { name: "Media", x: 960 - 380, y: 540 - 180 },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Grid opacity={0.7} />
      <LogoBug />
      {/* radial pulse */}
      {[0, 1, 2].map((i) => {
        const t = (frame / 30 + i * 0.5) % 2;
        const r = t * 600;
        const o = (1 - t / 2) * 0.6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 960 - r / 2,
              top: 540 - r / 2,
              width: r,
              height: r,
              borderRadius: "50%",
              border: `2px solid ${BLUE}`,
              opacity: o,
            }}
          />
        );
      })}
      {/* connection lines */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {labels.map((l, i) => {
          const o = interpolate(frame, [40 + i * 6, 70 + i * 6], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <line key={i} x1={960} y1={540} x2={l.x} y2={l.y} stroke={BLUE} strokeWidth={1.5} opacity={o} />
          );
        })}
      </svg>
      {/* chevron center */}
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 540,
          transform: `translate(-50%,-50%) scale(${0.6 + sp * 0.4})`,
          filter: `drop-shadow(0 0 30px ${BLUE})`,
        }}
      >
        <Img src={staticFile("brand/vektiss-icon.png")} style={{ width: 160, height: 160 }} />
      </div>
      {labels.map((l, i) => {
        const o = interpolate(frame, [50 + i * 6, 80 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: l.x,
              top: l.y,
              transform: "translate(-50%,-50%)",
              padding: "10px 20px",
              border: `1.5px solid ${BLUE}`,
              borderRadius: 999,
              color: WHITE,
              fontFamily: FONT,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              background: "rgba(37,99,235,0.12)",
              boxShadow: `0 0 20px rgba(37,99,235,0.4)`,
              opacity: o,
            }}
          >
            {l.name}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          color: WHITE,
          fontSize: 42,
          fontWeight: 600,
          opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        That is why we built <span style={{ color: BLUE }}>Vektiss</span>.
      </div>
    </AbsoluteFill>
  );
};

// ---------- Scene 4: Intelligence (540f, 18s) ----------
const Scene4Intelligence: React.FC = () => {
  const frame = useCurrentFrame();
  const inputs = ["Calls", "Leads", "Web traffic", "Inquiries", "Projects", "Content", "Calendar"];
  const outputs = [
    "Route lead to sales",
    "Send follow-up now",
    "Flag urgent inquiry",
    "Summarize call",
    "Update dashboard",
    "Notify team",
    "Move project forward",
  ];
  const cx = 960;
  const cy = 540;
  const r = 360;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Grid opacity={0.5} />
      <LogoBug />

      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 80,
          fontFamily: FONT,
          color: BLUE,
          fontSize: 14,
          letterSpacing: 6,
          fontWeight: 700,
        }}
      >
        01 — VEKTISS INTELLIGENCE
      </div>

      {/* Central brain core */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: "translate(-50%,-50%)",
        }}
      >
        {[0, 1, 2, 3].map((i) => {
          const t = (frame / 40 + i * 0.25) % 1;
          const size = 200 + t * 220;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: -size / 2,
                top: -size / 2,
                width: size,
                height: size,
                borderRadius: "50%",
                border: `1.5px solid ${BLUE}`,
                opacity: (1 - t) * 0.4,
              }}
            />
          );
        })}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BLUE} 0%, rgba(37,99,235,0.2) 60%, transparent 100%)`,
            boxShadow: `0 0 80px ${BLUE}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            color: WHITE,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 4,
            transform: `scale(${1 + 0.04 * Math.sin(frame / 8)})`,
          }}
        >
          AI CORE
        </div>
      </div>

      {/* Inputs on left */}
      {inputs.map((t, i) => {
        const angle = -Math.PI / 2 + (i - (inputs.length - 1) / 2) * 0.25 + Math.PI; // left side
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const o = interpolate(frame, [i * 6, i * 6 + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        // particle flow
        const flowT = ((frame + i * 12) % 60) / 60;
        const px = x + (cx - x) * flowT;
        const py = y + (cy - y) * flowT;
        return (
          <React.Fragment key={`in-${i}`}>
            <div
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: "translate(-50%,-50%)",
                padding: "8px 14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                fontFamily: FONT,
                color: "rgba(255,255,255,0.85)",
                fontSize: 14,
                opacity: o,
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </div>
            <div
              style={{
                position: "absolute",
                left: px - 3,
                top: py - 3,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: BLUE,
                boxShadow: `0 0 10px ${BLUE}`,
                opacity: o,
              }}
            />
          </React.Fragment>
        );
      })}

      {/* Outputs on right - appear later, cycle */}
      {outputs.map((t, i) => {
        const start = 80 + i * 22;
        const o = interpolate(frame, [start, start + 18, start + 200, start + 220], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = 250 + i * 50;
        return (
          <div
            key={`out-${i}`}
            style={{
              position: "absolute",
              left: 1280,
              top: y,
              padding: "12px 18px",
              background: "rgba(37,99,235,0.12)",
              border: `1px solid ${BLUE}`,
              borderRadius: 8,
              fontFamily: FONT,
              color: WHITE,
              fontSize: 16,
              fontWeight: 500,
              opacity: o,
              boxShadow: `0 0 16px rgba(37,99,235,0.3)`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ color: BLUE }}>→</span>
            {t}
          </div>
        );
      })}

      <Caption
        from={20}
        lines={[
          "Vektiss Intelligence acts like the brain of your business.",
          "It sees what is happening and helps drive the next best action.",
        ]}
        sub="Data in. Decisions out."
      />
    </AbsoluteFill>
  );
};

// ---------- Scene 5: Voice (480f, 16s) ----------
const Scene5Voice: React.FC = () => {
  const frame = useCurrentFrame();
  const line1 = "Hi, I wanted to see if you have availability this week.";
  const line2 = "Absolutely. I can help with that. Let me get a few details and point you in the right direction.";
  const t1 = Math.floor(interpolate(frame, [20, 100], [0, line1.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const t2 = Math.floor(interpolate(frame, [130, 240], [0, line2.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  const bars = 40;

  const events = [
    { t: 260, label: "Lead Captured" },
    { t: 290, label: "Intake Sent" },
    { t: 320, label: "Summary Logged" },
    { t: 350, label: "Team Notified" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Grid opacity={0.5} />
      <LogoBug />
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 80,
          fontFamily: FONT,
          color: BLUE,
          fontSize: 14,
          letterSpacing: 6,
          fontWeight: 700,
        }}
      >
        02 — VEKTISS VOICE
      </div>

      {/* Phone card left */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 210,
          width: 420,
          height: 640,
          background: "rgba(13,20,36,0.95)",
          border: `1.5px solid ${BLUE}`,
          borderRadius: 32,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          boxShadow: `0 0 60px rgba(37,99,235,0.35)`,
        }}
      >
        <div style={{ fontFamily: FONT, color: "rgba(255,255,255,0.55)", fontSize: 13, letterSpacing: 3 }}>
          INCOMING CALL
        </div>
        <div style={{ fontFamily: FONT, color: WHITE, fontSize: 24, fontWeight: 600 }}>+1 (415) 555 · 0142</div>
        <div
          style={{
            padding: "8px 16px",
            border: `1px solid ${BLUE}`,
            borderRadius: 999,
            color: BLUE,
            fontFamily: FONT,
            fontSize: 13,
            letterSpacing: 2,
            fontWeight: 700,
            background: "rgba(37,99,235,0.15)",
          }}
        >
          ● AI ASSISTANT ANSWERING
        </div>
        {/* waveform */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 4,
            height: 120,
          }}
        >
          {Array.from({ length: bars }).map((_, i) => {
            const h = 12 + Math.abs(Math.sin((frame + i * 4) / 6)) * (i % 3 === 0 ? 90 : 60);
            return (
              <div
                key={i}
                style={{
                  width: 4,
                  height: h,
                  background: BLUE,
                  borderRadius: 2,
                  boxShadow: `0 0 6px ${BLUE}`,
                  opacity: 0.5 + Math.abs(Math.sin((frame + i * 4) / 6)) * 0.5,
                }}
              />
            );
          })}
        </div>
        <div style={{ marginTop: "auto", fontFamily: FONT, color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
          {Math.floor(frame / 30)
            .toString()
            .padStart(2, "0")}
          :{(Math.floor(frame) % 30).toString().padStart(2, "0")}
        </div>
      </div>

      {/* Transcript right */}
      <div
        style={{
          position: "absolute",
          left: 620,
          top: 210,
          right: 120,
          background: "rgba(13,20,36,0.92)",
          border: `1px solid rgba(37,99,235,0.4)`,
          borderRadius: 18,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          minHeight: 380,
        }}
      >
        <div style={{ fontFamily: FONT, color: "rgba(255,255,255,0.55)", fontSize: 13, letterSpacing: 3 }}>
          LIVE TRANSCRIPT
        </div>
        <div style={{ fontFamily: FONT, color: WHITE, fontSize: 22, lineHeight: 1.4 }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>Caller: </span>
          {line1.slice(0, t1)}
          {t1 < line1.length && frame % 6 < 3 ? "▍" : ""}
        </div>
        <div style={{ fontFamily: FONT, color: BLUE, fontSize: 22, lineHeight: 1.4, textShadow: `0 0 10px ${BLUE}33` }}>
          <span style={{ color: "rgba(37,99,235,0.7)", fontWeight: 700 }}>AI: </span>
          {line2.slice(0, t2)}
          {t2 > 0 && t2 < line2.length && frame % 6 < 3 ? "▍" : ""}
        </div>
      </div>

      {/* event chips */}
      <div style={{ position: "absolute", left: 620, top: 660, right: 120, display: "flex", gap: 14, flexWrap: "wrap" }}>
        {events.map((e, i) => {
          const o = interpolate(frame, [e.t, e.t + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = interpolate(frame, [e.t, e.t + 16], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                padding: "12px 18px",
                background: BLUE,
                borderRadius: 8,
                color: WHITE,
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
                opacity: o,
                transform: `translateY(${y}px)`,
                boxShadow: `0 0 16px ${BLUE}`,
              }}
            >
              ✓ {e.label.toUpperCase()}
            </div>
          );
        })}
      </div>

      <Caption from={380} lines={["Vektiss Voice answers calls with AI.", "It responds, captures details, and moves customers forward."]} />
    </AbsoluteFill>
  );
};

// ---------- Scene 6: Sites (420f, 14s) ----------
const Scene6Sites: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: { damping: 18, stiffness: 110 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Grid opacity={0.5} />
      <LogoBug />
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 80,
          fontFamily: FONT,
          color: BLUE,
          fontSize: 14,
          letterSpacing: 6,
          fontWeight: 700,
        }}
      >
        03 — VEKTISS SITES
      </div>

      {/* desktop browser */}
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 200,
          width: 1080,
          height: 640,
          background: "#0d1424",
          border: `1.5px solid ${BLUE}`,
          borderRadius: 14,
          padding: 14,
          opacity: sp,
          transform: `translateY(${(1 - sp) * 20}px)`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(37,99,235,0.25)`,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
          <div
            style={{
              marginLeft: 14,
              padding: "5px 14px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 6,
              fontFamily: FONT,
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            vektiss.com
          </div>
        </div>
        {/* site content */}
        <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Img src={staticFile("brand/vektiss-lockup-light.png")} style={{ width: 120, height: 32, objectFit: "contain" }} />
            <div style={{ display: "flex", gap: 22, fontFamily: FONT, color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
              <span>Solutions</span>
              <span>How we work</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </div>
          <div style={{ marginTop: 24, fontFamily: FONT, color: WHITE, fontSize: 52, fontWeight: 700, letterSpacing: -1, lineHeight: 1.05 }}>
            Premium business
            <br />
            <span style={{ color: BLUE }}>systems, built in-house.</span>
          </div>
          <div style={{ fontFamily: FONT, color: "rgba(255,255,255,0.6)", fontSize: 18, maxWidth: 600 }}>
            Intelligence, voice, sites, and media — designed to work as one.
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
            <div
              style={{
                padding: "12px 24px",
                background: BLUE,
                borderRadius: 8,
                color: WHITE,
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
                boxShadow: `0 0 18px ${BLUE}`,
              }}
            >
              SEE WHAT WE BUILD
            </div>
            <div
              style={{
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 8,
                color: WHITE,
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 2,
              }}
            >
              CONTACT
            </div>
          </div>
          <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            {["Intelligence", "Voice", "Sites", "Media"].map((n, i) => {
              const o = interpolate(frame, [40 + i * 8, 60 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div
                  key={n}
                  style={{
                    opacity: o,
                    padding: 14,
                    background: "rgba(37,99,235,0.1)",
                    border: "1px solid rgba(37,99,235,0.35)",
                    borderRadius: 8,
                    fontFamily: FONT,
                    color: WHITE,
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: 1,
                  }}
                >
                  {n}
                  <div style={{ marginTop: 8, height: 36, background: "rgba(37,99,235,0.15)", borderRadius: 4 }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* mobile mock slides in */}
      <div
        style={{
          position: "absolute",
          left: 1340,
          top: 280,
          width: 240,
          height: 500,
          background: "#0d1424",
          border: `1.5px solid ${BLUE}`,
          borderRadius: 28,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          opacity: interpolate(frame, [60, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateX(${interpolate(frame, [60, 110], [80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.3)`,
        }}
      >
        <div style={{ height: 80, background: `linear-gradient(135deg, ${BLUE}, rgba(37,99,235,0.3))`, borderRadius: 10 }} />
        <div style={{ height: 14, width: "70%", background: "rgba(255,255,255,0.85)", borderRadius: 4 }} />
        <div style={{ height: 10, width: "90%", background: "rgba(255,255,255,0.3)", borderRadius: 4 }} />
        <div style={{ height: 10, width: "60%", background: "rgba(255,255,255,0.3)", borderRadius: 4 }} />
        <div style={{ marginTop: 6, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ height: 60, background: "rgba(37,99,235,0.18)", border: "1px solid rgba(37,99,235,0.35)", borderRadius: 6 }} />
          ))}
        </div>
        <div style={{ marginTop: "auto", height: 36, background: BLUE, borderRadius: 8 }} />
      </div>

      <Caption
        from={200}
        lines={["Vektiss Sites builds your digital front door.", "Websites, landing pages, and portals designed to convert."]}
      />
    </AbsoluteFill>
  );
};

// ---------- Scene 7: Media (420f, 14s) ----------
const Scene7Media: React.FC = () => {
  const frame = useCurrentFrame();
  const stages = ["RECORD", "EDIT", "CLIP", "CAPTION", "BRAND", "SCHEDULE", "PUBLISH"];
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Grid opacity={0.5} />
      <LogoBug />
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 80,
          fontFamily: FONT,
          color: BLUE,
          fontSize: 14,
          letterSpacing: 6,
          fontWeight: 700,
        }}
      >
        04 — VEKTISS MEDIA
      </div>

      {/* Record source */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 230,
          width: 380,
          height: 280,
          background: "#0d1424",
          border: `1.5px solid ${BLUE}`,
          borderRadius: 14,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          boxShadow: `0 0 40px rgba(37,99,235,0.3)`,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 8px #ef4444", opacity: 0.5 + 0.5 * Math.sin(frame / 4) }} />
          <span style={{ fontFamily: FONT, color: "#ef4444", fontSize: 12, fontWeight: 700, letterSpacing: 3 }}>RECORDING</span>
        </div>
        <div style={{ flex: 1, background: "linear-gradient(135deg, #1a2540, #0a0f1e)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: FONT, color: "rgba(255,255,255,0.4)", fontSize: 14, letterSpacing: 2 }}>STUDIO · 4K</div>
        </div>
        <div style={{ fontFamily: FONT, color: WHITE, fontSize: 18, fontWeight: 600 }}>One recording session</div>
      </div>

      {/* Pipeline */}
      <div style={{ position: "absolute", left: 540, top: 270, right: 120, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontFamily: FONT, color: "rgba(255,255,255,0.55)", fontSize: 13, letterSpacing: 3 }}>WORKFLOW</div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          {stages.map((s, i) => {
            const start = i * 18;
            const o = interpolate(frame, [start, start + 14], [0.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <React.Fragment key={s}>
                <div
                  style={{
                    padding: "10px 14px",
                    background: o > 0.7 ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${o > 0.7 ? BLUE : "rgba(255,255,255,0.15)"}`,
                    borderRadius: 8,
                    fontFamily: FONT,
                    color: WHITE,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 2,
                    opacity: o,
                  }}
                >
                  {s}
                </div>
                {i < stages.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* output cards */}
        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            { l: "REEL", w: 120, h: 200 },
            { l: "POST", w: 140, h: 140 },
            { l: "SHORT", w: 120, h: 200 },
            { l: "CAPTIONS", w: 140, h: 140 },
            { l: "THUMBNAIL", w: 140, h: 100 },
            { l: "CLIP 01", w: 140, h: 100 },
            { l: "CLIP 02", w: 140, h: 100 },
            { l: "CLIP 03", w: 140, h: 100 },
          ].map((c, i) => {
            const start = 140 + i * 12;
            const o = interpolate(frame, [start, start + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const y = interpolate(frame, [start, start + 18], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={i}
                style={{
                  height: 120,
                  background: "rgba(37,99,235,0.15)",
                  border: `1px solid ${BLUE}`,
                  borderRadius: 8,
                  opacity: o,
                  transform: `translateY(${y}px)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT,
                  color: WHITE,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 3,
                  boxShadow: `0 0 16px rgba(37,99,235,0.25)`,
                }}
              >
                {c.l}
              </div>
            );
          })}
        </div>
      </div>

      <Caption
        from={260}
        lines={["Vektiss Media turns one recording into a full content workflow.", "You create once. We turn it into done-for-you assets."]}
        sub="Record once. Multiply everywhere."
      />
    </AbsoluteFill>
  );
};

// ---------- Scene 8: Close (240f, 8s) ----------
const Scene8Close: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const pillars = [
    { name: "Intelligence", angle: -Math.PI / 2 },
    { name: "Voice", angle: 0 },
    { name: "Sites", angle: Math.PI / 2 },
    { name: "Media", angle: Math.PI },
  ];
  const cx = 960;
  const cy = 480;
  const r = 220;

  // fade to black at end
  const blackFade = interpolate(frame, [200, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Grid opacity={0.5} />

      {/* orbit lines */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {pillars.map((p, i) => {
          const x = cx + Math.cos(p.angle) * r;
          const y = cy + Math.sin(p.angle) * r;
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={BLUE} strokeWidth={1.5} opacity={0.5 * sp} />;
        })}
        <circle cx={cx} cy={cy} r={r} stroke={BLUE} strokeWidth={1} fill="none" opacity={0.25 * sp} />
      </svg>

      {/* center chevron */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: `translate(-50%,-50%) scale(${0.6 + sp * 0.4})`,
          filter: `drop-shadow(0 0 30px ${BLUE})`,
        }}
      >
        <Img src={staticFile("brand/vektiss-icon.png")} style={{ width: 140, height: 140 }} />
      </div>

      {pillars.map((p, i) => {
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * r;
        const o = interpolate(frame, [20 + i * 6, 50 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={p.name}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%,-50%)",
              padding: "10px 18px",
              border: `1.5px solid ${BLUE}`,
              borderRadius: 999,
              background: "rgba(37,99,235,0.15)",
              fontFamily: FONT,
              color: WHITE,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: 2,
              boxShadow: `0 0 16px rgba(37,99,235,0.4)`,
              opacity: o,
            }}
          >
            {p.name.toUpperCase()}
          </div>
        );
      })}

      {/* headline */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 800,
          textAlign: "center",
          fontFamily: FONT,
          color: WHITE,
          fontSize: 60,
          fontWeight: 700,
          letterSpacing: -1,
          opacity: interpolate(frame, [70, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        Built in-house. <span style={{ color: BLUE }}>Built for you.</span>
      </div>

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 900,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [110, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            padding: "16px 36px",
            background: BLUE,
            borderRadius: 10,
            color: WHITE,
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 3,
            boxShadow: `0 0 30px ${BLUE}`,
          }}
        >
          SEE WHAT WE BUILD →
        </div>
      </div>

      {/* logo fade-in for final */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000",
          opacity: blackFade,
        }}
      />
    </AbsoluteFill>
  );
};

// ---------- Root ----------
export const VektissHero90: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Series>
        <Series.Sequence durationInFrames={180}><Scene1Open /></Series.Sequence>
        <Series.Sequence durationInFrames={240}><Scene2Problem /></Series.Sequence>
        <Series.Sequence durationInFrames={180}><Scene3Solution /></Series.Sequence>
        <Series.Sequence durationInFrames={540}><Scene4Intelligence /></Series.Sequence>
        <Series.Sequence durationInFrames={480}><Scene5Voice /></Series.Sequence>
        <Series.Sequence durationInFrames={420}><Scene6Sites /></Series.Sequence>
        <Series.Sequence durationInFrames={420}><Scene7Media /></Series.Sequence>
        <Series.Sequence durationInFrames={240}><Scene8Close /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
