import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitImplementationIntake } from "@/lib/intake.functions";

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
        content:
          "Share a few details and book a 30-minute discovery call with the Vektiss team.",
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
};

function ApplyPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);

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
    if (!form.problem_description.trim())
      return "Tell us briefly what you need help with.";
    if (!form.consent_contact) return "Please agree to be contacted.";
    return null;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setSubmitting(true);
    try {
      await submitImplementationIntake({
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
        },
      });
      toast.success("Thanks — redirecting you to booking.");
      window.location.href = buildCalendlyUrl(form);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or email info@vektiss.com.");
      setSubmitting(false);
    }
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
            Share a few details about your business so we can prepare for a focused
            30-minute conversation. Your answers pre-fill the booking form on the next step.
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
                <Select
                  value={form.industry}
                  onValueChange={(v) => set("industry", v)}
                >
                  <SelectTrigger id="industry" className="mt-1.5">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-1">
                <Label htmlFor="volume">Monthly call volume *</Label>
                <Select
                  value={form.monthly_call_volume}
                  onValueChange={(v) => set("monthly_call_volume", v)}
                >
                  <SelectTrigger id="volume" className="mt-1.5">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    {VOLUMES.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-1">
                <Label htmlFor="team">Team size *</Label>
                <Select
                  value={form.team_size}
                  onValueChange={(v) => set("team_size", v)}
                >
                  <SelectTrigger id="team" className="mt-1.5">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZES.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
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
                  onCheckedChange={(v) => set("consent_contact", v === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-slate-700">
                  I agree to be contacted by Vektiss about my inquiry. You can review our{" "}
                  <a href="/privacy" className="text-[#0088FF] hover:underline">
                    privacy policy
                  </a>
                  .
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
                  Sending…
                </>
              ) : (
                <>Continue to booking →</>
              )}
            </Button>
            <p className="mt-3 text-xs text-slate-500">
              You'll be redirected to Calendly with your details pre-filled.
            </p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
