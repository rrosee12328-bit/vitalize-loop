import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, Phone } from "lucide-react";
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
      { time: 35, label: "Collects caller name and address" },
      { time: 70, label: "Dispatches technician, gives ETA" },
      { time: 105, label: "Confirms via email, captures lead" },
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
      { time: 40, label: "Qualifies buyer (pre-approved?)" },
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

  // Waveform bars (static visualization, animated by progress)
  const bars = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => {
        // pseudo-random but stable per index
        const seed = Math.sin(i * 12.9898) * 43758.5453;
        const r = seed - Math.floor(seed);
        return 24 + Math.round(r * 60); // 24% - 84%
      }),
    [],
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] text-white shadow-2xl shadow-black/40 overflow-hidden">
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-emerald-400">
              {playing ? "ON CALL" : "READY"}
            </span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/60">
            LIVE CALL DEMO
          </p>
        </div>

        {/* Industry pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {DEMOS.map((d) => {
            const isActive = d.id === activeId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveId(d.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                <Phone className="h-3 w-3" />
                {d.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Title */}
        <h3 className="mt-5 text-base font-semibold tracking-tight text-white md:text-lg">
          {demo.title}
        </h3>

        {/* Player + waveform */}
        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
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
              className="relative flex h-10 w-full cursor-pointer items-center gap-[3px] overflow-hidden"
            >
              {bars.map((h, i) => {
                const barPct = ((i + 0.5) / bars.length) * 100;
                const isPast = barPct <= pct;
                return (
                  <span
                    key={i}
                    className={cn(
                      "flex-1 rounded-sm transition-colors",
                      isPast ? "bg-primary" : "bg-white/15",
                    )}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>
            <div className="mt-1.5 flex items-center justify-between font-mono text-[11px] text-white/50">
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
            if (
              isFinite(e.currentTarget.duration) &&
              e.currentTarget.duration > 0
            ) {
              setDuration(e.currentTarget.duration);
            }
          }}
          onEnded={() => setPlaying(false)}
        />

        {/* Timeline */}
        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/50">
            CALL PROGRESS
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {demo.stages.map((s, i) => {
              const isActive = i === activeStageIdx;
              const isDone = i < activeStageIdx;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => seekTo(s.time)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : isDone
                        ? "bg-primary/20 text-primary"
                        : "bg-[#374151] text-white/70 hover:bg-[#475569]",
                  )}
                >
                  <span className="font-mono text-[10px] tabular-nums opacity-80">
                    {fmt(s.time)}
                  </span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
