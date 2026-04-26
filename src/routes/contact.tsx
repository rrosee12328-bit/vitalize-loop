import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Mail, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vektiss" },
      {
        name: "description",
        content:
          "Talk to Vektiss. Email us, book a strategy call, or send a note about your operational challenges.",
      },
      { property: "og:title", content: "Contact — Vektiss" },
      {
        property: "og:description",
        content: "Reach the Vektiss team. We respond within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

const channels = [
  {
    Icon: Calendar,
    label: "Book a strategy call",
    body: "30 minutes with a systems architect. Bring your messiest operational headache.",
    cta: "Pick a time",
    to: "/book" as const,
  },
  {
    Icon: Mail,
    label: "Email the team",
    body: "Prefer to send a note first? We respond within one business day.",
    cta: "hello@vektiss.com",
    href: "mailto:hello@vektiss.com",
  },
  {
    Icon: MapPin,
    label: "Where we work",
    body: "Remote-first across North America and Europe. We meet on-site for kickoffs when it matters.",
    cta: "Remote-first",
  },
];

const faqs = [
  {
    q: "What size of company do you work with?",
    a: "Growth-stage operator-owned businesses, typically $3M–$50M in revenue, with 15–250 people. If you've outgrown your tools but a McKinsey project would be overkill, we're built for you.",
  },
  {
    q: "How fast can you start?",
    a: "Most engagements kick off within two weeks of a signed agreement. The first working system usually ships in 4–5 weeks from kickoff.",
  },
  {
    q: "Do we have to rip out our existing tools?",
    a: "No. We build inside the stack you already have — HubSpot, Notion, Google Workspace, Slack, your CRM. We add the connective tissue, not another bill.",
  },
  {
    q: "Do you do one-off projects or only retainers?",
    a: "Both. Most clients start with a defined build (4–8 weeks) then continue with us as their operating partner. The build alone is enough to leave with a working system.",
  },
];

function ContactPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-12 md:pt-32 md:pb-20">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-6 display-1 max-w-4xl">
          Let's talk about <span className="accent-underline">your operations.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Three ways to reach the Vektiss team. Pick whichever feels right — we read everything
          and respond within one business day.
        </p>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-3">
          {channels.map(({ Icon, label, body, cta, to, href }) => (
            <article
              key={label}
              className="rounded-xl border border-border bg-white p-8 shadow-card"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-xl font-semibold tracking-tight">{label}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
              {to ? (
                <Link
                  to={to}
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : href ? (
                <a
                  href={href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {cta}
                </a>
              ) : (
                <p className="mt-6 text-sm font-medium text-foreground">{cta}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-6 display-2">Common questions.</h2>
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
    </SiteLayout>
  );
}
