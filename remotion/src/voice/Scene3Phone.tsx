import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { FONT_MONO, FONT_SANS } from "../fonts";
import { VoiceBackground, VoiceHUD } from "./VoiceChrome";

// 0:08.6 - 0:13.2 (138f) — Phone card (light, site-style) rings, then a Missed Call log row.
export const Scene3Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardIn = spring({ frame: frame - 4, fps, config: { damping: 22, stiffness: 70 } });
  const cardY = interpolate(cardIn, [0, 1], [30, 0]);
  const cardO = spring({ frame: frame - 4, fps, config: { damping: 200 } });

  const ringActive = frame >= 18 && frame < 80;
  const ringPulse = ringActive ? 0.6 + Math.abs(Math.sin((frame - 18) * 0.35)) * 0.4 : 0;

  // Switch to "missed" state
  const missed = frame >= 92;
  const missedO = interpolate(frame, [92, 102], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>

      <VoiceHUD eyebrow="02 · THE PHONE RINGS" />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            opacity: cardO,
            transform: `translateY(${cardY}px)`,
            width: 560,
            background: COLORS.white,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 18,
            boxShadow: "0 30px 60px -30px rgba(10,22,40,0.18), 0 8px 20px -10px rgba(10,22,40,0.08)",
            padding: 26,
            fontFamily: FONT_SANS,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: COLORS.muted }}>
              YOUR BUSINESS LINE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: missed ? "#9CA3AF" : COLORS.accent,
                  opacity: missed ? 1 : ringPulse,
                  boxShadow: missed ? "none" : `0 0 ${12 * ringPulse}px rgba(0,136,255,0.6)`,
                }}
              />
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.ink, letterSpacing: "0.1em" }}>
                {missed ? "ENDED" : ringActive ? "INCOMING" : "IDLE"}
              </span>
            </div>
          </div>

          {!missed ? (
            <>
              <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 6 }}>
                {ringActive ? "Ringing…" : "Call connecting"}
              </div>
              <div style={{ fontSize: 40, fontWeight: 600, color: COLORS.ink, letterSpacing: "-0.02em" }}>
                +1 (832) 555-0142
              </div>
              <div style={{ marginTop: 6, fontSize: 16, color: COLORS.muted }}>Unknown caller · Houston, TX</div>

              {/* Ring waveform */}
              <div style={{ marginTop: 24, display: "flex", alignItems: "flex-end", gap: 5, height: 64 }}>
                {Array.from({ length: 36 }).map((_, i) => {
                  const h = ringActive
                    ? 8 + Math.abs(Math.sin((frame - 18) * 0.4 + i * 0.5)) * 52
                    : 6;
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: h,
                        borderRadius: 3,
                        background: ringActive ? COLORS.accent : COLORS.border,
                        opacity: ringActive ? 0.4 + Math.abs(Math.sin((frame - 18) * 0.4 + i * 0.5)) * 0.6 : 0.5,
                      }}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div style={{ opacity: missedO }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.2em", color: "#9CA3AF" }}>
                CALL LOG · 9:42 AM
              </div>
              <div style={{ marginTop: 8, fontSize: 40, fontWeight: 600, color: COLORS.ink, letterSpacing: "-0.02em" }}>
                Missed Call
              </div>
              <div style={{ marginTop: 6, fontSize: 16, color: COLORS.muted }}>
                +1 (832) 555-0142 · No voicemail left.
              </div>
              <div
                style={{
                  marginTop: 22,
                  height: 6,
                  borderRadius: 4,
                  background: COLORS.surface,
                  overflow: "hidden",
                }}
              >
                <div style={{ width: "100%", height: "100%", background: "#9CA3AF", opacity: 0.5 }} />
              </div>
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
