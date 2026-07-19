// Browser Supabase client (anon key). All reads/writes go through RLS — an
// admin (email in the admin_emails table) is granted write access by the
// is_admin() policy, so no service_role key is ever needed in the browser.
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? '',
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
