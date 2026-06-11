import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, Bot, ChevronDown, Globe, Menu, Video, X } from "lucide-react";
import { VektissLogo } from "./VektissLogo";

const navItems = [
  { to: "/how-we-work", label: "How we work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const solutions = [
  {
    to: "/solutions/project-intelligence",
    label: "Vektiss Intelligence",
    desc: "Live visibility across every initiative.",
    Icon: BarChart3,
  },
  {
    to: "/solutions/ai-assistants",
    label: "Vektiss Voice",
    desc: "Always-on lead qualification and follow-up.",
    Icon: Bot,
  },
  {
    to: "/solutions/websites-portals-apps",
    label: "Vektiss Sites",
    desc: "Marketing site, client portal, internal apps.",
    Icon: Globe,
  },
  {
    to: "/solutions/business-media",
    label: "Vektiss Media",
    desc: "Founder content, video, AI avatars.",
    Icon: Video,
  },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-editorial flex h-24 items-center justify-between lg:h-28">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="Vektiss home">
          <VektissLogo className="h-16 w-auto lg:h-24" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {/* Solutions dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <Link
              to="/solutions"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Solutions <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            {solutionsOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-xl border border-border bg-background shadow-card">
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {solutions.map(({ to, label, desc, Icon }) => (
                      <Link
                        key={to}
                        to={to}
                        className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface-elevated"
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground">
                            {label}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {desc}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border bg-surface-elevated px-4 py-2.5">
                    <Link
                      to="/solutions"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Browse all solutions →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/"
            hash="voice-pricing"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("vektiss:open-pricing"));
              }
            }}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.06] hover:text-foreground hover:shadow-[0_10px_30px_-12px_rgba(0,136,255,0.55)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.06] to-transparent opacity-70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-16 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
            />
            <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,136,255,0.8)]" />
            </span>
            <span className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55 transition-colors group-hover:text-foreground/80">
              Pricing
            </span>
            <span aria-hidden className="relative h-3 w-px bg-foreground/15" />
            <span className="relative font-semibold tabular-nums">
              <span className="text-foreground/50">from</span>{" "}
              <span className="bg-gradient-to-r from-primary to-[#5cb8ff] bg-clip-text text-transparent">
                $45.99
              </span>
              <span className="text-foreground/40">/mo</span>
            </span>
          </Link>


        </nav>


        <div className="hidden lg:block">
          <a href="https://voice.vektiss.com/get-started" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center whitespace-nowrap rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-editorial flex flex-col gap-1 py-4">
            <p className="px-2 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Solutions
            </p>
            {solutions.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </Link>
            ))}
            <p className="mt-2 px-2 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Company
            </p>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="voice-pricing"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-between gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-medium text-foreground"
            >
              <span className="text-muted-foreground">Pricing</span>
              <span className="font-semibold text-primary">from $45.99/mo</span>
            </Link>
            <a href="https://voice.vektiss.com/get-started" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              onClick={() => setOpen(false)}
            >
              Get Started
            </a>

          </div>
        </div>
      )}
    </header>
  );
}
