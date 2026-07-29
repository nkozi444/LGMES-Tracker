'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push('/');
      router.refresh();
      return;
    }

    setMessage('Check your email to confirm your account, then sign in.');
  }

  return (
    <main style={{ minHeight: 'calc(100vh - 76px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: 360, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}
      >
        <div style={{ height: 4, background: 'var(--gold)' }} />
        <div style={{ padding: '30px 30px 26px' }}>
          <h1 style={{ fontSize: 22, marginBottom: 4 }}>Create account</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: '0 0 22px' }}>
            For DILG field office staff.
          </p>

          <label style={fieldLabel}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={fieldInput}
          />

          <label style={fieldLabel}>Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={fieldInput}
          />

          {error && <p style={{ color: 'var(--status-missing-text)', fontSize: 13, marginTop: 10 }}>{error}</p>}
          {message && <p style={{ color: 'var(--status-ontime-text)', fontSize: 13, marginTop: 10 }}>{message}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', marginTop: 20, padding: '11px 14px', borderRadius: 6, border: 'none', background: 'var(--navy)', color: 'white', fontSize: 14, fontWeight: 500 }}
          >
            {loading ? 'Creating account…' : 'Sign up'}
          </button>

          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 18, textAlign: 'center' }}>
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </div>
      </form>
    </main>
  );
}

const fieldLabel = { display: 'block', fontSize: 12, color: 'var(--text-secondary)', margin: '14px 0 5px' };
const fieldInput = { width: '100%', padding: '10px 11px', borderRadius: 6, border: '1px solid var(--border)', fontFamily: 'inherit', fontSize: 14 };
