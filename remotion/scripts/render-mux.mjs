import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compositionId = process.argv[2] ?? "voice-ad-poc";
const outputLocation = process.argv[3] ?? "/mnt/documents/vektiss-voice-poc.mp4";
const audioPath = path.resolve(__dirname, "../public/audio/narration.mp3");
const silentPath = "/tmp/voice-silent.mp4";

const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (config) => config,
});

const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
  chromeMode: "chrome-for-testing",
});

const composition = await selectComposition({ serveUrl: bundled, id: compositionId, puppeteerInstance: browser });

await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: silentPath,
  puppeteerInstance: browser,
  muted: true,
  concurrency: 4,
});

await browser.close({ silent: false });
console.log("Silent video rendered, muxing audio...");

execSync(`ffmpeg -y -i ${silentPath} -i ${audioPath} -c:v copy -c:a aac -b:a 192k -shortest ${outputLocation}`, { stdio: "inherit" });
fs.unlinkSync(silentPath);
console.log("DONE", outputLocation);
