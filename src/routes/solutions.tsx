import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Bot, Globe, Video } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Vektiss" },
      {
        name: "description",
        content:
          "The four pillars of the Vektiss operating system: Project Intelligence, AI Phone & Email Assistants, Websites/Portals/Apps, and Business Media.",
      },
      { property: "og:title", content: "Solutions — Vektiss" },
      {
        property: "og:description",
        content:
          "One integrated system. Four working components. Built into the tools you already use.",
      },
    ],
  }),
  component: SolutionsPage,
});

const solutions = [
  {
    no: "01",
    to: "/solutions/project-intelligence" as const,
    name: "Project Intelligence",
    Icon: BarChart3,
    headline: "The CEO dashboard you've never had.",
    desc: "Real-time visibility into every initiative, deadline, and decision. AI summarizes progress and surfaces what needs your attention.",
    bullets: [
      "Live initiative status across teams",
      "AI-generated weekly summaries",
      "Risk and blocker flagging",
    ],
  },
  {
    no: "02",
    to: "/solutions/ai-assistants" as const,
    name: "AI Phone & Email Assistants",
    Icon: Bot,
    headline: "Communication that never sleeps.",
    desc: "Embedded AI that answers calls, qualifies leads, drafts replies, and routes the moments that need a human — 24/7.",
    bullets: [
      "Inbound call answering & qualification",
      "Email triage and draft replies",
      "Smart routing with summaries",
    ],
  },
  {
    no: "03",
    to: "/solutions/websites-portals-apps" as const,
    name: "Websites, Portals & Apps",
    Icon: Globe,
    headline: "Your digital front door — and the rooms behind it.",
    desc: "Marketing site, client portal, and internal apps built as one connected experience that captures, converts, and serves.",
    bullets: [
      "Conversion-focused marketing site",
      "Branded client portal",
      "Custom internal apps",
    ],
  },
  {
    no: "04",
    to: "/solutions/business-media" as const,
    name: "Business Media",
    Icon: Video,
    headline: "Turn expertise into income-producing assets.",
    desc: "Founder-led video, short-form content, and AI avatars — produced inside a system, not a one-off project.",
    bullets: [
      "Founder POV video pipeline",
      "Short-form social cuts",
      "AI avatar content at scale",
    ],
  },
];

function SolutionsPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-16 md:pt-32 md:pb-24">
        <p className="eyebrow">Solutions</p>
        <h1 className="mt-6 display-1 max-w-4xl">
          One integrated system. <span className="accent-underline">Four working parts.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          We don't sell point tools. We build the connected operating infrastructure that ties
          your business into a single system you can actually run from.
        </p>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map(({ no, to, name, Icon, headline, desc, bullets }) => (
            <Link
              key={no}
              to={to}
              className="group flex flex-col rounded-xl border border-border bg-white p-8 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md md:p-10"
              aria-label={`Open ${name} solution page`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-widest text-primary">{no}</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight">{name}</h2>
              <p className="mt-2 text-base font-medium text-foreground">{headline}</p>
              <p className="mt-3 text-muted-foreground">{desc}</p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
              <span className="mt-auto pt-6">
                <span className="inline-flex h-10 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
                  Open solution page
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="display-2">Not sure where to start?</h2>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Most engagements start with one pillar — usually the one causing the most pain.
                A 30-minute call is enough to figure out which.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                to="/book"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
