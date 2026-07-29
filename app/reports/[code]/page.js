import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { REPORT_TYPES } from '../../../lib/reportHelpers';
import SubmissionsGrid from '../../../components/SubmissionsGrid';

export const dynamic = 'force-dynamic';

async function getData(code, year) {
  const { data: reportType, error: rtError } = await supabase
    .from('report_types')
    .select('id, name, code, period_type')
    .eq('code', code)
    .single();

  if (rtError || !reportType) return null;

  const { data: lgus, error: lguError } = await supabase
    .from('lgus')
    .select('id, name')
    .order('name');

  if (lguError) throw lguError;

  const { data: submissions, error: subError } = await supabase
    .from('submissions')
    .select('id, lgu_id, period_month, period_year, date_submitted, status, remarks')
    .eq('report_type_id', reportType.id)
    .eq('period_year', year);

  if (subError) throw subError;

  return { lgus, reportType, submissions };
}

export default async function ReportPage({ params, searchParams }) {
  const { code } = await params;
  const resolvedSearchParams = await searchParams;

  // Guard against arbitrary codes before hitting the DB
  if (!REPORT_TYPES.some((r) => r.code === code)) {
    notFound();
  }

  const year = Number(resolvedSearchParams?.year) || new Date().getFullYear();
  const data = await getData(code, year);

  if (!data) {
    notFound();
  }

  return (
    <SubmissionsGrid
      lgus={data.lgus}
      reportType={data.reportType}
      initialSubmissions={data.submissions}
      year={year}
    />
  );
}
