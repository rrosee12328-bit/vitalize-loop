import { Mail, PhoneCall, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Outcome = "Lead Captured" | "Appointment Set" | "Info Provided" | "Voicemail Left";

const calls: { time: string; caller: string; duration: string; outcome: Outcome }[] = [
  { time: "Today 2:41 PM", caller: "(214) 555-0182", duration: "2m 14s", outcome: "Lead Captured" },
  { time: "Today 11:08 AM", caller: "(817) 555-0394", duration: "1m 47s", outcome: "Appointment Set" },
  { time: "Yesterday 4:55 PM", caller: "(972) 555-0271", duration: "3m 02s", outcome: "Info Provided" },
  { time: "Yesterday 9:22 AM", caller: "(469) 555-0118", duration: "0m 58s", outcome: "Voicemail Left" },
  { time: "Mon 3:10 PM", caller: "(214) 555-0445", duration: "2m 31s", outcome: "Lead Captured" },
];

const stats = [
  { value: "47", label: "Calls This Month" },
  { value: "38", label: "Leads Captured" },
  { value: "94%", label: "Answer Rate" },
];

const outcomeBadge: Record<Outcome, string> = {
  "Lead Captured": "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  "Appointment Set": "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  "Info Provided": "bg-primary/10 text-primary border-primary/30",
  "Voicemail Left": "bg-muted text-muted-foreground border-border",
};

export function DashboardPreview() {
  const emailsHandled = 31;
  const emailsTotal = 50;
  const emailPct = Math.round((emailsHandled / emailsTotal) * 100);

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
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-background p-4"
            >
              <div className="text-2xl font-semibold tracking-tight text-primary md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground md:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Recent calls */}
        <div className="rounded-lg border border-border bg-background">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <PhoneCall className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium tracking-tight">Recent Calls</span>
          </div>
          <div className="hidden grid-cols-12 gap-2 px-4 pt-2.5 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:grid">
            <div className="col-span-3">Time</div>
            <div className="col-span-3">Caller</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-4">Outcome</div>
          </div>
          <ul className="divide-y divide-border">
            {calls.map((c, i) => (
              <li
                key={i}
                className="grid grid-cols-2 gap-2 px-4 py-2.5 text-xs sm:grid-cols-12 sm:items-center"
              >
                <div className="sm:col-span-3 text-muted-foreground">{c.time}</div>
                <div className="sm:col-span-3 font-mono tabular-nums">{c.caller}</div>
                <div className="sm:col-span-2 text-muted-foreground tabular-nums">
                  {c.duration}
                </div>
                <div className="sm:col-span-4 justify-self-end sm:justify-self-start">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                      outcomeBadge[c.outcome],
                    )}
                  >
                    {c.outcome}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Email activity */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium tracking-tight">
                Email Replies This Month
              </span>
            </div>
            <span className="font-mono text-xs tabular-nums text-foreground">
              {emailsHandled} / {emailsTotal}
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${emailPct}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            {emailPct}% of monthly volume used
          </div>
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
