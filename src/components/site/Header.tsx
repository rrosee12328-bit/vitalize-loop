import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, Bot, ChevronDown, Globe, Menu, Video, X } from "lucide-react";
import { VektissLogo } from "./VektissLogo";

const navItems = [
  { to: "/how-we-work", label: "How we work" },
  { to: "/case-studies", label: "Case studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const solutions = [
  {
    to: "/solutions/project-intelligence",
    label: "Project Intelligence",
    desc: "Live visibility across every initiative.",
    Icon: BarChart3,
  },
  {
    to: "/solutions/ai-assistants",
    label: "AI Phone & Email Assistants",
    desc: "Always-on lead qualification and follow-up.",
    Icon: Bot,
  },
  {
    to: "/solutions/websites-portals-apps",
    label: "Websites, Portals & Apps",
    desc: "Marketing site, client portal, internal apps.",
    Icon: Globe,
  },
  {
    to: "/solutions/business-media",
    label: "Business Media",
    desc: "Founder content, video, AI avatars.",
    Icon: Video,
  },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-editorial flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="Vektiss home">
          <VektissLogo className="h-11 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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
        </nav>

        <div className="hidden md:block">
          <Link
            to="/book"
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book a strategy call
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
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
              to="/book"
              className="mt-3 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              onClick={() => setOpen(false)}
            >
              Book a strategy call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
