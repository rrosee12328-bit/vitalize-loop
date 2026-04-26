import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

// 👉 Replace this with your real Cal.com or Calendly link.
// Examples:
//   Cal.com:   "https://cal.com/your-handle/strategy-call"
//   Calendly:  "https://calendly.com/your-handle/30min"
const SCHEDULER_URL = "https://cal.com/your-handle/strategy-call";

// Detect Cal.com vs Calendly so we can render the appropriate inline embed.
const isCalDotCom = /(^https?:\/\/)?(www\.)?cal\.com\//i.test(SCHEDULER_URL);
const isCalendly = /(^https?:\/\/)?(www\.)?calendly\.com\//i.test(SCHEDULER_URL);

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a strategy call — Vektiss" },
      {
        name: "description",
        content:
          "30 minutes with a Vektiss systems architect. Walk us through where your operations are stuck, leave with a map of the system you actually need.",
      },
      { property: "og:title", content: "Book a strategy call — Vektiss" },
      {
        property: "og:description",
        content: "Pick a time. Walk away with operational clarity, even if we never work together.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Book a strategy call</p>
            <h1 className="mt-6 display-1">
              30 minutes. <span className="accent-underline">Real clarity.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Pick a time on the calendar. Tell us what's stuck. Walk away with a map of the system
              you actually need — whether or not we end up working together.
            </p>

            <ul className="mt-10 space-y-5">
              <Feature
                icon={<Clock className="h-4 w-4" />}
                title="30 minutes, no slides"
                body="A working session, not a sales pitch."
              />
              <Feature
                icon={<MessageSquare className="h-4 w-4" />}
                title="Bring your messiest problem"
                body="The hand-off that keeps breaking. The lead source that goes dark. We'll dig in."
              />
              <Feature
                icon={<Calendar className="h-4 w-4" />}
                title="You own the outcome"
                body="You leave with notes and a recommended path. No obligation."
              />
            </ul>
          </div>

          <div className="md:col-span-7">
            <SchedulerEmbed />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4 border-t border-border pt-5">
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        {icon}
      </span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

function SchedulerEmbed() {
  // Cal.com and Calendly both support inline embeds via iframe.
  // For Cal.com we append /embed; for Calendly the regular URL works.
  let embedSrc: string | null = null;
  if (isCalDotCom) {
    embedSrc = SCHEDULER_URL.replace(/\/+$/, "") + "/embed";
  } else if (isCalendly) {
    embedSrc = SCHEDULER_URL;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {embedSrc ? (
        <iframe
          src={embedSrc}
          title="Schedule a strategy call"
          className="h-[720px] w-full"
          frameBorder={0}
        />
      ) : (
        <FallbackPanel />
      )}
      <div className="border-t border-border bg-surface-elevated px-6 py-4 text-xs text-muted-foreground">
        Trouble seeing the calendar?{" "}
        <a
          href={SCHEDULER_URL}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Open the scheduler in a new tab →
        </a>
      </div>
    </div>
  );
}

function FallbackPanel() {
  return (
    <div className="flex h-[720px] flex-col items-center justify-center px-8 text-center">
      <p className="eyebrow">Scheduler</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight">Pick a time</h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Click below to open our scheduling page. Once you've added your scheduler URL in
        <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/routes/book.tsx</code>
        the calendar will embed inline here.
      </p>
      <a
        href={SCHEDULER_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Open scheduler
      </a>
    </div>
  );
}
