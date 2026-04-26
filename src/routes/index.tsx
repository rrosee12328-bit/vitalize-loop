import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BarChart3, Bot, GitBranch, Workflow } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HeroMockup } from "@/components/site/HeroMockup";

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
    name: "Project Intelligence",
    desc: "Real-time visibility into every initiative. The CEO dashboard you've never had.",
  },
  {
    no: "02",
    name: "AI Assistants",
    desc: "Embedded AI that follows up leads, drafts replies, and removes the bottlenecks.",
  },
  {
    no: "03",
    name: "Revenue Operations",
    desc: "Sales, marketing, and delivery on one connected pipeline. No more cold leads.",
  },
  {
    no: "04",
    name: "Operating Systems",
    desc: "The processes, dashboards, and automations that turn your team into a system.",
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
      {/* HERO */}
      <section className="container-editorial pt-20 pb-24 md:pt-32 md:pb-36">
        <p className="eyebrow">For growth-stage operator-owners</p>
        <h1 className="mt-6 display-1 max-w-5xl">
          Stop running your business <br className="hidden md:block" />
          on <span className="accent-underline">duct-taped tools.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Vektiss is the systems company for growth-stage businesses. We build the connected
          operating infrastructure that runs your company — so you can lead it.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/book"
            className="group inline-flex h-12 items-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Book a strategy call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/how-we-work"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            See how we work
          </Link>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-6 border-t border-border pt-10 sm:grid-cols-3">
          <Stat value="40+" label="Operators served" />
          <Stat value="2.4×" label="Avg. ops throughput" />
          <Stat value="11 days" label="Median time-to-system" />
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

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {pillars.map((p) => (
            <article key={p.no} className="bg-background p-8 md:p-10">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {p.no}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-3 text-muted-foreground">{p.desc}</p>
            </article>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-semibold tracking-tight md:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
