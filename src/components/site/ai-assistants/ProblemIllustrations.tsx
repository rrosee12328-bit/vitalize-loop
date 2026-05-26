import type { ReactNode } from "react";

export function IllustrationFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative h-40 w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 15%, rgba(0, 136, 255,0.08), transparent 55%), radial-gradient(circle at 85% 85%, rgba(15,23,42,0.05), transparent 55%), linear-gradient(160deg,#FAFAF7 0%,#F2EEE6 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        }}
      />
      <div className="relative flex h-full w-full items-center justify-center p-5">
        {children}
      </div>
    </div>
  );
}

export function MissedCallIllustration() {
  return (
    <IllustrationFrame>
      <div
        className="w-full max-w-[240px] rounded-2xl bg-white/90 p-3 shadow-[0_12px_30px_-12px_rgba(15,23,42,0.25)] ring-1 ring-black/5 backdrop-blur"
        style={{ transform: "rotate(-2deg)" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.34-2.67" />
              <line x1="22" y1="2" x2="2" y2="22" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-[#0F172A]">Phone</p>
            <p className="truncate text-[10px] text-[#64748B]">Missed call · (555) 218-9034</p>
          </div>
          <span className="font-mono text-[9px] text-[#94A3B8]">2m ago</span>
        </div>
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 18 }).map((_, i) => {
            const h = [3, 7, 10, 6, 4, 8, 11, 9, 5, 7, 4, 3, 2, 2, 1, 1, 1, 1][i] ?? 2;
            return (
              <span
                key={i}
                className="rounded-sm bg-[#0F172A]/15"
                style={{ width: 3, height: h }}
              />
            );
          })}
        </div>
      </div>
    </IllustrationFrame>
  );
}

export function SlowReplyIllustration() {
  const rows = [
    { name: "Sarah K.", subj: "Re: Quote request", chip: "14h", stale: true },
    { name: "Mike R.", subj: "Project timeline?", chip: "8h", stale: true },
    { name: "Lia D.", subj: "Pricing follow-up", chip: "3h", stale: false },
  ];
  return (
    <IllustrationFrame>
      <div
        className="w-full max-w-[260px] overflow-hidden rounded-xl bg-white/95 shadow-[0_12px_30px_-12px_rgba(15,23,42,0.22)] ring-1 ring-black/5"
        style={{ transform: "rotate(1.5deg)" }}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-3 py-2">
          <p className="text-[10px] font-semibold text-[#0F172A]">Inbox</p>
          <span className="rounded-full bg-[#0088FF] px-1.5 py-0.5 text-[9px] font-bold text-white">
            12
          </span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.name}
            className={`flex items-center gap-2 px-3 py-2 ${i !== rows.length - 1 ? "border-b border-black/5" : ""}`}
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${r.stale ? "bg-rose-500" : "bg-[#0088FF]"}`}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold text-[#0F172A]">{r.name}</p>
              <p className="truncate text-[9px] text-[#64748B]">{r.subj}</p>
            </div>
            <span
              className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-mono text-[8px] ${r.stale ? "bg-rose-50 text-rose-600" : "bg-[#0F172A]/5 text-[#64748B]"}`}
            >
              <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {r.chip}
            </span>
          </div>
        ))}
      </div>
    </IllustrationFrame>
  );
}

export function AfterHoursIllustration() {
  const R = 46;
  const C = 2 * Math.PI * R;
  const businessLen = (8 / 24) * C;
  const afterLen = C - businessLen;
  return (
    <IllustrationFrame>
      <div className="flex items-center gap-4">
        <svg viewBox="-60 -60 120 120" className="h-28 w-28">
          <circle r={R} fill="none" stroke="#E5E1D8" strokeWidth="10" />
          <circle
            r={R}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="10"
            strokeDasharray={`${businessLen} ${C}`}
            strokeLinecap="round"
            transform="rotate(-90)"
          />
          <circle
            r={R}
            fill="none"
            stroke="#0088FF"
            strokeWidth="10"
            strokeDasharray={`${afterLen} ${C}`}
            strokeDashoffset={-businessLen}
            strokeLinecap="round"
            transform="rotate(-90)"
          />
          <text x="0" y="-2" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
            16h
          </text>
          <text
            x="0"
            y="10"
            textAnchor="middle"
            fontSize="6"
            fill="#64748B"
            style={{ fontFamily: "ui-monospace, monospace", letterSpacing: "0.12em" }}
          >
            UNCOVERED
          </text>
        </svg>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 rounded-md bg-white/90 px-2 py-1 shadow-sm ring-1 ring-black/5">
            <span className="h-2 w-2 rounded-sm bg-[#CBD5E1]" />
            <span className="font-mono text-[9px] text-[#64748B]">9–5 OPEN</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-white/90 px-2 py-1 shadow-sm ring-1 ring-black/5">
            <span className="h-2 w-2 rounded-sm bg-[#0088FF]" />
            <span className="font-mono text-[9px] text-[#0F172A]">AFTER HOURS</span>
          </div>
        </div>
      </div>
    </IllustrationFrame>
  );
}

export const problemIllustrations = [
  { Illustration: MissedCallIllustration, title: "The Missed Call" },
  { Illustration: SlowReplyIllustration, title: "The Slow Reply" },
  { Illustration: AfterHoursIllustration, title: "The After-Hours Gap" },
];
