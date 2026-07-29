-- LGMES Report Tracker schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)

create table if not exists lgus (
  id serial primary key,
  name text not null unique
);

create table if not exists report_types (
  id serial primary key,
  name text not null,
  code text not null unique,
  -- 'monthly' renders 12 columns (Jan-Dec); 'quarterly' renders 4 (Q1-Q4).
  -- submissions.period_month holds the 1-12 month OR 1-4 quarter index,
  -- scoped by report_type_id so the two never collide.
  period_type text not null default 'monthly' check (period_type in ('monthly', 'quarterly'))
);

-- One deadline rule per report type. deadline_day is the day-of-month a
-- report is due. Add more columns here later if a report type needs a
-- more complex rule (e.g. "10 days after month end").
create table if not exists deadlines (
  id serial primary key,
  report_type_id integer not null references report_types(id) on delete cascade,
  deadline_day integer not null
);

create table if not exists submissions (
  id serial primary key,
  lgu_id integer not null references lgus(id) on delete cascade,
  report_type_id integer not null references report_types(id) on delete cascade,
  period_month integer not null check (period_month between 1 and 12),
  period_year integer not null,
  date_submitted date,
  status text check (status in ('on_time', 'late', 'not_submitted')),
  remarks text,
  updated_at timestamptz not null default now(),
  unique (lgu_id, report_type_id, period_month, period_year)
);

-- Keep updated_at current on every edit
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_submissions_updated_at on submissions;
create trigger trg_submissions_updated_at
  before update on submissions
  for each row execute function set_updated_at();

-- Seed: the 25 LGUs of Negros Oriental as they appear in the tracer sheet
insert into lgus (name) values
  ('Amlan'), ('Ayungon'), ('Bacong'), ('Bais City'), ('Basay'),
  ('Bayawan City'), ('Bindoy'), ('Canlaon City'), ('Dauin'), ('Dumaguete City'),
  ('Guihulngan City'), ('Jimalalud'), ('La Libertad'), ('Mabinay'), ('Manjuyod'),
  ('Pamplona'), ('San Jose'), ('Santa Catalina'), ('Siaton'), ('Sibulan'),
  ('Tanjay City'), ('Tayasan'), ('Valencia'), ('Vallehermoso'), ('Zamboanguita')
on conflict (name) do nothing;

-- Seed: all 5 report types from the first tracer sheet.
insert into report_types (name, code, period_type) values
  ('Drug Watch List', 'drug_watch_list', 'monthly'),
  ('Barangay Anti-Drug Abuse Council Monthly Meeting Monitoring Report', 'badac_monitoring', 'monthly'),
  ('Monthly BaRCO Report (DILG MC 2023-017)', 'barco_monthly', 'monthly'),
  ('Monthly ICAD PPAs Monitoring Report', 'icad_ppas', 'monthly'),
  ('DILG MC 2022-025 Compliance Monitoring', 'mc_2022_025', 'monthly')
on conflict (code) do nothing;

-- Seed: the additional 11 report types from the second tracer sheet.
insert into report_types (name, code, period_type) values
  ('CSO Desk Related Reports', 'cso_desk_reports', 'monthly'),
  ('CSO Funds Transferred to Partner CSOs', 'cso_funds_transferred', 'quarterly'),
  ('Accredited & Certified Partner CSOs', 'cso_accredited_certified', 'quarterly'),
  ('Community-Based Drug Rehabilitation Program Report', 'cbdrp_report', 'quarterly'),
  ('African Swine Fever Report', 'asf_report', 'monthly'),
  ('First-Time Jobseekers Report', 'first_time_jobseekers', 'monthly'),
  ('Consolidated Kasambahay Report', 'kasambahay_report', 'monthly'),
  ('BIDA Accomplishment Report', 'bida_report', 'monthly'),
  ('RCSP Implementation Updates', 'rcsp_updates', 'monthly'),
  ('CUCPD Implementation Updates', 'cucpd_updates', 'monthly'),
  ('POGO Certification', 'pogo_certification', 'monthly')
on conflict (code) do nothing;

-- Row Level Security: enabled with permissive policies for now since this
-- is a small internal tool with a single shared login. Tighten this
-- (e.g. per-user write access) before wider rollout.
alter table lgus enable row level security;
alter table report_types enable row level security;
alter table deadlines enable row level security;
alter table submissions enable row level security;

create policy "public read lgus" on lgus for select using (true);
create policy "public read report_types" on report_types for select using (true);
create policy "public read deadlines" on deadlines for select using (true);
create policy "public read submissions" on submissions for select using (true);
create policy "public write submissions" on submissions for insert with check (true);
create policy "public update submissions" on submissions for update using (true);
