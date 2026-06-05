
-- 1. Replace permissive intake INSERT policy with a validated one
DROP POLICY IF EXISTS "Anyone can submit intake" ON public.voice_intake_submissions;
CREATE POLICY "Anyone can submit intake"
  ON public.voice_intake_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(business_name) BETWEEN 1 AND 200
    AND (contact_email IS NULL OR length(contact_email) <= 320)
    AND (primary_phone IS NULL OR length(primary_phone) <= 40)
    AND (sop_file_path IS NULL OR length(sop_file_path) <= 300)
  );

-- 2. Tighten storage upload policy for intake-sops
DROP POLICY IF EXISTS "Anyone can upload intake sops" ON storage.objects;
CREATE POLICY "Anyone can upload intake sops"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'intake-sops'
    AND length(name) BETWEEN 5 AND 200
    AND name ~ '^[a-f0-9-]{36}\.(pdf|doc|docx|txt|md|rtf)$'
  );

-- 3. Block non-admin writes to user_roles with restrictive policies
CREATE POLICY "Only admins can insert roles"
  ON public.user_roles
  AS RESTRICTIVE
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
  ON public.user_roles
  AS RESTRICTIVE
  FOR UPDATE
  TO anon, authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
  ON public.user_roles
  AS RESTRICTIVE
  FOR DELETE
  TO anon, authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 4. Revoke execute on has_role from public/anon (keep for authenticated for RLS use)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;
