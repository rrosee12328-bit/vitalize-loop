
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Submissions
CREATE TABLE public.voice_intake_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_email TEXT,
  primary_phone TEXT,
  payload JSONB NOT NULL,
  sop_file_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.voice_intake_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit intake" ON public.voice_intake_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view submissions" ON public.voice_intake_submissions
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions" ON public.voice_intake_submissions
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions" ON public.voice_intake_submissions
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX voice_intake_submissions_created_at_idx
  ON public.voice_intake_submissions (created_at DESC);

-- Storage bucket for SOPs
INSERT INTO storage.buckets (id, name, public)
VALUES ('intake-sops', 'intake-sops', false);

CREATE POLICY "Anyone can upload intake sops" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'intake-sops');

CREATE POLICY "Admins can read intake sops" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'intake-sops' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete intake sops" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'intake-sops' AND public.has_role(auth.uid(), 'admin'));
