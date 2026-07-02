import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
// TechLinesBackground is provided site-wide via SiteLayout
import { LiveCallDemo } from "@/components/site/ai-assistants/LiveCallDemo";
import { DashboardPreview } from "@/components/site/ai-assistants/DashboardPreview";
import { WhoWeAreHero } from "@/components/site/WhoWeAreHero";
import { TestimonialsTicker } from "@/components/site/TestimonialsTicker";

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

const faqs = [
  {
    q: "How much does Vektiss Voice cost?",
    a: "Vektiss Voice is a custom implementation, not a one-size-fits-all subscription. Implementation starts at $5,000, and monthly management starts at $1,250. Final pricing depends on call volume, departments, integrations, SMS/email workflows, reporting needs, and support level.",
  },
  {
    q: "Why don't you offer cheap monthly plans?",
    a: "A premium AI front-office system requires discovery, workflow design, knowledge base setup, testing, monitoring, and ongoing optimization. We are not trying to be the cheapest AI phone option. We work with businesses that want a managed system built around how they actually operate.",
  },
  {
    q: "Is Vektiss only an AI phone company?",
    a: "No. Vektiss builds AI-powered business systems across Voice, Apps, Portals, and Intelligence. Voice is often the entry point, but we can also help businesses build custom workflows, dashboards, client portals, internal tools, and AI-powered decision systems.",
  },
  {
    q: "Who is Vektiss best for?",
    a: "Vektiss is best for businesses where missed calls, slow response, poor intake, scattered tools, or manual follow-up are costing time or revenue. We are a fit for companies that want AI implemented into their business operations, not businesses looking for the cheapest tool available.",
  },
  {
    q: "What does Vektiss actually do?",
    a: "Vektiss builds AI-powered business systems that help companies save time, capture leads, and operate with more clarity. That can include Vektiss Voice, email assistants, websites, client portals, internal dashboards, automations, apps, and business media systems.",
  },
  {
    q: "What is Vektiss Voice?",
    a: "Vektiss Voice is an AI voice assistant for your business. It can answer calls, respond to common questions, collect caller information, qualify leads, route urgent requests, and send summaries to your team.",
  },
  {
    q: "Can Vektiss Voice answer calls for my business?",
    a: "Yes. Vektiss Voice can answer incoming calls based on your business information, services, FAQs, pricing, availability, and instructions. It helps make sure your business is not missing calls, leads, or opportunities when your team is busy.",
  },
  {
    q: "Will Vektiss Voice replace my team?",
    a: "No. Vektiss Voice is designed to support your team, not replace them. It handles repetitive calls, basic questions, intake, and routing so your team can focus on sales, service, and decisions that need a real person.",
  },
  {
    q: "Can Vektiss Voice transfer calls to a real person?",
    a: "Yes. Vektiss Voice can be set up to transfer calls, escalate urgent requests, or notify your team when a human needs to step in. The goal is not to trap people in automation. The goal is to make sure every call gets handled the right way.",
  },
  {
    q: "Is Vektiss only a voice assistant company?",
    a: "No. Vektiss Voice is one part of the larger Vektiss system. We can also build the follow-up, email automation, landing pages, portals, dashboards, and workflows around it so your business can manage what happens after the call.",
  },
  {
    q: "Do I have to replace the tools I already use?",
    a: "No. In most cases, Vektiss builds around the tools your business already uses. The goal is to connect your calls, emails, forms, leads, projects, and client communication into a cleaner system instead of forcing you to start over.",
  },
  {
    q: "What kind of businesses is Vektiss Voice for?",
    a: "Vektiss Voice is for service businesses, founders, operators, and growing teams that miss calls, lose leads, answer the same questions repeatedly, rely too much on manual follow-up, or need a faster way to respond to customers.",
  },
  {
    q: "What makes Vektiss different from buying another AI phone tool?",
    a: "Most tools give you software. Vektiss helps build the system around your business. We help set up the voice assistant, train it on your business information, connect your follow-up, organize your workflows, and make sure it works in real life.",
  },
  {
    q: "How do we get started?",
    a: "Start by booking a strategy call. We'll look at where your business is missing calls, losing time, or handling too much manually. From there, we'll recommend the first system to build and show you how Vektiss Voice or another Vektiss solution can help.",
  },
];


function HomePage() {
  const hash = useRouterState({ select: (s) => s.location.hash });

  // Scroll to #voice-pricing when navigated with that hash
  useEffect(() => {
    if (hash === "voice-pricing") {
      requestAnimationFrame(() => {
        document
          .getElementById("voice-pricing")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [hash]);





  // Ensure only one Bunny Stream iframe plays at a time.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const getFrames = () =>
      Array.from(
        document.querySelectorAll<HTMLIFrameElement>(
          'iframe[src*="iframe.mediadelivery.net"]',
        ),
      );

    // Subscribe each iframe to player.js 'play' events.
    const subscribe = () => {
      getFrames().forEach((f) => {
        f.contentWindow?.postMessage(
          JSON.stringify({
            context: "player.js",
            version: "0.0.12",
            method: "addEventListener",
            value: "play",
            listener: "vektiss-play",
          }),
          "*",
        );
      });
    };

    // Re-subscribe after each iframe loads.
    const frames = getFrames();
    frames.forEach((f) => f.addEventListener("load", subscribe));
    // Initial attempt in case frames are already loaded.
    const t = window.setTimeout(subscribe, 500);
    // Re-subscribe periodically in case the player drops listeners after pause.
    const interval = window.setInterval(subscribe, 2000);


    const onMessage = (e: MessageEvent) => {
      let data: any = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data || data.context !== "player.js" || data.event !== "play") return;
      getFrames().forEach((f) => {
        if (f.contentWindow !== e.source) {
          f.contentWindow?.postMessage(
            JSON.stringify({
              context: "player.js",
              version: "0.0.12",
              method: "pause",
            }),
            "*",
          );
        }
      });
    };
    window.addEventListener("message", onMessage);

    return () => {
      window.clearTimeout(t);
      window.clearInterval(interval);
      window.removeEventListener("message", onMessage);
      frames.forEach((f) => f.removeEventListener("load", subscribe));
    };

  }, []);

  return (
    <SiteLayout>
      <WhoWeAreHero />
      <TestimonialsTicker />

      {/* HERO — Live demo player leads */}
      <section id="solutions" className="relative container-editorial pt-12 pb-16 md:pt-20 md:pb-20">
        <div className="relative mx-auto mb-8 max-w-5xl text-center">
          <p className="eyebrow text-primary animate-fade-in-up">Watch how it works in 2 minutes. ↓</p>
          <h1 className="mt-4 display-1 animate-fade-in-up [animation-delay:120ms]">
            Your Business Answers Every Call.{" "}
            <span className="accent-underline">Even When You Can't.</span>
          </h1>
        </div>
        {/* VIDEO PLACEHOLDER — replace inner div with <video> or <iframe> */}
        <div className="mx-auto mb-12 max-w-5xl overflow-hidden rounded-2xl border border-border bg-black shadow-card animate-scale-in">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src="https://iframe.mediadelivery.net/embed/600055/13b49759-f4e9-437c-bf30-7b9454bd1424?autoplay=false&preload=true"
              loading="lazy"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              title="Vektiss Voice demo"
            />
          </div>
        </div>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow text-primary animate-fade-in-up">Vektiss Voice</p>
            <h2 className="mt-6 display-1 animate-fade-in-up [animation-delay:120ms]">
              Your business should never miss a call again.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground md:text-xl animate-fade-in-up [animation-delay:260ms]">
              Pick an industry and hear exactly what your customers would hear — 24/7, handled by AI, managed by us.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up [animation-delay:400ms]">
              <Link
                to="/solutions/ai-assistants"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="/apply"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/80 bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Apply for an implementation call
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {["Managed implementation", "Custom workflow design", "Ongoing optimization"].map((b, i) => (
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

      {/* VEKTISS VOICE IMPLEMENTATION */}
      <section id="voice-pricing" className="scroll-mt-20 border-y border-border bg-[#EFF6FF]">
        <div className="container-editorial py-16 md:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <p className="eyebrow text-primary">Vektiss Voice Implementation</p>
            <h2 className="display-2">
              A managed AI front-office system, not a plug-in phone tool.
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              Vektiss Voice is a managed AI front-office system for businesses that need calls, intake, routing, lead qualification, and customer response handled with speed and consistency.
            </p>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              This is not a plug-in phone tool. We design, build, test, and manage the workflow around how your business actually communicates with customers.
            </p>
            <a
              href="/apply"
              className="group mt-2 inline-flex h-14 items-center gap-2 rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-95 hover:shadow-xl"
            >
              Apply for an implementation call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>



      {/* INTERACTIVE DASHBOARD PREVIEW */}
      <section className="relative border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Inside the system</p>
            <h2 className="mt-5 display-2">
              Every call, message, and lead — captured in one live dashboard.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              See exactly what your AI handled overnight, who it followed up with, and what needs your attention today.
            </p>
          </div>
          <div className="mt-12">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* QUALIFICATION */}
      <section className="border-t border-border bg-[#EFF6FF]">
        <div className="container-editorial py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Who we work with</p>
            <h2 className="mt-6 display-2">
              Built for businesses with real operational demand.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Vektiss is built for companies that already have customer inquiries, inbound calls, lead flow, staff workload, or operational bottlenecks that need to move faster.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              We work best with law firms, med spas, clinics, professional service companies, and growing businesses that need AI implemented into their actual workflow — not just added as another tool.
            </p>
            <a
              href="/apply"
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-95"
            >
              Apply for an implementation call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-6 display-2">Vektiss, answered.</h2>
              <p className="mt-6 text-muted-foreground">
                Quick answers to what operators ask us most before getting started.
              </p>
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
            <a href="/apply" className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
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

