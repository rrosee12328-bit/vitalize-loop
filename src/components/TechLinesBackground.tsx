export function TechLinesBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Soft radial wash so lines fade at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 0%, hsl(var(--background)) 75%)",
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="techLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="techLineGradSoft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Static faint horizontal grid lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`grid-${i}`}
            x1="0"
            x2="1200"
            y1={100 + i * 90}
            y2={100 + i * 90}
            stroke="hsl(var(--primary))"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        ))}

        {/* Animated flowing lines */}
        <g className="tech-line tech-line-1">
          <line x1="-400" x2="0" y1="180" y2="180" stroke="url(#techLineGrad)" strokeWidth="1.25" />
        </g>
        <g className="tech-line tech-line-2">
          <line x1="-400" x2="0" y1="360" y2="360" stroke="url(#techLineGradSoft)" strokeWidth="1" />
        </g>
        <g className="tech-line tech-line-3">
          <line x1="-400" x2="0" y1="540" y2="540" stroke="url(#techLineGrad)" strokeWidth="1.25" />
        </g>
        <g className="tech-line tech-line-4">
          <line x1="-400" x2="0" y1="270" y2="270" stroke="url(#techLineGradSoft)" strokeWidth="1" />
        </g>
        <g className="tech-line tech-line-5">
          <line x1="-400" x2="0" y1="650" y2="650" stroke="url(#techLineGrad)" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}
