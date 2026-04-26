import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";
import { ProjectMockup } from "@/components/site/FeatureMockups";

export const Route = createFileRoute("/solutions/project-intelligence")({
  head: () => ({
    meta: [
      { title: "Project Intelligence — Vektiss" },
      {
        name: "description",
        content:
          "The CEO dashboard you've never had. Live initiative status, AI summaries, and risk flags across every project — without another tool.",
      },
      { property: "og:title", content: "Project Intelligence — Vektiss" },
      {
        property: "og:description",
        content: "Real-time visibility into every initiative, deadline, and decision.",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      eyebrow="01 · Project Intelligence"
      title={
        <>
          The CEO dashboard <span className="accent-underline">you've never had.</span>
        </>
      }
      lede="Instead of scattered updates across emails and spreadsheets, get a shared system where AI summarizes progress, flags next steps, and keeps leadership informed in real time."
      Icon={BarChart3}
      Mockup={ProjectMockup}
      capabilities={[
        {
          name: "Live initiative tracking",
          desc: "Every project, owner, deadline, and blocker in one view — synced from the tools your team already uses.",
        },
        {
          name: "AI weekly summaries",
          desc: "An AI brief lands every Monday: what shipped, what slipped, where leadership attention is needed.",
        },
        {
          name: "Risk and blocker flagging",
          desc: "The system surfaces stalled work and dependency risks before they become escalations.",
        },
        {
          name: "Throughput metrics",
          desc: "Velocity, cycle time, and load by team — so you can see where capacity actually lives.",
        },
      ]}
      outcomes={[
        "Replace 3–4 standing status meetings with a live dashboard.",
        "Cut leadership reporting prep from hours to zero.",
        "Spot at-risk work days earlier, not weeks later.",
        "Give every team a single source of truth for priorities.",
      ]}
      builtFor={[
        "Operator-CEOs who can't see across teams",
        "Heads of Ops drowning in status reports",
        "Leadership teams running 4+ weekly syncs",
        "Companies with 3+ tools holding project data",
      ]}
      next={{ label: "AI Phone & Email Assistants", to: "/solutions/ai-assistants" }}
    />
  ),
});
