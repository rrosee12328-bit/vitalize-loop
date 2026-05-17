import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";
import { PortalMockup } from "@/components/site/FeatureMockups";

export const Route = createFileRoute("/solutions/websites-portals-apps")({
  head: () => ({
    meta: [
      { title: "Vektiss Sites — Vektiss" },
      {
        name: "description",
        content:
          "Marketing site, client portal, and internal apps built as one connected experience. Capture leads, onboard clients, and run delivery without bolting on another tool.",
      },
      { property: "og:title", content: "Vektiss Sites — Vektiss" },
      {
        property: "og:description",
        content: "A digital front door — and the systems behind it.",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      eyebrow="03 · Vektiss Sites"
      title={
        <>
          A digital front door — <span className="accent-underline">and the rooms behind it.</span>
        </>
      }
      lede="Marketing site, client portal, and internal apps built as one connected experience. Capture leads, onboard clients, and run delivery without bolting on another tool."
      Icon={Globe}
      Mockup={PortalMockup}
      capabilities={[
        {
          name: "Conversion-focused marketing site",
          desc: "A site that actually does the job — clear positioning, fast performance, and built to convert qualified visitors.",
        },
        {
          name: "Branded client portal",
          desc: "Where clients log in, see status, share files, and message your team. No more digging through email threads.",
        },
        {
          name: "Custom internal apps",
          desc: "Replace the spreadsheets, Notion docs, and ad-hoc forms your team holds together with proper workflows.",
        },
        {
          name: "Connected back end",
          desc: "Site, portal, and apps share one data layer — leads, clients, and projects flow without manual re-entry.",
        },
      ]}
      deepDive={[
        {
          title: "A website that explains the business, not just a landing page",
          desc: "We build a polished web presence with clear service architecture, credible proof, strong navigation, and content depth so visitors can understand what you do without being pushed through a generic funnel.",
        },
        {
          title: "Client systems that make delivery feel premium",
          desc: "Portals give clients a central place to view progress, submit information, access documents, approve work, and communicate with your team instead of relying on scattered email threads.",
        },
        {
          title: "Apps that replace fragile internal workflows",
          desc: "We turn the operational pieces currently living in spreadsheets, forms, and disconnected tools into clean internal apps with permissions, status tracking, automations, and shared data.",
        },
      ]}
      implementation={[
        {
          phase: "01",
          title: "Define the site and system map",
          desc: "We map audiences, conversion paths, client workflows, internal processes, integrations, and the data that needs to move between them.",
        },
        {
          phase: "02",
          title: "Design and build the connected experience",
          desc: "We create the marketing site, portal views, app workflows, database structure, and automations as one cohesive system.",
        },
        {
          phase: "03",
          title: "Deploy, train, and improve",
          desc: "We launch the experience, onboard your team, review user behavior, and refine the system around real client and operator usage.",
        },
      ]}
      outcomes={[
        "One platform replaces 4–6 disconnected tools.",
        "Clients get a real portal — not a Drive folder.",
        "New leads land in your CRM with full context attached.",
        "Internal teams stop tracking work in spreadsheets.",
      ]}
      builtFor={[
        "Operator-owners outgrowing template SaaS",
        "Service firms running clients out of email",
        "Teams holding ops together with spreadsheets",
        "Companies that want one stack, not seven",
      ]}
      next={{ label: "Vektiss Media", to: "/solutions/business-media" }}
    />
  ),
});
