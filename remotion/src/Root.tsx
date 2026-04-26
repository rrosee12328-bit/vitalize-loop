import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

// 20s @ 30fps = 600 frames
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="main"
      component={MainVideo}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
