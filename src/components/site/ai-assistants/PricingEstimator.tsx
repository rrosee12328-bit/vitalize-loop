import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const CALENDLY = "https://calendly.com/vektiss-info/30-minute-vektiss-discovery";

type Tier = {
  name: string;
  price: string;
  priceSuffix?: string;
  included: string;
  features: { label: string; included: boolean }[];
  overage?: string;
  cta: string;
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Phone Starter",
    price: "$29.99",
    priceSuffix: "/mo",
    included: "60 phone minutes/mo",
    features: [
      { label: "AI Phone Receptionist (24/7)", included: true },
      { label: "Blind Call Transfer", included: true },
      { label: "Call Recordings & Summaries", included: true },
      { label: "SMS/Email Alert After Every Call", included: true },
      { label: "Spam Detection & Blocking", included: true },
      { label: "Done-For-You Setup & Management", included: true },
      { label: "30-Day Money-Back Guarantee", included: true },
      { label: "Warm Transfer to Human", included: false },
      { label: "After-Hours Rules", included: false },
      { label: "Email AI Assistant", included: false },
      { label: "Analytics Dashboard", included: false },
    ],
    overage: "Overage: $0.25/min",
    cta: "Get Started",
  },
  {
    name: "Phone + Email",
    price: "$79.99",
    priceSuffix: "/mo",
    included: "200 phone minutes + 200 email replies/mo",
    features: [
      { label: "Everything in Tier 1", included: true },
      { label: "Warm Call Transfer to Human", included: true },
      { label: "After-Hours Rules & Escalation", included: true },
      { label: "Email AI Assistant (200 replies/mo)", included: true },
      { label: "Limited Analytics Dashboard", included: true },
      { label: "Monthly Performance Report", included: true },
      { label: "Calendar Sync (Google/Outlook)", included: false },
      { label: "Bilingual Support (EN/ES)", included: false },
    ],
    overage: "Overage: $0.20/min · $0.05/email",
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Full Suite",
    price: "$199.00",
    priceSuffix: "/mo",
    included: "500 phone minutes + 500 email replies/mo",
    features: [
      { label: "Everything in Tier 2", included: true },
      { label: "Calendar Sync (Google & Outlook)", included: true },
      { label: "Caller Memory (remembers past callers)", included: true },
      { label: "Bilingual Support (EN/ES)", included: true },
      { label: "Full Analytics Dashboard", included: true },
      { label: "Priority Support", included: true },
    ],
    overage: "Overage: $0.15/min · $0.03/email",
    cta: "Get Started",
  },
  {
    name: "Custom",
    price: "Custom Quote",
    included: "Unlimited volume",
    features: [
      { label: "Everything in Tier 3", included: true },
      { label: "Custom CRM Integrations", included: true },
      { label: "Multi-location / Multi-agent", included: true },
      { label: "Outbound AI Calling", included: true },
      { label: "Custom Dashboard & Reporting", included: true },
      { label: "Dedicated Account Manager", included: true },
    ],
    cta: "Contact Us",
  },
];

const MAX_MINUTES = 750;

function recommendedIdx(min: number): number {
  if (min <= 60) return 0;
  if (min <= 200) return 1;
  if (min <= 500) return 2;
  return 3;
}

export function PricingTiers() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-6 shadow-card",
              tier.highlight
                ? "border-primary ring-2 ring-primary/30"
                : "border-border",
            )}
          >
            {tier.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight">
                {tier.price}
              </span>
              {tier.priceSuffix && (
                <span className="text-sm text-muted-foreground">{tier.priceSuffix}</span>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{tier.included}</p>

            <ul className="mt-5 space-y-2.5 text-sm">
              {tier.features.map((f) => (
                <li key={f.label} className="flex items-start gap-2">
                  {f.included ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                  )}
                  <span
                    className={cn(
                      f.included ? "text-foreground/90" : "text-muted-foreground/70",
                    )}
                  >
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>

            {tier.overage && (
              <p className="mt-5 font-mono text-[11px] text-muted-foreground">
                {tier.overage}
              </p>
            )}

            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-opacity hover:opacity-90",
                tier.highlight
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground",
              )}
            >
              {tier.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        One-time $500 setup fee applies to all plans. Dialzara charges $0.48/min for
        overages — ours start at $0.25.
      </p>
    </div>
  );
}

export function PricingEstimator() {
  const [minutes, setMinutes] = useState(120);
  const idx = recommendedIdx(minutes);
  const tier = TIERS[idx];
  const minutesLabel = minutes >= MAX_MINUTES ? "500+" : String(minutes);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
      <div className="flex items-baseline justify-between">
        <p className="eyebrow">Estimated monthly minutes</p>
        <span className="font-mono text-sm text-foreground">{minutesLabel}</span>
      </div>

      <div className="mt-4">
        <Slider
          value={[minutes]}
          min={20}
          max={MAX_MINUTES}
          step={10}
          onValueChange={(v) => setMinutes(v[0] ?? 20)}
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
          <span>20</span>
          <span>500+</span>
        </div>
      </div>

      <div
        key={tier.name}
        className="mt-8 rounded-xl border border-border bg-surface-elevated p-6 transition-all duration-300 animate-in fade-in"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">Recommended plan</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">{tier.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{tier.included}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-semibold tracking-tight">
              {tier.price}
              {tier.priceSuffix && (
                <span className="text-base font-normal text-muted-foreground">
                  {tier.priceSuffix}
                </span>
              )}
            </div>
          </div>
        </div>
        {tier.overage && (
          <p className="mt-3 font-mono text-[11px] text-muted-foreground">
            {tier.overage}
          </p>
        )}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Overage minutes billed at your tier's rate. Upgrade or downgrade anytime.
      </p>

      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {idx === 3 ? "Talk to Us About a Custom Plan" : "Get Started at This Plan"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
