'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { periodsFor, statusMeta, PERIOD_TYPE_LABELS } from '../lib/reportHelpers';

function submissionKey(lguId, period) {
  return `${lguId}-${period}`;
}

export default function SubmissionsGrid({ lgus, reportType, initialSubmissions, year }) {
  const router = useRouter();
  const pathname = usePathname();
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const periods = periodsFor(reportType); // 12 months or 4 quarters
  const periodLabel = reportType.period_type === 'quarterly' ? 'Quarter' : 'Month';

  const byKey = useMemo(() => {
    const map = new Map();
    for (const s of submissions) {
      map.set(submissionKey(s.lgu_id, s.period_month), s);
    }
    return map;
  }, [submissions]);

  const complianceByLgu = useMemo(() => {
    const map = new Map();
    for (const lgu of lgus) {
      let onTime = 0;
      let logged = 0;
      for (let p = 1; p <= periods.length; p++) {
        const s = byKey.get(submissionKey(lgu.id, p));
        if (s && s.status) {
          logged += 1;
          if (s.status === 'on_time') onTime += 1;
        }
      }
      map.set(lgu.id, { onTime, logged });
    }
    return map;
  }, [byKey, lgus, periods.length]);

  const kpis = useMemo(() => {
    const totalCells = lgus.length * periods.length;
    let onTime = 0;
    let late = 0;
    let notSubmitted = 0;
    let logged = 0;

    for (const s of submissions) {
      if (!s.status) continue;
      logged += 1;
      if (s.status === 'on_time') onTime += 1;
      else if (s.status === 'late') late += 1;
      else if (s.status === 'not_submitted') notSubmitted += 1;
    }

    return {
      totalLgus: lgus.length,
      onTimeRate: logged ? Math.round((onTime / logged) * 100) : 0,
      late,
      notSubmitted,
      missing: totalCells - logged,
    };
  }, [submissions, lgus, periods.length]);

  async function handleSave({ dateSubmitted, status, remarks }) {
    setSaving(true);
    setError(null);
    const { lguId, period } = editing;

    const { data, error: saveError } = await supabase
      .from('submissions')
      .upsert(
        {
          lgu_id: lguId,
          report_type_id: reportType.id,
          period_month: period,
          period_year: year,
          date_submitted: dateSubmitted || null,
          status: status || null,
          remarks: remarks || null,
        },
        { onConflict: 'lgu_id,report_type_id,period_month,period_year' }
      )
      .select()
      .single();

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setSubmissions((prev) => {
      const next = prev.filter((s) => !(s.lgu_id === lguId && s.period_month === period));
      next.push(data);
      return next;
    });
    setEditing(null);
  }

  function changeYear(newYear) {
    router.push(`${pathname}?year=${newYear}`);
  }

  return (
    <main style={{ padding: '32px 24px 64px', maxWidth: 1400, margin: '0 auto' }}>
      <Link href="/" style={{ display: 'inline-block', fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 18 }}>
        &larr; All reports
      </Link>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 26, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', margin: '0 0 6px', letterSpacing: 1, textTransform: 'uppercase' }}>
            {PERIOD_TYPE_LABELS[reportType.period_type] || 'Monthly'} monitoring report
          </p>
          <h1 style={{ fontSize: 26 }}>{reportType.name}</h1>
        </div>
        <label style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Year{' '}
          <select
            value={year}
            onChange={(e) => changeYear(e.target.value)}
            style={{ marginLeft: 6, padding: '7px 10px', borderRadius: 6, border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', background: 'var(--surface)' }}
          >
            {[year - 1, year, year + 1].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
        <KpiCard label="LGUs tracked" value={kpis.totalLgus} accentColor="var(--navy)" />
        <KpiCard label="On-time rate" value={`${kpis.onTimeRate}%`} accentColor="var(--status-ontime-border)" />
        <KpiCard label="Late" value={kpis.late} accentColor="var(--status-late-border)" muted={kpis.late === 0} />
        <KpiCard label="Not submitted" value={kpis.notSubmitted} accentColor="var(--status-missing-border)" muted={kpis.notSubmitted === 0} />
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 10, background: 'var(--surface)' }}>
        <table>
          <thead>
            <tr>
              <th style={thStyle('left', 180)}>LGU</th>
              {periods.map((p) => (
                <th key={p} style={thStyle('center', periods.length <= 4 ? 150 : 96)}>
                  {periods.length <= 4 ? p : p.slice(0, 3)}
                </th>
              ))}
              <th style={thStyle('center', 100)}>On time</th>
            </tr>
          </thead>
          <tbody>
            {lgus.map((lgu, i) => {
              const compliance = complianceByLgu.get(lgu.id);
              return (
                <tr key={lgu.id} style={{ background: i % 2 === 1 ? 'var(--surface-tint)' : 'transparent' }}>
                  <td style={{ ...tdStyle('left'), fontWeight: 500 }}>{lgu.name}</td>
                  {periods.map((_, idx) => {
                    const period = idx + 1;
                    const s = byKey.get(submissionKey(lgu.id, period));
                    const meta = statusMeta(s?.status);
                    return (
                      <td key={period} style={tdStyle('center')}>
                        <button
                          onClick={() => setEditing({ lguId: lgu.id, lguName: lgu.name, period, existing: s })}
                          title={s?.date_submitted ? `Submitted ${s.date_submitted}` : 'No data logged'}
                          style={{
                            width: '100%',
                            padding: '6px 4px',
                            borderRadius: 6,
                            border: `1px solid ${meta.border}`,
                            background: meta.bg,
                            color: meta.text,
                            fontSize: 11,
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {s?.date_submitted ? s.date_submitted.slice(5) : '—'}
                        </button>
                      </td>
                    );
                  })}
                  <td style={{ ...tdStyle('center'), fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {compliance.onTime}/{compliance.logged || 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditModal
          editing={editing}
          periodLabel={periodLabel}
          periodName={periods[editing.period - 1]}
          saving={saving}
          error={error}
          onCancel={() => { setEditing(null); setError(null); }}
          onSave={handleSave}
        />
      )}
    </main>
  );
}

function KpiCard({ label, value, accentColor, muted }) {
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 8, background: 'var(--surface)', overflow: 'hidden' }}>
      <div style={{ height: 3, background: accentColor }} />
      <div style={{ padding: '13px 16px' }}>
        <p style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--text-secondary)', margin: '0 0 6px' }}>
          {label}
        </p>
        <p style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-mono)', color: muted ? 'var(--text-secondary)' : 'var(--text-primary)', margin: 0 }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function thStyle(align, width) {
  return {
    textAlign: align,
    padding: '11px 8px',
    fontSize: 10.5,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: 'var(--text-secondary)',
    background: 'var(--surface-tint)',
    borderBottom: '1px solid var(--border)',
    width,
  };
}

function tdStyle(align) {
  return {
    textAlign: align,
    padding: '6px 8px',
    borderBottom: '1px solid var(--border)',
    fontSize: 13,
  };
}

function EditModal({ editing, periodLabel, periodName, saving, error, onCancel, onSave }) {
  const [dateSubmitted, setDateSubmitted] = useState(editing.existing?.date_submitted || '');
  const [status, setStatus] = useState(editing.existing?.status || '');
  const [remarks, setRemarks] = useState(editing.existing?.remarks || '');

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(11,37,69,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'var(--surface)', borderRadius: 10, width: 360, border: '1px solid var(--border)', overflow: 'hidden' }}
      >
        <div style={{ height: 4, background: 'var(--gold)' }} />
        <div style={{ padding: 24 }}>
          <h2 style={{ fontSize: 17, marginBottom: 2 }}>{editing.lguName}</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
            {periodLabel}: {periodName}
          </p>

          <label style={fieldLabel}>Date submitted</label>
          <input
            type="date"
            value={dateSubmitted}
            onChange={(e) => setDateSubmitted(e.target.value)}
            style={fieldInput}
          />

          <label style={fieldLabel}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={fieldInput}>
            <option value="">No data</option>
            <option value="on_time">On time</option>
            <option value="late">Late</option>
            <option value="not_submitted">Not submitted</option>
          </select>

          <label style={fieldLabel}>Remarks</label>
          <input
            type="text"
            placeholder="e.g. 2 days before deadline"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            style={fieldInput}
          />

          {error && <p style={{ color: 'var(--status-missing-text)', fontSize: 13 }}>{error}</p>}

          <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
            <button onClick={onCancel} style={{ padding: '8px 14px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent' }}>
              Cancel
            </button>
            <button
              onClick={() => onSave({ dateSubmitted, status, remarks })}
              disabled={saving}
              style={{ padding: '8px 14px', borderRadius: 6, border: 'none', background: 'var(--navy)', color: 'white' }}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const fieldLabel = { display: 'block', fontSize: 12, color: 'var(--text-secondary)', margin: '12px 0 4px' };
const fieldInput = { width: '100%', padding: '9px 10px', borderRadius: 6, border: '1px solid var(--border)', fontFamily: 'inherit', fontSize: 14 };
