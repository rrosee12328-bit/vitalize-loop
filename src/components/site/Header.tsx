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
    <header className="sticky top-0 z-40">
      {/* Floating glassmorphic capsule */}
      <div className="container-editorial pt-4 pb-2 md:pt-5">
        <nav className="relative mx-auto flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 px-3 pr-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl md:h-16 md:px-5">
          {/* Inner top highlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            aria-label="Vektiss home"
            className="group flex items-center gap-2 pl-1"
          >
            <span className="relative inline-flex">
              <VektissLogo variant="light" className="h-7 w-auto md:h-8" />
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[#0088FF]/30 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
            </span>
          </Link>

          {/* Center nav */}
          <div className="hidden items-center gap-7 lg:flex xl:gap-8">
            {/* Solutions dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <Link
                to="/solutions"
                className="group inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
                activeProps={{ className: "text-white" }}
              >
                Solutions
                <ChevronDown
                  className={`h-3.5 w-3.5 text-white/40 transition-all group-hover:text-white ${solutionsOpen ? "rotate-180" : ""}`}
                />
              </Link>
              {solutionsOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-4">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/50 backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {solutions.map(({ to, label, desc, Icon }) => (
                        <Link
                          key={to}
                          to={to}
                          className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/[0.06]"
                        >
                          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#0088FF]/15 text-[#0088FF]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-white">
                              {label}
                            </span>
                            <span className="mt-0.5 block text-xs text-white/55">
                              {desc}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-white/10 bg-white/[0.03] px-4 py-2.5">
                      <Link
                        to="/solutions"
                        className="text-xs font-medium text-[#0088FF] hover:underline"
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
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                activeProps={{ className: "text-white" }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Pricing pill */}
            <Link
              to="/"
              hash="voice-pricing"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("vektiss:open-pricing"));
                }
              }}
              className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 transition-colors hover:border-white/20 hover:bg-white/[0.08] md:inline-flex"
            >
              <div className="flex items-center gap-2 border-r border-white/10 pr-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0088FF] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0088FF] shadow-[0_0_8px_rgba(0,136,255,0.9)]" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  Pricing
                </span>
              </div>
              <div className="text-[11px] font-medium tabular-nums">
                <span className="text-white/40">from</span>
                <span className="ml-1 text-white">$45.99</span>
                <span className="text-white/40">/mo</span>
              </div>
            </Link>

            {/* CTA */}
            <a
              href="https://voice.vektiss.com/get-started"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 cursor-pointer items-center whitespace-nowrap rounded-xl bg-[#0088FF] px-5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,136,255,0.3)] transition-all hover:bg-[#0095FF] hover:shadow-[0_0_30px_rgba(0,136,255,0.55)] active:scale-95 lg:inline-flex"
            >
              Get Started
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden mt-2 rounded-2xl border border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-black/50">
            <div className="flex flex-col gap-1 p-4">
              <p className="px-2 pt-1 pb-1 text-[10px] font-mono uppercase tracking-widest text-white/40">
                Solutions
              </p>
              {solutions.map(({ to, label, Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-white/85 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4 text-[#0088FF]" />
                  {label}
                </Link>
              ))}
              <p className="mt-2 px-2 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-white/40">
                Company
              </p>
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-md px-2 py-2 text-sm text-white/85 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/"
                hash="voice-pricing"
                onClick={() => {
                  setOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("vektiss:open-pricing"));
                  }
                }}
                className="mt-3 inline-flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0088FF] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0088FF]" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    Pricing
                  </span>
                </span>
                <span className="text-xs tabular-nums">
                  <span className="text-white/40">from</span>{" "}
                  <span className="text-white">$45.99</span>
                  <span className="text-white/40">/mo</span>
                </span>
              </Link>
              <a
                href="https://voice.vektiss.com/get-started"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-[#0088FF] px-4 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,136,255,0.3)]"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
