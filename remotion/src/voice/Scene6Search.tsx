import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD, useFadeUp } from "./VoiceChrome";

// 6s — "They call the next business on Google" — search results list with
// the second result highlighted in Vektiss blue.
export const Scene6Search: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eye = useFadeUp(2);
  const title = useFadeUp(8);

  const results = [
    { name: "AAA Plumbing Co.", url: "aaaplumbing.com", dim: true },
    { name: "Reliable Plumbers — Open Now · Calls answered", url: "reliable-plumbers.com", highlight: true },
    { name: "Quick Fix Plumbing", url: "quickfix.io", dim: true },
    { name: "Hometown Plumbing & Drain", url: "hometownplumb.com", dim: true },
  ];

  const sweepProgress = spring({ frame: frame - 48, fps, config: { damping: 22, stiffness: 120 } });

  return (
    <AbsoluteFill>

      <VoiceHUD eyebrow="05 · NEXT ON GOOGLE" />

      <div style={{ position: "absolute", left: 110, top: 150, opacity: eye.opacity, transform: `translateY(${eye.y}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.24em", color: COLORS.accent }}>
          GOOGLE · "plumber near me"
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 220,
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: 64,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: COLORS.ink,
        }}
      >
        Your customer keeps scrolling.
      </div>

      <div style={{ position: "absolute", left: 110, right: 110, top: 380 }}>
        {results.map((r, i) => {
          const delay = 22 + i * 10;
          const s = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 140 } });
          const o = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 18 });
          const y = interpolate(s, [0, 1], [16, 0]);
          const isHi = r.highlight && sweepProgress > 0.1;
          return (
            <div
              key={i}
              style={{
                opacity: o * (r.dim && sweepProgress > 0.3 ? 0.4 : 1),
                transform: `translateY(${y}px)`,
                padding: "18px 24px",
                marginBottom: 12,
                borderRadius: 12,
                background: isHi ? "rgba(0,136,255,0.08)" : "transparent",
                border: isHi ? `1px solid rgba(0,136,255,0.4)` : `1px solid transparent`,
                fontFamily: FONT_SANS,
                transition: "all 0.05s",
              }}
            >
              <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: FONT_MONO, letterSpacing: "0.1em" }}>
                {r.url}
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: r.highlight ? 600 : 500,
                  color: isHi ? COLORS.accent : COLORS.ink,
                  marginTop: 4,
                }}
              >
                {r.name}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
