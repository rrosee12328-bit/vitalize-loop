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
      deepDive={[
        {
          title: "A leadership view that replaces scattered status updates",
          desc: "Project Intelligence gives owners, deadlines, blockers, priorities, and decisions a single operating layer so leadership can see what is happening without chasing updates across meetings, messages, and spreadsheets.",
        },
        {
          title: "AI summaries built around how your company actually runs",
          desc: "We configure the system around your teams, cadence, tools, and reporting language so weekly briefs surface the work that matters: what shipped, what slipped, what changed, and what needs executive attention.",
        },
        {
          title: "Risk visibility before work becomes an escalation",
          desc: "The dashboard highlights missed deadlines, stalled initiatives, overloaded owners, dependency issues, and recurring blockers so your team can intervene early instead of discovering problems during review meetings.",
        },
      ]}
      implementation={[
        {
          phase: "01",
          title: "Map the operating rhythm",
          desc: "We document your projects, teams, reporting cadence, decision paths, and the tools currently holding project data.",
        },
        {
          phase: "02",
          title: "Build the dashboard layer",
          desc: "We design the executive view, configure status logic, connect your sources, and create summaries that match your leadership priorities.",
        },
        {
          phase: "03",
          title: "Roll out the management system",
          desc: "We launch with your team, train owners on updates, and refine the alerts and briefs based on real usage.",
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
