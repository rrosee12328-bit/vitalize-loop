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
    sub: "AI asks for the caller's email, confirms it back, and sends your intake form, application, or quote request — mid-call or immediately after",
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
              <div
                className="h-full rounded-xl p-5 backdrop-blur"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-mono text-[10px] font-semibold tracking-widest text-[#3B82F6]">
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
        <div className="grid items-stretch gap-8 md:grid-cols-2 md:gap-10">
          {/* Email mockup */}
          <div
            className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-[#1E293B]"
            style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="px-5 py-3" style={{ background: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                <span className="ml-3 text-[11px] text-[#64748B]">
                  Inbox · New message
                </span>
              </div>
            </div>
            <div className="px-5 py-4 md:px-6">
              <div className="space-y-1.5 text-xs">
                <div className="flex gap-2 pb-1.5" style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <span className="w-14 shrink-0 text-[#64748B]">From</span>
                  <span className="text-[#1E293B]">
                    Vektiss Voice{" "}
                    <span className="text-[#64748B]">
                      &lt;alerts@vektiss.com&gt;
                    </span>
                  </span>
                </div>
                <div className="flex gap-2 pb-1.5" style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <span className="w-14 shrink-0 text-[#64748B]">To</span>
                  <span className="text-[#1E293B]">you@yourbusiness.com</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-14 shrink-0 text-[#64748B]">Subject</span>
                  <span className="font-semibold text-[#1E293B]">
                    📞 New Lead — Intake Form Sent — (214) 555-0182
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6" style={{ borderTop: "1px solid #F1F5F9" }}>
              <p className="text-sm font-semibold text-[#1E293B]">
                New caller alert from Vektiss Voice
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-[#64748B]">Caller</dt>
                  <dd className="font-mono tabular-nums text-[#1E293B]">
                    (214) 555-0182
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-[#64748B]">Time</dt>
                  <dd className="text-[#1E293B]">Today at 3:14 PM</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-[#64748B]">Call length</dt>
                  <dd className="text-[#1E293B]">2m 18s</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-[#64748B]">What they asked</dt>
                  <dd className="text-[#1E293B]">
                    Pricing for a 3-bedroom renovation project. Wants a quote ASAP.
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-32 shrink-0 text-[#64748B]">Action taken</dt>
                  <dd className="text-[#1E293B]">
                    Intake form emailed to caller at sarah.j@email.com during call.
                  </dd>
                </div>
                <div className="flex items-start gap-2">
                  <dt className="w-32 shrink-0 text-[#64748B]">Status</dt>
                  <dd>
                    <span
                      className="inline-flex items-center text-[11px] font-medium"
                      style={{
                        background: "#FEF2F2",
                        color: "#DC2626",
                        borderRadius: "4px",
                        padding: "2px 8px",
                      }}
                    >
                      🔴 Hot Lead — Follow-up recommended within 1 hour
                    </span>
                  </dd>
                </div>
              </dl>

              {/* Transcript snippet */}
              <div className="mt-5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#64748B]">
                    Call Transcript · Excerpt
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-[#94A3B8]">02:18 total</span>
                </div>
                <div className="space-y-2 text-[11px] leading-snug">
                  {[
                    { t: "00:02", who: "ai", text: "Thanks for calling Riverside Renovations, this is the Vektiss assistant. How can I help today?" },
                    { t: "00:07", who: "caller", text: "Hi, yeah — I'm looking to get a quote on renovating a three-bedroom house. Kitchen and two bathrooms mainly." },
                    { t: "00:18", who: "ai", text: "Got it — a three-bedroom remodel with kitchen and two baths. Are you hoping to start in the next 30 days, or further out?" },
                    { t: "00:26", who: "caller", text: "As soon as possible, honestly. We'd love something this month if you can swing it." },
                    { t: "00:33", who: "ai", text: "Perfect, I'll flag this as a priority. To send you our intake form and a written quote, can you please tell me your best email?" },
                    { t: "00:42", who: "caller", text: "Sure — it's sarah dot j at email dot com. That's s-a-r-a-h dot j." },
                    { t: "00:51", who: "ai", text: "Let me read that back to make sure I have it right — sarah.j@email.com. Is that correct?" },
                    { t: "00:58", who: "caller", text: "Yep, that's the one." },
                    { t: "01:02", who: "ai", text: "Great — I'm sending the intake form to sarah.j@email.com right now. You should see it in your inbox within a minute." },
                    { t: "01:10", who: "caller", text: "Awesome, thank you." },
                    { t: "01:13", who: "ai", text: "You're welcome. Once you fill it out, one of our project managers will follow up with a detailed quote within the hour. Anything else I can help with?" },
                  ].map((l, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="w-10 shrink-0 font-mono tabular-nums text-[10px] text-[#94A3B8]">{l.t}</span>
                      <p className="min-w-0 flex-1">
                        <span className={l.who === "ai" ? "font-semibold text-[#2563EB]" : "font-semibold text-[#475569]"}>
                          {l.who === "ai" ? "Vektiss AI:" : "Caller:"}
                        </span>{" "}
                        <span className="text-[#1E293B]">{l.text}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-4 pt-5 text-sm font-medium" style={{ borderTop: "1px solid #F1F5F9", marginTop: "auto" }}>
                <a className="inline-flex items-center gap-1 text-[#2563EB] hover:underline" href="#">
                  Listen to Recording <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a className="inline-flex items-center gap-1 text-[#2563EB] hover:underline" href="#">
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
