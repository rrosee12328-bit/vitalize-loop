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

// Scene1 150 + Scene2 240 + Scene3-7 each 300 = 1890; minus 6×30 overlaps = 1710
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
        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene2WhoWeAre />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene3Intelligence />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene4Voice />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene5Sites />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene6Media />
        </TransitionSeries.Sequence>
        {blackFade}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene7Close />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
