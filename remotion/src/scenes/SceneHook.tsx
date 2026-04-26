import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";

// Scene 1 — Hook. "Stop running your business on duct-taped tools."
// Big editorial type, blue accent underline sweeps behind a keyword.
export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowIn = spring({ frame: frame - 4, fps, config: { damping: 200 }, durationInFrames: 30 });
  const line1Y = interpolate(spring({ frame: frame - 10, fps, config: { damping: 22, stiffness: 140 } }), [0, 1], [40, 0]);
  const line1O = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const line2O = spring({ frame: frame - 24, fps, config: { damping: 200 } });
  const line2Y = interpolate(spring({ frame: frame - 24, fps, config: { damping: 22, stiffness: 140 } }), [0, 1], [40, 0]);

  // Blue underline sweep behind "duct-taped tools"
  const sweep = interpolate(frame, [44, 78], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Slow camera-feel zoom
  const zoom = interpolate(frame, [0, 130], [1.0, 1.04]);

  return (
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 55%" }}>
      <div style={{ position: "absolute", left: 140, top: 280, right: 140 }}>
        <div
          style={{
            opacity: eyebrowIn,
            fontFamily: FONT_MONO,
            fontSize: 14,
            letterSpacing: "0.22em",
            color: COLORS.accent,
            marginBottom: 36,
          }}
        >
          01 · THE PROBLEM
        </div>
        <div
          style={{
            opacity: line1O,
            transform: `translateY(${line1Y}px)`,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 132,
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            color: COLORS.ink,
          }}
        >
          Stop running your business
        </div>
        <div
          style={{
            opacity: line2O,
            transform: `translateY(${line2Y}px)`,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: 132,
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            color: COLORS.ink,
            marginTop: 8,
            position: "relative",
            display: "inline-block",
          }}
        >
          on{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: 14,
                height: 36,
                width: `${sweep * 100}%`,
                background: "rgba(0,85,255,0.22)",
                zIndex: -1,
              }}
            />
            duct-taped tools.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
