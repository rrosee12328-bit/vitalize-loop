import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

// Scene 1 — Uploaded chevron-form-from-black intro clip.
// 150f / 5s. Source is 960x960; center on 1920x1080 navy canvas.
export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // Hold black at very start to mask any encoder flash, fade out in last 20f.
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 24, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeOut,
        }}
      >
        <OffthreadVideo
          src={staticFile("video/vektiss-intro.mp4")}
          muted
          style={{ width: 1080, height: 1080, objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
