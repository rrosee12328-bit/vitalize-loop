import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, PhoneOff, Inbox, MoonStar, BarChart3, ListChecks, Flame, MessageSquare, GitBranch, Smartphone } from "lucide-react";
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

const problems = [
  {
    Icon: PhoneOff,
    title: "The Missed Call",
    body: "You're on a job. The phone rings. Nobody answers. That caller just called your competitor.",
  },
  {
    Icon: Inbox,
    title: "The Inbox Backlog",
    body: "Emails pile up. Leads go cold. You spend your evenings responding to questions your AI could handle in seconds.",
  },
  {
    Icon: MoonStar,
    title: "The After-Hours Gap",
    body: "Your business hours end at 5pm. Your customers' emergencies don't.",
  },
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

const dashFeatures = [
  "Call volume trends — see when your busiest hours are and staff accordingly",
  "Top call reasons report — know exactly what your customers are calling about every month",
  "Lead scoring on every call — Hot, Warm, or Cold tagged automatically so you know who to call back first",
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
                className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.Icon className="h-5 w-5" />
                </span>
                <span className="mt-4 block font-mono text-xs tracking-widest text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-3xl">
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
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="font-mono text-[11px] tracking-[0.18em] text-primary">
              TOTAL VISIBILITY
            </p>
            <h2 className="mt-6 display-2 text-white">
              You always know exactly what's happening.
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Every call logged. Every email tracked. Every lead captured. Your
              dashboard updates in real time.
            </p>
          </div>
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <div className="order-1 md:order-2 md:col-span-7">
              <DashboardPreview />
            </div>
            <div className="order-2 md:order-1 md:col-span-5">
              <ul className="space-y-4">
                {dashFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-[#3B82F6]"
                      style={{ background: "rgba(59, 130, 246, 0.12)" }}
                    >
                      ✓
                    </span>
                    <span className="text-base text-white/85">{f}</span>
                  </li>
                ))}
              </ul>
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
        </div>
      </section>

      {/* Business Intelligence */}
      <section id="pricing" className="border-t border-border">
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

      {/* Pricing */}
      <section className="border-t border-border">

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
