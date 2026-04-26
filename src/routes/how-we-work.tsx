import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "How we work — Vektiss" },
      {
        name: "description",
        content:
          "Vektiss isn't an agency or a SaaS — we're a systems company. Here's exactly how we build connected operating infrastructure for growth-stage businesses.",
      },
      { property: "og:title", content: "How we work — Vektiss" },
      {
        property: "og:description",
        content:
          "From discovery to running system in weeks, not quarters. Our integrated approach.",
      },
    ],
  }),
  component: HowWeWorkPage,
});

const phases = [
  {
    no: "Phase 01",
    name: "Diagnose",
    duration: "Week 1",
    desc: "We map your current operations, the tools you're using, and where work actually breaks down. You walk away with clarity even if we never work together.",
  },
  {
    no: "Phase 02",
    name: "Architect",
    duration: "Week 2",
    desc: "We design the integrated system — the dashboards, automations, AI assistants, and pipelines that fit how your business actually runs.",
  },
  {
    no: "Phase 03",
    name: "Build",
    duration: "Weeks 3–5",
    desc: "We ship the working system, embedded in the tools your team already uses. No rip-and-replace. No 6-month implementation.",
  },
  {
    no: "Phase 04",
    name: "Operate",
    duration: "Ongoing",
    desc: "We stay on as your operating partner — tuning the system, adding capability, and making sure it keeps pace with your growth.",
  },
];

const pillars = [
  {
    name: "Project Intelligence",
    desc: "Live visibility into every initiative — status, blockers, owner, throughput. The visibility layer your leadership team has been asking for.",
  },
  {
    name: "AI Assistants",
    desc: "Embedded assistants that handle lead follow-up, draft replies, summarize meetings, and remove the manual work clogging your pipeline.",
  },
  {
    name: "Revenue Operations",
    desc: "Sales, marketing, and delivery connected on one pipeline. Leads stop going cold. Hand-offs stop dropping. Revenue stops leaking.",
  },
  {
    name: "Operating Systems",
    desc: "The processes, dashboards, and automations that turn an organization into a repeatable, scalable system.",
  },
];

function HowWeWorkPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="container-editorial pt-20 pb-16 md:pt-32 md:pb-24">
        <p className="eyebrow">How we work</p>
        <h1 className="mt-6 display-1 max-w-4xl">
          We build <span className="accent-underline">systems.</span> Not deliverables.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Most agencies hand you assets. Most consultants hand you slides. We hand you a running
          operating system — built into the tools your team already uses.
        </p>
      </section>

      {/* CONTRAST */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            <div className="bg-background p-8 md:p-10">
              <p className="eyebrow text-muted-foreground">What you usually get</p>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li>— A new SaaS subscription</li>
                <li>— A 90-page playbook nobody opens</li>
                <li>— A 6-month implementation</li>
                <li>— A bill, then radio silence</li>
              </ul>
            </div>
            <div className="bg-background p-8 md:p-10">
              <p className="eyebrow text-foreground">What you get from Vektiss</p>
              <ul className="mt-6 space-y-3">
                <li>— A connected, running operating system</li>
                <li>— Dashboards your CEO actually uses daily</li>
                <li>— A 4–5 week build, not a quarter-long project</li>
                <li>— An operating partner, not a vendor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow">The engagement</p>
          <h2 className="mt-6 display-2">From chaos to running system in weeks.</h2>
        </div>

        <div className="mt-16 space-y-px overflow-hidden rounded-xl border border-border bg-border">
          {phases.map((p) => (
            <article
              key={p.no}
              className="grid gap-6 bg-background p-8 md:grid-cols-12 md:gap-10 md:p-10"
            >
              <div className="md:col-span-3">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {p.no}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">{p.duration}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-3 text-muted-foreground">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PILLARS DEEP */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow">The four pillars</p>
            <h2 className="mt-6 display-2">One system. Four working parts.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We don't sell pillars individually. They're the load-bearing components of a single
              integrated infrastructure — designed to work together from day one.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {pillars.map((p, i) => (
              <div key={p.name} className="border-t border-border pt-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tracking-widest text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                </div>
                <p className="mt-4 text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-editorial py-24 md:py-32">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="display-2">Ready to see the system you actually need?</h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Book a 30-minute strategy call. We'll map your operations and show you exactly where
              the highest-leverage system lives.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              to="/book"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
