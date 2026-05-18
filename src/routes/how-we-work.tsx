import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  X,
  LayoutDashboard,
  Activity,
  Rocket,
  Handshake,
  BarChart3,
  AudioLines,
  Smartphone,
  PlayCircle,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PortalMockup } from "@/components/site/FeatureMockups";
import mediaFounder from "@/assets/media-founder.jpg";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "How we work — Vektiss" },
      {
        name: "description",
        content:
          "Vektiss isn't an agency or a SaaS — we're a systems company. Discover, Develop, Deploy: a running operating system in weeks, not quarters.",
      },
      { property: "og:title", content: "How we work — Vektiss" },
      {
        property: "og:description",
        content:
          "From chaos to a running system in weeks. Discover, Develop, Deploy.",
      },
    ],
  }),
  component: HowWeWorkPage,
});

const usuallyGet = [
  { label: "A new SaaS subscription" },
  { label: "A 90-page playbook nobody opens" },
  { label: "A 6-month implementation" },
  { label: "A bill, then radio silence" },
];

const vektissGet = [
  { icon: LayoutDashboard, label: "A connected, running operating system" },
  { icon: Activity, label: "Dashboards your CEO actually uses daily" },
  { icon: Rocket, label: "A 4–5 week build, not a quarter-long project" },
  { icon: Handshake, label: "An operating partner, not a vendor" },
];

const phases = [
  {
    no: "01",
    name: "Discover",
    duration: "Week 1",
    desc: "We map your current operations, the tools you're using, and where work actually breaks down. You walk away with clarity even if we never work together.",
    Visual: DiscoverVisual,
  },
  {
    no: "02",
    name: "Develop",
    duration: "Week 2",
    desc: "We design the integrated system — the dashboards, automations, AI assistants, and pipelines that fit how your business actually runs.",
    Visual: DevelopVisual,
  },
  {
    no: "03",
    name: "Deploy",
    duration: "Weeks 3–5",
    desc: "We ship the working system, embedded in the tools your team already uses. No rip-and-replace. No 6-month implementation. We stay on as your operating partner to ensure it runs flawlessly.",
    Visual: DeployVisual,
  },
];

const pillars = [
  {
    name: "Vektiss Intelligence",
    desc: "Live visibility into every initiative — status, blockers, owner, throughput. The visibility layer your leadership team has been asking for.",
    Visual: IntelligenceVisual,
    icon: BarChart3,
    link: "/solutions/project-intelligence",
  },
  {
    name: "Vektiss Voice",
    desc: "Always-on assistants that answer calls, qualify leads, draft replies, and route the moments that need a human — so communication stops being the bottleneck.",
    Visual: VoiceVisual,
    icon: AudioLines,
    link: "/solutions/ai-assistants",
  },
  {
    name: "Vektiss Sites",
    desc: "Marketing site, branded client portal, and internal apps built as one connected experience. Lead capture, onboarding, and delivery on a single stack.",
    Visual: SitesVisual,
    icon: Smartphone,
    link: "/solutions/websites-portals-apps",
  },
  {
    name: "Vektiss Media",
    desc: "Founder-led video, short-form cuts, and AI avatar assets — produced inside a system so your expertise stays visible at scale.",
    Visual: MediaVisual,
    icon: PlayCircle,
    link: "/solutions/business-media",
  },
];

function HowWeWorkPage() {
  return (
    <SiteLayout>
      {/* HERO + COMPARISON */}
      <section className="container-editorial pt-20 pb-16 md:pt-32 md:pb-20">
        <p className="eyebrow">How we work</p>
        <h1 className="mt-6 display-1 max-w-4xl">
          We build <span className="accent-underline">systems.</span> Not deliverables.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Most agencies hand you assets. Most consultants hand you slides. We hand you a running
          operating system — built into the tools your team already uses.
        </p>

        {/* Side-by-side visual comparison */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Usually get — muted */}
          <div className="relative rounded-2xl border border-border bg-surface-elevated p-8 md:p-10">
            <div className="absolute inset-0 rounded-2xl bg-[repeating-linear-gradient(45deg,transparent_0_12px,rgba(0,0,0,0.015)_12px_13px)] pointer-events-none" />
            <p className="eyebrow text-muted-foreground">What you usually get</p>
            <ul className="mt-8 space-y-5">
              {usuallyGet.map(({ label }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange-200 bg-orange-50">
                    <X className="h-4 w-4 text-orange-500" strokeWidth={2.5} />
                  </div>
                  <span className="pt-2 text-muted-foreground line-through decoration-muted-foreground/30">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vektiss — highlighted */}
          <div
            className="relative rounded-2xl border border-primary/30 bg-card p-8 md:p-10"
            style={{
              boxShadow:
                "0 30px 60px -25px color-mix(in oklab, var(--color-primary) 35%, transparent), 0 0 0 1px color-mix(in oklab, var(--color-primary) 10%, transparent)",
            }}
          >
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex items-center justify-between">
              <p className="eyebrow text-primary">What you get from Vektiss</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] tracking-widest text-primary">
                LIVE SYSTEM
              </span>
            </div>
            <ul className="mt-8 space-y-5">
              {vektissGet.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                    style={{
                      boxShadow:
                        "0 8px 20px -8px color-mix(in oklab, var(--color-primary) 60%, transparent)",
                    }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <span className="pt-2 font-medium text-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS — Discover / Develop / Deploy */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow">The process</p>
            <h2 className="mt-6 display-2">From chaos to running system in weeks.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Three phases. One continuous arc. No handoffs, no waiting rooms.
            </p>
          </div>

          {/* Vertical timeline */}
          <div className="relative mt-20">
            {/* Spine */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2" aria-hidden />
            <div className="space-y-20 md:space-y-32">
              {phases.map((p, i) => {
                const isLeft = i % 2 === 0;
                const Visual = p.Visual;
                return (
                  <div
                    key={p.no}
                    className="relative grid gap-8 md:grid-cols-2 md:gap-16"
                  >
                    {/* Node */}
                    <div
                      className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-mono text-[11px] font-semibold text-primary-foreground"
                      style={{
                        boxShadow:
                          "0 0 0 6px var(--color-surface-elevated), 0 10px 24px -8px color-mix(in oklab, var(--color-primary) 50%, transparent)",
                      }}
                    >
                      {p.no}
                    </div>

                    {/* Text */}
                    <div
                      className={`pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}
                    >
                      <span className="font-mono text-xs tracking-widest text-primary">
                        {p.duration.toUpperCase()}
                      </span>
                      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                        {p.name}
                      </h3>
                      <p className="mt-4 text-muted-foreground">{p.desc}</p>
                    </div>

                    {/* Visual */}
                    <div
                      className={`pl-12 md:pl-0 ${isLeft ? "md:col-start-2 md:pl-12" : "md:col-start-1 md:row-start-1 md:pr-12"}`}
                    >
                      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                        <Visual />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-t border-border bg-[#F8FAFC]">
        <div className="container-editorial py-20 md:py-24">
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-0">
            <div className="text-center md:flex-1">
              <div className="text-5xl font-bold tracking-tight text-[#0F172A] md:text-[48px]">4–5 Weeks</div>
              <div className="mt-2 text-sm text-gray-500">Average build time</div>
            </div>
            <div className="hidden h-16 w-px bg-gray-300 md:block" />
            <div className="text-center md:flex-1">
              <div className="text-5xl font-bold tracking-tight text-[#0F172A] md:text-[48px]">Week 1</div>
              <div className="mt-2 text-sm text-gray-500">When clients see first results</div>
            </div>
            <div className="hidden h-16 w-px bg-gray-300 md:block" />
            <div className="text-center md:flex-1">
              <div className="text-5xl font-bold tracking-tight text-[#0F172A] md:text-[48px]">Zero</div>
              <div className="mt-2 text-sm text-gray-500">Rip-and-replace required</div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS — Bento Grid */}
      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow">The system</p>
          <h2 className="mt-6 display-2">One system. Four working parts.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We don't sell pillars individually. They're the load-bearing components of a single
            integrated infrastructure — designed to work together from day one.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {pillars.map((p, i) => {
            const Visual = p.Visual;
            const Icon = p.icon;
            return (
              <article
                key={p.name}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 md:p-10"
                style={{
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-primary/[0.04] group-hover:to-primary/[0.02]" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-3 text-muted-foreground">{p.desc}</p>
                  <div className="mt-8 rounded-xl border border-border bg-surface-elevated p-5">
                    <Visual />
                  </div>
                  <div className="mt-6">
                    <Link
                      to={p.link}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-[#0F172A]">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Get started</p>
            <h2 className="mt-4 display-2 text-white">Ready to see the system you actually need?</h2>
            <p className="mt-6 text-lg text-white/70">
              Book a 30-minute intro call. We'll map your operations and show you exactly
              where the highest-leverage system lives.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href="https://calendly.com/vektiss-info/30-minute-vektiss-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-2 rounded-xl bg-[#2563EB] px-10 text-base font-medium text-white transition-all hover:scale-[1.02] hover:opacity-95"
                style={{
                  boxShadow:
                    "0 20px 40px -12px rgba(37, 99, 235, 0.5)",
                }}
              >
                Book a Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+13465947686"
                className="text-sm text-white/50 transition-colors hover:text-white/80"
              >
                Or call us directly: (346) 594-7686
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/* ---------- Phase visuals ---------- */

function DiscoverVisual() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-lg bg-surface-elevated">
      <svg viewBox="0 0 320 180" className="h-full w-full">
        {/* Messy node network on left */}
        <g opacity="0.4">
          {[
            [30, 40], [70, 30], [50, 80], [90, 70], [40, 120], [80, 110], [60, 150],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="var(--color-muted-foreground)" />
              {i < 6 && (
                <line
                  x1={x}
                  y1={y}
                  x2={[70, 50, 90, 40, 80, 60][i]}
                  y2={[30, 80, 70, 120, 110, 150][i]}
                  stroke="var(--color-muted-foreground)"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                />
              )}
            </g>
          ))}
          <line x1="30" y1="40" x2="80" y2="110" stroke="var(--color-muted-foreground)" strokeWidth="0.6" />
          <line x1="70" y1="30" x2="40" y2="120" stroke="var(--color-muted-foreground)" strokeWidth="0.6" />
        </g>

        {/* Magnifying glass */}
        <g transform="translate(110, 60)">
          <circle cx="30" cy="30" r="28" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" />
          <circle cx="30" cy="30" r="28" fill="var(--color-primary)" opacity="0.06" />
          <line x1="50" y1="50" x2="68" y2="68" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Clean organized lines on right */}
        <g transform="translate(200, 0)">
          {[40, 70, 100, 130].map((y, i) => (
            <g key={i}>
              <rect x="10" y={y - 6} width="6" height="6" rx="1" fill="var(--color-primary)" />
              <rect x="24" y={y - 5} width={60 + i * 8} height="4" rx="2" fill="var(--color-primary)" opacity={0.7 - i * 0.1} />
              <rect x="24" y={y + 2} width={30} height="3" rx="1.5" fill="var(--color-border)" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function DevelopVisual() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-lg bg-[#0A1628]">
      <svg viewBox="0 0 320 180" className="h-full w-full">
        {/* Blueprint grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,85,255,0.18)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="320" height="180" fill="url(#grid)" />

        {/* Architecture blocks */}
        <g>
          <rect x="40" y="30" width="80" height="40" rx="4" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="80" y="55" textAnchor="middle" fill="#93C5FD" fontSize="9" fontFamily="monospace">DASHBOARD</text>

          <rect x="200" y="30" width="80" height="40" rx="4" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="240" y="55" textAnchor="middle" fill="#93C5FD" fontSize="9" fontFamily="monospace">AI VOICE</text>

          <rect x="40" y="110" width="80" height="40" rx="4" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="80" y="135" textAnchor="middle" fill="#93C5FD" fontSize="9" fontFamily="monospace">PIPELINES</text>

          <rect x="200" y="110" width="80" height="40" rx="4" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="240" y="135" textAnchor="middle" fill="#93C5FD" fontSize="9" fontFamily="monospace">AUTOMATIONS</text>

          {/* Center hub */}
          <circle cx="160" cy="90" r="14" fill="#0055FF" />
          <circle cx="160" cy="90" r="20" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />

          {/* Connections */}
          <line x1="120" y1="50" x2="148" y2="82" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="50" x2="172" y2="82" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="130" x2="148" y2="98" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="130" x2="172" y2="98" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      </svg>
    </div>
  );
}

function DeployVisual() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-lg bg-surface-elevated">
      <svg viewBox="0 0 320 180" className="h-full w-full">
        {/* Dashboard frame */}
        <rect x="20" y="20" width="280" height="140" rx="8" fill="white" stroke="var(--color-border)" />
        <rect x="20" y="20" width="280" height="22" rx="8" fill="var(--color-surface-elevated)" />
        <circle cx="32" cy="31" r="3" fill="#EF4444" opacity="0.6" />
        <circle cx="42" cy="31" r="3" fill="#F59E0B" opacity="0.6" />
        <circle cx="52" cy="31" r="3" fill="#10B981" opacity="0.6" />

        {/* Chart bars */}
        <g transform="translate(40, 60)">
          {[40, 60, 35, 70, 55, 80, 65].map((h, i) => (
            <rect
              key={i}
              x={i * 16}
              y={90 - h}
              width="10"
              height={h}
              rx="1.5"
              fill="var(--color-primary)"
              opacity={0.3 + i * 0.1}
            />
          ))}
        </g>

        {/* Launch trail */}
        <g>
          <path
            d="M 180 150 Q 220 100 270 50"
            stroke="var(--color-primary)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 3"
          />
          {/* Rocket */}
          <g transform="translate(255, 35) rotate(45)">
            <path
              d="M 0 -10 L 6 6 L 0 3 L -6 6 Z"
              fill="var(--color-primary)"
            />
            <circle cx="0" cy="-2" r="2" fill="white" />
          </g>
          {/* Glow */}
          <circle cx="270" cy="50" r="14" fill="var(--color-primary)" opacity="0.15" />
          <circle cx="270" cy="50" r="22" fill="var(--color-primary)" opacity="0.06" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- Pillar visuals ---------- */

function IntelligenceVisual() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span>PROJECT THROUGHPUT</span>
        <span className="text-primary">+24%</span>
      </div>
      <div className="space-y-2">
        {[
          { name: "Acme migration", pct: 82, color: "bg-primary" },
          { name: "Q2 launch", pct: 64, color: "bg-primary/70" },
          { name: "Onboarding flow", pct: 41, color: "bg-primary/40" },
        ].map((row) => (
          <div key={row.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground">{row.name}</span>
              <span className="font-mono text-muted-foreground">{row.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceVisual() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground">INBOUND · 00:42</span>
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
          Hot Lead
        </span>
      </div>
      <div className="flex h-14 items-center gap-[3px]">
        {Array.from({ length: 40 }).map((_, i) => {
          const h = 20 + Math.sin(i * 0.6) * 18 + Math.cos(i * 0.3) * 10;
          return (
            <div
              key={i}
              className="w-1 rounded-full bg-primary"
              style={{ height: `${Math.max(6, Math.abs(h))}px`, opacity: 0.4 + (i % 5) * 0.12 }}
            />
          );
        })}
      </div>
      <div className="rounded-md bg-card px-3 py-2 text-xs text-muted-foreground">
        "Booking site visit for Thursday 2pm — routing to David."
      </div>
    </div>
  );
}

function SitesVisual() {
  return (
    <div className="-mx-1">
      <PortalMockup compact />
    </div>
  );
}

function MediaVisual() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-[#0A1628]">
      <img
        src={mediaFounder}
        alt="Vektiss Media founder shoot"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 rounded-full bg-primary" />
        </div>
        <span className="font-mono text-[10px] text-white/60">0:42 / 2:18</span>
      </div>
    </div>
  );
}
