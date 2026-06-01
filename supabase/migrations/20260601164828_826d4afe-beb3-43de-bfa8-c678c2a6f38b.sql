CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  company_name TEXT,
  location TEXT,
  star_rating INTEGER NOT NULL DEFAULT 5,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active testimonials"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

INSERT INTO public.testimonials (quote, author_name, company_name, location, star_rating) VALUES
('The AI answered a call at 11pm that turned into a $4,200 job. We would have missed it completely.',
 'Sheats Endodontics', 'Sheats Endodontics', 'Houston TX', 5),
('Our front desk used to miss 30% of calls during peak hours. Now nothing falls through.',
 'Kairos Security', 'Kairos Security', 'Houston TX', 5);