// Futuristic animated grid — subtle blue grid with scanning beam
export function TechLinesBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Static grid */}
      <div
        className="absolute inset-0 tech-grid"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklch, var(--primary) 22%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklch, var(--primary) 22%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 35%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 35%, transparent 85%)",
        }}
      />

      {/* Horizontal scan beam */}
      <div
        className="absolute inset-x-0 h-px tech-scan-h"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)",
          boxShadow: "0 0 12px color-mix(in oklch, var(--primary) 60%, transparent)",
        }}
      />

      {/* Vertical scan beam */}
      <div
        className="absolute inset-y-0 w-px tech-scan-v"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--primary) 50%, transparent 100%)",
          boxShadow: "0 0 12px color-mix(in oklch, var(--primary) 60%, transparent)",
        }}
      />

      {/* Soft center glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 35% at 50% 45%, color-mix(in oklch, var(--primary) 8%, transparent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
