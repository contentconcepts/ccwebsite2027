-- ContentConcepts initial schema
-- Migration: 20260314000000_initial

-- Create blog_posts table
create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null,
  locale        text not null check (locale in ('en', 'es', 'fr')),
  title         text not null,
  description   text not null,
  body          text not null,
  author        text not null default 'ContentConcepts',
  tags          text[] not null default '{}',
  keywords      text[] not null default '{}',
  cover_image   text,
  components    jsonb not null default '[]',
  has_faq       boolean not null default false,
  faq_items     jsonb not null default '[]',
  published     boolean not null default false,
  reviewed_by   text,
  reviewed_at   timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  published_at  timestamptz,
  unique (slug, locale)
);

-- Index for fast blog index queries
create index if not exists blog_posts_locale_published_idx
  on public.blog_posts (locale, published, published_at desc);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function update_updated_at();

-- Auto-set published_at when published flips to true
create or replace function set_published_at()
returns trigger as $$
begin
  if new.published = true and old.published = false then
    new.published_at = now();
  end if;
  return new;
end;
$$ language plpgsql;

create or replace trigger blog_posts_published_at
  before update on public.blog_posts
  for each row execute function set_published_at();

-- Row Level Security
alter table public.blog_posts enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Published posts are publicly readable" on public.blog_posts;
drop policy if exists "Service role can do everything" on public.blog_posts;

create policy "Published posts are publicly readable"
  on public.blog_posts for select
  using (published = true);

create policy "Service role can do everything"
  on public.blog_posts for all
  using (auth.role() = 'service_role');

-- Insert a test post
insert into public.blog_posts (
  slug, locale, title, description, body, author, tags, keywords, published, published_at
) values (
  'test-post', 'en',
  'Test Post — ContentConcepts',
  'This is a test post to verify the database connection.',
  '<p>This is the test post body. The database is working correctly.</p>',
  'ContentConcepts',
  ARRAY['test', 'editing'],
  ARRAY['academic editing', 'proofreading'],
  true,
  now()
) on conflict (slug, locale) do nothing;
