import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  FileText,
  PhoneCall,
} from "lucide-react";
import { DashboardPreview } from "@/components/site/ai-assistants/DashboardPreview";

const steps = [
  {
    Icon: PhoneCall,
    label: "Call Comes In",
    sub: "AI answers in under 2 seconds, 24/7",
  },
  {
    Icon: FileText,
    label: "Form Sent to Caller",
    sub: "AI texts or emails the caller your intake form, application, or quote request — mid-call or immediately after",
  },
  {
    Icon: BellRing,
    label: "You Get an Alert",
    sub: "Instant email to you — caller name, number, what they asked, and a link to the call recording",
  },
  {
    Icon: BarChart3,
    label: "Dashboard Updated",
    sub: "Every call, form sent, and outcome is logged automatically. Nothing falls through the cracks.",
  },
];

export function VoiceLoopSection() {
  return (
    <section className="border-b border-border bg-[#0F172A] text-white">
      <div className="container-editorial py-24 md:py-32">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="font-mono text-[11px] tracking-[0.18em] text-primary">
            VEKTISS VOICE — THE FULL LOOP
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            From missed call to qualified lead — automatically.
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Vektiss Voice does not just answer the phone. It captures the
            caller's need, sends them the right form or intake link, emails you
            a full summary, and logs everything in your dashboard. Here is what
            that looks like in real time.
          </p>
        </div>

        {/* Loop diagram */}
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, label, sub }, i) => (
            <div key={label} className="relative">
              <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/15 text-[#60A5FA]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-white/50">
                    STEP {i + 1}
                  </div>
                </div>
                <div className="mt-4 text-sm font-semibold text-white">
                  {label}
                </div>
                <p className="mt-1.5 text-xs leading-snug text-white/65">
                  {sub}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-4 -translate-y-1/2 translate-x-full overflow-hidden bg-white/15 lg:block"
                >
                  <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent animate-flow-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Email + Dashboard */}
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
          {/* Email mockup */}
          <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-2xl shadow-black/40 overflow-hidden">
            <div className="border-b border-border bg-surface-elevated px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/70" />
                <span className="ml-3 text-[11px] text-muted-foreground">
                  Inbox · New message
                </span>
              </div>
            </div>
            <div className="px-5 py-4 md:px-6">
              <div className="space-y-1.5 text-xs">
                <div className="flex gap-2">
                  <span className="w-14 shrink-0 text-muted-foreground">From</span>
                  <span className="text-foreground">
                    Vektiss Voice{" "}
                    <span className="text-muted-foreground">
                      &lt;alerts@vektiss.com&gt;
                    </span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-14 shrink-0 text-muted-foreground">To</span>
                  <span className="text-foreground">you@yourbusiness.com</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-14 shrink-0 text-muted-foreground">
                    Subject
                  </span>
                  <span className="font-semibold text-foreground">
                    📞 New Lead — Intake Form Sent — (214) 555-0182
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-border px-5 py-5 md:px-6 md:py-6">
              <p className="text-sm font-semibold text-foreground">
                New caller alert from Vektiss Voice
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-muted-foreground">Caller</dt>
                  <dd className="font-mono tabular-nums text-foreground">
                    (214) 555-0182
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-muted-foreground">Time</dt>
                  <dd className="text-foreground">Today at 3:14 PM</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-muted-foreground">
                    Call length
                  </dt>
                  <dd className="text-foreground">2m 18s</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-muted-foreground">
                    What they asked
                  </dt>
                  <dd className="text-foreground">
                    Pricing for a 3-bedroom renovation project. Wants a quote ASAP.
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-muted-foreground">
                    Action taken
                  </dt>
                  <dd className="text-foreground">
                    Intake form sent to caller via email during call.
                  </dd>
                </div>
                <div className="flex items-start gap-2">
                  <dt className="w-32 shrink-0 text-muted-foreground">Status</dt>
                  <dd>
                    <span className="inline-flex items-center rounded-full border border-[#EF4444]/30 bg-[#EF4444]/15 px-2 py-0.5 text-[11px] font-medium text-[#B91C1C]">
                      🔴 Hot Lead — Follow-up recommended within 1 hour
                    </span>
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4 text-sm font-medium">
                <a className="inline-flex items-center gap-1 text-primary hover:underline" href="#">
                  Listen to Recording <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a className="inline-flex items-center gap-1 text-primary hover:underline" href="#">
                  View in Dashboard <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Dashboard */}
          <DashboardPreview />
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.06] px-6 py-5 md:mt-12">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="text-base text-white/90 md:text-lg">
              Every call. Every form. Every follow-up. All handled — and all
              visible to you.
            </p>
            <Link
              to="/solutions/ai-assistants"
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              See Vektiss Voice Plans
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
