// Matrix-style falling blue line rain
const COLUMNS = Array.from({ length: 28 }).map((_, i) => {
  // pseudo-random but stable per index
  const r = (n: number) => ((Math.sin(i * 9.13 + n) + 1) / 2);
  return {
    left: `${(i / 28) * 100 + r(1) * 2}%`,
    height: 18 + r(2) * 32, // vh
    duration: 4 + r(3) * 6, // s
    delay: -r(4) * 10, // s
    opacity: 0.25 + r(5) * 0.55,
    width: r(6) > 0.85 ? 2 : 1, // px
  };
});

export function TechLinesBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {COLUMNS.map((c, i) => (
        <div
          key={i}
          className="matrix-line absolute top-0"
          style={{
            left: c.left,
            width: `${c.width}px`,
            height: `${c.height}vh`,
            background:
              "linear-gradient(180deg, transparent 0%, var(--primary) 60%, #ffffff 100%)",
            opacity: c.opacity,
            filter: "blur(0.3px)",
            animation: `matrix-fall ${c.duration}s linear infinite`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
