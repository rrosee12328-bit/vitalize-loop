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
      deepDive={[
        {
          title: "Phone coverage that feels trained on your business",
          desc: "The assistant answers inbound calls with your service context, qualifying logic, tone, routing rules, and booking process so callers get a useful response instead of a generic bot experience.",
        },
        {
          title: "Email intake that removes repetitive admin work",
          desc: "Inbound messages are classified, summarized, prioritized, and drafted so your team can approve the right response quickly while still keeping control over sensitive conversations.",
        },
        {
          title: "Escalation rules that protect the customer experience",
          desc: "High-intent leads, urgent support issues, edge cases, and VIP conversations are routed to the right person with context, transcript, summary, and recommended next action.",
        },
      ]}
      implementation={[
        {
          phase: "01",
          title: "Audit communication flows",
          desc: "We map call types, email categories, lead qualification criteria, escalation paths, and common questions.",
        },
        {
          phase: "02",
          title: "Train and configure assistants",
          desc: "We build the scripts, knowledge base, routing logic, inbox workflow, approval steps, and booking handoffs.",
        },
        {
          phase: "03",
          title: "Launch with guardrails",
          desc: "We test real scenarios, monitor early conversations, tune responses, and hand your team a reliable operating process.",
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
