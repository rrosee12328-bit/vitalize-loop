import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { HeroScene1Reveal } from "./hero/HeroScene1Reveal";
import { HeroScene2Grid } from "./hero/HeroScene2Grid";
import { HeroScene3Closeups } from "./hero/HeroScene3Closeups";
import { HeroScene4Unified } from "./hero/HeroScene4Unified";

// 90 + 150 + 150 + 90 = 480 frames @ 30fps = 16s
export const VektissHeroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0F1E" }}>
      <Series>
        <Series.Sequence durationInFrames={90}>
          <HeroScene1Reveal />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <HeroScene2Grid />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <HeroScene3Closeups />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <HeroScene4Unified />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
