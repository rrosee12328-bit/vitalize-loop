import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { recordScheduledCall, submitImplementationIntake } from "@/lib/intake.functions";
import {
  createMetaEventId,
  readMarketingAttribution,
  trackMetaBrowserEvent,
} from "@/lib/meta-tracking";

const CALENDLY_URL = "https://calendly.com/vektiss-info/30-minute-vektiss-discovery";

const INDUSTRIES = [
  "Home services",
  "Healthcare",
  "Legal",
  "Real estate",
  "E-commerce",
  "Professional services",
  "Other",
];
const VOLUMES = ["Under 100", "100–500", "500–2,000", "2,000–10,000", "10,000+"];
const TEAM_SIZES = ["1–5", "6–20", "21–100", "100+"];

type CalendlyScheduledPayload = {
  event?: { uri?: string; start_time?: string };
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Get Started — Vektiss" },
      {
        name: "description",
        content:
          "Tell us about your business and book a 30-minute Vektiss discovery call to scope AI implementation for your operations.",
      },
      { property: "og:title", content: "Get Started — Vektiss" },
      {
        property: "og:description",
        content: "Share a few details and book a 30-minute discovery call with the Vektiss team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplyPage,
});

function buildCalendlyUrl(form: FormState) {
  const url = new URL(CALENDLY_URL);
  url.searchParams.set("name", form.full_name);
  url.searchParams.set("email", form.email);
  url.searchParams.set("a1", form.phone);
  url.searchParams.set("a2", form.business_name);
  url.searchParams.set("a3", form.industry);
  url.searchParams.set("a4", form.monthly_call_volume);
  url.searchParams.set("a5", form.team_size);
  url.searchParams.set("a6", form.problem_description);
  return url.toString();
}

type FormState = {
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  industry: string;
  monthly_call_volume: string;
  team_size: string;
  problem_description: string;
  consent_contact: boolean;
  tracking_consent: boolean;
};

type BookingState = {
  intakeId: string;
  bookingTrackingToken: string;
  calendlyUrl: string;
};

const initial: FormState = {
  full_name: "",
  business_name: "",
  email: "",
  phone: "",
  industry: "",
  monthly_call_volume: "",
  team_size: "",
  problem_description: "",
  consent_contact: false,
  tracking_consent: false,
};

function ApplyPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<BookingState | null>(null);
  const [scheduled, setScheduled] = useState(false);
  const scheduleReported = useRef(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (): string | null => {
    if (!form.full_name.trim()) return "Please enter your full name.";
    if (!form.business_name.trim()) return "Please enter your business name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Please enter a valid email.";
    if (form.phone.trim().length < 5) return "Please enter a valid phone number.";
    if (!form.industry) return "Please select an industry.";
    if (!form.monthly_call_volume) return "Please select monthly call volume.";
    if (!form.team_size) return "Please select team size.";
    if (!form.problem_description.trim()) return "Tell us briefly what you need help with.";
    if (!form.consent_contact) return "Please agree to be contacted.";
    return null;
  };

  const handleCalendlyMessage = useCallback(
    (message: MessageEvent<{ event?: string; payload?: CalendlyScheduledPayload }>) => {
      if (message.origin !== "https://calendly.com") return;
      if (
        message.data?.event !== "calendly.event_scheduled" ||
        !booking ||
        scheduleReported.current
      )
        return;

      scheduleReported.current = true;
      const metaScheduleEventId = createMetaEventId("schedule");
      trackMetaBrowserEvent("Schedule", metaScheduleEventId);

      const payload = message.data.payload;
      void recordScheduledCall({
        data: {
          intake_id: booking.intakeId,
          booking_tracking_token: booking.bookingTrackingToken,
          meta_schedule_event_id: metaScheduleEventId,
          event_source_url: window.location.href,
          calendly_event_uri: payload?.event?.uri,
          scheduled_at: payload?.event?.start_time,
        },
      })
        .then(() => setScheduled(true))
        .catch((error) => {
          console.error(error);
          toast.error("Your call is booked, but we could not update our CRM automatically.");
          setScheduled(true);
        });
    },
    [booking],
  );

  useEffect(() => {
    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [handleCalendlyMessage]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    setSubmitting(true);
    scheduleReported.current = false;
    const metaLeadEventId = form.tracking_consent ? createMetaEventId("lead") : undefined;

    try {
      const result = await submitImplementationIntake({
        data: {
          full_name: form.full_name.trim(),
          business_name: form.business_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          industry: form.industry,
          monthly_call_volume: form.monthly_call_volume,
          team_size: form.team_size,
          problem_description: form.problem_description.trim(),
          consent_contact: true as const,
          tracking_consent: form.tracking_consent,
          meta_lead_event_id: metaLeadEventId,
          attribution: readMarketingAttribution(),
        },
      });

      if (metaLeadEventId) trackMetaBrowserEvent("Lead", metaLeadEventId);
      setBooking({
        intakeId: result.intake_id,
        bookingTrackingToken: result.booking_tracking_token,
        calendlyUrl: buildCalendlyUrl(form),
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again or email info@vektiss.com.");
      setSubmitting(false);
    }
  }

  if (scheduled) {
    return (
      <SiteLayout>
        <section className="container-editorial py-16 md:py-24">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-900/10 bg-white/70 p-8 text-center shadow-[0_8px_28px_-16px_rgba(15,23,42,0.15)] md:p-12">
            <CheckCircle2 className="mx-auto h-11 w-11 text-[#0088FF]" />
            <p className="eyebrow mt-5">You’re scheduled</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              We’ll see you soon.
            </h1>
            <p className="mt-4 text-slate-600">
              Your call is confirmed. We’ll use the details you shared to prepare for a focused
              conversation.
            </p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (booking) {
    return (
      <SiteLayout>
        <section className="container-editorial py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow">Step 2 of 2</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Choose a time for your discovery call
            </h1>
            <p className="mt-3 text-slate-600">
              Your details are pre-filled. Pick a time that works for you, and we’ll prepare for the
              conversation.
            </p>
            <CalendlyInlineEmbed url={booking.calendlyUrl} />
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-editorial py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">Get Started</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Book a Vektiss discovery call
          </h1>
          <p className="mt-3 text-slate-600">
            Share a few details about your business so we can prepare for a focused 30-minute
            conversation. Your answers pre-fill the booking form on the next step.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 rounded-2xl border border-slate-900/10 bg-white/70 p-6 shadow-[0_8px_28px_-16px_rgba(15,23,42,0.15)] md:p-8"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label htmlFor="full_name">Full name *</Label>
                <Input
                  id="full_name"
                  autoComplete="name"
                  value={form.full_name}
                  onChange={(e) => set("full_name", e.target.value)}
                  className="mt-1.5"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="business_name">Business name *</Label>
                <Input
                  id="business_name"
                  autoComplete="organization"
                  value={form.business_name}
                  onChange={(e) => set("business_name", e.target.value)}
                  className="mt-1.5"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="email">Work email *</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="mt-1.5"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="mt-1.5"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="industry">Industry / business type *</Label>
                <Select value={form.industry} onValueChange={(value) => set("industry", value)}>
                  <SelectTrigger id="industry" className="mt-1.5">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="volume">Monthly call volume *</Label>
                <Select
                  value={form.monthly_call_volume}
                  onValueChange={(value) => set("monthly_call_volume", value)}
                >
                  <SelectTrigger id="volume" className="mt-1.5">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    {VOLUMES.map((volume) => (
                      <SelectItem key={volume} value={volume}>
                        {volume}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="team">Team size *</Label>
                <Select value={form.team_size} onValueChange={(value) => set("team_size", value)}>
                  <SelectTrigger id="team" className="mt-1.5">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZES.map((teamSize) => (
                      <SelectItem key={teamSize} value={teamSize}>
                        {teamSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="problem">What do you need help with? *</Label>
                <Textarea
                  id="problem"
                  value={form.problem_description}
                  onChange={(e) => set("problem_description", e.target.value)}
                  className="mt-1.5 min-h-32"
                  placeholder="Missed calls, slow response times, manual intake, scattered tools — whatever is costing you time or revenue."
                  required
                />
              </div>
              <div className="md:col-span-2 flex items-start gap-3 rounded-lg border border-slate-900/10 bg-slate-50/70 p-3">
                <Checkbox
                  id="consent"
                  checked={form.consent_contact}
                  onCheckedChange={(value) => set("consent_contact", value === true)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor="consent"
                  className="text-sm font-normal leading-relaxed text-slate-700"
                >
                  I agree to be contacted by Vektiss about my inquiry. You can review our{" "}
                  <a href="/privacy" className="text-[#0088FF] hover:underline">
                    privacy policy
                  </a>
                  .
                </Label>
              </div>
              <div className="md:col-span-2 flex items-start gap-3 rounded-lg border border-slate-900/10 bg-slate-50/70 p-3">
                <Checkbox
                  id="tracking-consent"
                  checked={form.tracking_consent}
                  onCheckedChange={(value) => set("tracking_consent", value === true)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor="tracking-consent"
                  className="text-sm font-normal leading-relaxed text-slate-700"
                >
                  Optional: I agree to Vektiss measuring this request to improve its marketing and
                  booking experience, as described in the privacy policy.
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 h-12 w-full rounded-xl bg-[#0088FF] text-base font-semibold text-white hover:bg-[#0095FF] md:w-auto md:px-8"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving your details…
                </>
              ) : (
                <>Continue to booking →</>
              )}
            </Button>
            <p className="mt-3 text-xs text-slate-500">You’ll choose a time in the next step.</p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function CalendlyInlineEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let script: HTMLScriptElement | undefined;
    const initialize = () => {
      if (!containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: containerRef.current, resize: true });
    };

    if (window.Calendly) {
      initialize();
    } else {
      script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = initialize;
      document.head.appendChild(script);
    }

    return () => {
      if (script) script.remove();
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className="mt-8 min-h-[700px] overflow-hidden rounded-2xl border border-slate-900/10 bg-white"
    />
  );
}
