import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Copy .env.local.example to .env.local and fill in your project URL and anon key.'
  );
}

// Uses @supabase/ssr's cookie-based storage (not localStorage) so the
// session is visible to middleware.js and server components — a plain
// @supabase/supabase-js client would store the session in localStorage
// only, and middleware would never see you as logged in.
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
