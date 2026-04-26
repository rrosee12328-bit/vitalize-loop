import React from "react";
import { AbsoluteFill } from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";

import { PersistentBackground } from "./components/PersistentBackground";
import { PersistentHUD } from "./components/PersistentHUD";

import { SceneHook } from "./scenes/SceneHook";
import { ScenePillarSolo } from "./scenes/ScenePillarSolo";
import { SceneAllPillars } from "./scenes/SceneAllPillars";
import { SceneClose } from "./scenes/SceneClose";

// 5 scenes × 130 = 650f, minus 4 transitions × ~15f overlap = ~590f.
// Pad close to land at 600f total.

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <PersistentBackground />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneHook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })}
        />

        <TransitionSeries.Sequence durationInFrames={130}>
          <ScenePillarSolo
            number="01"
            eyebrow="01 · PROJECT INTELLIGENCE"
            title={"See every project, every signal."}
            body={"Live visibility across budget, time, risk, and team load — so nothing slips quietly."}
            align="left"
            variant="intelligence"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })}
        />

        <TransitionSeries.Sequence durationInFrames={130}>
          <ScenePillarSolo
            number="02"
            eyebrow="02 · AI PHONE & EMAIL"
            title={"Never miss another lead."}
            body={"AI assistants qualify inbound, draft replies, and route the moments that matter — 24/7."}
            align="right"
            variant="assistants"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 14 })}
        />

        <TransitionSeries.Sequence durationInFrames={150}>
          <SceneAllPillars />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneClose />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <PersistentHUD />
    </AbsoluteFill>
  );
};
