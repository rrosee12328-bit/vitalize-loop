import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";
import { PortalMockup } from "@/components/site/FeatureMockups";

export const Route = createFileRoute("/solutions/websites-portals-apps")({
  head: () => ({
    meta: [
      { title: "Websites, Portals & Apps — Vektiss" },
      {
        name: "description",
        content:
          "Marketing site, client portal, and internal apps built as one connected experience. Capture leads, onboard clients, and run delivery without bolting on another tool.",
      },
      { property: "og:title", content: "Websites, Portals & Apps — Vektiss" },
      {
        property: "og:description",
        content: "A digital front door — and the systems behind it.",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      eyebrow="03 · Websites, Portals & Apps"
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
      next={{ label: "Business Media", to: "/solutions/business-media" }}
    />
  ),
});
