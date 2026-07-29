import './globals.css';
import SiteHeader from '../components/SiteHeader';
import { createServerSupabaseClient } from '../lib/supabaseServer';

export const metadata = {
  title: 'LGMES Report Tracker',
  description: 'DILG Negros Oriental — LGU monthly report submission tracker',
};

export default async function RootLayout({ children }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <SiteHeader user={user} />
        {children}
      </body>
    </html>
  );
}
