import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1Hook } from "./voice/Scene1Hook";
import { Scene2Owner } from "./voice/Scene2Owner";
import { Scene3Phone } from "./voice/Scene3Phone";
import { Scene4Truth } from "./voice/Scene4Truth";
import { Scene5Stat } from "./voice/Scene5Stat";

// POC: Scenes 1-5, 0:00 - 0:21.8
// Durations (30fps): 84, 171, 138, 96, 147 = 636 frames
export const VoiceAdPOC: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Series>
        <Series.Sequence durationInFrames={84}><Scene1Hook /></Series.Sequence>
        <Series.Sequence durationInFrames={171}><Scene2Owner /></Series.Sequence>
        <Series.Sequence durationInFrames={138}><Scene3Phone /></Series.Sequence>
        <Series.Sequence durationInFrames={96}><Scene4Truth /></Series.Sequence>
        <Series.Sequence durationInFrames={147}><Scene5Stat /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
