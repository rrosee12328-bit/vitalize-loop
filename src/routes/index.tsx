import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BarChart3, Bot, Globe, Video } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HeroMockup } from "@/components/site/HeroMockup";
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
    to: "/solutions/project-intelligence" as const,
    name: "Project Intelligence",
    desc: "Real-time visibility into every initiative, deadline, and decision. The CEO dashboard you've never had.",
    Icon: BarChart3,
  },
  {
    no: "02",
    to: "/solutions/ai-assistants" as const,
    name: "AI Phone & Email Assistants",
    desc: "Embedded AI that answers calls, follows up leads, drafts replies, and removes communication bottlenecks 24/7.",
    Icon: Bot,
  },
  {
    no: "03",
    to: "/solutions/websites-portals-apps" as const,
    name: "Websites, Portals, Client Systems & Apps",
    desc: "A digital front door that actually works — built to capture leads, serve clients, and support operations.",
    Icon: Globe,
  },
  {
    no: "04",
    to: "/solutions/business-media" as const,
    name: "Business Media",
    desc: "Turn your expertise into assets. Short-form video, AI avatars, and content systems that build trust at scale.",
    Icon: Video,
  },
];

const deepDives = [
  {
    eyebrow: "01 · Project Intelligence",
    to: "/solutions/project-intelligence" as const,
    title: "Project management with AI built into the workflow.",
    body: "Instead of scattered updates across emails and spreadsheets, get a shared system where AI summarizes progress, flags next steps, and keeps leadership informed.",
    Mockup: ProjectMockup,
  },
  {
    eyebrow: "02 · AI Assistants",
    to: "/solutions/ai-assistants" as const,
    title: "Never let slow communication cost you another lead.",
    body: "AI assistants qualify requests, answer common questions, summarize conversations, and route priority moments to the right person instantly.",
    Mockup: AssistantMockup,
  },
  {
    eyebrow: "03 · Websites, Portals, Client Systems & Apps",
    to: "/solutions/websites-portals-apps" as const,
    title: "A digital front door — and the systems behind it.",
    body: "Marketing site, client portal, and internal apps built as one connected experience. Capture leads, onboard clients, and run delivery without bolting on another tool.",
    Mockup: PortalMockup,
  },
  {
    eyebrow: "04 · Business Media",
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
    name: "Build",
    desc: "We develop the AI systems, dashboards, web experience, and media infrastructure you actually need.",
  },
  {
    no: "03",
    name: "Deploy",
    desc: "We launch with a clear rollout, train your team, and optimize based on real usage.",
  },
];

const painPoints = [
  "Tools that don't talk to each other",
  "Leads going cold while your team scrambles",
  "No visibility into where projects actually stand",
  "Spreadsheets stitched together with hope",
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO — full-bleed cinematic video with overlaid copy */}
      <section className="relative isolate flex min-h-[92vh] w-full items-center overflow-hidden md:min-h-screen md:items-end">
        {/* Background video — desktop (16:9) */}
        <iframe
          src="https://iframe.mediadelivery.net/embed/600055/130db0d6-305b-4bed-8517-7cd5d839b9cd?autoplay=true&loop=true&muted=true&preload=true&responsive=true"
          loading="eager"
          className="pointer-events-none absolute inset-0 -z-20 hidden h-full w-full scale-110 md:block"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          title="Vektiss brand intro"
        />
        {/* Background video — mobile (9:16) */}
        <iframe
          src="https://iframe.mediadelivery.net/embed/600055/b69bd946-69ef-4424-93f8-c57806001f6f?autoplay=true&loop=true&muted=true&preload=true&responsive=true"
          loading="eager"
          className="pointer-events-none absolute inset-0 -z-20 block h-full w-full md:hidden"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          title="Vektiss brand intro (mobile)"
        />
        {/* Legibility overlays */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/10 via-60% to-background"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-background/70 via-background/30 to-transparent md:from-background/60 md:via-transparent"
        />

        <div className="container-editorial relative w-full pt-28 pb-20 md:pt-36 md:pb-32">
          <p className="eyebrow">For growth-stage operator-owners</p>
          <h1 className="mt-6 display-1 max-w-5xl">
            Stop running your business <br className="hidden md:block" />
            on <span className="accent-underline">duct-taped tools.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-foreground/80 md:text-xl">
            Vektiss is the systems company for growth-stage businesses. We build the connected
            operating infrastructure that runs your company — so you can lead it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://calendly.com/vektiss-info/30-minute-vektiss-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-card transition-opacity hover:opacity-90"
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/how-we-work"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-background/70 px-6 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              See how we work
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-border">
        <div className="container-editorial py-12 md:py-16">
          <div className="grid gap-x-12 gap-y-6 sm:grid-cols-3">
            <Stat value="40+" label="Operators served" />
            <Stat value="2.4×" label="Avg. ops throughput" />
            <Stat value="11 days" label="Median time-to-system" />
          </div>
        </div>
      </section>

      {/* PROBLEM RECOGNITION */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">The problem</p>
              <h2 className="mt-6 display-2">
                You didn't build a business to <span className="accent-underline">manage chaos.</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-4">
              <p className="text-lg text-muted-foreground">
                Most growth-stage businesses run on a stack of half-connected tools, manual
                hand-offs, and tribal knowledge. It works — until it doesn't. Sound familiar?
              </p>
              <ul className="mt-8 space-y-4">
                {painPoints.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 border-t border-border pt-4 text-base text-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
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
              Book a strategy call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-semibold tracking-tight md:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
