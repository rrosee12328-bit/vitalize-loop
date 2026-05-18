import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export type SolutionPageProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  Icon: LucideIcon;
  capabilities: { name: string; desc: string }[];
  deepDive: { title: string; desc: string }[];
  implementation: { phase: string; title: string; desc: string }[];
  outcomes: string[];
  builtFor: string[];
  Mockup: React.ComponentType;
  next: { label: string; to: "/solutions/project-intelligence" | "/solutions/ai-assistants" | "/solutions/websites-portals-apps" | "/solutions/business-media" };
};

export function SolutionPage({
  eyebrow,
  title,
  lede,
  Icon,
  capabilities,
  deepDive,
  implementation,
  outcomes,
  builtFor,
  Mockup,
  next,
}: SolutionPageProps) {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="container-editorial pt-20 pb-16 md:pt-32 md:pb-20">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <p className="eyebrow text-primary">{eyebrow}</p>
            </div>
            <h1 className="mt-6 display-1">{title}</h1>
            <p className="mt-8 text-lg text-muted-foreground md:text-xl">{lede}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="https://calendly.com/vektiss-info/30-minute-vektiss-discovery" target="_blank" rel="noopener noreferrer" className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/solutions"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-border px-6 text-sm font-medium text-foreground hover:bg-muted"
              >
                All solutions
              </Link>
            </div>
          </div>
          <div className="md:col-span-6">
            <Mockup />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow">What's included</p>
            <h2 className="mt-6 display-2">Capabilities, end-to-end.</h2>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            {capabilities.map((c, i) => (
              <article key={c.name} className="bg-background p-8 md:p-10">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{c.name}</h3>
                <p className="mt-3 text-muted-foreground">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Deep dive */}
      <section className="container-editorial py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Solution detail</p>
            <h2 className="mt-6 display-2">What this actually includes.</h2>
          </div>
          <div className="grid gap-6 md:col-span-8">
            {deepDive.map((item) => (
              <article key={item.title} className="border-t border-border pt-6">
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow">Implementation</p>
            <h2 className="mt-6 display-2">How it gets built into your business.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {implementation.map((step) => (
              <article key={step.phase} className="border-t border-border pt-6">
                <span className="font-mono text-xs tracking-widest text-primary">{step.phase}</span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + Built for */}
      <section className="container-editorial py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow">Outcomes</p>
            <h2 className="mt-6 display-2">What changes after rollout.</h2>
            <ul className="mt-10 space-y-4">
              {outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-3 border-t border-border pt-4 text-base text-foreground"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-xl border border-border bg-white p-8 shadow-card md:p-10">
              <p className="eyebrow text-primary">Built for</p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {builtFor.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6">
                <Link
                  to={next.to}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  Next: {next.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="display-2">See it inside your business.</h2>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Book a 30-minute call. We'll map exactly how this slots into the tools and team
                you already have.
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
        </div>
      </section>
    </SiteLayout>
  );
}
