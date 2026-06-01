import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Scene 1 — Uploaded brand intro, pre-extracted as JPEG frames at 30fps.
// We avoid OffthreadVideo because the sandbox compositor segfaults on h264 decode.
const TOTAL_FRAMES = 151;

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const idx = Math.min(TOTAL_FRAMES, Math.max(1, frame + 1));
  const padded = String(idx).padStart(4, "0");

  const fadeIn = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: fadeIn * fadeOut }}>
      <Img
        src={staticFile(`intro-frames/f_${padded}.jpg`)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};
