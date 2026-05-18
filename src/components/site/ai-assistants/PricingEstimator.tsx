import { useMemo, useState } from "react";
import { ArrowRight, Check, X, Zap } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const CALENDLY = "https://calendly.com/vektiss-info/30-minute-vektiss-discovery";

type Tier = {
  name: string;
  monthly: number | null; // null = custom
  annual: number | null; // total annual price
  customLabel?: string;
  included: string;
  features: { label: string; included: boolean; emphasize?: boolean }[];
  overage?: string;
  cta: string;
  highlight?: boolean;
};

type Feature = { label: string; included: boolean; emphasize?: boolean };

type TierExt = Tier & {
  tagline: string;
  bestFor: string;
  features: Feature[];
};

const TIERS: TierExt[] = [
  {
    name: "Phone Starter",
    tagline: "Never miss another call.",
    bestFor: "Solo operators",
    monthly: 45.99,
    annual: 441,
    included: "60 phone minutes / mo",
    features: [
      { label: "24/7 AI receptionist", included: true, emphasize: true },
      { label: "Smart call routing", included: true },
      { label: "After-hours handling", included: true },
      { label: "Spam blocking", included: true },
      { label: "Call recordings + summaries", included: true },
      { label: "Email alerts after every call", included: true },
      { label: "Done-for-you setup", included: true },
      { label: "30-day money-back", included: true },
    ],
    overage: "$0.25 / extra minute",
    cta: "Get Started",
  },
  {
    name: "Phone + Email",
    tagline: "Phone & inbox, fully covered.",
    bestFor: "Growing teams (100+ calls/mo)",
    monthly: 89.99,
    annual: 863,
    included: "200 minutes + 200 emails / mo",
    features: [
      { label: "Everything in Phone Starter", included: true },
      { label: "Intake form delivery", included: true, emphasize: true },
      { label: "Email AI assistant", included: true, emphasize: true },
      { label: "Analytics dashboard", included: true, emphasize: true },
      { label: "Full call transcripts", included: true },
      { label: "Monthly performance report", included: true },
    ],
    overage: "$0.20 / min · $0.05 / email",
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "AI Front Office",
    tagline: "Your full virtual receptionist.",
    bestFor: "Established businesses scaling",
    monthly: 199,
    annual: 1910,
    included: "500 minutes + 500 emails / mo",
    features: [
      { label: "Everything in Phone + Email", included: true },
      { label: "Lead scoring (Hot / Warm / Cold)", included: true, emphasize: true },
      { label: "Calendar sync (Google + Outlook)", included: true, emphasize: true },
      { label: "Bilingual support (EN / ES)", included: true, emphasize: true },
      { label: "Auto follow-up emails", included: true },
      { label: "Caller memory", included: true },
      { label: "Priority support", included: true },
    ],
    overage: "$0.15 / min · $0.03 / email",
    cta: "Get Started",
  },
  {
    name: "Custom",
    tagline: "Built around your workflow.",
    bestFor: "Multi-location & enterprise",
    monthly: null,
    annual: null,
    customLabel: "Let's Talk",
    included: "Unlimited volume",
    features: [
      { label: "Everything in AI Front Office", included: true },
      { label: "Custom CRM integrations", included: true, emphasize: true },
      { label: "Multi-location support", included: true, emphasize: true },
      { label: "Outbound AI calling", included: true, emphasize: true },
      { label: "Dedicated account manager", included: true, emphasize: true },
    ],
    cta: "Contact Us",
  },
];

function fmtMoney(n: number) {
  return n % 1 === 0
    ? `$${n.toLocaleString()}`
    : `$${n.toFixed(2)}`;
}

function priceDisplay(tier: Tier, billing: "monthly" | "annual") {
  if (tier.monthly == null) {
    return { price: tier.customLabel ?? "Custom", suffix: "", sub: undefined };
  }
  if (billing === "monthly") {
    return { price: fmtMoney(tier.monthly), suffix: "/mo", sub: undefined };
  }
  const perMo = (tier.annual ?? 0) / 12;
  return {
    price: fmtMoney(tier.annual ?? 0),
    suffix: "/yr",
    sub: `${fmtMoney(Number(perMo.toFixed(2)))}/mo billed annually`,
  };
}

function BillingToggle({
  value,
  onChange,
}: {
  value: "monthly" | "annual";
  onChange: (v: "monthly" | "annual") => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card p-1 shadow-card">
      {(["monthly", "annual"] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            value === opt
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt === "monthly" ? "Monthly" : "Annually"}
          {opt === "annual" && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                value === "annual"
                  ? "bg-white/20 text-white"
                  : "bg-primary/10 text-primary",
              )}
            >
              Save 20%
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function PricingTiers() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div>
      {/* Setup fee banner */}
      <div className="mb-8 rounded-xl border border-primary/20 border-l-4 border-l-primary bg-primary/5 px-5 py-4 md:px-6">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="text-sm text-foreground md:text-base">
            <span className="font-semibold">Done-For-You Setup: $500</span> — We
            build, configure, and test your custom AI agent.
          </p>
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4 fill-current" />
            Fast-Action Bonus: 50% off setup today — only $250.
          </p>
        </div>
      </div>

      <div className="mb-10 flex justify-center">
        <BillingToggle value={billing} onChange={setBilling} />
      </div>

      <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => {
          const { price, suffix, sub } = priceDisplay(tier, billing);
          const includedFeatures = tier.features.filter((f) => f.included);
          return (
            <div
              key={tier.name}
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                tier.highlight
                  ? "border-primary shadow-[0_20px_50px_-20px_rgba(37,99,235,0.45)] lg:-translate-y-2"
                  : "border-border shadow-card",
              )}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-md">
                  Most Popular
                </span>
              )}

              {/* Header */}
              <div className="p-6 pb-5">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {tier.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {tier.tagline}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-[2.25rem] font-semibold leading-none tracking-tight text-foreground">
                    {price}
                  </span>
                  {suffix && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {suffix}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-1.5 text-[11px] leading-tight",
                    sub ? "text-muted-foreground" : "select-none text-transparent",
                  )}
                >
                  {sub ?? "."}
                </p>

                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group mt-5 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md px-4 text-sm font-semibold transition-opacity hover:opacity-90",
                    tier.highlight
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-background text-foreground",
                  )}
                >
                  {tier.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="mx-6 border-t border-dashed border-border" />

              {/* Included + Best for */}
              <div className="space-y-4 px-6 py-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Includes
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {tier.included}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Best for
                  </p>
                  <p className="mt-1 text-xs text-foreground/80">{tier.bestFor}</p>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 border-t border-border px-6 py-5">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  What's included
                </p>
                <ul className="space-y-2 text-sm">
                  {includedFeatures.map((f) => (
                    <li key={f.label} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                          f.emphasize
                            ? "bg-primary/15 text-primary"
                            : "bg-emerald-50 text-emerald-600",
                        )}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                      </span>
                      <span
                        className={cn(
                          "leading-snug",
                          f.emphasize
                            ? "font-medium text-foreground"
                            : "text-foreground/75",
                        )}
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              {tier.overage && (
                <div className="rounded-b-2xl border-t border-border bg-muted/30 px-6 py-3">
                  <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
                    {tier.overage}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Dialzara charges <span className="font-semibold text-foreground">$0.48/min</span> for overages — ours start at{" "}
        <span className="font-semibold text-foreground">$0.15</span>. They make
        you build it yourself —{" "}
        <span className="font-semibold text-foreground">we build it for you</span>.
      </p>
    </div>
  );
}

function recommendedIdx(min: number): number {
  if (min <= 60) return 0;
  if (min <= 200) return 1;
  if (min <= 500) return 2;
  return 3;
}

export function PricingEstimator() {
  const [calls, setCalls] = useState(50);
  const [avgLen, setAvgLen] = useState(3);
  const totalMinutes = calls * avgLen;
  const idx = recommendedIdx(totalMinutes);
  const tier = TIERS[idx];
  const minutesLabel = totalMinutes > 500 ? "500+" : String(totalMinutes);

  const priceText = useMemo(() => {
    if (tier.monthly == null) return "Custom Quote";
    return `${fmtMoney(tier.monthly)}/mo`;
  }, [tier]);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
      <div>
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">Monthly Calls</p>
          <span className="font-mono text-sm text-foreground">{calls}</span>
        </div>
        <div className="mt-3">
          <Slider
            value={[calls]}
            min={10}
            max={500}
            step={5}
            onValueChange={(v) => setCalls(v[0] ?? 10)}
          />
          <div className="mt-2 flex justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
            <span>10</span>
            <span>500</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">Avg Call Length (minutes)</p>
          <span className="font-mono text-sm text-foreground">{avgLen}</span>
        </div>
        <div className="mt-3">
          <Slider
            value={[avgLen]}
            min={1}
            max={10}
            step={1}
            onValueChange={(v) => setAvgLen(v[0] ?? 1)}
          />
          <div className="mt-2 flex justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface-elevated p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-sm text-muted-foreground">Estimated Minutes</span>
          <span className="font-mono text-lg font-semibold tabular-nums">
            {minutesLabel}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">Recommended Plan</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              {tier.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{tier.included}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold tracking-tight md:text-4xl">
              {priceText}
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
