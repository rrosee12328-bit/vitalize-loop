const LINES = [
  { top: "12%", duration: "14s", delay: "0s", opacity: 0.55 },
  { top: "26%", duration: "22s", delay: "-6s", opacity: 0.35 },
  { top: "41%", duration: "18s", delay: "-3s", opacity: 0.5 },
  { top: "58%", duration: "26s", delay: "-12s", opacity: 0.3 },
  { top: "72%", duration: "16s", delay: "-9s", opacity: 0.5 },
  { top: "86%", duration: "20s", delay: "-2s", opacity: 0.35 },
];

export function TechLinesBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {LINES.map((l, i) => (
        <div
          key={i}
          className="tech-line absolute h-px"
          style={{
            top: l.top,
            left: 0,
            right: 0,
            background:
              "linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)",
            opacity: l.opacity,
            animation: `tech-line-sweep ${l.duration} linear infinite`,
            animationDelay: l.delay,
          }}
        />
      ))}
    </div>
  );
}
