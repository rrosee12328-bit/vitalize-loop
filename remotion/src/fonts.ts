import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const mono = loadJetBrains("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const FONT_SANS = inter.fontFamily;
export const FONT_MONO = mono.fontFamily;
