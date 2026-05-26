import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BRAND } from "./brand";
import { FONT_SANS } from "../fonts";

// 0:08.6 - 0:13.2  (138 frames)
// Phone rings center, green pulse "Incoming Call". Then dims to black. Hard cut to "Missed Call" in cold grey.
export const Scene3Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone appears 0-78
  const phoneIn = spring({ frame: frame - 4, fps, config: { damping: 18, stiffness: 130 } });
  const phoneY = interpolate(phoneIn, [0, 1], [30, 0]);
  const phoneO = spring({ frame: frame - 4, fps, config: { damping: 200 } });

  // ring pulse (sine), fade screen dim around frame 78-92
  const ringActive = frame >= 18 && frame < 78;
  const ringScale = ringActive ? 1 + Math.sin((frame - 18) * 0.7) * 0.08 : 1;
  const screenOpacity = interpolate(frame, [78, 92], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phoneOpacityOut = interpolate(frame, [92, 102], [1, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Missed call text appears at 105
  const missedO = interpolate(frame, [105, 106], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BRAND.navy }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {/* Phone */}
        <div
          style={{
            opacity: phoneO * phoneOpacityOut,
            transform: `translateY(${phoneY}px) scale(${ringScale})`,
            width: 220,
            height: 420,
            borderRadius: 36,
            background: "#0F1530",
            border: "3px solid rgba(255,255,255,0.18)",
            padding: 14,
            boxShadow: ringActive ? "0 0 80px rgba(34,197,94,0.35)" : "0 0 30px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 14,
              borderRadius: 24,
              background: ringActive ? `rgba(34,197,94, ${0.18 + Math.sin((frame - 18) * 0.7) * 0.1})` : "#000",
              opacity: screenOpacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 12,
              transition: "background 0.1s",
            }}
          >
            {ringActive && (
              <>
                <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>INCOMING CALL</div>
                <div style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: 22, color: "#fff" }}>Unknown</div>
                <div
                  style={{
                    marginTop: 24,
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    background: "#22C55E",
                    boxShadow: `0 0 ${20 + Math.sin((frame - 18) * 0.7) * 16}px rgba(34,197,94,0.8)`,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </AbsoluteFill>

      {/* Missed Call hard-cut text */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: missedO }}>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 700,
            fontSize: 88,
            letterSpacing: "-0.025em",
            color: BRAND.greyCold,
          }}
        >
          Missed Call
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
