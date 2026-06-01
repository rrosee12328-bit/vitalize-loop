import { ArrowRight, Play } from "lucide-react";

export function WhoWeAreHero() {
  const scrollToVideo = () => {
    document
      .getElementById("vektiss-overview-video")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToSolutions = (e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById("solutions")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container-editorial relative py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Vektiss Technologies
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            We built the operating system{" "}
            <span className="text-primary">your business actually needs.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg text-muted-foreground md:text-xl">
            Operators are drowning in tools. We build the connected infrastructure
            that runs your business — Voice, Sites, Media, and Intelligence — all
            in one system, built in-house, built for you.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground/70 md:text-base">
            We didn't hire anyone to build our platform. We built our own AI, our
            own infrastructure, our own dashboard, and our own tools. Then we made
            it available to the businesses that need it most.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#solutions"
              onClick={scrollToSolutions}
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)]"
            >
              See What We Build
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={scrollToVideo}
              className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/15 bg-foreground/5 px-6 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/10"
            >
              <Play className="h-4 w-4" />
              Watch the Overview
            </button>
          </div>
        </div>

        {/* Video card */}
        <div
          id="vektiss-overview-video"
          className="mx-auto mt-14 max-w-5xl"
        >
          <div
            className="group relative overflow-hidden rounded-2xl border border-border shadow-card bg-surface-elevated"
            style={{ aspectRatio: "16 / 9" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button
                aria-label="Play Vektiss overview video"
                className="group/play relative flex h-20 w-20 items-center justify-center rounded-full bg-primary transition-transform hover:scale-110 md:h-24 md:w-24"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-30" />
                <Play className="relative h-8 w-8 fill-primary-foreground text-primary-foreground md:h-10 md:w-10" />
              </button>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Vektiss Overview — 90 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
