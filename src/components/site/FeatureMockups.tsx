import { Globe, Phone, Play, Sparkles, Users, Video } from "lucide-react";
import mediaFounder from "@/assets/media-founder.jpg";
import mediaCaseStudy from "@/assets/media-casestudy.jpg";
import mediaAvatar from "@/assets/media-avatar.jpg";
import mediaReel from "@/assets/media-reel.jpg";
import portalThumbDashboard from "@/assets/portal-thumb-dashboard.jpg";
import portalThumbWorkspace from "@/assets/portal-thumb-workspace.jpg";
import portalThumbLanding from "@/assets/portal-thumb-landing.jpg";

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-border bg-[#FAFAFA] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
          </div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {title}
          </div>
          <div className="h-2.5 w-12 rounded-full bg-primary/15" />
        </div>
        {children}
      </div>
    </div>
  );
}

export function ProjectMockup() {
  const tasks = [
    { t: "Onboarding system v2", o: "Acme Co.", s: "On track", tone: "primary" as const, p: 72 },
    { t: "RevOps pipeline rebuild", o: "Northwind", s: "At risk", tone: "warn" as const, p: 41 },
    { t: "AI assistant rollout", o: "Helix Labs", s: "Done", tone: "muted" as const, p: 100 },
  ];
  return (
    <Frame title="VEKTISS · PROJECTS">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              This week
            </div>
            <div className="mt-1 text-sm font-semibold tracking-tight text-foreground">
              7 active initiatives · 3 owners
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
            <Sparkles className="h-3 w-3" /> AI summary ready
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-[#FAFAFA] p-3 text-xs text-foreground">
          <span className="font-medium text-primary">AI:</span> Two projects shipped milestones
          this week. Northwind needs scope alignment before Friday — flagged.
        </div>

        <div className="mt-4 space-y-2">
          {tasks.map((row) => (
            <div
              key={row.t}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2.5"
            >
              <div className="min-w-0">
                <div className="truncate text-xs font-medium text-foreground">{row.t}</div>
                <div className="text-[10px] text-muted-foreground">{row.o}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-border sm:block">
                  <div
                    className={
                      row.tone === "primary"
                        ? "h-full bg-primary"
                        : row.tone === "warn"
                          ? "h-full bg-amber-500"
                          : "h-full bg-foreground/40"
                    }
                    style={{ width: `${row.p}%` }}
                  />
                </div>
                <span
                  className={
                    "rounded-full px-2 py-0.5 text-[10px] font-medium " +
                    (row.tone === "primary"
                      ? "bg-primary/10 text-primary"
                      : row.tone === "warn"
                        ? "bg-amber-500/10 text-amber-700"
                        : "bg-muted text-muted-foreground")
                  }
                >
                  {row.s}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function AssistantMockup() {
  return (
    <Frame title="VEKTISS · INBOX">
      <div className="grid grid-cols-12 gap-px bg-border">
        <div className="col-span-5 hidden flex-col gap-2 bg-white p-4 sm:flex">
          {[
            { n: "Lead · Sarah Chen", t: "Pricing question", b: "primary" as const },
            { n: "Voicemail · 415-…", t: "Wants a callback", b: "muted" as const },
            { n: "Lead · Mateo R.", t: "Demo request", b: "muted" as const },
          ].map((r, i) => (
            <div
              key={r.n}
              className={`rounded-md border px-3 py-2 ${
                i === 0 ? "border-primary/30 bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-foreground">{r.n}</span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    r.b === "primary" ? "bg-primary" : "bg-border"
                  }`}
                />
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">{r.t}</div>
            </div>
          ))}
        </div>

        <div className="col-span-12 bg-white p-4 sm:col-span-7">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Phone className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-xs font-medium text-foreground">Sarah Chen · inbound</div>
              <div className="text-[10px] text-muted-foreground">Qualified by AI · 00:42</div>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-muted px-3 py-2 text-[11px] text-foreground">
              Hi — checking pricing for a 40-person team.
            </div>
            <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-primary px-3 py-2 text-[11px] text-primary-foreground">
              Happy to help. A few quick questions to point you to the right plan…
            </div>
            <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-muted px-3 py-2 text-[11px] text-foreground">
              We need SSO and onboarding support.
            </div>
          </div>

          <div className="mt-3 rounded-md border border-border bg-[#FAFAFA] p-2.5 text-[10px] text-foreground">
            <span className="font-medium text-primary">AI summary →</span> Qualified · 40 seats ·
            SSO required · Routed to Maya (AE).
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function MediaMockup() {
  const clips = [
    { t: "Founder POV · Q2 thesis", d: "00:48", live: true, img: mediaFounder },
    { t: "Case study · Acme Co.", d: "01:12", img: mediaCaseStudy },
    { t: "AI avatar · onboarding", d: "00:30", img: mediaAvatar },
    { t: "Reel · 3 hidden costs", d: "00:42", img: mediaReel },
  ];
  return (
    <Frame title="VEKTISS · MEDIA">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Library
            </div>
            <div className="mt-1 text-sm font-semibold tracking-tight text-foreground">
              24 assets · 6 in production
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
            <Video className="h-3 w-3" /> Pipeline live
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {clips.map((c) => (
            <div
              key={c.t}
              className="overflow-hidden rounded-lg border border-border bg-white"
            >
              <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-[#F4F4F5] to-white">
                <img
                  src={c.img}
                  alt={c.t}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-foreground shadow-card backdrop-blur">
                  <Play className="h-4 w-4" fill="currentColor" />
                </span>
                <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-white">
                  {c.d}
                </span>
                {c.live && (
                  <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded bg-primary px-1.5 py-0.5 text-[9px] font-medium text-primary-foreground">
                    <span className="h-1 w-1 rounded-full bg-white" /> LIVE
                  </span>
                )}
              </div>
              <div className="px-2.5 py-2 text-[11px] font-medium text-foreground">
                {c.t}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function PortalMockup() {
  const stats = [
    { k: "Visitors", v: "12.4k", t: "+22%" },
    { k: "Leads", v: "284", t: "+38%" },
    { k: "Conv.", v: "4.6%", t: "+0.9" },
  ];
  const clients = [
    { n: "Acme Co.", s: "Onboarding", tone: "primary" as const },
    { n: "Northwind", s: "Active", tone: "muted" as const },
    { n: "Helix Labs", s: "Renewal", tone: "warn" as const },
  ];
  return (
    <Frame title="VEKTISS · CLIENT PORTAL">
      <div className="grid grid-cols-12 gap-px bg-border">
        {/* Left: site preview */}
        <div className="col-span-12 bg-white p-4 sm:col-span-5">
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="flex items-center gap-1.5 border-b border-border bg-[#FAFAFA] px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5E5E5]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5E5E5]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5E5E5]" />
              <span className="ml-2 inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[9px] text-muted-foreground">
                <Globe className="h-2.5 w-2.5" /> yourbrand.com
              </span>
            </div>
            <div className="space-y-2 bg-white p-3">
              <div className="h-2 w-2/3 rounded bg-foreground/80" />
              <div className="h-1.5 w-1/2 rounded bg-border" />
              <div className="h-1.5 w-5/6 rounded bg-border" />
              <div className="mt-2 inline-flex h-5 items-center rounded bg-primary px-2 text-[9px] font-medium text-primary-foreground">
                Get started
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <div className="relative aspect-square overflow-hidden rounded border border-border">
                  <img
                    src={portalThumbLanding}
                    alt="Landing page thumbnail"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded border border-border">
                  <img
                    src={portalThumbDashboard}
                    alt="Dashboard thumbnail"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded border border-border">
                  <img
                    src={portalThumbWorkspace}
                    alt="Workspace thumbnail"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div key={s.k} className="rounded-md border border-border p-2">
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  {s.k}
                </div>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-foreground">{s.v}</span>
                  <span className="text-[9px] font-medium text-primary">{s.t}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: client portal app */}
        <div className="col-span-12 bg-white p-4 sm:col-span-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Users className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="text-xs font-medium text-foreground">Client portal</div>
                <div className="text-[10px] text-muted-foreground">3 active accounts</div>
              </div>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              Live
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {clients.map((c) => (
              <div
                key={c.n}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F4F5] text-[10px] font-medium text-foreground">
                    {c.n.slice(0, 1)}
                  </span>
                  <div>
                    <div className="text-xs font-medium text-foreground">{c.n}</div>
                    <div className="text-[10px] text-muted-foreground">Project workspace</div>
                  </div>
                </div>
                <span
                  className={
                    "rounded-full px-2 py-0.5 text-[10px] font-medium " +
                    (c.tone === "primary"
                      ? "bg-primary/10 text-primary"
                      : c.tone === "warn"
                        ? "bg-amber-500/10 text-amber-700"
                        : "bg-muted text-muted-foreground")
                  }
                >
                  {c.s}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-md border border-border bg-[#FAFAFA] p-2.5 text-[10px] text-foreground">
            <span className="font-medium text-primary">New →</span> Sarah from Acme uploaded
            brand assets · 2 min ago
          </div>
        </div>
      </div>
    </Frame>
  );
}
