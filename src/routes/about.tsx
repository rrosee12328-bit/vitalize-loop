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
              <p className="text-foreground font-medium">
                Vektiss is a systems company.
              </p>
              <p>
                We build the connected operating infrastructure that growth-stage businesses use to run, respond, create, manage, and scale with more clarity.
              </p>
              <p>
                We are not an agency that only delivers services.
              </p>
              <p>
                We are not another SaaS tool that adds more complexity.
              </p>
              <p>
                We are builders, operators, and system thinkers who design the infrastructure behind how a business actually works.
              </p>
              <p>
                The idea for Vektiss comes from a simple belief: growing businesses do not just need more tools. They need leverage.
              </p>
              <p>
                That belief is built into our name.
              </p>
              <p>
                Vektiss comes from the Latin word <em>vectis</em>, meaning “lever.” A lever helps you move more with less wasted force. That is what we believe technology should do for operators. It should multiply time, thinking, execution, and capacity.
              </p>
              <p>
                We built Vektiss to be that lever.
              </p>
              <p>
                Through AI, automation, websites, client portals, project intelligence, and media systems, we help businesses connect the parts of their operation that usually stay scattered.
              </p>
              <p>
                Because when your systems are connected, your team moves faster, your customers get served better, and you can lead the business with more visibility instead of more chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE FOUR PILLARS */}
      <section className="border-t border-border">
        <div className="container-editorial py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow">The four pillars</p>
            <h2 className="mt-6 display-2">
              One integrated system. Not four siloed tools.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[
              {
                no: "01",
                to: "/solutions/ai-assistants" as const,
                name: "Vektiss Voice",
                kicker: "AI Phone System",
                desc: "Answers every call, qualifies leads, sends intake forms, and emails you a full summary — 24/7, done for you.",
                Icon: Bot,
              },
              {
                no: "02",
                to: "/solutions/project-intelligence" as const,
                name: "Vektiss Intelligence",
                kicker: "Business Intelligence & Project Management",
                desc: "Real-time visibility into every initiative, deadline, and decision across your operation.",
                Icon: BarChart3,
              },
              {
                no: "03",
                to: "/solutions/websites-portals-apps" as const,
                name: "Vektiss Sites",
                kicker: "Websites, Portals & Apps",
                desc: "A digital front door built to capture leads, serve clients, and support operations — all connected.",
                Icon: Globe,
              },
              {
                no: "04",
                to: "/solutions/business-media" as const,
                name: "Vektiss Media",
                kicker: "Content, Video & Marketing",
                desc: "Turn your expertise into assets — short-form video, AI avatars, and content systems that build trust at scale.",
                Icon: Video,
              },
            ].map(({ no, to, name, kicker, desc, Icon }) => (
              <Link
                key={no}
                to={to}
                className="group rounded-xl border border-border bg-white p-8 shadow-card transition-shadow hover:shadow-md md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-widest text-primary">{no}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
                <div className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{name}</h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{kicker}</p>
                <p className="mt-3 text-muted-foreground">{desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                  Open solution page
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
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
