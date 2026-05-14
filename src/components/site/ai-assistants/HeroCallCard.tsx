import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Line = { speaker: "AI" | "Caller"; text: string };

const SCRIPT: Line[] = [
  {
    speaker: "AI",
    text: "Thank you for calling Dallas Pro Plumbing, how can I help you today?",
  },
  {
    speaker: "Caller",
    text: "Yeah hi, I've got a burst pipe and water is everywhere—",
  },
  {
    speaker: "AI",
    text: "I'm so sorry to hear that. I'm getting an emergency tech dispatched to you right now. Can I get your address?",
  },
  { speaker: "Caller", text: "It's 4821 Maple Drive." },
  {
    speaker: "AI",
    text: "Got it. A technician will be there within 45 minutes. I'm sending you a confirmation email now.",
  },
];

const TYPE_SPEED = 18; // ms per char
const PAUSE_BETWEEN = 600;
const RESTART_DELAY = 2200;

export function HeroCallCard() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lineIdx >= SCRIPT.length) {
      const t = setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
      }, RESTART_DELAY);
      return () => clearTimeout(t);
    }
    const current = SCRIPT[lineIdx].text;
    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), TYPE_SPEED);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, PAUSE_BETWEEN);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lineIdx, charIdx]);

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#111827] text-white shadow-2xl shadow-black/40 overflow-hidden border border-white/5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Phone className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-semibold tracking-tight">Vektiss AI</div>
              <div className="font-mono text-[10px] tracking-widest text-white/50">
                INBOUND · MOBILE
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] tracking-widest text-emerald-300">
              LIVE CALL IN PROGRESS
            </span>
          </div>
        </div>

        {/* Transcript */}
        <div
          ref={scrollRef}
          className="h-[340px] space-y-3 overflow-y-auto px-5 py-5 md:h-[380px]"
        >
          {SCRIPT.slice(0, lineIdx + 1).map((line, i) => {
            const isCurrent = i === lineIdx;
            const text = isCurrent ? line.text.slice(0, charIdx) : line.text;
            const isAI = line.speaker === "AI";
            return (
              <div
                key={i}
                className={cn(
                  "flex flex-col gap-1",
                  isAI ? "items-start" : "items-end",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-widest",
                    isAI ? "text-blue-300" : "text-white/40",
                  )}
                >
                  {line.speaker}
                </span>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    isAI
                      ? "bg-blue-500/15 text-white"
                      : "bg-white/5 text-white/90",
                  )}
                >
                  {text}
                  {isCurrent && charIdx < line.text.length && (
                    <span className="ml-0.5 inline-block h-3.5 w-[2px] -mb-0.5 animate-pulse bg-white/70 align-middle" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        This is what your customers hear — every time, even at 2am.
      </p>
    </div>
  );
}
