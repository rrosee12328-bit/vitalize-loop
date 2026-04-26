import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";
import { AssistantMockup } from "@/components/site/FeatureMockups";

export const Route = createFileRoute("/solutions/ai-assistants")({
  head: () => ({
    meta: [
      { title: "AI Phone & Email Assistants — Vektiss" },
      {
        name: "description",
        content:
          "Embedded AI that answers calls, qualifies leads, drafts replies, and removes communication bottlenecks 24/7.",
      },
      { property: "og:title", content: "AI Phone & Email Assistants — Vektiss" },
      {
        property: "og:description",
        content: "Never let slow communication cost you another lead.",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      eyebrow="02 · AI Phone & Email Assistants"
      title={
        <>
          Never let slow communication <span className="accent-underline">cost another lead.</span>
        </>
      }
      lede="AI assistants qualify inbound requests, answer common questions, summarize conversations, and route priority moments to the right person — instantly, around the clock."
      Icon={Bot}
      Mockup={AssistantMockup}
      capabilities={[
        {
          name: "Inbound phone answering",
          desc: "An AI receptionist trained on your offering picks up every call, qualifies the caller, and books or routes them.",
        },
        {
          name: "Email triage and drafts",
          desc: "Inbound email is sorted, summarized, and replied to with a draft your team approves in seconds.",
        },
        {
          name: "Lead qualification",
          desc: "AI runs the qualifying questions you'd ask anyway — and only escalates the conversations worth your time.",
        },
        {
          name: "Smart routing & summaries",
          desc: "When a human is needed, the right person gets pinged with the full context, not a cold hand-off.",
        },
      ]}
      outcomes={[
        "Cut response time from hours to under a minute.",
        "Stop losing leads to faster competitors and after-hours gaps.",
        "Free up your team from repetitive triage and Q&A.",
        "Capture every conversation as searchable, structured data.",
      ]}
      builtFor={[
        "Service businesses losing leads to slow follow-up",
        "Teams overwhelmed by inbound email volume",
        "Operators who want 24/7 coverage without 24/7 staff",
        "Founders tired of being the support desk",
      ]}
      next={{ label: "Websites, Portals & Apps", to: "/solutions/websites-portals-apps" }}
    />
  ),
});
