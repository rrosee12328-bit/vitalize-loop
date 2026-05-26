import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Inbox, Moon, PhoneMissed, Play } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
// TechLinesBackground is provided site-wide via SiteLayout
import { LiveCallDemo } from "@/components/site/ai-assistants/LiveCallDemo";
import { VoiceLoopSection } from "@/components/site/VoiceLoopSection";
import { PricingTiers } from "@/components/site/ai-assistants/PricingEstimator";
import { DashboardPreview } from "@/components/site/ai-assistants/DashboardPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vektiss — The systems company for growth-stage operators" },
      {
        name: "description",
        content:
          "Stop duct-taping tools. Vektiss builds the connected operating infrastructure that runs your business — project intelligence, AI assistants, integrated systems.",
      },
      { property: "og:title", content: "Vektiss — Systems, not deliverables" },
      {
        property: "og:description",
        content:
          "The connected operating infrastructure for operator-owners outgrowing duct-tape solutions.",
      },
    ],
  }),
  component: HomePage,
});

const faqs = [
  {
    q: "What does Vektiss actually do?",
    a: "Vektiss builds AI-powered business systems that help companies save time, capture leads, and operate with more clarity. That can include Vektiss Voice, email assistants, websites, client portals, internal dashboards, automations, apps, and business media systems.",
  },
  {
    q: "What is Vektiss Voice?",
    a: "Vektiss Voice is an AI voice assistant for your business. It can answer calls, respond to common questions, collect caller information, qualify leads, route urgent requests, and send summaries to your team.",
  },
  {
    q: "Can Vektiss Voice answer calls for my business?",
    a: "Yes. Vektiss Voice can answer incoming calls based on your business information, services, FAQs, pricing, availability, and instructions. It helps make sure your business is not missing calls, leads, or opportunities when your team is busy.",
  },
  {
    q: "Will Vektiss Voice replace my team?",
    a: "No. Vektiss Voice is designed to support your team, not replace them. It handles repetitive calls, basic questions, intake, and routing so your team can focus on sales, service, and decisions that need a real person.",
  },
  {
    q: "Can Vektiss Voice transfer calls to a real person?",
    a: "Yes. Vektiss Voice can be set up to transfer calls, escalate urgent requests, or notify your team when a human needs to step in. The goal is not to trap people in automation. The goal is to make sure every call gets handled the right way.",
  },
  {
    q: "Is Vektiss only a voice assistant company?",
    a: "No. Vektiss Voice is one part of the larger Vektiss system. We can also build the follow-up, email automation, landing pages, portals, dashboards, and workflows around it so your business can manage what happens after the call.",
  },
  {
    q: "Do I have to replace the tools I already use?",
    a: "No. In most cases, Vektiss builds around the tools your business already uses. The goal is to connect your calls, emails, forms, leads, projects, and client communication into a cleaner system instead of forcing you to start over.",
  },
  {
    q: "What kind of businesses is Vektiss Voice for?",
    a: "Vektiss Voice is for service businesses, founders, operators, and growing teams that miss calls, lose leads, answer the same questions repeatedly, rely too much on manual follow-up, or need a faster way to respond to customers.",
  },
  {
    q: "What makes Vektiss different from buying another AI phone tool?",
    a: "Most tools give you software. Vektiss helps build the system around your business. We help set up the voice assistant, train it on your business information, connect your follow-up, organize your workflows, and make sure it works in real life.",
  },
  {
    q: "How do we get started?",
    a: "Start by booking a strategy call. We'll look at where your business is missing calls, losing time, or handling too much manually. From there, we'll recommend the first system to build and show you how Vektiss Voice or another Vektiss solution can help.",
  },
];


function HomePage() {
  return (
    <SiteLayout>
      {/* HERO — Live demo player leads */}
      <section className="relative container-editorial pt-12 pb-16 md:pt-20 md:pb-20">
        <div className="relative mx-auto mb-8 max-w-5xl text-center">
          <p className="eyebrow text-primary animate-fade-in-up">Watch how Vektiss Voice works</p>
          <h1 className="mt-4 display-1 animate-fade-in-up [animation-delay:120ms]">
            See how Vektiss answers every call, so your business never misses one.
          </h1>
        </div>
        {/* VIDEO PLACEHOLDER — replace inner div with <video> or <iframe> */}
        <div className="mx-auto mb-12 max-w-5xl overflow-hidden rounded-2xl border border-border bg-black shadow-card animate-scale-in">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src="https://iframe.mediadelivery.net/embed/600055/13b49759-f4e9-437c-bf30-7b9454bd1424?autoplay=false&preload=true"
              loading="lazy"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              title="Vektiss Voice demo"
            />
          </div>
        </div>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow text-primary animate-fade-in-up">Vektiss Voice</p>
            <h2 className="mt-6 display-1 animate-fade-in-up [animation-delay:120ms]">
              Your business should never miss a call again.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground md:text-xl animate-fade-in-up [animation-delay:260ms]">
              Pick an industry and hear exactly what your customers would hear — 24/7, handled by AI, managed by us.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up [animation-delay:400ms]">
              <Link
                to="/solutions/ai-assistants"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Vektiss Voice
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#voice-pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("voice-pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/80 bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                See Pricing
              </a>
              {/* VIDEO URL TO BE ADDED */}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {["Done For You", "No Contract", "$45.99/mo"].map((b, i) => (
                <span
                  key={b}
                  style={{ animationDelay: `${540 + i * 120}ms` }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[12px] font-medium text-foreground/80 animate-fade-in-up"
                >
                  <span className="text-primary">✓</span>
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-6 animate-scale-in [animation-delay:300ms]">
            <LiveCallDemo />
            <p className="mt-4 text-center text-xs text-muted-foreground animate-fade-in [animation-delay:900ms]">
              Want to hear your own business? Book a setup call and we'll build
              your custom demo in 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* PHONE ASSISTANT CTA STRIP */}
      <section className="border-y border-border bg-[#EFF6FF]">
        <div className="container-editorial py-8 md:py-10">
          <div className="flex flex-col items-start gap-5 border-l-4 border-primary pl-5 md:flex-row md:items-center md:justify-between md:gap-8">
            <div>
              <p className="text-lg font-semibold text-foreground md:text-xl">
                Vektiss Voice. Starting at $45.99/mo.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Done-for-you setup. 30-day money-back guarantee. No contracts.
              </p>
            </div>
            <Link
              to="/solutions/ai-assistants"
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              See Vektiss Voice Plans
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <VoiceLoopSection />

      {/* INTERACTIVE DASHBOARD PREVIEW */}
      <section className="relative border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Inside the system</p>
            <h2 className="mt-5 display-2">
              Every call, message, and lead — captured in one live dashboard.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              See exactly what your AI handled overnight, who it followed up with, and what needs your attention today.
            </p>
          </div>
          <div className="mt-12">
            <DashboardPreview />
          </div>
        </div>
      </section>




      {/* PROBLEM RECOGNITION */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="text-center">
            <p className="eyebrow">THE PROBLEM</p>
            <h2 className="mt-6 display-2">
              Your phone is costing you money.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              Every missed call is a missed client. Every slow reply is a lost deal. Most businesses don't have a system — they have a gap.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                code: "01",
                icon: PhoneMissed,
                title: "The Missed Call",
                stat: "62%",
                statLabel: "of missed calls never call back",
                body: "You're busy. The phone rings. Nobody answers. That caller doesn't leave a voicemail — they call your competitor.",
              },
              {
                code: "02",
                icon: Inbox,
                title: "The Slow Reply",
                stat: "5 min",
                statLabel: "after which lead-to-close drops 80%",
                body: "Leads email you. You see it three hours later. By then they've already moved on. Speed wins — every time.",
              },
              {
                code: "03",
                icon: Moon,
                title: "The After-Hours Gap",
                stat: "67%",
                statLabel: "of buyer research happens after 5pm",
                body: "Your business closes at 5pm. Your customers' problems don't. Every night and weekend is a window your competitors are open and you're not.",
              },
            ].map(({ code, icon: Icon, title, stat, statLabel, body }) => (
              <div
                key={code}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                {/* Hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "color-mix(in oklch, var(--primary) 30%, transparent)" }}
                />
                {/* Top accent line */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 60%, transparent), transparent)",
                  }}
                />

                <div className="relative flex items-start justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs tracking-widest text-muted-foreground/70">
                    {code} / 03
                  </span>
                </div>

                <h3 className="relative mt-6 text-xl font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="relative mt-3 text-muted-foreground">{body}</p>

                <div className="relative mt-6 flex items-baseline gap-3 border-t border-border/70 pt-5">
                  <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                    {stat}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {statLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>


          <div className="mt-16 text-center">
            <p className="text-lg font-bold text-[#111827]">
              Vektiss Voice closes all three gaps — automatically, 24/7, starting at $45.99/mo.
            </p>
            <Link
              to="/solutions/ai-assistants"
              className="group mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              See How It Works
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>


      {/* VOICE PRICING */}
      <section id="voice-pricing" className="border-t border-border scroll-mt-24">
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

      {/* FAQ */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-6 display-2">Vektiss, answered.</h2>
              <p className="mt-6 text-muted-foreground">
                Quick answers to what operators ask us most before getting started.
              </p>
            </div>
            <div className="md:col-span-8">
              <dl className="space-y-px overflow-hidden rounded-xl border border-border bg-border">
                {faqs.map((f) => (
                  <div key={f.q} className="bg-background p-6 md:p-8">
                    <dt className="text-lg font-semibold tracking-tight text-foreground">
                      {f.q}
                    </dt>
                    <dd className="mt-3 text-muted-foreground">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-editorial py-24 md:py-32">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Next step</p>
            <h2 className="mt-6 display-2">
              30 minutes. <span className="accent-underline">Real clarity.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Walk us through where your operations are stuck. We'll map the system you actually
              need — whether or not you work with us.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a href="https://calendly.com/vektiss-info/30-minute-vektiss-discovery" target="_blank" rel="noopener noreferrer" className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

