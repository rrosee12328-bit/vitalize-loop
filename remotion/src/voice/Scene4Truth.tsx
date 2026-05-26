import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD } from "./VoiceChrome";

// 0:13.3 - 0:16.5 (96f) — Editorial "Here's the truth" with blue underline sweep on "truth".
export const Scene4Truth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyeO = spring({ frame: frame - 2, fps, config: { damping: 200 } });
  const line1S = spring({ frame: frame - 10, fps, config: { damping: 22, stiffness: 75 } });
  const line1O = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const subO = spring({ frame: frame - 40, fps, config: { damping: 200 }, durationInFrames: 36 });

  const sweep = interpolate(frame, [34, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(frame, [0, 96], [1.0, 1.025]);
  const y = interpolate(line1S, [0, 1], [22, 0]);

  return (
    <AbsoluteFill>

      <VoiceHUD eyebrow="03 · THE TRUTH" />

      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%" }}>
        <div style={{ position: "absolute", left: 110, top: 230, right: 110 }}>
          <div
            style={{
              opacity: eyeO,
              fontFamily: FONT_MONO,
              fontSize: 12,
              letterSpacing: "0.24em",
              color: COLORS.accent,
              marginBottom: 28,
            }}
          >
            HERE IS WHAT NO ONE TELLS YOU
          </div>
          <div
            style={{
              opacity: line1O,
              transform: `translateY(${y}px)`,
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: 92,
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: COLORS.ink,
            }}
          >
            Here's the{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 8,
                  height: 26,
                  width: `${sweep * 100}%`,
                  background: "rgba(0,136,255,0.22)",
                  zIndex: -1,
                }}
              />
              truth
            </span>
            <br />
            most owners don't want to hear.
          </div>
          <div
            style={{
              opacity: subO,
              marginTop: 28,
              fontFamily: FONT_SANS,
              fontSize: 22,
              color: COLORS.muted,
              maxWidth: 720,
              lineHeight: 1.4,
            }}
          >
            The data on missed calls is brutal — and most businesses are losing money to it every single day.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
