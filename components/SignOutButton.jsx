'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default function SignOutButton({ variant = 'light' }) {
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  const style =
    variant === 'dark'
      ? {
          fontFamily: 'var(--font-sans)',
          fontSize: 12.5,
          color: '#FFFFFF',
          background: 'none',
          border: '1px solid rgba(255,255,255,0.35)',
          borderRadius: 6,
          padding: '6px 12px',
        }
      : {
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: 'var(--text-secondary)',
          background: 'none',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: '6px 12px',
        };

  return (
    <button onClick={handleSignOut} style={style}>
      Sign out
    </button>
  );
}
