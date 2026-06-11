import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function WhoWeAreHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-editorial relative py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Who we are
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Vektiss is a systems company.
          </h1>

          <div className="mx-auto mt-7 max-w-5xl overflow-hidden rounded-2xl border border-border bg-black shadow-card">
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src="https://iframe.mediadelivery.net/embed/600055/8f7d646f-fe98-4481-983e-067c5493f5f5?autoplay=true&preload=true"
                loading="lazy"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                title="Vektiss hero video"
              />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-5 text-left text-lg text-muted-foreground md:text-xl">
            <p>
              We build the connected operating infrastructure that growth-stage
              businesses use to run, respond, create, manage, and scale with more
              clarity.
            </p>
            <p>We are not an agency that only delivers services.</p>
            <p>We are not another SaaS tool that adds more complexity.</p>
            <p>
              We are builders, operators, and system thinkers who design the
              infrastructure behind how a business actually works.
            </p>
            <p>
              The idea for Vektiss comes from a simple belief: growing businesses
              do not just need more tools. They need leverage.
            </p>
            <p>That belief is built into our name.</p>
            <p>
              Vektiss comes from the Latin word <em>vectis</em>, meaning “lever.”
              A lever helps you move more with less wasted force. That is what we
              believe technology should do for operators. It should multiply time,
              thinking, execution, and capacity.
            </p>
            <p>We built Vektiss to be that lever.</p>
            <p>
              Through AI, automation, websites, client portals, project
              intelligence, and media systems, we help businesses connect the parts
              of their operation that usually stay scattered.
            </p>
            <p>
              Because when your systems are connected, your team moves faster, your
              customers get served better, and you can lead the business with more
              visibility instead of more chaos.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/solutions"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)]"
            >
              See our solutions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
