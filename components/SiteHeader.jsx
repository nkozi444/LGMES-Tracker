import Link from 'next/link';
import Mark from './Mark';
import SignOutButton from './SignOutButton';

export default function SiteHeader({ user }) {
  return (
    <header style={{ background: 'var(--ink)', borderBottom: '3px solid var(--gold)' }}>
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <Mark />
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                color: '#C9AF7C',
              }}
            >
              DILG Negros Oriental &middot; Field Office
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontSize: 19,
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: 0.2,
              }}
            >
              LGMES Report Tracker
            </p>
          </div>
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#B9C2D4' }}>
              {user.email}
            </span>
            <SignOutButton variant="dark" />
          </div>
        ) : (
          <Link
            href="/login"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 6,
              padding: '6px 14px',
              textDecoration: 'none',
            }}
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
