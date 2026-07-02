import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useState } from "react";
import { ArrowRight, BarChart3, ListChecks, Flame, MessageSquare, GitBranch, Smartphone, Phone, Check, X, Code2, PhoneForwarded, Inbox, User, CreditCard, Bot, Bell } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LiveCallDemo } from "@/components/site/ai-assistants/LiveCallDemo";
import { DashboardPreview } from "@/components/site/ai-assistants/DashboardPreview";

import { VoiceLoopSection } from "@/components/site/VoiceLoopSection";
import {
  MissedCallIllustration,
  SlowReplyIllustration,
  AfterHoursIllustration,
} from "@/components/site/ai-assistants/ProblemIllustrations";

const CALENDLY = "https://voice.vektiss.com/get-started";

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
  { feature: "Engagement Model", vektiss: "Managed implementation", human: "Payroll + management", voicemail: "None", vektissPositive: true, humanPositive: false, voicemailPositive: false },
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
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(t);
  }, []);

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
              Vektiss Voice is a managed AI front-office system that answers calls, routes intelligently, sends intake forms, qualifies leads, and gives you full visibility — designed, built, tested, and managed by Vektiss.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Apply for an implementation call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#implementation"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/80 bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                See how implementation works
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {["Managed Implementation", "Custom Workflow Design", "Ongoing Optimization"].map((b) => (
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
      <section className="border-t border-border bg-[#0B1220] text-white">
        <div className="container-editorial py-10 md:py-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-emerald-400">LIVE · CALL OUR AI NOW</span>
            </div>
            <a
              href="tel:+13465947686"
              className="text-4xl font-bold tracking-tight text-white transition-opacity hover:opacity-90 md:text-6xl"
            >
              Call (346) 594-7686
            </a>
            <p className="max-w-2xl text-base text-white/70 md:text-lg">
              Call our live AI front office right now and experience Vektiss Voice firsthand — no signup required.
            </p>
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

      <VoiceLoopSection />



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
          <p className="mt-14 text-center text-xs text-muted-foreground">
            Sources: BIA/Kelsey, 411 Locals, GetAira Research
          </p>
        </div>
      </section>

      {/* How it works — interactive timeline */}
      <section className="container-editorial py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How It Works</p>
          <h2 className="mt-6 display-2">Live in 48 hours. Three steps.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Click a step to see what happens behind the scenes.
          </p>
        </div>
        <HowItWorksTimeline />
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
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0088FF]/10 text-[#0088FF]">
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
                <ChatConversationVisual />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:order-2 md:col-span-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0088FF]/10 text-[#0088FF]">
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
                <RoutingFlowchart />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0088FF]/10 text-[#0088FF]">
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
                <IntakeFormPhoneMockup />

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
                    <div key={s.lead} className="border-l-2 border-[#0088FF]/50 pl-4">
                      <p className="text-[15px] leading-[1.7] text-white/85">
                        <span className="font-semibold text-white">{s.lead}</span>{" "}{s.rest}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-12 items-center gap-2 rounded-md border border-white/40 bg-transparent px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-foreground"
                >
                  Apply for an implementation call
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
          <BentoIntelligenceCards />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Why Vektiss Voice</p>
            <h2 className="mt-6 display-2">The math is simple.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              A human receptionist costs $3,500/month. Voicemail costs you deals. Vektiss Voice is a managed AI front-office system designed around how your business actually operates.
            </p>
          </div>

          {/* Desktop comparison */}
          <div className="relative mt-16 hidden md:block">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              {/* Header row */}
              <div className="bg-muted/40 px-6 pt-8 pb-6">
                <p className="eyebrow">Compare</p>
                <p className="mt-2 text-sm text-muted-foreground">Side-by-side across what matters most.</p>
              </div>
              <div className="relative -mt-4 rounded-t-2xl bg-gradient-to-b from-primary to-[#0088FF] px-6 pt-7 pb-6 text-primary-foreground shadow-[0_-8px_24px_-12px_rgba(0, 136, 255,0.45)]">
                <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  Recommended
                </span>
                <p className="mt-3 text-lg font-semibold leading-tight">Vektiss Voice</p>
                <p className="mt-1 text-xs text-primary-foreground/80">AI receptionist, fully managed</p>
              </div>
              <div className="bg-muted/40 px-6 pt-8 pb-6">
                <p className="text-lg font-semibold leading-tight text-foreground">Human Receptionist</p>
                <p className="mt-1 text-xs text-muted-foreground">In-house or outsourced</p>
              </div>
              <div className="bg-muted/40 px-6 pt-8 pb-6">
                <p className="text-lg font-semibold leading-tight text-foreground">Voicemail</p>
                <p className="mt-1 text-xs text-muted-foreground">Default fallback</p>
              </div>

              {/* Rows */}
              {comparisonRows.map((r, i) => {
                const isLast = i === comparisonRows.length - 1;
                const zebra = i % 2 === 1 ? "bg-muted/20" : "bg-card";
                return (
                  <Fragment key={r.feature}>
                    <div className={`${zebra} flex items-center border-t border-border px-6 py-5 text-sm font-medium text-foreground`}>
                      {r.feature}
                    </div>
                    <div className={`relative flex items-center gap-3 border-t border-primary/20 bg-primary/[0.06] px-6 py-5 text-sm ${isLast ? "rounded-b-2xl" : ""}`}>
                      <ComparisonMark positive />
                      <span className="font-semibold text-foreground">{r.vektiss}</span>
                    </div>
                    <div className={`${zebra} flex items-center gap-3 border-t border-border px-6 py-5 text-sm text-muted-foreground`}>
                      <ComparisonMark positive={r.humanPositive} />
                      <span>{r.human}</span>
                    </div>
                    <div className={`${zebra} flex items-center gap-3 border-t border-border px-6 py-5 text-sm text-muted-foreground`}>
                      <ComparisonMark positive={r.voicemailPositive} />
                      <span>{r.voicemail}</span>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Sources: SBA small-business benchmarks.
            </p>
          </div>

          {/* Mobile stacked cards */}
          <div className="mt-10 grid gap-4 md:hidden">
            {comparisonRows.map((r) => (
              <div key={r.feature} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">{r.feature}</p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-start gap-3 rounded-lg bg-primary/[0.08] p-3 ring-1 ring-primary/20">
                    <ComparisonMark positive />
                    <div><span className="font-semibold text-primary">Vektiss Voice</span><div className="mt-0.5 font-medium text-foreground">{r.vektiss}</div></div>
                  </div>
                  <div className="flex items-start gap-3 p-3">
                    <ComparisonMark positive={r.humanPositive} />
                    <div><span className="text-xs text-muted-foreground">Human</span><div className="text-foreground">{r.human}</div></div>
                  </div>
                  <div className="flex items-start gap-3 p-3">
                    <ComparisonMark positive={r.voicemailPositive} />
                    <div><span className="text-xs text-muted-foreground">Voicemail</span><div className="text-foreground">{r.voicemail}</div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing */}
      <section id="implementation" className="border-t border-border scroll-mt-24">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Vektiss Voice Implementation</p>
            <h2 className="mt-6 display-2">
              A managed AI front-office system, not a plug-in phone tool.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Vektiss Voice is a managed AI front-office system for businesses that need calls, intake, routing, lead qualification, and customer response handled with speed and consistency.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              This is not a plug-in phone tool. We design, build, test, and manage the workflow around how your business actually communicates with customers.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex h-14 items-center gap-2 rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-95 hover:shadow-xl"
            >
              Apply for an implementation call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Qualification */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Who we work with</p>
            <h2 className="mt-6 display-2">
              Built for businesses with real operational demand.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Vektiss is built for companies that already have customer inquiries, inbound calls, lead flow, staff workload, or operational bottlenecks that need to move faster.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              We work best with law firms, med spas, clinics, professional service companies, and growing businesses that need AI implemented into their actual workflow — not just added as another tool.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-[#111827]">
        <div className="container-editorial py-24 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="display-2 text-white">
              A front-office system built around your business.
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Vektiss helps growing businesses build AI-powered systems that communicate faster, operate cleaner, and make smarter decisions.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Apply for an implementation call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0088FF]/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#0088FF]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0088FF]" />
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
            <span className="text-[#0088FF] underline">vektiss.com/intake/{s.slug}</span>
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

// =====================================================================
// Interactive timeline for "How It Works"
// =====================================================================
const timelineSteps = [
  {
    label: "01",
    title: "We Build It",
    short: "We Build It",
    desc: "We configure your AI receptionist, write the scripts, set up call routing, and connect your email. You don't touch a thing.",
    Visual: BuildItVisual,
  },
  {
    label: "02",
    title: "Forward Number",
    short: "Forward Number",
    desc: "Dial *72 + your Vektiss number from your existing phone. Takes 10 seconds. Works with AT&T, Verizon, T-Mobile — any carrier.",
    Visual: ForwardNumberVisual,
  },
  {
    label: "03",
    title: "Get Leads",
    short: "Get Leads",
    desc: "Every call answered. Every email handled. Every lead captured and sent to you instantly.",
    Visual: GetLeadsVisual,
  },
];

function HowItWorksTimeline() {
  const [active, setActive] = useState(0);
  const Visual = timelineSteps[active].Visual;
  return (
    <div className="mt-16">
      {/* Timeline track */}
      <div className="relative mx-auto max-w-3xl px-4">
        <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-border" />
        <div
          className="absolute left-4 top-1/2 h-[2px] -translate-y-1/2 bg-[#0088FF] transition-all duration-500"
          style={{ width: `calc((100% - 32px) * ${active / (timelineSteps.length - 1)})` }}
        />
        <div className="relative flex items-center justify-between">
          {timelineSteps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center gap-3"
                aria-label={`Step ${s.label} — ${s.short}`}
              >
                <span
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all ${
                    isActive
                      ? "scale-110 border-[#0088FF] bg-[#0088FF] text-white shadow-[0_0_0_6px_rgba(0, 136, 255,0.15)]"
                      : isDone
                        ? "border-[#0088FF] bg-white text-[#0088FF]"
                        : "border-border bg-white text-muted-foreground group-hover:border-[#0088FF]/50"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`hidden text-xs font-semibold tracking-wide transition-colors sm:block ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active card */}
      <div
        key={active}
        className="animate-fade-in mx-auto mt-12 grid max-w-5xl items-center gap-10 rounded-2xl border border-border bg-card p-6 shadow-card md:grid-cols-2 md:gap-12 md:p-10"
      >
        <div>
          <p className="font-mono text-xs tracking-widest text-[#0088FF]">
            STEP {timelineSteps[active].label}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            {timelineSteps[active].title}
          </h3>
          <p className="mt-4 text-muted-foreground md:text-lg">
            {timelineSteps[active].desc}
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-[#F5EFE6]">
          <Visual />
        </div>
      </div>
    </div>
  );
}

function BuildItVisual() {
  const tasks = [
    { label: "Voice & personality", value: "Maya · warm, professional", done: true },
    { label: "Business hours", value: "24/7 — always on", done: true },
    { label: "Call routing rules", value: "Sales · Billing · General", done: true },
    { label: "Intake form flow", value: "Auto-send during call", done: true },
    { label: "Email + SMS alerts", value: "Routed to owner", done: true },
    { label: "Go-live", value: "Within 48 hours", done: false },
  ];
  return (
    <div className="bg-[#0B1220] p-5 md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#0088FF]/15 text-[#7DD3FC]">
            <Code2 className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-white">Setup Blueprint</p>
            <p className="font-mono text-[9px] tracking-widest text-white/40">VEKTISS · YOUR BUSINESS</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] tracking-widest text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          IN PROGRESS
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[10px] text-white/60">
          <span>Build progress</span>
          <span className="font-mono tabular-nums text-white">83%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-[#0088FF] to-[#7DD3FC]" style={{ width: "83%" }} />
        </div>
      </div>

      {/* Checklist */}
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li
            key={t.label}
            className="flex items-start gap-2.5 rounded-md border border-white/5 bg-white/[0.03] px-3 py-2"
          >
            <span
              className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                t.done ? "bg-emerald-500 text-white" : "border border-dashed border-white/30 bg-transparent"
              }`}
            >
              {t.done ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-[11px] font-medium ${t.done ? "text-white" : "text-white/60"}`}>
                {t.label}
              </p>
              <p className="text-[10px] text-white/50">{t.value}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#0088FF]/15 px-2.5 py-1 text-[10px] font-medium text-[#7DD3FC]">
        <Code2 className="h-3 w-3" /> Built and managed by Vektiss
      </p>
    </div>
  );
}

function ForwardNumberVisual() {
  return (
    <div className="flex items-center justify-center gap-6 p-8">
      {/* Phone */}
      <div className="relative h-44 w-24 shrink-0 rounded-[20px] border-[3px] border-[#1F2937] bg-[#0B1220] p-1.5 shadow-lg">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-[14px] bg-[#0B1220] text-white">
          <p className="font-mono text-[9px] tracking-widest text-white/50">DIALING</p>
          <p className="mt-2 font-mono text-xl font-bold tracking-wider">*72</p>
          <p className="mt-1 font-mono text-[9px] text-white/70">+ (346) 594…</p>
          <span className="mt-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#22C55E]">
            <Phone className="h-3 w-3 text-white" />
          </span>
        </div>
      </div>
      {/* Arrow */}
      <div className="flex flex-col items-center gap-1">
        <PhoneForwarded className="h-6 w-6 text-[#0088FF]" />
        <div className="h-[2px] w-12 bg-gradient-to-r from-[#0088FF] to-[#0088FF]/30" />
        <span className="font-mono text-[9px] tracking-widest text-muted-foreground">FORWARD</span>
      </div>
      {/* Vektiss badge */}
      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-[#0088FF] bg-white shadow-md">
        <span className="font-mono text-[10px] tracking-widest text-[#0088FF]">VEKTISS</span>
        <span className="mt-1 text-[10px] font-semibold text-foreground">Voice AI</span>
        <span className="mt-1 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
      </div>
    </div>
  );
}

function GetLeadsVisual() {
  const leads = [
    { tag: "Hot Lead", tone: "bg-red-500/15 text-red-600 border-red-500/30", caller: "(214) 555-0182", note: "Pricing — 3BR renovation" },
    { tag: "Form Sent", tone: "bg-amber-500/15 text-amber-700 border-amber-500/30", caller: "(817) 555-0394", note: "New patient inquiry" },
    { tag: "Booked", tone: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30", caller: "(972) 555-0271", note: "Tuesday 10am consult" },
  ];
  return (
    <div className="bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Inbox className="h-4 w-4 text-[#0088FF]" />
          <span className="text-xs font-semibold">Inbox</span>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-[#0088FF]">3 NEW</span>
      </div>
      <ul className="space-y-2">
        {leads.map((l, i) => (
          <li
            key={l.caller}
            className="flex items-start justify-between gap-3 rounded-lg border border-border bg-[#F8FAFC] px-3 py-2 text-xs animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="min-w-0">
              <p className="font-mono text-[10px] tabular-nums text-muted-foreground">{l.caller}</p>
              <p className="mt-0.5 truncate text-foreground">{l.note}</p>
            </div>
            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${l.tone}`}>
              {l.tag}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <Bell className="h-3 w-3 text-[#0088FF]" />
        Live alerts sent to your phone
      </div>
    </div>
  );
}

// =====================================================================
// Chat conversation visual (iMessage-style)
// =====================================================================
function ChatConversationVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border p-6 shadow-card md:p-8"
      style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #F5EFE6 100%)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0088FF] text-[10px] font-bold text-white">AI</span>
          <div>
            <p className="text-xs font-semibold leading-none">Vektiss Voice</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Live call · 00:42</p>
          </div>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-[#0088FF]">TRANSCRIPT</span>
      </div>

      <div className="mt-6 space-y-3">
        {/* Caller bubble */}
        <div className="flex justify-end">
          <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-[#0088FF] px-4 py-2.5 text-sm leading-snug text-white shadow-sm">
            Hi — my kitchen sink is leaking pretty bad. What do you charge?
          </div>
        </div>
        {/* AI bubble */}
        <div className="flex justify-start">
          <div className="max-w-[82%] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm leading-snug text-foreground shadow-sm">
            Our standard service call is <span className="font-semibold">$150</span>. Since it's a leak, I'd classify that as an emergency. Let me grab your address and get a technician out today.
          </div>
        </div>
        {/* Caller bubble */}
        <div className="flex justify-end">
          <div className="max-w-[60%] rounded-2xl rounded-br-sm bg-[#0088FF] px-4 py-2.5 text-sm leading-snug text-white shadow-sm">
            Perfect. 4218 Oak Lane.
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#0088FF]/10 px-2.5 py-1 text-[11px] font-medium text-[#0088FF]">
          <Check className="h-3 w-3" /> Lead Captured
        </span>
        <span
          className="relative inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_0_18px_rgba(239,68,68,0.45)]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Hot · Emergency
        </span>
        <span className="ml-auto font-mono text-[10px] tracking-widest text-muted-foreground">SENT TO OWNER</span>
      </div>
    </div>
  );
}

// =====================================================================
// Routing flowchart
// =====================================================================
function RoutingFlowchart() {
  const paths = [
    { Icon: User, label: "Sales Inquiry", target: "Maya", color: "#0088FF" },
    { Icon: CreditCard, label: "Billing", target: "Accounting", color: "#7C3AED" },
    { Icon: Bot, label: "General", target: "Handled by AI", color: "#0EA5E9" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-card md:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground">ROUTING LOGIC</p>
        <span className="font-mono text-[10px] tracking-widest text-[#0088FF]">LIVE</span>
      </div>

      <div className="mt-6 grid grid-cols-[auto_1fr] items-center gap-x-4">
        {/* Source */}
        <div className="col-span-2 flex items-center gap-3 rounded-xl border border-border bg-[#F8FAFC] px-4 py-3">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0088FF] text-white">
            <Phone className="h-4 w-4" />
            <span className="absolute inset-0 animate-ping rounded-full bg-[#0088FF] opacity-30" />
          </span>
          <div>
            <p className="text-sm font-semibold">Incoming Call</p>
            <p className="text-[11px] text-muted-foreground">Intent detection running…</p>
          </div>
        </div>

        {/* SVG branching */}
        <svg viewBox="0 0 80 180" className="col-start-1 ml-1 h-[180px] w-[80px] shrink-0" aria-hidden="true">
          <path d="M40 0 C 40 28, 70 28, 70 56" stroke="#0088FF" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M40 0 L40 90" stroke="#7C3AED" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M40 0 C 40 28, 70 28, 70 56 M40 0 C 40 100, 70 100, 70 124 M40 0 C 40 144, 70 144, 70 168"
                stroke="transparent" fill="none" />
          <path d="M40 12 C 40 36, 72 36, 72 56" stroke="#0088FF" strokeWidth="2" fill="none" />
          <path d="M40 12 L40 90" stroke="#7C3AED" strokeWidth="2" fill="none" />
          <path d="M40 12 C 40 104, 72 104, 72 124" stroke="#0EA5E9" strokeWidth="2" fill="none" />
          {/* animated dot along middle path */}
          <circle r="3" fill="#7C3AED">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M40 12 L40 90" />
          </circle>
          <circle r="3" fill="#0088FF">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M40 12 C 40 36, 72 36, 72 56" />
          </circle>
          <circle r="3" fill="#0EA5E9">
            <animateMotion dur="3s" repeatCount="indefinite" path="M40 12 C 40 104, 72 104, 72 124" />
          </circle>
        </svg>

        {/* Destinations */}
        <div className="col-start-2 -ml-2 flex flex-col gap-3">
          {paths.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-3 rounded-lg border border-border bg-white px-3 py-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
            >
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${p.color}1a`, color: p.color }}
              >
                <p.Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight">{p.label}</p>
                <p className="text-[11px] text-muted-foreground">→ {p.target}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// Intake form phone mockup with notification
// =====================================================================
function IntakeFormPhoneMockup() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/60 p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] md:p-14"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, rgba(0, 136, 255,0.10), transparent 55%), radial-gradient(circle at 85% 90%, rgba(168,85,247,0.10), transparent 55%), linear-gradient(160deg,#FAFAF7 0%,#F4F1EC 100%)",
      }}
    >
      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      {/* soft glow behind phone */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0, 136, 255,0.18), transparent 70%)" }}
      />


      {/* Realistic iPhone */}
      <div className="relative mx-auto" style={{ width: 232, perspective: "1200px" }}>
        <div
          className="relative rounded-[44px] p-[3px] shadow-[0_30px_60px_-20px_rgba(15,23,42,0.45),0_10px_25px_-10px_rgba(15,23,42,0.35)]"
          style={{
            background: "linear-gradient(145deg,#3a3f47 0%,#1c1f24 45%,#0a0c0f 100%)",
            transform: "rotate(-4deg)",
          }}
        >
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-20 h-7 w-[3px] rounded-l bg-[#2a2d33]" />
          <div className="absolute -left-[3px] top-32 h-12 w-[3px] rounded-l bg-[#2a2d33]" />
          <div className="absolute -left-[3px] top-48 h-12 w-[3px] rounded-l bg-[#2a2d33]" />
          <div className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-[#2a2d33]" />

          {/* Inner bezel */}
          <div className="rounded-[41px] bg-black p-[2px]">
            {/* Screen */}
            <div
              className="relative overflow-hidden rounded-[39px]"
              style={{
                height: 460,
                background:
                  "linear-gradient(170deg,#0088FF 0%,#312e81 40%,#581c87 75%,#1f2937 100%)",
              }}
            >
              {/* Subtle wallpaper glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(96,165,250,0.35), transparent 45%), radial-gradient(circle at 75% 80%, rgba(168,85,247,0.3), transparent 50%)",
                }}
              />

              {/* Status bar */}
              <div className="relative flex items-center justify-between px-6 pt-3 text-white">
                <span className="font-sans text-[11px] font-semibold tracking-tight">9:41</span>
                <div className="flex items-center gap-1">
                  {/* signal */}
                  <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor">
                    <rect x="0" y="6" width="2.2" height="3" rx="0.4" />
                    <rect x="3.2" y="4" width="2.2" height="5" rx="0.4" />
                    <rect x="6.4" y="2" width="2.2" height="7" rx="0.4" />
                    <rect x="9.6" y="0" width="2.2" height="9" rx="0.4" />
                  </svg>
                  {/* wifi */}
                  <svg width="13" height="9" viewBox="0 0 13 9" fill="currentColor">
                    <path d="M6.5 1.2C4.2 1.2 2.1 2 .5 3.5l1.1 1.1C2.9 3.3 4.6 2.6 6.5 2.6s3.6.7 4.9 2l1.1-1.1C10.9 2 8.8 1.2 6.5 1.2z" />
                    <path d="M6.5 4.1C5 4.1 3.6 4.7 2.5 5.7l1.1 1.1c.8-.8 1.8-1.3 2.9-1.3s2.1.5 2.9 1.3l1.1-1.1C9.4 4.7 8 4.1 6.5 4.1z" />
                    <circle cx="6.5" cy="8" r="1" />
                  </svg>
                  {/* battery */}
                  <div className="ml-0.5 flex items-center">
                    <div className="relative h-[10px] w-[22px] rounded-[3px] border border-white/80">
                      <div className="absolute inset-[1.5px] rounded-[1.5px] bg-white" style={{ width: "70%" }} />
                    </div>
                    <div className="ml-[1px] h-[4px] w-[1.5px] rounded-r bg-white/80" />
                  </div>
                </div>
              </div>

              {/* Dynamic island */}
              <div className="absolute left-1/2 top-2.5 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black" />

              {/* Lock screen date/time */}
              <div className="relative mt-7 text-center text-white">
                <p className="text-[11px] font-medium tracking-wide opacity-90">Monday, May 18</p>
                <p className="mt-0.5 text-[56px] font-light leading-none tracking-tight" style={{ fontFeatureSettings: "'tnum'" }}>
                  9:41
                </p>
              </div>

              {/* Notifications stack */}
              <div className="relative mt-7 space-y-2 px-3">
                {/* Primary notification */}
                <div
                  className="animate-fade-in rounded-[18px] p-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
                  style={{ background: "rgba(255,255,255,0.78)", backdropFilter: "blur(20px)" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-[10px] font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#0088FF,#0088FF)" }}
                    >
                      V
                    </span>
                    <p className="flex-1 truncate text-[11px] font-semibold text-[#0f172a]">Vektiss Voice</p>
                    <span className="text-[9px] font-medium text-[#64748b]">now</span>
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold leading-snug text-[#0f172a]">Intake form</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#334155]">
                    Here is the link to the intake form we discussed:
                  </p>
                  <p className="mt-1 text-[10.5px] font-medium text-[#0088FF] underline underline-offset-2">
                    vektiss.com/intake/apex
                  </p>
                </div>

                {/* Secondary notification */}
                <div
                  className="rounded-[16px] p-2.5 shadow-md"
                  style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500 text-[9px] font-bold text-white">
                      ✓
                    </span>
                    <p className="flex-1 truncate text-[10.5px] font-medium text-[#0f172a]">Form delivered · Email</p>
                    <span className="text-[9px] text-[#475569]">now</span>
                  </div>
                </div>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// Bento Intelligence Cards
// =====================================================================
function BentoIntelligenceCards() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-6 md:grid-rows-2">
      {/* Large card top — Call volume trends */}
      <article className="group md:col-span-4 md:row-span-1 rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lg md:p-8">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0088FF]/10 text-[#0088FF]">
            <BarChart3 className="h-5 w-5" />
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">LAST 7 DAYS</span>
        </div>
        <VolumeAreaChart />
        <h3 className="mt-4 text-lg font-semibold tracking-tight">
          Call Volume & Staffing Trends
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          See exactly when your phone rings the most. Identify your busiest days and hours so you can staff accordingly and stop guessing when your customers need you.
        </p>
      </article>

      {/* Lead scoring */}
      <article className="group md:col-span-2 md:row-span-2 rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lg md:p-8">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0088FF]/10 text-[#0088FF]">
          <Flame className="h-5 w-5" />
        </span>
        <div className="mt-6 space-y-3">
          <div className="relative rounded-xl border border-red-500/40 bg-gradient-to-r from-red-500/10 to-red-500/0 px-4 py-3 shadow-[0_0_24px_rgba(239,68,68,0.25)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-red-600">🔥 Hot</span>
              <span className="font-mono text-xs tabular-nums text-foreground">38%</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Urgent · ready to buy</p>
          </div>
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-amber-700">Warm</span>
              <span className="font-mono text-xs tabular-nums text-foreground">44%</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Comparing options</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Cold</span>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">18%</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Just browsing</p>
          </div>
        </div>
        <h3 className="mt-6 text-lg font-semibold tracking-tight">
          Automated Lead Scoring
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Every caller is auto-tagged Hot, Warm, or Cold so you know exactly who to call back first.
        </p>
      </article>

      {/* Top call reasons */}
      <article className="group md:col-span-4 md:row-span-1 rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lg md:p-8">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0088FF]/10 text-[#0088FF]">
            <ListChecks className="h-5 w-5" />
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">THIS MONTH</span>
        </div>
        <div className="mt-5 grid items-center gap-6 sm:grid-cols-[140px_1fr]">
          <DonutChart />
          <ul className="space-y-2.5 text-xs">
            {[
              { label: "Pricing / Quotes", pct: 34, color: "#0088FF" },
              { label: "Appointments", pct: 28, color: "#7C3AED" },
              { label: "Emergencies", pct: 16, color: "#EF4444" },
              { label: "General", pct: 14, color: "#0EA5E9" },
              { label: "Existing Clients", pct: 8, color: "#10B981" },
            ].map((r) => (
              <li key={r.label}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.color }} />
                    {r.label}
                  </span>
                  <span className="font-mono tabular-nums text-foreground">{r.pct}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${(r.pct / 34) * 100}%`, backgroundColor: r.color }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-tight">
          Top Call Reasons Report
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Every call intent is categorized so you can fix operational bottlenecks at the source.
        </p>
      </article>
    </div>
  );
}

function VolumeAreaChart() {
  // 14 data points; simulate two-week volume
  const data = [12, 18, 14, 22, 28, 19, 11, 16, 24, 32, 38, 30, 22, 17];
  const max = Math.max(...data);
  const w = 320;
  const h = 90;
  const stepX = w / (data.length - 1);
  const points = data.map((v, i) => `${i * stepX},${h - (v / max) * (h - 8) - 4}`);
  const areaPath = `M0,${h} L${points.join(" L")} L${w},${h} Z`;
  const linePath = `M${points.join(" L")}`;
  return (
    <div className="mt-6">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="volGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0088FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#volGrad)" />
        <path d={linePath} fill="none" stroke="#0088FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* peak dot */}
        {(() => {
          const peakIdx = data.indexOf(max);
          const [px, py] = points[peakIdx].split(",").map(Number);
          return (
            <g>
              <circle cx={px} cy={py} r="4" fill="#0088FF" />
              <circle cx={px} cy={py} r="8" fill="#0088FF" opacity="0.2" />
            </g>
          );
        })()}
      </svg>
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
        <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span><span>TUE</span><span>THU</span><span>SAT</span>
      </div>
    </div>
  );
}

function DonutChart() {
  const segments = [
    { pct: 34, color: "#0088FF" },
    { pct: 28, color: "#7C3AED" },
    { pct: 16, color: "#EF4444" },
    { pct: 14, color: "#0EA5E9" },
    { pct: 8,  color: "#10B981" },
  ];
  const R = 36;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="relative mx-auto h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#F1F5F9" strokeWidth="14" />
        {segments.map((s, i) => {
          const len = (s.pct / 100) * C;
          const el = (
            <circle
              key={i}
              cx="50" cy="50" r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">CALLS</span>
        <span className="text-xl font-bold tabular-nums">147</span>
      </div>
    </div>
  );
}

function ComparisonMark({ positive }: { positive: boolean }) {
  if (positive) {
    return (
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500 ring-1 ring-rose-100">
      <X className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  );
}
