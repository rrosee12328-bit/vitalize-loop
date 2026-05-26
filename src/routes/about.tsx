import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Bot, Globe, Video } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vektiss" },
      {
        name: "description",
        content:
          "Vektiss is a systems company for operator-owners. We exist because growth-stage businesses don't need another tool — they need a working operating system.",
      },
      { property: "og:title", content: "About — Vektiss" },
      {
        property: "og:description",
        content: "Why Vektiss exists, who we serve, and what we believe.",
      },
    ],
  }),
  component: AboutPage,
});

const beliefs = [
  {
    title: "Systems beat heroics.",
    body: "Every business that scales eventually replaces hustle with infrastructure. We help you do that earlier.",
  },
  {
    title: "Tools aren't the answer.",
    body: "Adding another SaaS to a fractured stack doesn't fix the fracture. We build the connective tissue.",
  },
  {
    title: "Operators deserve clarity.",
    body: "If a CEO can't see how their business is running in real time, the business is running them.",
  },
  {
    title: "Speed is a feature.",
    body: "Six-month implementations are why operators give up on systems. We ship in weeks.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-16 md:pt-32 md:pb-24">
        <p className="eyebrow">About</p>
        <h1 className="mt-6 display-1 max-w-5xl">
          We exist because operators are <br className="hidden md:block" />
          <span className="accent-underline">drowning in tools</span> and starving for systems.
        </h1>
      </section>

      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">Who we are</p>
            </div>
            <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground">
              <p>
                Vektiss is a systems company. Not an agency. Not a SaaS. We build the connected
                operating infrastructure that growth-stage businesses run on.
              </p>
              <p>
                Our team has spent careers inside the operator-owner seat — running ops, scaling
                revenue functions, and shipping the systems that make scale possible. We saw the
                same pattern over and over: businesses outgrowing their tools, teams duct-taping
                processes together, and CEOs flying blind.
              </p>
              <p>
                So we built Vektiss to do one thing: build the operating system you actually need,
                in weeks, integrated into the tools you already have.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow">What we believe</p>
          <h2 className="mt-6 display-2">Four principles. Every engagement.</h2>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {beliefs.map((b, i) => (
            <article key={b.title} className="bg-background p-8 md:p-10">
              <span className="font-mono text-xs tracking-widest text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-3 text-muted-foreground">{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="display-2">Let's see if we're a fit.</h2>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                30 minutes. Bring your messiest operational headache. We'll either point you toward
                a system that solves it — or tell you honestly that we're not the right partner.
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
