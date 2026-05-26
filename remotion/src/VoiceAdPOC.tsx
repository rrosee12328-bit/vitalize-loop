import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1Hook } from "./voice/Scene1Hook";
import { Scene2Owner } from "./voice/Scene2Owner";
import { Scene3Phone } from "./voice/Scene3Phone";
import { Scene4Truth } from "./voice/Scene4Truth";
import { Scene5Stat } from "./voice/Scene5Stat";
import { Scene6Search } from "./voice/Scene6Search";
import { Scene7Calendar } from "./voice/Scene7Calendar";
import { Scene8Reveal } from "./voice/Scene8Reveal";
import { Scene9StatCards } from "./voice/Scene9StatCards";
import { Scene10Waveform } from "./voice/Scene10Waveform";
import { Scene11CallSMS } from "./voice/Scene11CallSMS";
import { Scene12Routing } from "./voice/Scene12Routing";
import { Scene13Dashboard } from "./voice/Scene13Dashboard";
import { Scene14Scale } from "./voice/Scene14Scale";
import { Scene15Guarantee } from "./voice/Scene15Guarantee";
import { Scene16CTA } from "./voice/Scene16CTA";
import { Scene17Close } from "./voice/Scene17Close";

// Full master — Vektiss Voice ad (visuals only; VO/music in post).
// Durations (30fps) sum to 4296f = 143.2s ≈ 2:23
const D = {
  s1: 84, s2: 171, s3: 138, s4: 96, s5: 147,    // POC: 636
  s6: 180, s7: 210, s8: 180,                     // 570
  s9: 240, s10: 270, s11: 300, s12: 330,         // 1140
  s13: 360, s14: 300, s15: 240, s16: 360, s17: 180, // 1440
};

export const TOTAL_FRAMES = Object.values(D).reduce((a, b) => a + b, 0);

export const VoiceAdPOC: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FAFAFA" }}>
      <Series>
        <Series.Sequence durationInFrames={D.s1}><Scene1Hook /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s2}><Scene2Owner /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s3}><Scene3Phone /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s4}><Scene4Truth /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s5}><Scene5Stat /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s6}><Scene6Search /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s7}><Scene7Calendar /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s8}><Scene8Reveal /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s9}><Scene9StatCards /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s10}><Scene10Waveform /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s11}><Scene11CallSMS /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s12}><Scene12Routing /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s13}><Scene13Dashboard /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s14}><Scene14Scale /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s15}><Scene15Guarantee /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s16}><Scene16CTA /></Series.Sequence>
        <Series.Sequence durationInFrames={D.s17}><Scene17Close /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
