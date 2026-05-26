import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { COLORS } from "./theme";
import { VoiceBackground } from "./voice/VoiceChrome";
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

// Canvas: 1280×720. Motion-graphics scenes live in the left ~875×720 zone
// (scaled from a 1280×720 author canvas). Right 405×720 is reserved safe-zone
// for the host's 9:16 narrator video — left empty so the editor can composite
// it directly on top in post. Background is a single continuous wash that
// spans the entire canvas so the seam is invisible.

// Scene durations (30fps). Sum = 4596 frames = 153.2s — matches narration MP3.
const D = {
  s1: 96, s2: 174, s3: 78, s4: 78, s5: 105,
  s6: 42, s7: 192, s8: 75,
  s9: 183, s10: 93, s11: 330, s12: 564,
  s13: 360,
  s14: 258,   // Scale / CRM / Bilingual
  s15: 306,   // Custom Build + Guarantee stamp
  s16: 144,   // Money back. No questions asked.
  s17: 1518,  // Pricing + Close (navy)
};

export const TOTAL_FRAMES = Object.values(D).reduce((a, b) => a + b, 0);

const RESERVE_W = 405; // 9:16 at 720h
const CONTENT_W = 1280 - RESERVE_W; // 875
const SCALE = CONTENT_W / 1280; // 0.6836
const SCALED_H = 720 * SCALE; // 492.2
const TOP_OFFSET = (720 - SCALED_H) / 2; // 113.9

export const VoiceAdPOC: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Narration baked into the master. */}
      <Audio src={staticFile("audio/narration.mp3")} />

      {/* Single continuous background spanning the full 1280×720 canvas. */}
      <VoiceBackground />

      {/* Scaled scene content — left content zone */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: TOP_OFFSET,
          width: 1280,
          height: 720,
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
        }}
      >
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
      </div>
    </AbsoluteFill>
  );
};
