import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Testimonial = {
  id: string;
  quote: string;
  author_name: string;
  company_name: string | null;
  location: string | null;
  star_rating: number;
};

const FALLBACK: Testimonial[] = [
  {
    id: "fb-1",
    quote:
      "The AI answered a call at 11pm that turned into a $4,200 job. We would have missed it completely.",
    author_name: "Sheats Endodontics",
    company_name: "Sheats Endodontics",
    location: "Houston TX",
    star_rating: 5,
  },
  {
    id: "fb-2",
    quote:
      "Our front desk used to miss 30% of calls during peak hours. Now nothing falls through.",
    author_name: "Kairos Security",
    company_name: "Kairos Security",
    location: "Houston TX",
    star_rating: 5,
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  const subtitle = [t.company_name ?? t.author_name, t.location]
    .filter(Boolean)
    .join(", ");
  return (
    <article className="flex w-[420px] shrink-0 flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-sm md:w-[520px]">
      <div className="flex items-center gap-1">
        {Array.from({ length: t.star_rating || 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-white/90 md:text-base">
        "{t.quote}"
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
        — {subtitle}
      </p>
    </article>
  );
}

export function TestimonialsTicker() {
  const [items, setItems] = useState<Testimonial[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("testimonials")
      .select("id, quote, author_name, company_name, location, star_rating")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data && data.length > 0) {
          setItems(data as Testimonial[]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loop =
    items.length < 4
      ? [...items, ...items, ...items, ...items]
      : [...items, ...items];

  return (
    <section
      className="relative overflow-hidden border-y border-white/10 py-8"
      style={{ backgroundColor: "#0A0F1E" }}
    >
      <div className="marquee-track flex gap-5 hover:[animation-play-state:paused]">
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{
          background: "linear-gradient(to right, #0A0F1E, rgba(10,15,30,0))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{
          background: "linear-gradient(to left, #0A0F1E, rgba(10,15,30,0))",
        }}
      />
    </section>
  );
}
