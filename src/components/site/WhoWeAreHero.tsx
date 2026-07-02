import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function WhoWeAreHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-editorial relative py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Vektiss Technologies
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            We built the operating system{" "}
            <span className="text-primary">your business actually needs.</span>
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

          <p className="mx-auto mt-7 max-w-3xl text-lg text-muted-foreground md:text-xl">
            Vektiss helps growing businesses build AI-powered systems that communicate faster, operate cleaner, and make smarter decisions.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground/70 md:text-base">
            We didn't hire anyone to build our platform. We built our own AI, our
            own infrastructure, our own dashboard, and our own tools. Then we made
            it available to the businesses that need it most.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/solutions"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)]"
            >
              See our solutions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/apply"
              className="group inline-flex h-12 items-center gap-2 rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.25)]"
            >
              Book a call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
