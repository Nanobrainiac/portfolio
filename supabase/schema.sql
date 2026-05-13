create extension if not exists pgcrypto;

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true,
  hero_headline text not null,
  hero_subheadline text not null,
  about text not null,
  resume_url text,
  featured_video_url text,
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profile add column if not exists singleton boolean not null default true;

delete from profile
where id not in (
  select id from profile order by updated_at desc limit 1
);

create unique index if not exists profile_singleton_idx on profile (singleton);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null,
  long_description text,
  screenshot_url text,
  tech_stack text[] not null default '{}',
  live_demo_url text,
  github_url text,
  video_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists projects_single_featured_idx
on projects (featured)
where featured is true;

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'General',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists work_history (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  start_date text not null,
  end_date text,
  summary text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profile_updated_at on profile;
create trigger set_profile_updated_at before update on profile
for each row execute procedure set_updated_at();

drop trigger if exists set_projects_updated_at on projects;
create trigger set_projects_updated_at before update on projects
for each row execute procedure set_updated_at();

drop trigger if exists set_site_settings_updated_at on site_settings;
create trigger set_site_settings_updated_at before update on site_settings
for each row execute procedure set_updated_at();

alter table site_settings enable row level security;
alter table profile enable row level security;
alter table projects enable row level security;
alter table skills enable row level security;
alter table work_history enable row level security;
alter table links enable row level security;

create policy "public read settings" on site_settings for select using (true);
create policy "public read profile" on profile for select using (true);
create policy "public read projects" on projects for select using (true);
create policy "public read skills" on skills for select using (true);
create policy "public read work history" on work_history for select using (true);
create policy "public read links" on links for select using (true);

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

create policy "public read portfolio assets"
on storage.objects for select
using (bucket_id = 'portfolio-assets');

insert into profile (hero_headline, hero_subheadline, about, resume_url, featured_video_url, location)
select
  'Two Pixels Short',
  'A small AI software studio building internal tools, rapid prototypes, automation workflows, and full-stack web apps.',
  'Two Pixels Short is led by Chris Martindale, an AI Builder and Full-Stack Developer focused on rapid prototyping, practical automation, and clean implementation. AI tools are part of the workflow, but the work stays grounded in manual code review, debugging, and production-minded engineering.',
  '',
  '',
  'United States'
where not exists (select 1 from profile);

insert into projects (title, slug, description, long_description, tech_stack, featured, sort_order)
values (
  'Competitive Intelligence Repository',
  'competitive-intelligence-repository',
  'An internal intelligence app built for Physician Life Care Planning, LLC to track competitors, ingest articles, generate AI summaries, organize strategic insights, and support business decision-making.',
  'A working placeholder for a portfolio case study covering competitor tracking, article ingestion, AI-generated summaries, searchable insights, and decision support workflows.',
  array['Next.js','TypeScript','Supabase','OpenAI API','Internal Tools'],
  true,
  1
) on conflict (slug) do nothing;

insert into skills (name, category, sort_order) values
  ('React / Next.js', 'Frontend', 1),
  ('TypeScript', 'Frontend', 2),
  ('Node / Express', 'Backend', 3),
  ('Supabase', 'Backend', 4),
  ('OpenAI API', 'AI', 5),
  ('Ollama / Local AI', 'AI', 6),
  ('Vercel Deployment', 'DevOps', 7),
  ('GitHub Workflow', 'DevOps', 8)
on conflict do nothing;

insert into links (label, url, sort_order) values
  ('GitHub', 'https://github.com/', 1),
  ('LinkedIn', 'https://www.linkedin.com/', 2),
  ('Email', 'mailto:hello@example.com', 3)
on conflict do nothing;
