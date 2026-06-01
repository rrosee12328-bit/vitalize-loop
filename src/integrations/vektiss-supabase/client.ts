import { createClient } from "@supabase/supabase-js";

// External Supabase project for Vektiss content (testimonials, etc.)
// Per stakeholder request — separate from the app's primary backend.
const SUPABASE_URL = "https://hygmztvpmmyxuomjwrbt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5Z216dHZwbW15eHVvbWp3cmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5OTU2MDgsImV4cCI6MjA5NTU3MTYwOH0.ZDH9dTK-Oih5-eTRF_wgllcQru2Xn4qsi6l7rlu670E";

export const vektissSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export type Testimonial = {
  id: string;
  quote: string;
  author_name: string;
  company_name: string | null;
  location: string | null;
  star_rating: number;
  is_active: boolean;
  created_at: string;
};
