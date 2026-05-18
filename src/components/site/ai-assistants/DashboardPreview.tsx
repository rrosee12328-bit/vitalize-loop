import { Sparkles, TrendingUp, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";

const stats: { value: string; label: string; delta?: string }[] = [
  { value: "147", label: "Calls This Month", delta: "+12%" },
  { value: "89", label: "Leads Captured", delta: "+18%" },
  { value: "2m 34s", label: "Avg. Call Length" },
  { value: "98%", label: "Answer Rate" },
];

const reasons: { label: string; pct: number }[] = [
  { label: "Pricing / Quote Request", pct: 34 },
  { label: "Appointment Booking", pct: 28 },
  { label: "Emergency / Urgent", pct: 16 },
  { label: "General Questions", pct: 14 },
  { label: "Existing Client Follow-Up", pct: 8 },
];

type AlertTag = { label: string; tone: "red" | "yellow" | "green" };
const alerts: {
  time: string;
  caller: string;
  summary: string;
  tags: AlertTag[];
}[] = [
  {
    time: "Today 3:14 PM",
    caller: "(214) 555-0182",
    summary: "Pricing inquiry — 3BR renovation. Intake form sent.",
    tags: [
      { label: "Hot Lead", tone: "red" },
      { label: "Form Sent", tone: "yellow" },
    ],
  },
  {
    time: "Today 11:42 AM",
    caller: "(817) 555-0394",
    summary: "New patient inquiry. Intake form sent.",
    tags: [{ label: "Form Sent", tone: "yellow" }],
  },
  {
    time: "Yesterday 5:08 PM",
    caller: "(972) 555-0271",
    summary: "After-hours emergency. Routed to on-call.",
    tags: [{ label: "Routed", tone: "green" }],
  },
];

const tagStyles: Record<AlertTag["tone"], string> = {
  red: "bg-[#EF4444]/15 text-[#B91C1C] border-[#EF4444]/30",
  yellow: "bg-[#F59E0B]/15 text-[#B45309] border-[#F59E0B]/30",
  green: "bg-[#10B981]/15 text-[#047857] border-[#10B981]/30",
};

export function DashboardPreview() {
  return (
    <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-2xl shadow-black/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-surface-elevated px-5 py-4 md:px-6">
        <div>
          <div className="text-sm font-semibold tracking-tight">Vektiss AI Dashboard</div>
          <div className="mt-0.5 text-xs text-muted-foreground">Live Activity — May 2026</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] tracking-widest text-emerald-700">LIVE</span>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-background p-4"
            >
              <div className="flex items-baseline gap-1.5">
                <div className="text-2xl font-semibold tracking-tight text-primary md:text-[26px]">
                  {s.value}
                </div>
                {s.delta && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    {s.delta}
                  </span>
                )}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Top call reasons */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-tight">
              Top Call Reasons This Month
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              May 2026
            </span>
          </div>
          <ul className="mt-3 space-y-2.5">
            {reasons.map((r) => (
              <li key={r.label} className="text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-foreground/85 truncate">{r.label}</span>
                  <span className="font-mono tabular-nums text-foreground">
                    {r.pct}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(r.pct / 34) * 100}%`,
                      backgroundColor: "#2563EB",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow-up alerts */}
        <div className="rounded-lg border border-border bg-background">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <BellRing className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium tracking-tight">Follow-Up Alerts</span>
            </div>
            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-orange-700">
              ACTION NEEDED
            </span>
          </div>
          <ul className="divide-y divide-border">
            {alerts.map((a, i) => (
              <li key={i} className="px-4 py-2.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-muted-foreground truncate">
                    {a.time} · <span className="font-mono tabular-nums">{a.caller}</span>
                  </span>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {a.tags.map((t) => (
                      <span
                        key={t.label}
                        className={cn(
                          "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                          tagStyles[t.tone],
                        )}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-1 text-foreground/85 leading-snug">{a.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border bg-surface-elevated px-5 py-3 md:px-6">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          Last updated: just now
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          Available to every Vektiss client
        </span>
      </div>
    </div>
  );
}
