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
  features: { label: string; included: boolean }[];
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
    bestFor: "Solo operators & side businesses",
    monthly: 45.99,
    annual: 441,
    included: "60 phone minutes / mo",
    features: [
      { label: "AI Phone Receptionist (24/7)", included: true, emphasize: true },
      { label: "Blind & Warm Call Transfers", included: true },
      { label: "After-Hours Rules & Escalation", included: true },
      { label: "Spam Detection & Call Blocking", included: true },
      { label: "Call Recordings & AI Summary", included: true },
      { label: "Email Alert After Every Call", included: true },
      { label: "Done-For-You Setup & Management", included: true },
      { label: "30-Day Money-Back Guarantee", included: true },
      { label: "Full Call Transcripts", included: false },
      { label: "Email AI Assistant", included: false },
      { label: "Analytics Dashboard", included: false },
    ],
    overage: "Overage: $0.25/min",
    cta: "Get Started",
  },
  {
    name: "Phone + Email",
    tagline: "Phone + inbox, fully covered.",
    bestFor: "Growing teams handling 100+ calls/mo",
    monthly: 89.99,
    annual: 863,
    included: "200 phone minutes + 200 email replies / mo",
    features: [
      { label: "Everything in Phone Starter", included: true },
      { label: "Full Call Transcripts", included: true, emphasize: true },
      { label: "Email AI Assistant (200 replies/mo)", included: true, emphasize: true },
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
    name: "AI Front Office",
    tagline: "Your full virtual receptionist.",
    bestFor: "Established businesses scaling fast",
    monthly: 199,
    annual: 1910,
    included: "500 phone minutes + 500 email replies / mo",
    features: [
      { label: "Everything in Phone + Email", included: true },
      { label: "Auto Follow-Up Email (with custom links)", included: true, emphasize: true },
      { label: "Calendar Sync (Google & Outlook)", included: true, emphasize: true },
      { label: "Caller Memory (remembers past callers)", included: true },
      { label: "Bilingual Support (EN/ES)", included: true },
      { label: "Lead Scoring (Hot/Warm/Cold)", included: true },
      { label: "Full Analytics Dashboard", included: true, emphasize: true },
      { label: "Priority Support", included: true },
    ],
    overage: "Overage: $0.15/min · $0.03/email",
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
      { label: "Custom CRM Integrations", included: true, emphasize: true },
      { label: "Multi-location / Multi-agent", included: true, emphasize: true },
      { label: "Outbound AI Calling", included: true, emphasize: true },
      { label: "Dedicated Account Manager", included: true, emphasize: true },
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
          return (
            <div
              key={tier.name}
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-card shadow-card transition-shadow hover:shadow-lg",
                tier.highlight
                  ? "border-primary ring-2 ring-primary/30 lg:scale-[1.02]"
                  : "border-border",
              )}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow">
                  Most Popular
                </span>
              )}

              {/* Header */}
              <div className="border-b border-border p-6 pb-5">
                <h3 className="text-lg font-bold tracking-tight">{tier.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{tier.tagline}</p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {price}
                  </span>
                  {suffix && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {suffix}
                    </span>
                  )}
                </div>
                {sub ? (
                  <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
                ) : (
                  <p className="mt-1 select-none text-xs text-transparent">.</p>
                )}

                <div
                  className={cn(
                    "mt-4 rounded-lg border px-3 py-2 text-xs",
                    tier.highlight
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-surface-elevated",
                  )}
                >
                  <span className="font-semibold text-foreground">Includes:</span>{" "}
                  <span className="text-foreground/80">{tier.included}</span>
                </div>

                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Best for
                </p>
                <p className="text-xs font-medium text-foreground/85">
                  {tier.bestFor}
                </p>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-2.5 p-6 pt-5 text-sm">
                {tier.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2">
                    {f.included ? (
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          f.emphasize ? "text-primary" : "text-primary/70",
                        )}
                      />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                    )}
                    <span
                      className={cn(
                        f.included
                          ? f.emphasize
                            ? "font-semibold text-foreground"
                            : "text-foreground/85"
                          : "text-muted-foreground/60 line-through decoration-muted-foreground/30",
                      )}
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="border-t border-border p-6 pt-5">
                {tier.overage && (
                  <p className="mb-4 font-mono text-[11px] text-muted-foreground">
                    {tier.overage}
                  </p>
                )}
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-opacity hover:opacity-90",
                    tier.highlight
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-background text-foreground hover:bg-accent",
                  )}
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
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
