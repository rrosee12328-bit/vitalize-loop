import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case studies — Vektiss" },
      {
        name: "description",
        content:
          "How operator-owners use Vektiss systems to compress hand-offs, lift throughput, and finally see their business clearly.",
      },
      { property: "og:title", content: "Case studies — Vektiss" },
      {
        property: "og:description",
        content: "Real systems shipped to real growth-stage operators.",
      },
    ],
  }),
  component: CaseStudiesPage,
});

const cases = [
  {
    industry: "Professional services",
    headline: "From 18 days to 36 hours: closing the lead-to-quote loop.",
    metric: "92%",
    metricLabel: "faster time-to-quote",
    summary:
      "Built an AI phone & email assistant that qualifies inbound, drafts responses, and routes hot leads to the right closer in under a minute. The sales team stopped chasing context.",
    tags: ["AI Phone & Email Assistants", "Project Intelligence"],
  },
  {
    industry: "B2B SaaS",
    headline: "The CEO dashboard that replaced four standing meetings.",
    metric: "4 → 0",
    metricLabel: "weekly status meetings",
    summary:
      "Replaced fragmented status reporting with a live Project Intelligence layer. Leadership reclaimed 6 hours a week and stopped flying blind on cross-functional initiatives.",
    tags: ["Project Intelligence", "Websites, Portals & Apps"],
  },
  {
    industry: "Mid-market services",
    headline: "One stack replaced six tools — and the spreadsheets behind them.",
    metric: "2.4×",
    metricLabel: "ops throughput",
    summary:
      "Rebuilt the marketing site, client portal, and internal delivery app on one connected stack. Manual hand-offs disappeared. Same headcount, more than double the output.",
    tags: ["Websites, Portals & Apps", "Project Intelligence"],
  },
  {
    industry: "Founder-led consultancy",
    headline: "From invisible to inbound-driven in 90 days.",
    metric: "5.1×",
    metricLabel: "inbound qualified leads",
    summary:
      "Built a Business Media pipeline around the founder: monthly studio days, short-form cuts, and AI avatar localization. Inbound leads now drive most of new revenue.",
    tags: ["Business Media", "AI Phone & Email Assistants"],
  },
];

function CaseStudiesPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-12 md:pt-32 md:pb-20">
        <p className="eyebrow">Case studies</p>
        <h1 className="mt-6 display-1 max-w-4xl">
          Systems shipped. <span className="accent-underline">Outcomes measured.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          A few of the operating systems we've built for growth-stage operators. Names withheld for
          client confidentiality — happy to walk you through them on a call.
        </p>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <div className="space-y-6">
          {cases.map((c, i) => (
            <article
              key={i}
              className="group rounded-xl border border-border bg-background p-8 transition-colors hover:bg-surface-elevated md:p-12"
            >
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-3">
                  <p className="font-mono text-xs tracking-widest text-muted-foreground">
                    CASE {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.industry}</p>
                  <div className="mt-8">
                    <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                      {c.metric}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{c.metricLabel}</div>
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {c.headline}
                  </h2>
                  <p className="mt-4 text-muted-foreground md:text-lg">{c.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-editorial py-24 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="display-2">Want a walkthrough of one of these?</h2>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                On a strategy call we'll show you the system that's closest to what your business
                needs — and how we'd adapt it.
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
