import React from "react";
import { AbsoluteFill } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Scene1Intro } from "./brand/Scene1Intro";
import { Scene2WhoWeAre } from "./brand/Scene2WhoWeAre";
import { Scene3Intelligence } from "./brand/Scene3Intelligence";
import { Scene4Voice } from "./brand/Scene4Voice";
import { Scene5Sites } from "./brand/Scene5Sites";
import { Scene6Media } from "./brand/Scene6Media";
import { Scene7Close } from "./brand/Scene7Close";

// Total raw: 150 + 300 + 540 + 600 + 540 + 480 + 540 = 3150
// 6 transitions × 30f overlap = 180f overlap
// Composition duration = 3150 - 180 = 2970 frames
export const VektissBrandVideo: React.FC = () => {
  const blackFade = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: 30 })}
    />
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene1Intro />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene2WhoWeAre />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={540}>
          <Scene3Intelligence />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={600}>
          <Scene4Voice />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={540}>
          <Scene5Sites />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={480}>
          <Scene6Media />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={540}>
          <Scene7Close />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
