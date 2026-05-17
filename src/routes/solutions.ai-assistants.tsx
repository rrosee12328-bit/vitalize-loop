import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PhoneOff, Inbox, MoonStar } from "lucide-react";
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
    title: "We Build It",
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
  "Real-time call log with outcome tags (Lead, Appointment, Info, Spam)",
  "Email activity tracker — drafts queued, sent, and pending review",
  "Monthly performance report delivered to your inbox automatically",
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
              Vektiss Voice answers every call, books appointments, handles
              emails, and sends you a summary — 24/7, fully managed by Vektiss. No
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

      {/* Total Visibility — Dashboard */}
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
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px]">
                      ✓
                    </span>
                    <span className="text-base text-white/85">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-md border border-white/40 bg-transparent px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-foreground"
              >
                See a Sample Report
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
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
