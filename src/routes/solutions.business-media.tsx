import { createFileRoute } from "@tanstack/react-router";
import { Video } from "lucide-react";
import { SolutionPage } from "@/components/site/SolutionPage";
import { MediaMockup } from "@/components/site/FeatureMockups";

export const Route = createFileRoute("/solutions/business-media")({
  head: () => ({
    meta: [
      { title: "Business Media — Vektiss" },
      {
        name: "description",
        content:
          "Turn your expertise into income-producing assets. Founder video, short-form content, and AI avatars — produced inside a system, not a one-off project.",
      },
      { property: "og:title", content: "Business Media — Vektiss" },
      {
        property: "og:description",
        content: "Make your expertise visible at scale.",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      eyebrow="04 · Business Media"
      title={
        <>
          Turn expertise into <span className="accent-underline">income-producing assets.</span>
        </>
      }
      lede="We help shape video, founder-led content, and AI avatar assets so your expertise, proof, and process become visible at scale — and keep working for you long after they're shot."
      Icon={Video}
      Mockup={MediaMockup}
      capabilities={[
        {
          name: "Founder POV video pipeline",
          desc: "Recurring shoot days that produce a month of long-form and short-form content — without taking over your calendar.",
        },
        {
          name: "Short-form social cuts",
          desc: "Every long asset is cut into 8–12 short-form pieces optimized for the platforms your buyers actually scroll.",
        },
        {
          name: "AI avatar at scale",
          desc: "Use an avatar to localize, personalize, or extend founder content into pieces you'd never have time to shoot.",
        },
        {
          name: "Distribution & measurement",
          desc: "Publishing cadence, performance dashboards, and feedback loops so content compounds instead of disappearing.",
        },
      ]}
      deepDive={[
        {
          title: "A media system built around expertise",
          desc: "We turn founder knowledge, client results, operating principles, and market perspective into a repeatable content engine instead of disconnected one-off posts.",
        },
        {
          title: "Production designed for busy operators",
          desc: "The process is built to capture strong source material efficiently, then turn it into long-form assets, short-form clips, written posts, newsletters, and reusable sales content.",
        },
        {
          title: "AI-enabled scale without losing trust",
          desc: "AI avatars, repurposing workflows, and content automation help expand output while keeping messaging, proof, and brand voice grounded in real business expertise.",
        },
      ]}
      implementation={[
        {
          phase: "01",
          title: "Extract the point of view",
          desc: "We identify your strongest ideas, proof points, buyer questions, founder stories, and repeatable content themes.",
        },
        {
          phase: "02",
          title: "Build the production engine",
          desc: "We plan shoots, create scripts and prompts, produce core assets, cut derivative content, and prepare publishing workflows.",
        },
        {
          phase: "03",
          title: "Publish and compound",
          desc: "We distribute, measure performance, refine topics, and turn high-performing content into sales and brand assets.",
        },
      ]}
      outcomes={[
        "Founders produce months of content from one studio day.",
        "Short-form output multiplies without burning the team.",
        "Sales conversations open warmer — buyers already know you.",
        "Expertise becomes a defensible, on-platform asset.",
      ]}
      builtFor={[
        "Founders who should be visible but don't have time",
        "Service brands that need proof at scale",
        "Companies whose differentiation is the team itself",
        "Operators tired of one-off content sprints",
      ]}
      next={{ label: "Project Intelligence", to: "/solutions/project-intelligence" }}
    />
  ),
});
