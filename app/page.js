import Link from 'next/link';
import { REPORT_TYPES, PERIOD_TYPE_ORDER, PERIOD_TYPE_LABELS } from '../lib/reportHelpers';

export const dynamic = 'force-dynamic';

const PERIOD_DESCRIPTIONS = {
  monthly: 'Due every month',
  quarterly: 'Due every quarter (Q1\u2013Q4)',
  semestral: 'Due twice a year',
  annual: 'Due once a year',
};

export default function Home() {
  return (
    <main style={{ padding: '44px 24px 64px', maxWidth: 1100, margin: '0 auto' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          margin: '0 0 6px',
        }}
      >
        Local Governance Monitoring and Evaluation System
      </p>
      <h1 style={{ fontSize: 30, marginBottom: 10 }}>Compliance reports</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 36, maxWidth: 560 }}>
        Reports are grouped by how often they're due. Select one to review
        LGU submission status or log a new entry.
      </p>

      {PERIOD_TYPE_ORDER.map((periodType) => {
        const reports = REPORT_TYPES.filter((r) => r.periodType === periodType);
        if (reports.length === 0) return null;

        return (
          <section key={periodType} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, borderBottom: '1px solid var(--border)', paddingBottom: 8, marginBottom: 14 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                  color: 'var(--navy)',
                }}
              >
                {PERIOD_TYPE_LABELS[periodType]}
              </h2>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {PERIOD_DESCRIPTIONS[periodType]} &middot; {reports.length} report{reports.length === 1 ? '' : 's'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {reports.map((report) => (
                <Link
                  key={report.code}
                  href={`/reports/${report.code}`}
                  className="report-card"
                  style={{
                    display: 'block',
                    padding: '16px 20px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderLeft: '4px solid var(--navy)',
                    borderRadius: 8,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 120ms ease, transform 120ms ease',
                  }}
                >
                  <h3 style={{ fontSize: 15, marginBottom: 4, color: 'var(--text-primary)' }}>
                    {report.name}
                  </h3>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {report.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <style>{`
        .report-card:hover {
          border-left-color: var(--gold);
          transform: translateY(-1px);
        }
      `}</style>
    </main>
  );
}
