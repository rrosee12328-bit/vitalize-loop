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
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0A0F1E" }}
    >
      {/* Subtle grid + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.25) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.25), transparent 60%)",
        }}
      />

      <div className="container-editorial relative py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#60A5FA" }}
          >
            Vektiss Technologies
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            We built the operating system{" "}
            <span style={{ color: "#60A5FA" }}>your business actually needs.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg text-white/75 md:text-xl">
            Operators are drowning in tools. We build the connected infrastructure
            that runs your business — Voice, Sites, Media, and Intelligence — all
            in one system, built in-house, built for you.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-white/55 md:text-base">
            We didn't hire anyone to build our platform. We built our own AI, our
            own infrastructure, our own dashboard, and our own tools. Then we made
            it available to the businesses that need it most.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#solutions"
              onClick={scrollToSolutions}
              className="group inline-flex h-12 items-center gap-2 rounded-md px-6 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)]"
              style={{ backgroundColor: "#2563EB" }}
            >
              See What We Build
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={scrollToVideo}
              className="inline-flex h-12 items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
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
            className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #0f1729 0%, #0A0F1E 50%, #0a1530 100%)",
              aspectRatio: "16 / 9",
            }}
          >
            {/* Decorative grid behind */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(37,99,235,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.18) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button
                aria-label="Play Vektiss overview video"
                className="group/play relative flex h-20 w-20 items-center justify-center rounded-full transition-transform hover:scale-110 md:h-24 md:w-24"
                style={{ backgroundColor: "#2563EB" }}
              >
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-30"
                  style={{ backgroundColor: "#2563EB" }}
                />
                <Play className="relative h-8 w-8 fill-white text-white md:h-10 md:w-10" />
              </button>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                Vektiss Overview — 90 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
