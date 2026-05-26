import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { COLORS } from "./theme";
import { FONT_MONO, FONT_SANS } from "./fonts";
import { VektissMark } from "./voice/VektissMark";
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

// Canvas: 1280×720. Content lives in the left ~875×720 zone (scenes are
// authored at 1280×720 and scaled down to fit). Right 405×720 is reserved
// for the host's 9:16 narrator video to be composited in post.

// Scene durations (30fps). Sum = 3786 frames = 2:06.2 — the full master.
const D = {
  s1: 84, s2: 171, s3: 138, s4: 96, s5: 147,
  s6: 180, s7: 210, s8: 180,
  s9: 240, s10: 270, s11: 300, s12: 330,
  s13: 360, s14: 300, s15: 240, s16: 360, s17: 180,
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
      {/* Scaled scene content — left zone */}
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

      {/* 9:16 reserved zone — placeholder for narrator video */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: RESERVE_W,
          height: 720,
          background: "rgba(0,136,255,0.04)",
          borderLeft: `1px solid ${COLORS.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_SANS,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 18,
            border: `1.5px dashed rgba(0,136,255,0.35)`,
            borderRadius: 18,
          }}
        />
        <VektissMark size={64} style={{ opacity: 0.55, marginBottom: 18 }} />
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            letterSpacing: "0.28em",
            color: COLORS.accent,
            marginBottom: 10,
          }}
        >
          NARRATOR · 9:16
        </div>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 18,
            color: COLORS.muted,
            textAlign: "center",
            maxWidth: 280,
            lineHeight: 1.4,
            padding: "0 24px",
          }}
        >
          Place your vertical voiceover video here
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontFamily: FONT_MONO,
            fontSize: 10,
            letterSpacing: "0.24em",
            color: COLORS.muted,
            opacity: 0.6,
          }}
        >
          {RESERVE_W} × 720 · 9:16
        </div>
      </div>
    </AbsoluteFill>
  );
};
