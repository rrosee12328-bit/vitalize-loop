import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PhoneOff, Wallet, MoonStar } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CallDemo, type CallDemoHandle } from "@/components/site/ai-assistants/CallDemo";
import { LiveCallDemo } from "@/components/site/ai-assistants/LiveCallDemo";
import { PricingEstimator } from "@/components/site/ai-assistants/PricingEstimator";

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
  const demoRef = useRef<CallDemoHandle>(null);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="container-editorial pt-20 pb-16 md:pt-32 md:pb-20">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow text-primary">02 · AI Phone & Email Assistants</p>
            <h1 className="mt-6 display-1">
              Never let a missed call <span className="accent-underline">cost you another client.</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground md:text-xl">
              Vektiss embeds a fully managed AI receptionist into your business. It answers calls,
              qualifies leads, books appointments, and replies to emails — 24/7, without adding
              headcount.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={() => demoRef.current?.replay()}
                className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground hover:bg-muted"
              >
                Hear a Real Call
              </button>
            </div>
          </div>
          <div className="md:col-span-6">
            <CallDemo ref={demoRef} />
          </div>
        </div>
      </section>

      {/* Live Call Demo */}
      <section className="border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Live Call Demo</p>
            <h2 className="mt-6 display-2">Hear it handle a real call.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Pick an industry and press play. Watch the AI greet, qualify, and close — stage
              by stage, in real time.
            </p>
          </div>
          <div className="mt-12">
            <LiveCallDemo />
          </div>
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

      {/* Pricing */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-6 display-2">Simple pricing. No per-call surprises.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Most answering services charge by the call. We don't. Pick your volume and see your
              flat monthly rate.
            </p>
          </div>
          <div className="mt-12">
            <PricingEstimator />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="display-2">Ready to hire your best employee?</h2>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Book a 30-minute call. We'll show you exactly how the system works and what it
                would look like for your business.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
