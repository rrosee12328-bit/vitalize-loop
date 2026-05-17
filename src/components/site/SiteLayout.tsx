import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Collect targets: direct children of every <section> inside <main>,
    // plus grid/list items one level deeper (cards, steps, pillars).
    const targets = new Set<HTMLElement>();
    const sections = document.querySelectorAll<HTMLElement>("main section");
    sections.forEach((section) => {
      Array.from(section.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Reveal immediately for anything already in view (hero, above the fold)
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add("in-view");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
