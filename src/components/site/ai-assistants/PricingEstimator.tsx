import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type Tier = {
  name: string;
  minutes: string;
  price: string;
  desc: string;
  isCustom?: boolean;
};

const MAX_CALLS = 750;

function tierFor(calls: number): Tier {
  if (calls <= 100) {
    return {
      name: "Starter",
      minutes: "200 min/mo",
      price: "$199",
      desc: "AI phone agent + email assistant + monthly reporting.",
    };
  }
  if (calls <= 250) {
    return {
      name: "Growth",
      minutes: "500 min/mo",
      price: "$282",
      desc: "Everything in Starter + bi-weekly reporting + outbound email.",
    };
  }
  if (calls <= 500) {
    return {
      name: "Pro",
      minutes: "1,000 min/mo",
      price: "$423",
      desc: "Everything in Growth + weekly reporting + full call analytics.",
    };
  }
  return {
    name: "Custom",
    minutes: "Unlimited / tailored",
    price: "Let's talk",
    desc: "High call volume, multi-location, or custom integrations. We'll scope a plan built around your business.",
    isCustom: true,
  };
}

export function PricingEstimator() {
  const [calls, setCalls] = useState(120);
  const tier = tierFor(calls);
  const callsLabel = calls > 500 ? "500+" : String(calls);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
      <div className="flex items-baseline justify-between">
        <p className="eyebrow">Estimated monthly calls</p>
        <span className="font-mono text-sm text-foreground">{callsLabel}</span>
      </div>

      <div className="mt-4">
        <Slider
          value={[calls]}
          min={50}
          max={MAX_CALLS}
          step={10}
          onValueChange={(v) => setCalls(v[0] ?? 50)}
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
          <span>50</span>
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
            <p className="mt-1 text-sm text-muted-foreground">
              {tier.isCustom ? tier.minutes : `${tier.minutes} included`}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-semibold tracking-tight">
              {tier.price}
              {!tier.isCustom && (
                <span className="text-base font-normal text-muted-foreground">/mo</span>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-foreground/80">{tier.desc}</p>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        One-time $1,500 setup fee includes custom build, training, and onboarding.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Smith.ai charges $270+/mo for 100 calls — billed per call. Vektiss is flat rate.
      </p>

      <a
        href="https://calendly.com/vektiss-info/30-minute-vektiss-discovery"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {tier.isCustom ? "Talk to Us About a Custom Plan" : "Get Started at This Plan"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
