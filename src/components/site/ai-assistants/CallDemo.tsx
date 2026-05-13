import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Phone, CheckCircle2 } from "lucide-react";

type Line = { speaker: "Caller" | "Vektiss AI"; text: string };

const SCRIPT: Line[] = [
  { speaker: "Caller", text: "Hi, I'm calling about getting a quote." },
  {
    speaker: "Vektiss AI",
    text: "Hi there! I'd be happy to help. Can I get your name and the best number to reach you?",
  },
  { speaker: "Caller", text: "Sure, it's Marcus, 214-555-0192." },
  {
    speaker: "Vektiss AI",
    text: "Got it, Marcus. I'll have someone from the team follow up within the hour. Is there anything else I can help you with?",
  },
];

const CHAR_MS = 28;
const PAUSE_MS = 700;
const RESET_MS = 3200;

export type CallDemoHandle = { replay: () => void };

export const CallDemo = forwardRef<CallDemoHandle>(function CallDemo(_, ref) {
  const [lineIdx, setLineIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (tickRef.current) clearTimeout(tickRef.current);
    tickRef.current = null;
  };

  const start = () => {
    clear();
    setLineIdx(0);
    setChars(0);
    setDone(false);
  };

  useImperativeHandle(ref, () => ({ replay: start }), []);

  useEffect(() => {
    if (done) {
      tickRef.current = setTimeout(start, RESET_MS);
      return clear;
    }
    const line = SCRIPT[lineIdx];
    if (!line) return;
    if (chars < line.text.length) {
      tickRef.current = setTimeout(() => setChars((c) => c + 1), CHAR_MS);
    } else if (lineIdx < SCRIPT.length - 1) {
      tickRef.current = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setChars(0);
      }, PAUSE_MS);
    } else {
      tickRef.current = setTimeout(() => setDone(true), PAUSE_MS);
    }
    return clear;
  }, [lineIdx, chars, done]);

  return (
    <div className="rounded-2xl border border-white/10 bg-foreground p-6 text-background shadow-card md:p-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-white/70">
            VEKTISS AI · ANSWERING
          </span>
        </div>
        <Phone className="h-4 w-4 text-white/50" />
      </div>

      <div className="mt-5 min-h-[260px] space-y-3">
        {SCRIPT.slice(0, lineIdx + 1).map((line, i) => {
          const isCurrent = i === lineIdx;
          const text = isCurrent ? line.text.slice(0, chars) : line.text;
          const isAI = line.speaker === "Vektiss AI";
          return (
            <div key={i} className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-snug ${
                  isAI
                    ? "bg-white/10 text-white"
                    : "bg-primary/90 text-primary-foreground"
                }`}
              >
                <div className="font-mono text-[9px] tracking-widest opacity-60">
                  {line.speaker.toUpperCase()}
                </div>
                <div className="mt-0.5">
                  {text}
                  {isCurrent && !done && (
                    <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-current align-middle" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-5 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300 transition-opacity duration-500 ${
          done ? "opacity-100" : "opacity-0"
        }`}
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
        <span>Lead captured · Summary sent to owner</span>
      </div>
    </div>
  );
});
