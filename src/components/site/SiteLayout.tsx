import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TechLinesBackground } from "@/components/TechLinesBackground";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hash) {
      // Defer to allow target to mount
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo(0, 0);
      });
    } else {
      window.scrollTo(0, 0);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Collect targets: direct children of every <section> inside <main>,
    // plus grid/list items one level deeper (cards, steps, pillars).
    const targets = new Set<HTMLElement>();
    const sections = document.querySelectorAll<HTMLElement>("main section");
    sections.forEach((section) => {
      Array.from(section.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
        if (child.dataset.noReveal !== undefined || child.classList.contains("marquee-track")) return;
        targets.add(child);
        // One level of nested grid/flex children (cards, steps)
        child.querySelectorAll<HTMLElement>(
          ":scope > .grid > *, :scope > ol > *, :scope > ul > *, :scope > div > .grid > *",
        ).forEach((c) => targets.add(c));
      });
    });

    targets.forEach((el, _v, _set) => {
      el.classList.add("reveal");
    });

    // Stagger siblings sharing a parent
    const parents = new Map<HTMLElement, HTMLElement[]>();
    targets.forEach((el) => {
      const p = el.parentElement;
      if (!p) return;
      if (!parents.has(p)) parents.set(p, []);
      parents.get(p)!.push(el);
    });
    parents.forEach((children) => {
      children.forEach((el, i) => {
        if (children.length > 1) {
          el.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
        }
      });
    });

    let lastY = window.scrollY;
    let scrollDir: "down" | "up" = "down";
    const onScroll = () => {
      const y = window.scrollY;
      scrollDir = y > lastY ? "down" : "up";
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // Direction the element is entering from determines the animation origin
            el.dataset.revealFrom = scrollDir === "down" ? "below" : "above";
            el.classList.add("in-view");
          } else {
            // Mark where it's exiting toward so next re-entry starts from the right side
            const rect = el.getBoundingClientRect();
            el.dataset.revealFrom = rect.top >= window.innerHeight ? "below" : "above";
            el.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, hash]);

  return (
    <div className="relative flex min-h-screen flex-col text-foreground">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-background">
        <TechLinesBackground />
      </div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
