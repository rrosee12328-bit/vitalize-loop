import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, Phone, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Stage = { time: number; label: string };
type Demo = {
  id: string;
  title: string;
  shortLabel: string;
  audioSrc: string;
  duration: number;
  stages: Stage[];
};

const DEMOS: Demo[] = [
  {
    id: "home_services",
    title: "Home Services — Plumbing Emergency",
    shortLabel: "Home Services",
    audioSrc: "/audio/home_services.mp3",
    duration: 130,
    stages: [
      { time: 0, label: "AI answers immediately" },
      { time: 12, label: "Identifies emergency situation" },
      { time: 35, label: "Collects name and address" },
      { time: 70, label: "Dispatches technician, gives ETA" },
      { time: 105, label: "Confirms via SMS, captures lead" },
      { time: 125, label: "Warm close" },
    ],
  },
  {
    id: "real_estate",
    title: "Real Estate — Buyer Inquiry & Showing",
    shortLabel: "Real Estate",
    audioSrc: "/audio/real_estate.mp3",
    duration: 130,
    stages: [
      { time: 0, label: "AI answers as brokerage" },
      { time: 15, label: "Identifies property interest" },
      { time: 40, label: "Qualifies buyer" },
      { time: 65, label: "Checks calendar availability" },
      { time: 95, label: "Books showing, confirms date/time" },
      { time: 125, label: "Sends confirmation, captures contact" },
    ],
  },
  {
    id: "medical_wellness",
    title: "Medical / Wellness — New Patient Booking",
    shortLabel: "Medical / Wellness",
    audioSrc: "/audio/medical_wellness.mp3",
    duration: 135,
    stages: [
      { time: 0, label: "AI answers as clinic" },
      { time: 15, label: "New patient inquiry" },
      { time: 45, label: "Collects insurance and concern" },
      { time: 75, label: "Checks availability, offers slots" },
      { time: 110, label: "Books appointment, confirms" },
      { time: 130, label: "Warm close with next steps" },
    ],
  },
  {
    id: "professional_services",
    title: "Professional Services — B2B Consulting Intake",
    shortLabel: "Professional Services",
    audioSrc: "/audio/professional_services.mp3",
    duration: 140,
    stages: [
      { time: 0, label: "AI answers as consulting firm" },
      { time: 20, label: "Identifies business need" },
      { time: 55, label: "Qualifies company size and urgency" },
      { time: 85, label: "Routes to discovery call booking" },
      { time: 115, label: "Confirms calendar slot" },
      { time: 135, label: "Sends recap email, captures lead" },
    ],
  },
];

function fmt(t: number) {
  if (!isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function LiveCallDemo() {
  const [activeId, setActiveId] = useState(DEMOS[0].id);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(DEMOS[0].duration);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const demo = useMemo(() => DEMOS.find((d) => d.id === activeId)!, [activeId]);

  const activeStageIdx = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < demo.stages.length; i++) {
      if (demo.stages[i].time <= currentTime) idx = i;
      else break;
    }
    return idx;
  }, [currentTime, demo.stages]);

  // Switch demo: reset
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setPlaying(false);
    setCurrentTime(0);
    setDuration(demo.duration);
    a.load();
  }, [demo.id, demo.duration]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const seekTo = (t: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(t, duration));
    setCurrentTime(a.currentTime);
  };

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = progressRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekTo(ratio * duration);
  };

  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="grid md:grid-cols-12">
        {/* Scenarios */}
        <div className="md:col-span-4 border-b border-border md:border-b-0 md:border-r bg-surface-elevated">
          <div className="p-5 md:p-6">
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
              SCENARIOS
            </p>
            <h3 className="mt-2 text-base font-semibold tracking-tight">
              Hear the AI in action
            </h3>
          </div>
          <ul className="px-2 pb-3 md:px-3 md:pb-5">
            {DEMOS.map((d) => {
              const isActive = d.id === activeId;
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(d.id)}
                    className={cn(
                      "group w-full rounded-lg px-3 py-3 text-left transition-colors",
                      isActive
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground border border-border",
                        )}
                      >
                        <Phone className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium leading-tight">
                          {d.shortLabel}
                        </div>
                        <div className="mt-0.5 truncate text-xs text-muted-foreground">
                          {d.title.split("—")[1]?.trim() ?? ""}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Player + Timeline */}
        <div className="md:col-span-8 p-5 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-primary">
                LIVE CALL DEMO
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight md:text-xl">
                {demo.title}
              </h3>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-1 sm:inline-flex">
              <span className="relative inline-flex h-2 w-2">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75",
                    playing && "animate-ping",
                  )}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {playing ? "ON CALL" : "READY"}
              </span>
            </div>
          </div>

          {/* Player */}
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card transition-transform hover:scale-105"
            >
              {playing ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="ml-0.5 h-5 w-5" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <div
                ref={progressRef}
                onClick={onProgressClick}
                className="group relative h-2 w-full cursor-pointer rounded-full bg-muted"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-100"
                  style={{ width: `${pct}%` }}
                />
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow transition-opacity group-hover:opacity-100"
                  style={{ left: `${pct}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={demo.audioSrc}
            preload="metadata"
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => {
              if (isFinite(e.currentTarget.duration) && e.currentTarget.duration > 0) {
                setDuration(e.currentTarget.duration);
              }
            }}
            onEnded={() => setPlaying(false)}
          />

          {/* Timeline */}
          <ol className="mt-8 space-y-1">
            {demo.stages.map((s, i) => {
              const state =
                i < activeStageIdx ? "done" : i === activeStageIdx ? "active" : "pending";
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => seekTo(s.time)}
                    className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-muted/60"
                  >
                    <span
                      className={cn(
                        "relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono",
                        state === "done" &&
                          "border-primary bg-primary text-primary-foreground",
                        state === "active" &&
                          "border-primary bg-background text-primary",
                        state === "pending" &&
                          "border-border bg-background text-muted-foreground",
                      )}
                    >
                      {state === "done" ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : state === "active" ? (
                        <span className="relative inline-flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-sm transition-colors",
                        state === "active" && "font-medium text-primary",
                        state === "done" && "text-muted-foreground line-through/0",
                        state === "pending" && "text-muted-foreground",
                      )}
                    >
                      {s.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                      {fmt(s.time)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
