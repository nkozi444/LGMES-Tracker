// Mirrors the report_types rows seeded in supabase/schema.sql. Used for
// the landing page cards and to validate the [code] route param without
// an extra DB round trip. `category` groups the landing page; `periodType`
// determines whether a report's grid shows 12 month columns or 4 quarter
// columns (must match the period_type column in the DB).
export const REPORT_TYPES = [
  {
    code: 'drug_watch_list',
    name: 'Drug Watch List',
    description: 'Monthly monitoring report',
    category: 'Anti-Illegal Drugs',
    periodType: 'monthly',
  },
  {
    code: 'badac_monitoring',
    name: 'BADAC Monitoring',
    description: 'Barangay Anti-Drug Abuse Council monthly meeting monitoring report',
    category: 'Anti-Illegal Drugs',
    periodType: 'monthly',
  },
  {
    code: 'bida_report',
    name: 'BIDA Accomplishment Report',
    description: "Buhay Ingatan, Droga'y Ayawan program accomplishment report",
    category: 'Anti-Illegal Drugs',
    periodType: 'monthly',
  },
  {
    code: 'cbdrp_report',
    name: 'Community-Based Drug Rehab Program',
    description: 'Quarterly report — Anti-Drug Abuse System (ADAS) guidelines',
    category: 'Anti-Illegal Drugs',
    periodType: 'quarterly',
  },
  {
    code: 'barco_monthly',
    name: 'Monthly BaRCO Report',
    description: 'DILG MC 2023-017 — Barangay Road Clearing Operations',
    category: 'Public Safety & Compliance',
    periodType: 'monthly',
  },
  {
    code: 'icad_ppas',
    name: 'ICAD PPAs',
    description: 'Monthly ICAD PPAs monitoring report',
    category: 'Public Safety & Compliance',
    periodType: 'monthly',
  },
  {
    code: 'mc_2022_025',
    name: 'DILG MC 2022-025',
    description: 'Compliance monitoring — pharmaceutical products in sari-sari stores',
    category: 'Public Safety & Compliance',
    periodType: 'monthly',
  },
  {
    code: 'asf_report',
    name: 'African Swine Fever Report',
    description: 'Bantay ASF sa Barangay (BABay ASF) Program — JMO 2022-01',
    category: 'Public Safety & Compliance',
    periodType: 'monthly',
  },
  {
    code: 'rcsp_updates',
    name: 'RCSP Implementation Updates',
    description: 'CY 2025 priority barangays — phase implementation updates',
    category: 'Public Safety & Compliance',
    periodType: 'monthly',
  },
  {
    code: 'cucpd_updates',
    name: 'CUCPD Implementation Updates',
    description: 'CY 2022-2024 priority LGUs — phase implementation updates',
    category: 'Public Safety & Compliance',
    periodType: 'monthly',
  },
  {
    code: 'pogo_certification',
    name: 'POGO Certification',
    description: 'Monthly compliance certification tracking',
    category: 'Public Safety & Compliance',
    periodType: 'monthly',
  },
  {
    code: 'cso_desk_reports',
    name: 'CSO Desk Related Reports',
    description: 'CSOD Form 2B & Form 3; CSO Desk Officer / People\u2019s Council designation \u2014 DILG MC 2021-054',
    category: 'CSO Engagement',
    periodType: 'monthly',
  },
  {
    code: 'cso_funds_transferred',
    name: 'CSO Funds Transferred',
    description: 'Quarterly report of funds transferred to partner CSOs \u2014 DILG MC 2022-005',
    category: 'CSO Engagement',
    periodType: 'quarterly',
  },
  {
    code: 'cso_accredited_certified',
    name: 'Accredited & Certified CSOs',
    description: 'Quarterly submission of accredited/certified partner CSOs \u2014 DILG MC 2022-005',
    category: 'CSO Engagement',
    periodType: 'quarterly',
  },
  {
    code: 'first_time_jobseekers',
    name: 'First-Time Jobseekers Report',
    description: 'Monthly first-time job availees/beneficiaries \u2014 RA 11261',
    category: 'Labor & Social Welfare',
    periodType: 'monthly',
  },
  {
    code: 'kasambahay_report',
    name: 'Consolidated Kasambahay Report',
    description: 'DILG MC 2022-100 \u2014 RA 10361 (Kasambahay Law)',
    category: 'Labor & Social Welfare',
    periodType: 'monthly',
  },
  // --- Quarterly (verified against tracer tab gid=1471447069) ---
  { code: 'mcc_functionality', name: 'MCC Functionality Monitoring', description: 'Management and Coordinating Committees functionality', category: 'Governance & Institutions', periodType: 'quarterly' },
  { code: 'cso_accreditation_activities', name: 'CSO Accreditation Activities Report', description: 'DILG MC 2022-083 Section 6.1', category: 'CSO Engagement', periodType: 'quarterly' },
  { code: 'sewage_treatment_inventory', name: 'Sewage Treatment & Management Inventory', description: 'DILG MC 2019-62', category: 'Environment & Public Works', periodType: 'quarterly' },
  { code: 'communal_forests_inventory', name: 'Communal Forests & Tree Parks Inventory', description: 'LGU-established communal forests and tree parks', category: 'Environment & Public Works', periodType: 'quarterly' },
  { code: 'pass_through_fees', name: 'Pass-Through Fees Monitoring', description: 'Illegal imposition of pass-through fees', category: 'Governance & Institutions', periodType: 'quarterly' },
  { code: 'trade_union_programs', name: 'Trade Union Community Programs Report', description: 'DILG MC 2023-102 \u2014 freedom of association / right to organize', category: 'Labor & Social Welfare', periodType: 'quarterly' },
  { code: 'mc_2020_100', name: 'MC 2020-100 Report', description: 'Network of cycling lanes and walking paths', category: 'Environment & Public Works', periodType: 'quarterly' },
  { code: 'midwives_status', name: 'Status of Midwives Report', description: 'DILG MC 2023-153', category: 'Labor & Social Welfare', periodType: 'quarterly' },
  { code: 'confidential_funds_utilization', name: 'Confidential Funds Utilization Report', description: 'Annex C \u2014 COA-DBM-DILG-GCG-DND Joint Circular 2025-01', category: 'Governance & Institutions', periodType: 'quarterly' },
  { code: 'mc_2017_34', name: 'MC 2017-34 Monitoring', description: 'Government hours, absences, tardiness, loafing', category: 'Governance & Institutions', periodType: 'quarterly' },
  { code: 'barangay_fdp_compliance', name: 'Barangay Full Disclosure Policy Compliance', description: 'DILG MC 2014-81', category: 'Governance & Institutions', periodType: 'quarterly' },
  { code: 'fdp_portal_posting', name: 'Financial Documents FDP Portal Posting', description: 'DILG MC 2024-021', category: 'Governance & Institutions', periodType: 'quarterly' },
  { code: 'sk_fdp_compliance', name: 'SK Full Public Disclosure Policy Compliance', description: 'DILG MC 2023-068', category: 'Governance & Institutions', periodType: 'quarterly' },
  // --- Semestral (verified against tracer tab gid=198779554) ---
  { code: 'fisheries_compliance_audit', name: 'Fisheries Compliance Audit Data Capture Form', description: 'DILG MC 2021-051', category: 'Environment & Public Works', periodType: 'semestral' },
  { code: 'sdec_work_financial_plan', name: 'SDEC Three-Year Work & Financial Plan', description: 'Annex 1.0 \u2014 DILG MC 2021-001', category: 'Anti-Illegal Drugs', periodType: 'semestral' },
  { code: 'sdec_semiannual_report', name: 'SDEC Semi-Annual Accomplishment Report', description: 'Annex 2.0 \u2014 DILG MC 2021-001', category: 'Anti-Illegal Drugs', periodType: 'semestral' },
  { code: 'barangay_assembly_monitoring', name: 'Barangay Assembly Monitoring', description: 'Annex C \u2014 DILG MC 2024-032', category: 'Governance & Institutions', periodType: 'semestral' },
  { code: 'katarungang_pambarangay', name: 'Katarungang Pambarangay Compliance Report', description: 'Memorandum dated 08 January 2021', category: 'Governance & Institutions', periodType: 'semestral' },
  { code: 'poc_secretariat_report', name: 'POC Secretariat Report', description: 'DILG MC 2022-118 \u2014 POPS Plan', category: 'Public Safety & Compliance', periodType: 'semestral' },
  { code: 'popsp_pcm_form1', name: 'POPSP-PCM Report Form 1', description: 'DILG MC 2022-118 \u2014 POPS Plan', category: 'Public Safety & Compliance', periodType: 'semestral' },
  // --- Annual (verified against tracer tab gid=1850153132) ---
  { code: 'accredited_barangay_ngos', name: 'Accredited Barangay-Based NGOs List', description: 'DILG MC 2022-083', category: 'CSO Engagement', periodType: 'annual' },
  { code: 'national_cso_database', name: 'National CSO Database Submission', description: 'DILG memorandum dated January 31, 2024', category: 'CSO Engagement', periodType: 'annual' },
  { code: 'adac_performance_audit', name: 'ADAC Performance Audit & Awards', description: 'DILG MC 2024-028 \u2014 CY 2025', category: 'Anti-Illegal Drugs', periodType: 'annual' },
  { code: 'sdec_annual_report', name: 'SDEC Annual Accomplishment Report', description: 'Annex 3.0 \u2014 DILG MC 2021-001', category: 'Anti-Illegal Drugs', periodType: 'annual' },
  { code: 'sdec_operational_monitoring', name: 'Operational SDEC Monitoring Report', description: 'Annex 4.0 \u2014 DILG MC 2021-001', category: 'Anti-Illegal Drugs', periodType: 'annual' },
  { code: 'lcpc_functionality', name: 'LCPC Functionality Report', description: 'DILG MC 2021-039 \u2014 Local Council for Protection of Children', category: 'Labor & Social Welfare', periodType: 'annual' },
  { code: 'ssa_compliance', name: 'Safe Spaces Act Compliance Monitoring', description: 'Advisory dated November 20, 2023', category: 'Public Safety & Compliance', periodType: 'annual' },
  { code: 'popsp_pcms', name: 'POPSP-PCMS Policy Compliance', description: 'DILG MC 2022-118 \u2014 POPS Plan', category: 'Public Safety & Compliance', periodType: 'annual' },
  { code: 'popsp_pcms_allocation', name: 'POPSP-PCMS Actual Allocation Encoding', description: 'DILG MC 2022-118 \u2014 POPS Plan', category: 'Public Safety & Compliance', periodType: 'annual' },
  { code: 'firecracker_monitoring', name: 'Yearly Firecracker Monitoring Report', description: 'DILG MC 2023-202', category: 'Public Safety & Compliance', periodType: 'annual' },
  { code: 'coop_dev_officer_appointment', name: 'Cooperatives Development Officer Appointment Report', description: 'RA 11535', category: 'Labor & Social Welfare', periodType: 'annual' },
  { code: 'talipapa_monitoring', name: 'TALIPAPA Monitoring Report', description: 'Tapat at Ligtas na Pamilihang Pambarangay', category: 'Governance & Institutions', periodType: 'annual' },
  { code: 'bhert_report', name: 'BHERT Report', description: 'Barangay Health Emergency Response Teams', category: 'Labor & Social Welfare', periodType: 'annual' },
];

export const CATEGORY_ORDER = [
  'Anti-Illegal Drugs',
  'Public Safety & Compliance',
  'CSO Engagement',
  'Labor & Social Welfare',
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
export const SEMESTERS = ['1st Semester', '2nd Semester'];
export const ANNUAL_PERIOD = ['Annual'];

export const PERIOD_TYPE_ORDER = ['monthly', 'quarterly', 'semestral', 'annual'];
export const PERIOD_TYPE_LABELS = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  semestral: 'Semestral',
  annual: 'Annual',
};

export function periodsFor(reportType) {
  switch (reportType?.period_type) {
    case 'quarterly':
      return QUARTERS;
    case 'semestral':
      return SEMESTERS;
    case 'annual':
      return ANNUAL_PERIOD;
    default:
      return MONTHS;
  }
}

export const STATUS_META = {
  on_time: { label: 'On time', bg: 'var(--status-ontime-bg)', border: 'var(--status-ontime-border)', text: 'var(--status-ontime-text)' },
  late: { label: 'Late', bg: 'var(--status-late-bg)', border: 'var(--status-late-border)', text: 'var(--status-late-text)' },
  not_submitted: { label: 'Not submitted', bg: 'var(--status-missing-bg)', border: 'var(--status-missing-border)', text: 'var(--status-missing-text)' },
};

export function statusMeta(status) {
  return STATUS_META[status] || { label: 'No data', bg: 'var(--status-empty-bg)', border: 'var(--status-empty-border)', text: 'var(--status-empty-text)' };
}
