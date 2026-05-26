import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { MainVideoVertical } from "./MainVideoVertical";
import { SiteIntroVideo } from "./SiteIntroVideo";
import { SpeakerVerticalVideo } from "./SpeakerVerticalVideo";
import { VoiceAdPOC } from "./VoiceAdPOC";


// 20s @ 30fps = 600 frames
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="main"
        component={MainVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="main-vertical"
        component={MainVideoVertical}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="site-intro"
        component={SiteIntroVideo}
        durationInFrames={1290}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="speaker-vertical"
        component={SpeakerVerticalVideo}
        durationInFrames={2194}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="voice-ad-poc"
        component={VoiceAdPOC}
        durationInFrames={3786}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};


