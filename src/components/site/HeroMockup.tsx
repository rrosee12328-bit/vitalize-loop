export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Soft glow */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-3xl"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-border bg-[#FAFAFA] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
          </div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            VEKTISS · OPERATING SYSTEM
          </div>
          <div className="h-2.5 w-12 rounded-full bg-primary/15" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-12 gap-px bg-border">
          {/* Sidebar */}
          <div className="col-span-3 hidden flex-col gap-2 bg-white p-4 md:flex">
            {["Pipeline", "Projects", "Assistants", "Reports", "Team"].map((label, i) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
                  i === 1 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "bg-primary" : "bg-border"}`} />
                {label}
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div className="col-span-12 bg-white p-5 md:col-span-9">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "Active projects", v: "24", t: "+3" },
                { k: "Throughput", v: "2.4×", t: "+18%" },
                { k: "Time-to-system", v: "11d", t: "−4d" },
              ].map((m) => (
                <div key={m.k} className="rounded-lg border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {m.k}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-lg font-semibold tracking-tight text-foreground">
                      {m.v}
                    </span>
                    <span className="text-[10px] font-medium text-primary">{m.t}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mt-4 rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-foreground">Pipeline velocity</div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] text-muted-foreground">Connected systems</span>
                </div>
              </div>
              <svg viewBox="0 0 400 110" className="mt-3 h-24 w-full">
                <defs>
                  <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.25 264)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="oklch(0.52 0.25 264)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 40, 60, 80].map((y) => (
                  <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="oklch(0.92 0.004 280)" strokeWidth="1" />
                ))}
                <path
                  d="M0,80 C40,70 60,75 100,55 C140,40 170,60 210,45 C260,28 300,40 340,22 C370,12 390,18 400,15 L400,110 L0,110 Z"
                  fill="url(#g)"
                />
                <path
                  d="M0,80 C40,70 60,75 100,55 C140,40 170,60 210,45 C260,28 300,40 340,22 C370,12 390,18 400,15"
                  fill="none"
                  stroke="oklch(0.52 0.25 264)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Activity rows */}
            <div className="mt-4 space-y-2">
              {[
                { t: "AI assistant followed up 14 leads", s: "Active" },
                { t: "Onboarding system deployed · Acme Co.", s: "Done" },
              ].map((r) => (
                <div
                  key={r.t}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs text-foreground">{r.t}</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    {r.s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
