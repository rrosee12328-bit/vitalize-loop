import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PhoneOff, Wallet, MoonStar, Play } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LiveCallDemo } from "@/components/site/ai-assistants/LiveCallDemo";
import { DashboardPreview } from "@/components/site/ai-assistants/DashboardPreview";
import { PricingEstimator, PricingTiers } from "@/components/site/ai-assistants/PricingEstimator";

const CALENDLY = "https://calendly.com/vektiss-info/30-minute-vektiss-discovery";

export const Route = createFileRoute("/solutions/ai-assistants")({
  head: () => ({
    meta: [
      { title: "AI Phone & Email Assistants — Vektiss" },
      {
        name: "description",
        content:
          "A fully managed AI receptionist that answers calls, qualifies leads, books appointments, and replies to emails 24/7.",
      },
      { property: "og:title", content: "AI Phone & Email Assistants — Vektiss" },
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
    title: "62% of calls to small businesses go unanswered.",
    body: "Every missed call is a lead that called your competitor next.",
  },
  {
    Icon: Wallet,
    title: "A full-time receptionist costs $4,000+/month.",
    body: "Answering services charge by the call and still sound robotic.",
  },
  {
    Icon: MoonStar,
    title: "Business doesn't stop at 5 PM.",
    body: "But your staff does — and so does your ability to capture after-hours leads.",
  },
];

const steps = [
  {
    phase: "STEP 01",
    title: "We Build It.",
    desc: "We custom-train the AI on your business: your FAQs, your services, your booking links, and how you want calls handled.",
  },
  {
    phase: "STEP 02",
    title: "You Forward Your Number.",
    desc: "Dial *72 from your existing business phone to forward calls to the AI. No porting. No new number. No carrier change required.",
  },
  {
    phase: "STEP 03",
    title: "You Get Leads.",
    desc: "The AI answers, qualifies, and books. You get an instant summary after every call — name, number, reason for calling, and next step.",
  },
];

function AIAssistantsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="container-editorial pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-primary">02 · AI Phone & Email Assistants</p>
          <h1 className="mt-6 display-1">
            Stop letting missed calls{" "}
            <span className="accent-underline">fund your competitors.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground md:text-xl">
            Your AI receptionist answers every call, books appointments, handles emails,
            and sends you a summary — 24/7, fully managed by Vektiss. No contracts.
            30-day money-back guarantee.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book a Strategy Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#live-call-demo"
              className="group inline-flex h-12 items-center gap-2.5 rounded-md border border-primary/40 bg-primary/5 px-5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
            >
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                <Play className="relative ml-0.5 h-3.5 w-3.5 fill-current" />
              </span>
              Hear a real AI call
              <span className="hidden text-xs text-muted-foreground sm:inline">
                · 4 industries · 2 min
              </span>
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
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

        <div id="live-call-demo" className="mt-8 md:mt-10 scroll-mt-24">
          <LiveCallDemo />
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="eyebrow">The Problem</p>
              <h2 className="mt-6 display-2">
                You're losing business every time your phone goes unanswered.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-5">
              {problems.map((p, i) => (
                <article
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <p.Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="font-mono text-xs tracking-widest text-muted-foreground">
                        0{i + 1}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight">{p.title}</h3>
                      <p className="mt-2 text-muted-foreground">{p.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow">How It Works</p>
          <h2 className="mt-6 display-2">Fully managed. Zero tech skills required.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.phase} className="border-t border-border pt-6">
              <span className="font-mono text-xs tracking-widest text-primary">{s.phase}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Total Visibility — Client Dashboard */}
      <section className="border-t border-border bg-foreground text-background">
        <div className="container-editorial py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            {/* Dashboard first on mobile, right column on desktop */}
            <div className="order-1 md:order-2 md:col-span-7">
              <DashboardPreview />
            </div>
            <div className="order-2 md:order-1 md:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.18em] text-primary">
                04 · CLIENT DASHBOARD
              </p>
              <h2 className="mt-6 display-2 text-background">
                You see everything.{" "}
                <span className="text-primary">In real time.</span>
              </h2>
              <p className="mt-6 text-lg text-background/70">
                Every call logged. Every email handled. Every lead captured. Your Vektiss
                dashboard gives you a live view of your AI assistant's activity — so you
                always know what's happening with your business, even when you're not
                there.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  {
                    title: "Call Log",
                    body: "Every inbound call recorded with date, time, caller number, and outcome.",
                  },
                  {
                    title: "Lead Summaries",
                    body: "Instant SMS and email recap after every call so you never miss a lead.",
                  },
                  {
                    title: "Email Activity",
                    body: "Track every email received, drafted, and sent by your AI assistant.",
                  },
                  {
                    title: "Monthly Report",
                    body: "Automated performance summary delivered to your inbox every month.",
                  },
                ].map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <span className="text-sm font-semibold tracking-tight text-background">
                        {f.title}
                      </span>
                      <span className="text-sm text-background/70"> — {f.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-6 display-2">Simple pricing. No per-call surprises.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Flat monthly plans. Done-for-you setup. Cancel anytime.
            </p>
          </div>

          <div className="mt-16">
            <PricingTiers />
          </div>

          <div className="mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Not sure which tier?</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                Estimate your monthly volume
              </h3>
            </div>
            <div className="mt-8">
              <PricingEstimator />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="display-2">Your best employee costs $29.99 a month.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Never misses a call. Never takes a sick day. Never forgets to follow up.
              Live in 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#live-call-demo"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Hear a Real AI Call
              </a>
            </div>
            <p className="mt-5 text-[13px] text-muted-foreground">
              30-Day Money-Back Guarantee · No Contract · Cancel Anytime
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
