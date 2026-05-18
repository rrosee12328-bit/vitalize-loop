import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BarChart3, Bot, Globe, Inbox, Moon, PhoneMissed, Video } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LiveCallDemo } from "@/components/site/ai-assistants/LiveCallDemo";
import { DashboardPreview } from "@/components/site/ai-assistants/DashboardPreview";
import { VoiceLoopSection } from "@/components/site/VoiceLoopSection";
import { PricingTiers } from "@/components/site/ai-assistants/PricingEstimator";
import {
  ProjectMockup,
  AssistantMockup,
  PortalMockup,
  MediaMockup,
} from "@/components/site/FeatureMockups";

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

const pillars = [
  {
    no: "01",
    to: "/solutions/ai-assistants" as const,
    name: "Vektiss Voice",
    desc: "Embedded AI that answers calls, follows up leads, drafts replies, and removes communication bottlenecks 24/7.",
    Icon: Bot,
  },
  {
    no: "02",
    to: "/solutions/project-intelligence" as const,
    name: "Vektiss Intelligence",
    desc: "Real-time visibility into every initiative, deadline, and decision. The CEO dashboard you've never had.",
    Icon: BarChart3,
  },
  {
    no: "03",
    to: "/solutions/websites-portals-apps" as const,
    name: "Vektiss Sites",
    desc: "A digital front door that actually works — built to capture leads, serve clients, and support operations.",
    Icon: Globe,
  },
  {
    no: "04",
    to: "/solutions/business-media" as const,
    name: "Vektiss Media",
    desc: "Turn your expertise into assets. Short-form video, AI avatars, and content systems that build trust at scale.",
    Icon: Video,
  },
];

const deepDives = [
  {
    eyebrow: "01 · Vektiss Voice",
    to: "/solutions/ai-assistants" as const,
    title: "Never let slow communication cost you another lead.",
    body: "AI assistants qualify requests, answer common questions, summarize conversations, and route priority moments to the right person instantly.",
    Mockup: AssistantMockup,
  },
  {
    eyebrow: "02 · Vektiss Intelligence",
    to: "/solutions/project-intelligence" as const,
    title: "Project management with AI built into the workflow.",
    body: "Instead of scattered updates across emails and spreadsheets, get a shared system where AI summarizes progress, flags next steps, and keeps leadership informed.",
    Mockup: ProjectMockup,
  },
  {
    eyebrow: "03 · Vektiss Sites",
    to: "/solutions/websites-portals-apps" as const,
    title: "A digital front door — and the systems behind it.",
    body: "Marketing site, client portal, and internal apps built as one connected experience. Capture leads, onboard clients, and run delivery without bolting on another tool.",
    Mockup: PortalMockup,
  },
  {
    eyebrow: "04 · Vektiss Media",
    to: "/solutions/business-media" as const,
    title: "Turn your expertise into income-producing assets.",
    body: "We help shape video, founder-led content, and AI avatar assets so your expertise, proof, and process become visible at scale.",
    Mockup: MediaMockup,
  },
];

const steps = [
  {
    no: "01",
    name: "Discover",
    desc: "We map your business model, operational gaps, and the systems that need to connect.",
  },
  {
    no: "02",
    name: "Develop",
    desc: "We develop the AI systems, dashboards, web experience, and media infrastructure you actually need.",
  },
  {
    no: "03",
    name: "Deploy",
    desc: "We launch with a clear rollout, train your team, and optimize based on real usage.",
  },
];


function HomePage() {
  return (
    <SiteLayout>
      {/* HERO — Live demo player leads */}
      <section className="container-editorial pt-12 pb-16 md:pt-20 md:pb-20">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow text-primary animate-fade-in-up">Vektiss Voice</p>
            <h1 className="mt-6 display-1 animate-fade-in-up [animation-delay:120ms]">
              Your business should never miss a call again.
            </h1>
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

      <section className="border-b border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">The Bigger Picture</p>
            <h2 className="mt-6 display-2">
              Start with Vektiss Voice.{" "}
              <span className="accent-underline">Scale to the whole business.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Vektiss Voice is your entry point. When you're ready, we build the
              connected infrastructure that ties your entire operation into a
              single system.
            </p>
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
            <div className="rounded-xl border border-border bg-white p-8 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <PhoneMissed className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">The Missed Call</h3>
              <p className="mt-3 text-muted-foreground">
                You're busy. The phone rings. Nobody answers. That caller doesn't leave a voicemail — they call your competitor.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-8 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Inbox className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">The Slow Reply</h3>
              <p className="mt-3 text-muted-foreground">
                Leads email you. You see it three hours later. By then they've already moved on. Speed wins — every time.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-8 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Moon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">The After-Hours Gap</h3>
              <p className="mt-3 text-muted-foreground">
                Your business closes at 5pm. Your customers' problems don't. Every night and weekend is a window your competitors are open and you're not.
              </p>
            </div>
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

      {/* FOUR PILLARS */}
      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow">The four pillars</p>
          <h2 className="mt-6 display-2">
            One integrated system. Not four siloed tools.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We don't sell deliverables. We build the connected infrastructure that ties your
            operations into a single system you can actually run a business from.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {pillars.map(({ no, to, name, desc, Icon }) => (
            <Link
              key={no}
              to={to}
              className="group rounded-xl border border-border bg-white p-8 shadow-card transition-shadow hover:shadow-md md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-widest text-primary">
                  {no}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              <div className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{name}</h3>
              <p className="mt-3 text-muted-foreground">{desc}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                Open solution page
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/how-we-work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            Read the full approach
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      {/* FEATURE DEEP-DIVE */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow">A closer look</p>
            <h2 className="mt-6 display-2">
              See the systems in <span className="accent-underline">action.</span>
            </h2>
          </div>

          <div className="mt-20 space-y-24 md:space-y-32">
            {deepDives.map(({ eyebrow, to, title, body, Mockup }, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={eyebrow}
                  className="grid items-center gap-10 md:grid-cols-12 md:gap-16"
                >
                  <div
                    className={`md:col-span-5 ${reverse ? "md:order-2 md:col-start-8" : ""}`}
                  >
                    <p className="eyebrow text-primary">{eyebrow}</p>
                    <h3 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                      {title}
                    </h3>
                    <p className="mt-5 text-base text-muted-foreground md:text-lg">{body}</p>
                    <Link
                      to={to}
                      className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                    >
                      Open solution page
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  <div
                    className={`md:col-span-7 ${reverse ? "md:order-1 md:col-start-1" : ""}`}
                  >
                    <Mockup />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS · 3-STEP PROCESS */}
      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-6 display-2">
            From idea to <span className="accent-underline">implemented system.</span>
          </h2>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.no}
              className="relative rounded-xl border border-border bg-white p-8 shadow-card"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs tracking-widest text-primary">
                  STEP {step.no}
                </span>
                <span className="font-mono text-5xl font-semibold tracking-tight text-primary/15">
                  {step.no}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{step.name}</h3>
              <p className="mt-3 text-muted-foreground">{step.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-border md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* SOCIAL PROOF / QUOTE */}
      <section className="border-y border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-28">
          <p className="eyebrow">In their words</p>
          <blockquote className="mt-8 max-w-4xl text-2xl font-medium leading-snug tracking-tight md:text-4xl">
            "We didn't need another agency. We needed someone to actually build the system.
            Vektiss did in 3 weeks what 18 months of consultants couldn't."
          </blockquote>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="h-px w-10 bg-border" />
            <span>COO, mid-market services firm</span>
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

