import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, ListChecks, Flame, MessageSquare, GitBranch, Smartphone, Phone, Check, X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LiveCallDemo } from "@/components/site/ai-assistants/LiveCallDemo";
import { DashboardPreview } from "@/components/site/ai-assistants/DashboardPreview";
import { PricingEstimator, PricingTiers } from "@/components/site/ai-assistants/PricingEstimator";

const CALENDLY = "https://calendly.com/vektiss-info/30-minute-vektiss-discovery";

export const Route = createFileRoute("/solutions/ai-assistants")({
  head: () => ({
    meta: [
      { title: "Vektiss Voice — AI Receptionist for Your Business" },
      {
        name: "description",
        content:
          "Vektiss Voice is a fully managed AI receptionist that answers calls, qualifies leads, books appointments, and replies to emails 24/7.",
      },
      { property: "og:title", content: "Vektiss Voice — AI Receptionist for Your Business" },
      {
        property: "og:description",
        content:
          "Never let a missed call cost you another client. Vektiss embeds AI into your phone and inbox.",
      },
    ],
  }),
  component: AIAssistantsPage,
});

function MissedCallIllustration() {
  // Scene: ringing phone on left, walking figure on right, broken arc + red X between them.
  return (
    <svg viewBox="0 0 240 140" className="h-32 w-full" aria-hidden="true">
      <rect width="240" height="140" fill="#F5EFE6" />
      {/* ring waves */}
      <path d="M22 50 q-10 20 0 40" stroke="#C9BBA3" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M14 42 q-14 28 0 56" stroke="#C9BBA3" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* phone handset */}
      <g transform="translate(38 50) rotate(-25)">
        <rect x="0" y="0" width="58" height="22" rx="11" fill="#A89479" />
        <circle cx="10" cy="11" r="5" fill="#F5EFE6" />
        <circle cx="48" cy="11" r="5" fill="#F5EFE6" />
      </g>
      {/* broken arc */}
      <path d="M108 70 q12 -22 30 -22" stroke="#2563EB" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
      {/* red X */}
      <g transform="translate(130 56)">
        <circle r="11" fill="#C0533A" />
        <path d="M-5 -5 L5 5 M5 -5 L-5 5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      {/* walking figure */}
      <g transform="translate(178 50)" fill="#8C7B65">
        <circle cx="14" cy="8" r="7" />
        <path d="M6 18 L22 18 L26 44 L18 44 L16 30 L14 44 L4 44 Z" />
        <path d="M16 30 L30 36" stroke="#8C7B65" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* ground line */}
      <line x1="20" y1="120" x2="220" y2="120" stroke="#C9BBA3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SlowReplyIllustration() {
  // Scene: big envelope in center, clock on top-right corner near midnight, three unread dots below.
  return (
    <svg viewBox="0 0 240 140" className="h-32 w-full" aria-hidden="true">
      <rect width="240" height="140" fill="#F5EFE6" />
      {/* envelope body */}
      <rect x="56" y="44" width="128" height="76" rx="6" fill="#D9C9AC" />
      <path d="M56 50 L120 92 L184 50" stroke="#A89479" strokeWidth="2.5" fill="none" />
      <rect x="56" y="44" width="128" height="76" rx="6" fill="none" stroke="#A89479" strokeWidth="1.5" />
      {/* clock overlay top-right */}
      <g transform="translate(168 36)">
        <circle r="22" fill="#F5EFE6" stroke="#2563EB" strokeWidth="2" />
        <circle r="22" fill="#2563EB" opacity="0.08" />
        {/* tick marks */}
        <line x1="0" y1="-18" x2="0" y2="-15" stroke="#2563EB" strokeWidth="1.5" />
        <line x1="0" y1="18" x2="0" y2="15" stroke="#2563EB" strokeWidth="1.5" />
        <line x1="-18" y1="0" x2="-15" y2="0" stroke="#2563EB" strokeWidth="1.5" />
        <line x1="18" y1="0" x2="15" y2="0" stroke="#2563EB" strokeWidth="1.5" />
        {/* hands near midnight */}
        <line x1="0" y1="0" x2="0" y2="-14" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="3" y2="-12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <circle r="1.8" fill="#2563EB" />
      </g>
      {/* three unread dots */}
      <g fill="#2563EB">
        <circle cx="108" cy="128" r="3.5" />
        <circle cx="120" cy="128" r="3.5" opacity="0.7" />
        <circle cx="132" cy="128" r="3.5" opacity="0.45" />
      </g>
    </svg>
  );
}

function AfterHoursIllustration() {
  // Scene: storefront with CLOSED sign, person outside with speech bubble containing tiny phone icon.
  return (
    <svg viewBox="0 0 240 140" className="h-32 w-full" aria-hidden="true">
      <rect width="240" height="140" fill="#F5EFE6" />
      {/* ground */}
      <line x1="14" y1="124" x2="226" y2="124" stroke="#C9BBA3" strokeWidth="1.5" strokeLinecap="round" />
      {/* storefront */}
      <g transform="translate(90 36)">
        {/* awning */}
        <path d="M0 8 L96 8 L88 22 L8 22 Z" fill="#A89479" />
        {/* building */}
        <rect x="4" y="22" width="88" height="66" fill="#3F3A33" />
        {/* door */}
        <rect x="36" y="40" width="24" height="48" rx="2" fill="#2A2520" />
        <circle cx="55" cy="64" r="1.5" fill="#C9BBA3" />
        {/* window */}
        <rect x="12" y="32" width="16" height="14" fill="#F5EFE6" opacity="0.25" />
        <rect x="68" y="32" width="16" height="14" fill="#F5EFE6" opacity="0.25" />
        {/* CLOSED sign */}
        <rect x="38" y="52" width="20" height="8" rx="1.5" fill="#F5EFE6" stroke="#1F2937" strokeWidth="0.8" />
        <line x1="41" y1="56" x2="55" y2="56" stroke="#1F2937" strokeWidth="1" />
      </g>
      {/* person outside */}
      <g transform="translate(38 70)" fill="#8C7B65">
        <circle cx="10" cy="6" r="6" />
        <path d="M4 14 L16 14 L18 38 L12 38 L10 26 L8 38 L2 38 Z" />
      </g>
      {/* speech bubble with phone icon */}
      <g transform="translate(8 36)">
        <path d="M0 0 L52 0 Q60 0 60 8 L60 24 Q60 32 52 32 L24 32 L18 40 L20 32 L8 32 Q0 32 0 24 Z" fill="#C0533A" />
        {/* tiny phone */}
        <path d="M22 12 q-2 6 4 10 q6 4 10 -2 l-3 -2 q-2 2 -4 1 q-3 -2 -3 -5 q1 -2 3 -2 l-2 -3 q-4 0 -5 3 Z" fill="#F5EFE6" />
      </g>
    </svg>
  );
}

const problems = [
  {
    Illustration: MissedCallIllustration,
    title: "The Missed Call",
    body: "You're on a job. The phone rings. Nobody answers. That caller just called your competitor.",
  },
  {
    Illustration: SlowReplyIllustration,
    title: "The Slow Reply",
    body: "Emails pile up. Leads go cold. You spend your evenings responding to questions your AI could handle in seconds.",
  },
  {
    Illustration: AfterHoursIllustration,
    title: "The After-Hours Gap",
    body: "Your business hours end at 5pm. Your customers' emergencies don't.",
  },
];

const inactionStats = [
  { stat: "62%", body: "of business calls to small businesses go unanswered" },
  { stat: "85%", body: "of callers who reach voicemail never call back — they call your competitor" },
  { stat: "$126K", body: "average annual revenue lost by small businesses from missed calls" },
];

const comparisonRows = [
  { feature: "24/7 Availability", vektiss: "Always", human: "No — 9 to 5 only", voicemail: "Yes, but ignores leads", vektissPositive: true, humanPositive: false, voicemailPositive: false },
  { feature: "Answers on Ring 1", vektiss: "Every time", human: "Usually", voicemail: "Never", vektissPositive: true, humanPositive: true, voicemailPositive: false },
  { feature: "Understands Caller Intent", vektiss: "Yes", human: "Yes", voicemail: "No", vektissPositive: true, humanPositive: true, voicemailPositive: false },
  { feature: "Sends Intake Forms", vektiss: "Yes — during the call", human: "Sometimes", voicemail: "Never", vektissPositive: true, humanPositive: true, voicemailPositive: false },
  { feature: "Live Follow-Up Alerts to You", vektiss: "Yes — every call", human: "No", voicemail: "No", vektissPositive: true, humanPositive: false, voicemailPositive: false },
  { feature: "Call Analytics Dashboard", vektiss: "Yes", human: "No", voicemail: "No", vektissPositive: true, humanPositive: false, voicemailPositive: false },
  { feature: "Monthly Cost", vektiss: "From $45.99", human: "~$3,500+", voicemail: "Free (but costs you deals)", vektissPositive: true, humanPositive: false, voicemailPositive: false },
];

const steps = [
  {
    phase: "STEP 01",
    title: "We Develop It",
    desc: "We configure your AI receptionist, write the scripts, set up call routing, and connect your email. You don't touch a thing.",
  },
  {
    phase: "STEP 02",
    title: "You Forward Your Number",
    desc: "Dial *72 + your Vektiss number from your existing phone. Takes 10 seconds. Works with AT&T, Verizon, T-Mobile — any carrier.",
  },
  {
    phase: "STEP 03",
    title: "You Get Leads",
    desc: "Every call answered. Every email handled. Every lead captured and sent to you instantly.",
  },
];

const proofStatements = [
  {
    lead: "Your busiest hours, mapped.",
    rest: "Know exactly when your phone rings the most — so you stop guessing and start planning.",
  },
  {
    lead: "Your customers are telling you what they want.",
    rest: "Every call is categorized. Every pattern is visible. You finally know what to fix.",
  },
  {
    lead: "Not every lead is worth the same call back.",
    rest: "Hot, Warm, and Cold — auto-tagged on every call so you spend your time on the ones that matter.",
  },
];

function AIAssistantsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="container-editorial pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow text-primary">02 · Vektiss Voice</p>
            <h1 className="mt-6 display-1">
              Stop letting missed calls{" "}
              <span className="accent-underline">fund your competitors.</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground md:text-xl">
              Vektiss Voice answers every call, routes leads intelligently, sends
              intake forms, and gives you real-time alerts and analytics on
              everything callers ask — 24/7, fully managed by Vektiss. No
              contracts. 30-day money-back guarantee.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book Your Setup Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#dashboard"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/80 bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Hear a Live Demo
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {["Done For You", "No Contract", "30-Day Guarantee"].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[12px] font-medium text-foreground/80"
                >
                  <span className="text-primary">✓</span>
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-6">
            <LiveCallDemo />
            <p className="mt-4 text-xs text-muted-foreground">
              Want to hear your own business? Book a setup call and we'll build
              your custom demo in 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Live Demo Phone Strip */}
      <section className="border-t border-border bg-[#111827] text-white">
        <div className="container-editorial py-10 md:py-12">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-primary">CALL TO TEST IT LIVE</p>
                <p className="mt-1 text-sm text-white/70 md:text-base">
                  Call our live AI front office right now to experience Vektiss Voice firsthand.
                </p>
              </div>
            </div>
            <a
              href="tel:+13465947686"
              className="inline-flex items-center gap-3 rounded-md bg-primary px-6 py-4 text-2xl font-bold tracking-tight text-primary-foreground transition-opacity hover:opacity-90 md:text-3xl"
            >
              <Phone className="h-6 w-6" />
              (346) 594-7686
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">The Problem</p>
            <h2 className="mt-6 display-2">Every missed call is a missed client.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {problems.map((p, i) => (
              <article
                key={p.title}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-card"
              >
                <p.Illustration />
                <div className="p-6 md:p-8">
                  <span className="block font-mono text-xs tracking-widest text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cost of Inaction */}
      <section className="border-t border-border bg-background">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">The Cost of Inaction</p>
            <h2 className="mt-6 display-2">The numbers don't lie.</h2>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {inactionStats.map((s) => (
              <div key={s.stat} className="text-center md:text-left">
                <div className="text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
                  {s.stat}
                </div>
                <div className="mx-auto mt-4 h-px w-12 bg-primary md:mx-0" />
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-14 text-center font-mono text-[11px] tracking-widest text-muted-foreground">
            SOURCES · BIA/KELSEY · 411 LOCALS
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="container-editorial py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How It Works</p>
          <h2 className="mt-6 display-2">Live in 48 hours. Three steps.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.phase} className="border-t border-border pt-6">
              <span className="font-mono text-xs tracking-widest text-primary">
                {s.phase}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* What It Actually Does */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">What It Actually Does</p>
            <h2 className="mt-6 display-2">The smartest employee you'll ever hire.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Vektiss Voice doesn't just say "please leave a message." It handles
              the entire front-of-house workflow, from answering basic questions
              to qualifying leads and booking appointments.
            </p>
          </div>

          <div className="mt-20 space-y-20 md:space-y-28">
            {/* Feature 1 */}
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                  Answers Questions & Qualifies Leads
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Is it just a simple question, or a hot lead? The AI knows the
                  difference. It can answer FAQs about your pricing, hours, or
                  services. If the caller is a qualified prospect, it
                  immediately shifts into lead capture mode—gathering their name,
                  contact info, and project details before sending you a live
                  alert.
                </p>
              </div>
              <div className="md:col-span-6">
                <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:p-8">
                  <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
                    LIVE CALL · AI RESPONSE
                  </p>
                  <div className="mt-4 flex items-start gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-xs font-semibold text-white">
                      AI
                    </span>
                    <div className="rounded-2xl rounded-tl-sm bg-[#F1F5F9] px-4 py-3 text-sm leading-6 text-foreground">
                      "Our standard service call is $150. Since you're dealing
                      with a leak, I'd classify that as an emergency. Let me
                      grab your address and get a technician out to you."
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#3B82F6]/10 px-2.5 py-1 text-[11px] font-medium text-[#3B82F6]">
                      Lead Captured
                    </span>
                    <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-600">
                      Hot · Emergency
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:order-2 md:col-span-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                  <GitBranch className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                  Smart Call Routing
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Stop interrupting your deep work for wrong numbers. Vektiss
                  Voice listens to the caller's intent and routes them instantly
                  based on your rules. Sales calls go to the sales team. Billing
                  questions go to accounting. Emergencies get routed straight to
                  your cell phone. Everything else gets handled by the AI.
                </p>
              </div>
              <div className="md:order-1 md:col-span-6">
                <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:p-8">
                  <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
                    ROUTING LOGIC
                  </p>
                  <div className="mt-5 space-y-3">
                    <div className="rounded-lg border border-[rgba(0,0,0,0.08)] bg-[#F8FAFC] px-4 py-3 text-sm font-medium">
                      Caller Intent Detected
                    </div>
                    <div className="ml-4 space-y-2 border-l-2 border-dashed border-[#3B82F6]/40 pl-5">
                      <div className="flex items-center justify-between rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-sm">
                        <span className="font-medium">Sales Inquiry</span>
                        <span className="text-xs text-muted-foreground">→ Transfer to Maya</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-sm">
                        <span className="font-medium">Billing</span>
                        <span className="text-xs text-muted-foreground">→ Transfer to Accounting</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-sm">
                        <span className="font-medium">General</span>
                        <span className="text-xs text-muted-foreground">→ Handled by AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                  <Smartphone className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                  Intake Forms on Demand
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Why manually email intake forms after a call? Vektiss Voice
                  can text or email your custom application, intake form, or
                  quote request directly to the caller while they are still on
                  the phone. By the time you call them back, their paperwork is
                  already done.
                </p>
              </div>
              <div className="md:col-span-6">
                <DynamicEmailPreview />

              </div>
            </div>
          </div>
        </div>
      </section>


      <section
        id="dashboard"
        className="scroll-mt-24 border-t border-border bg-[#111827] text-white"
      >
        <div className="container-editorial py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="max-w-[480px]">
                <p className="eyebrow text-primary">TOTAL VISIBILITY</p>
                <h2 className="mt-6 display-2 text-white">
                  You always know exactly what's happening.
                </h2>
                <p className="mt-6 text-[17px] leading-[1.6] text-white/70">
                  Most business owners have no idea what their customers are actually calling about. They answer the phone, handle the call, and move on. Vektiss Voice changes that. Every call becomes a data point. Over time, you get a clear picture of what your business needs — what to fix, when to hire, and which leads to chase first.
                </p>
                <div className="mt-8 space-y-5">
                  {proofStatements.map((s) => (
                    <div key={s.lead} className="border-l-2 border-[#3B82F6]/50 pl-4">
                      <p className="text-[15px] leading-[1.7] text-white/85">
                        <span className="font-semibold text-white">{s.lead}</span>{" "}{s.rest}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", "#pricing");
                  }}
                  className="mt-8 inline-flex h-12 items-center gap-2 rounded-md border border-white/40 bg-transparent px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-foreground"
                >
                  See Pricing
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="md:col-span-7">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Business Intelligence */}
      <section className="border-t border-border">
        <div className="container-editorial pt-16 pb-24 md:pt-16 md:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Business Intelligence</p>
            <h2 className="mt-6 display-2 mx-auto max-w-[640px]">
              Your calls are telling you something. Now you can hear it.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Every call Vektiss Voice handles becomes a data point. Over time,
              you get a clear picture of what your customers want, when they
              call, and what is driving your business — without lifting a finger.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: BarChart3,
                title: "Call Volume & Staffing Trends",
                body: "See exactly when your phone rings the most. Identify your busiest days and hours so you can staff accordingly and stop guessing when your customers need you.",
              },
              {
                Icon: ListChecks,
                title: "Top Call Reasons Report",
                body: "Are people calling because your website is confusing? Are they asking the same pricing question? The dashboard categorizes every call intent so you can fix operational bottlenecks at the source.",
              },
              {
                Icon: Flame,
                title: "Automated Lead Scoring",
                body: "Not every lead is equal. The AI automatically tags every caller as Hot, Warm, or Cold based on their intent and urgency, so you know exactly who to call back first.",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-t-[3px] border-t-[#3B82F6] md:p-8"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                  <c.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Comparison</p>
            <h2 className="mt-6 display-2">Why Vektiss Voice wins.</h2>
          </div>

          {/* Desktop table */}
          <div className="mt-14 hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-5 text-left text-sm font-semibold text-muted-foreground">Feature</th>
                    <th className="bg-primary/10 px-6 py-5 text-left text-sm font-bold text-primary border-x-2 border-primary">
                      Vektiss Voice
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-muted-foreground">Human Receptionist</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-muted-foreground">Voicemail</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r, i) => (
                    <tr key={r.feature} className={i !== comparisonRows.length - 1 ? "border-b border-border" : ""}>
                      <td className="px-6 py-5 text-sm font-medium text-foreground">{r.feature}</td>
                      <td className="bg-primary/5 px-6 py-5 text-sm text-foreground border-x-2 border-primary">
                        <span className="inline-flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="font-semibold">{r.vektiss}</span>
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-muted-foreground">
                        <span className="inline-flex items-start gap-2">
                          {r.humanPositive ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40" />}
                          <span>{r.human}</span>
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-muted-foreground">
                        <span className="inline-flex items-start gap-2">
                          {r.voicemailPositive ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40" />}
                          <span>{r.voicemail}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile stacked cards */}
          <div className="mt-10 grid gap-4 md:hidden">
            {comparisonRows.map((r) => (
              <div key={r.feature} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">{r.feature}</p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-start gap-2 rounded-md bg-primary/10 p-2 border border-primary/30">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div><span className="font-semibold text-primary">Vektiss Voice:</span> <span className="font-medium">{r.vektiss}</span></div>
                  </div>
                  <div className="flex items-start gap-2 p-2">
                    {r.humanPositive ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40" />}
                    <div className="text-muted-foreground"><span className="font-medium text-foreground">Human:</span> {r.human}</div>
                  </div>
                  <div className="flex items-start gap-2 p-2">
                    {r.voicemailPositive ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40" />}
                    <div className="text-muted-foreground"><span className="font-medium text-foreground">Voicemail:</span> {r.voicemail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border">

        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-primary">Vektiss Voice Plans</p>
            <p className="eyebrow mt-3">Pricing</p>
            <h2 className="mt-6 display-2">
              Flat rate. No surprises. Cancel anytime.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Every plan includes done-for-you setup, 24/7 coverage, and a 30-day
              money-back guarantee.
            </p>
          </div>

          <div className="mt-14">
            <PricingTiers />
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Estimate Your Cost</p>
            <h2 className="mt-6 display-2">See which plan fits your business.</h2>
          </div>
          <div className="mt-12">
            <PricingEstimator />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-[#111827]">
        <div className="container-editorial py-24 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="display-2 text-white">
              Your best employee costs $45.99 a month.
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Vektiss Voice — never misses a call, never takes a sick day,
              never forgets to follow up. Live in 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book Your Setup Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.replaceState(null, "", "#pricing");
                }}
                className="inline-flex h-12 items-center gap-2 rounded-md border border-white/50 bg-transparent px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-foreground"
              >
                See Pricing
              </a>
            </div>
            <p className="mt-5 text-[13px] text-white/60">
              30-Day Money-Back Guarantee · No Contract · Cancel Anytime
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

const emailScenarios = [
  {
    firstName: "Sarah",
    email: "sarah.miller@gmail.com",
    company: "Apex Restoration",
    slug: "apex-restoration",
    subject: "Your intake form — Apex Restoration",
  },
  {
    firstName: "David",
    email: "d.chen@northpeakhvac.com",
    company: "North Peak HVAC",
    slug: "north-peak-hvac",
    subject: "Service request form — North Peak HVAC",
  },
  {
    firstName: "Maya",
    email: "maya.r@lumenlegal.com",
    company: "Lumen Legal",
    slug: "lumen-legal-intake",
    subject: "New client intake — Lumen Legal",
  },
  {
    firstName: "Jordan",
    email: "jordan@brightsmiledental.com",
    company: "Brightsmile Dental",
    slug: "brightsmile-dental",
    subject: "Patient intake form — Brightsmile Dental",
  },
];

function DynamicEmailPreview() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % emailScenarios.length);
        setVisible(true);
      }, 250);
      return () => clearTimeout(t);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const s = emailScenarios[index];

  return (
    <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
          EMAIL PREVIEW
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3B82F6]/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#3B82F6]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3B82F6]" />
          LIVE
        </span>
      </div>
      <div
        className={`transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
      >
        <div className="mt-4 space-y-2 border-b border-[rgba(0,0,0,0.08)] pb-3 text-sm">
          <div className="flex gap-2">
            <span className="text-muted-foreground">From:</span>
            <span className="font-medium">Vektiss Voice &lt;assistant@vektiss.com&gt;</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">To:</span>
            <span className="font-medium">{s.email}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">Subject:</span>
            <span className="font-medium">{s.subject}</span>
          </div>
        </div>
        <div className="mt-4 text-sm leading-6 text-foreground">
          <p>Hi {s.firstName},</p>
          <p className="mt-2">
            Thanks for calling {s.company}. Here is the link to the intake form we discussed:{" "}
            <span className="text-[#3B82F6] underline">vektiss.com/intake/{s.slug}</span>
          </p>
          <p className="mt-2">
            Fill this out and our team will review it shortly. You will hear back within 24 hours.
          </p>
          <p className="mt-4 text-muted-foreground">— Vektiss Voice</p>
        </div>
      </div>
    </div>
  );
}
