# ContentConcepts — Project Briefing Document for Claude Code

**Version:** 1.0  
**Date:** March 2026  
**Purpose:** Complete technical brief for building the ContentConcepts website from scratch  
**Intended reader:** Claude Code (AI coding assistant)

---


## 0. How to use this document

Read all 22 sections before writing any code.

**Tools available to you — use them:**

- Supabase MCP — execute database operations directly, do not just output SQL

- Context7 MCP — look up live docs before implementing any library config

- GitHub MCP — create repo and manage commits

- Vercel MCP — configure project and environment variables

- Terminal — run and verify every build command, do not ask me to run them

- Subagents — use parallel subagents for independent workstreams as

  described in Section 21

**Rules:**

- Do not start implementing until you have read every section

- Confirm understanding of the full brief before proceeding

- Implement one phase at a time in the order given in Section 15

- Use Context7 to verify library APIs before writing config — do not

  rely on training data for version-specific details

- Show a short plan and get confirmation before starting each phase

- Run verification steps at the end of each phase and show output

---

## 1. Project overview

**ContentConcepts** (contentconcepts.com) is a professional academic and
business editing and proofreading service. The website is a content-marketing
site — its primary business goal is to rank in search for academic editing
keywords, build trust with researchers worldwide, and convert visitors into
paying customers.

The site has two content types:

1. **Service pages** — static marketing pages describing editing services
   (manuscript editing, thesis editing, proofreading, etc.)
2. **Blog posts** — long-form SEO articles targeting academic editing
   keywords, with embedded interactive React components (charts, diagrams,
   calculators, before/after examples)

**Content creation workflow:**
- Blog posts are written by an AI pipeline (Claude Code receives a brief,
  generates the article, inserts it into the database as a draft)
- A human reviews the draft and sets `published: true` to go live
- High-value pillar articles with custom interactive visuals are authored
  as MDX files committed to the repository
- New posts go live within 60 seconds of being published — no redeployment
  needed

---

## 2. Non-negotiable requirements

Before any implementation decisions, these requirements are fixed:

1. **SEO-first** — every page must return fully rendered HTML on the first
   byte. No client-side rendering for content pages. Google, Bing, and social
   media scrapers must all see complete content without executing JavaScript.

2. **AI content pipeline** — the blog must accept new posts via a Supabase
   database insert without triggering a rebuild or redeployment. ISR
   (Incremental Static Regeneration) must serve new posts as static HTML
   within 60 seconds of publish.

3. **Interactive visuals** — blog posts can embed React components
   (interactive charts, SVG diagrams, calculators, before/after widgets).
   These components live in the codebase. Posts reference them by ID, the
   renderer injects them.

4. **Multilingual** — English, Spanish, and French. Each language is a
   separate URL path (`/en/`, `/es/`, `/fr/`). Google must see separate
   HTML pages per language with correct `hreflang` tags.

5. **Human review gate** — all AI-generated content is inserted with
   `published: false`. Nothing goes live without a human setting
   `published: true` in the admin interface or Supabase dashboard.

6. **No full rebuild for content** — publishing a blog post must not trigger
   a Vercel deployment. Only code changes (new components, layout changes)
   trigger deploys.

---

## 3. Tech stack — exact versions

Use these exact technologies. Do not substitute alternatives.

### 3.1 Framework
- **Next.js 15** with App Router
- TypeScript throughout — no JavaScript files
- React 19 (ships with Next.js 15)

### 3.2 Styling
- **Tailwind CSS v4**
- **shadcn/ui** for UI components (buttons, cards, badges, tables, etc.)
- `@tailwindcss/typography` for MDX/blog prose styling

### 3.3 Content — two-track system
- **Track A (MDX):** Pillar articles with custom visuals — `.mdx` files in
  `src/content/blog/[locale]/[slug].mdx`
- **Track B (Supabase):** AI-generated articles — rows in `blog_posts` table,
  served via ISR

### 3.4 Database and backend
- **Supabase** — PostgreSQL, Auth, Storage
- Use the official `@supabase/ssr` package for Next.js App Router integration
- Server Components fetch directly from Supabase — no API routes for reads
- Mutations use Next.js Server Actions

### 3.5 Internationalisation
- **next-intl v3** with App Router routing
- Locale routing via `[locale]` dynamic segment: `app/[locale]/`
- Supported locales: `en`, `es`, `fr` — default locale: `en`
- `hreflang` alternate links generated automatically by next-intl middleware

### 3.6 SEO
- Next.js native `generateMetadata()` for all meta tags — no external
  helmet library
- Native `app/sitemap.ts` for XML sitemap generation
- Native `app/robots.ts` for robots.txt
- JSON-LD structured data injected as `<script>` in page components
- Canonical URLs via `alternates.canonical` in `generateMetadata()`

### 3.7 Deployment
- **Vercel** — zero-config Next.js deployment
- ISR handled natively by Vercel's edge network
- Environment variables set in Vercel dashboard

---

## 4. Repository structure

Create exactly this folder structure. Do not deviate.

```
contentconcepts/
├── app/
│   └── [locale]/
│       ├── layout.tsx                   # Root layout with NextIntlClientProvider
│       ├── page.tsx                     # Home page
│       ├── about/
│       │   └── page.tsx
│       ├── services/
│       │   └── [service]/
│       │       └── page.tsx
│       ├── pricing/
│       │   └── page.tsx
│       ├── blog/
│       │   ├── page.tsx                 # Blog index — lists all posts
│       │   └── [slug]/
│       │       └── page.tsx             # Blog post renderer (MDX + Supabase)
│       ├── admin/
│       │   └── page.tsx                 # Simple draft review UI (auth-protected)
│       └── not-found.tsx
├── app/
│   ├── sitemap.ts                       # Auto-generated XML sitemap
│   ├── robots.ts                        # robots.txt
│   └── layout.tsx                       # HTML shell (lang attribute only)
├── src/
│   ├── components/
│   │   ├── blog/
│   │   │   ├── MDXComponents.tsx        # Component registry for MDX
│   │   │   ├── ArticleLayout.tsx        # Shared layout for all post types
│   │   │   ├── ArticleSchema.tsx        # JSON-LD Article structured data
│   │   │   ├── FAQSchema.tsx            # JSON-LD FAQPage structured data
│   │   │   └── visuals/                 # All embeddable visual components
│   │   │       ├── index.ts             # Exports all visuals by ID
│   │   │       ├── PricingCalculator.tsx
│   │   │       ├── EditingProcessDiagram.tsx
│   │   │       ├── EditingTypesComparison.tsx
│   │   │       ├── BeforeAfterExamples.tsx
│   │   │       ├── RejectionReasonsChart.tsx
│   │   │       └── EditingCertificate.tsx
│   │   ├── ui/                          # shadcn/ui components (auto-generated)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── shared/
│   │       ├── CTAButton.tsx
│   │       ├── ServiceCard.tsx
│   │       └── TestimonialCard.tsx
│   ├── content/
│   │   └── blog/
│   │       ├── en/                      # English MDX pillar posts
│   │       ├── es/                      # Spanish MDX pillar posts
│   │       └── fr/                      # French MDX pillar posts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                # Browser Supabase client
│   │   │   ├── server.ts                # Server Supabase client (SSR)
│   │   │   └── types.ts                 # Generated database types
│   │   ├── blog/
│   │   │   ├── mdxLoader.ts             # Loads MDX posts via import.meta.glob
│   │   │   ├── supabaseLoader.ts        # Fetches posts from Supabase
│   │   │   └── postRouter.ts            # Unified: try MDX first, fall back to Supabase
│   │   └── utils.ts
│   ├── i18n/
│   │   ├── routing.ts                   # next-intl routing config
│   │   └── request.ts                   # next-intl getRequestConfig
│   └── types/
│       ├── mdx.d.ts                     # TypeScript types for .mdx imports
│       ├── blog.ts                      # BlogPost, BlogFrontmatter interfaces
│       └── database.ts                  # Supabase table types
├── messages/
│   ├── en.json                          # English UI strings
│   ├── es.json                          # Spanish UI strings
│   └── fr.json                          # French UI strings
├── public/
│   └── images/
├── middleware.ts                        # next-intl locale routing middleware
├── next.config.ts                       # Next.js + MDX + next-intl config
├── tailwind.config.ts
├── tsconfig.json
├── .env.local                           # Local env vars (never committed)
├── .env.example                         # Committed — shows required var names
├── BLOG_AUTHORING.md                    # Guide for writing new posts
└── AI_CONTENT_PIPELINE.md              # Guide for the AI content pipeline
```

---

## 5. Database schema

Create these tables in Supabase exactly as specified.

### 5.1 `blog_posts` table

```sql
create table public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null,
  locale        text not null check (locale in ('en', 'es', 'fr')),
  title         text not null,
  description   text not null,
  body          text not null,          -- HTML or Markdown string
  author        text not null default 'ContentConcepts',
  tags          text[] not null default '{}',
  keywords      text[] not null default '{}',
  cover_image   text,                   -- URL to Supabase Storage
  components    jsonb not null default '[]', -- [{"slot": "after-intro", "id": "PricingCalculator"}]
  has_faq       boolean not null default false,
  faq_items     jsonb not null default '[]', -- [{"question": "...", "answer": "..."}]
  published     boolean not null default false,
  reviewed_by   text,                   -- email of reviewer
  reviewed_at   timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  published_at  timestamptz,
  unique (slug, locale)
);

-- Index for fast blog index queries
create index blog_posts_locale_published_idx
  on public.blog_posts (locale, published, published_at desc);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
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

create trigger blog_posts_published_at
  before update on public.blog_posts
  for each row execute function set_published_at();
```

### 5.2 Row Level Security

```sql
-- Public can read published posts
alter table public.blog_posts enable row level security;

create policy "Published posts are publicly readable"
  on public.blog_posts for select
  using (published = true);

create policy "Service role can do everything"
  on public.blog_posts for all
  using (auth.role() = 'service_role');
```

### 5.3 `blog_posts` TypeScript interface

```typescript
// src/types/blog.ts

export interface BlogFrontmatter {
  slug: string
  locale: 'en' | 'es' | 'fr'
  title: string
  description: string
  author: string
  tags: string[]
  keywords: string[]
  coverImage?: string
  components: ComponentSlot[]
  hasFaq: boolean
  faqItems: FAQItem[]
  published: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface ComponentSlot {
  slot: string      // e.g. "after-pricing-section"
  id: string        // e.g. "PricingCalculator" — must match key in VISUAL_COMPONENTS
}

export interface FAQItem {
  question: string
  answer: string
}

export type BlogPost = BlogFrontmatter & {
  body: string      // HTML or Markdown string (Supabase posts)
  source: 'mdx' | 'supabase'
}
```

---

## 6. Content architecture — the two-track system

This is the most important architectural decision in the project. Read carefully.

### Track A: MDX files (pillar posts — human/AI-crafted, rich visuals)

- Live in `src/content/blog/[locale]/[slug].mdx`
- Committed to the Git repository
- Published by deploying the site (only when new pillar posts are added)
- Use full MDX syntax — React components embedded inline
- Frontmatter exported as named `frontmatter` export via
  `remark-mdx-frontmatter`
- Best for: long-form guides, posts with custom interactive visuals,
  cornerstone content that rarely changes

### Track B: Supabase posts (AI-generated, standard blog posts)

- Live in the `blog_posts` Supabase table
- Published by setting `published: true` — no deployment needed
- Go live within 60 seconds via ISR
- Body stored as Markdown string; rendered with a Markdown renderer
- Visual components injected via the `components` JSONB array
- Best for: keyword-targeted articles, supporting content, high-volume
  AI-generated posts

### Post router logic (`src/lib/blog/postRouter.ts`)

```typescript
// Priority: MDX first, Supabase fallback
async function getPost(slug: string, locale: string): Promise<BlogPost | null> {
  // 1. Try MDX
  const mdxPost = await getMDXPost(slug, locale)
  if (mdxPost) return { ...mdxPost, source: 'mdx' }

  // 2. Fall back to Supabase
  const supabasePost = await getSupabasePost(slug, locale)
  if (supabasePost) return { ...supabasePost, source: 'supabase' }

  // 3. Not found
  return null
}
```

---

## 7. ISR configuration

This is how new Supabase posts become live static HTML without a deployment.

```typescript
// app/[locale]/blog/[slug]/page.tsx

export const revalidate = 60  // Regenerate at most once per 60 seconds

export const dynamicParams = true  // Allow slugs not in generateStaticParams

export async function generateStaticParams() {
  // Pre-build the most recent 50 posts per locale at deploy time
  // New posts beyond this list are generated on first request, then cached
  const posts = await getRecentPostsAllLocales(50)
  return posts.map(p => ({ locale: p.locale, slug: p.slug }))
}
```

When a new post is set to `published: true` in Supabase:
- The first request to `/en/blog/[slug]` triggers ISR generation
- Vercel builds and caches the static HTML
- All subsequent requests are served from cache (static speed)
- Cache is invalidated every 60 seconds if the post is updated

For immediate invalidation on publish (optional enhancement), add a
Supabase webhook that calls `revalidatePath('/en/blog/[slug]')` via a
Next.js route handler.

---

## 8. Visual component system

All embeddable blog visuals are React components registered in a central
registry. Blog posts reference them by string ID — they never import
components directly.

### 8.1 Component registry (`src/components/blog/visuals/index.ts`)

```typescript
import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'

// Lazy-loaded — does not block page LCP
const PricingCalculator    = dynamic(() => import('./PricingCalculator'))
const EditingProcessDiagram = dynamic(() => import('./EditingProcessDiagram'))
const EditingTypesComparison = dynamic(() => import('./EditingTypesComparison'))
const BeforeAfterExamples  = dynamic(() => import('./BeforeAfterExamples'))
const RejectionReasonsChart = dynamic(() => import('./RejectionReasonsChart'))
const EditingCertificate   = dynamic(() => import('./EditingCertificate'))

export const VISUAL_COMPONENTS: Record<string, ComponentType> = {
  PricingCalculator,
  EditingProcessDiagram,
  EditingTypesComparison,
  BeforeAfterExamples,
  RejectionReasonsChart,
  EditingCertificate,
}
```

### 8.2 Injecting components into Supabase posts

```tsx
// Inside ArticleLayout.tsx — handles both MDX and Supabase posts

{post.components.map((slot) => {
  const Component = VISUAL_COMPONENTS[slot.id]
  if (!Component) return null
  return (
    <div key={slot.slot} className="my-10">
      <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-lg" />}>
        <Component />
      </Suspense>
    </div>
  )
})}
```

### 8.3 Adding a new visual component

When a new visual component needs to be created:
1. Create `src/components/blog/visuals/[ComponentName].tsx`
2. Add it to the registry in `src/components/blog/visuals/index.ts`
3. It is now available in any blog post by referencing its string ID
4. No other changes needed

---

## 9. SEO implementation

Use only Next.js native SEO features. No external libraries.

### 9.1 Per-page metadata (`generateMetadata`)

```typescript
// app/[locale]/blog/[slug]/page.tsx

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug, locale)
  if (!post) return {}

  const url = `https://contentconcepts.com/${locale}/blog/${slug}`

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
      languages: {
        en: `https://contentconcepts.com/en/blog/${slug}`,
        es: `https://contentconcepts.com/es/blog/${slug}`,
        fr: `https://contentconcepts.com/fr/blog/${slug}`,
        'x-default': `https://contentconcepts.com/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'ContentConcepts',
      locale,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630 }]
        : [{ url: 'https://contentconcepts.com/og-default.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}
```

### 9.2 JSON-LD structured data

```tsx
// src/components/blog/ArticleSchema.tsx
// Drop this component directly into the page — not in <head>, in <body>

export function ArticleSchema({ post }: { post: BlogPost }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: 'ContentConcepts',
      url: 'https://contentconcepts.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ContentConcepts',
      logo: {
        '@type': 'ImageObject',
        url: 'https://contentconcepts.com/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://contentconcepts.com/en/blog/${post.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

```tsx
// src/components/blog/FAQSchema.tsx
// Only rendered when post.hasFaq === true

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 9.3 Sitemap (`app/sitemap.ts`)

```typescript
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://contentconcepts.com'
  const locales = ['en', 'es', 'fr']

  // Static service pages
  const servicePages = [
    'manuscript-editing-service',
    'paper-editing-service',
    'thesis-editing-service',
    'scientific-editing-service',
    'essay-editing-service',
    'medical-editing-service',
    'english-editing-service',
    'book-editing-service',
    'proofreading-services',
    'plagiarism-editing-service',
    'rewriting-service',
  ]

  // Blog posts from Supabase
  const supabasePosts = await getAllPublishedPosts()

  const entries: MetadataRoute.Sitemap = []

  // Home, about, pricing, editors pages per locale
  const staticRoutes = ['', '/about', '/pricing', '/editors', '/editing-certificate']
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      })
    }
    for (const service of servicePages) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      })
    }
    for (const post of supabasePosts.filter(p => p.locale === locale)) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
```

### 9.4 Robots.txt (`app/robots.ts`)

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://contentconcepts.com/sitemap.xml',
  }
}
```

---

## 10. Internationalisation setup

### 10.1 Routing config (`src/i18n/routing.ts`)

```typescript
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  // hreflang alternate links auto-generated by middleware
})
```

### 10.2 Middleware (`middleware.ts`)

```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
}
```

### 10.3 Message files

Create these with placeholder strings. Translate later.

```
messages/
  en.json   — English UI strings (nav, buttons, form labels, error messages)
  es.json   — Spanish translations
  fr.json   — French translations
```

Keys to include from the start:
- Navigation: home, about, services, pricing, blog, contact, getQuote
- Blog: readMore, publishedOn, updatedOn, minuteRead, tags, relatedPosts
- Service pages: getInstantQuote, viewSample, learnMore, startNow
- Forms: submit, name, email, message, wordCount, serviceLevel
- Errors: notFound, serverError, tryAgain

---

## 11. next.config.ts

```typescript
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter' }],
    ],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default withNextIntl(withMDX(nextConfig))
```

---

## 12. Environment variables

Create `.env.example` with these keys. Never commit `.env.local`.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server-only, never expose

# Site
NEXT_PUBLIC_SITE_URL=https://contentconcepts.com

# Admin (for protecting the /admin route)
ADMIN_EMAIL=admin@contentconcepts.com
```

---

## 13. Admin interface (draft review)

Build a minimal admin UI at `/[locale]/admin` that:

- Is protected by Supabase Auth (email + password)
- Lists all `published: false` blog posts with title, locale, created_at
- Shows a preview of each draft (rendered Markdown)
- Has a single "Publish" button that sets `published: true`,
  `reviewed_by` (current user email), and `reviewed_at` (now)
- Calls `revalidatePath` after publishing so the post is live immediately
- Has a "Delete" button to remove drafts that should not be published

This does not need to be elaborate. A clean table with preview and action
buttons is sufficient.

---

## 14. AI content pipeline interface

Build a server-side API route at `/api/content/create` that:

- Accepts POST requests with Bearer token auth
  (token = `SUPABASE_SERVICE_ROLE_KEY`)
- Accepts this JSON body:

```typescript
interface CreatePostPayload {
  slug: string
  locale: 'en' | 'es' | 'fr'
  title: string
  description: string
  body: string           // Markdown string
  author?: string        // defaults to 'ContentConcepts'
  tags: string[]
  keywords: string[]
  coverImage?: string
  components?: ComponentSlot[]
  hasFaq?: boolean
  faqItems?: FAQItem[]
}
```

- Validates all required fields
- Inserts into `blog_posts` with `published: false`
- Returns `{ success: true, id: uuid, slug, locale }`
- On validation error returns `{ success: false, error: string }`

This is the endpoint that Claude Code (the AI content pipeline) calls
when generating new blog posts. It never sets `published: true` —
that is always a human action.

---

## 15. Build phases — implement in this order

Do not skip phases. Do not start the next phase until the current one
is working and confirmed.

### Phase 1 — Project scaffold
- Create Next.js 15 project with TypeScript
- Install and configure: Tailwind v4, shadcn/ui, next-intl, @next/mdx,
  remark plugins, @supabase/ssr
- Set up folder structure exactly as specified in Section 4
- Configure `next.config.ts`, `middleware.ts`, `tsconfig.json`
- Create `.env.example` and `.env.local` (gitignored)
- Verify: `npm run dev` starts without errors
- Verify: `/en`, `/es`, `/fr` all resolve (even to placeholder pages)

### Phase 2 — Database
- Create Supabase project
- Run the SQL schema from Section 5 exactly
- Generate TypeScript types: `npx supabase gen types typescript`
- Create `src/lib/supabase/server.ts` and `src/lib/supabase/client.ts`
- Insert one test row manually in Supabase dashboard
- Verify: server component can fetch and display the test row

### Phase 3 — Blog post renderer
- Build `src/lib/blog/postRouter.ts` — MDX-first, Supabase fallback
- Build `src/lib/blog/mdxLoader.ts` — `import.meta.glob` MDX discovery
- Build `src/lib/blog/supabaseLoader.ts` — Supabase post fetcher
- Build `app/[locale]/blog/[slug]/page.tsx` with ISR (`revalidate = 60`)
- Build `src/components/blog/ArticleLayout.tsx` — shared layout
- Create one test MDX post in `src/content/blog/en/`
- Verify: MDX post renders at `/en/blog/[slug]`
- Verify: Supabase post renders at `/en/blog/[slug]`
- Verify: `curl` response contains full HTML content (not empty div)

### Phase 4 — SEO
- Implement `generateMetadata` on blog post page
- Implement `ArticleSchema` and `FAQSchema` components
- Implement `app/sitemap.ts`
- Implement `app/robots.ts`
- Verify: `curl https://localhost:3000/en/blog/[slug]` shows title tag
  and meta description in raw HTML
- Verify: `curl https://localhost:3000/sitemap.xml` returns valid XML

### Phase 5 — Visual components
- Build placeholder versions of all 6 visual components listed in Section 8
- Set up the VISUAL_COMPONENTS registry with `next/dynamic`
- Implement component slot injection in `ArticleLayout.tsx`
- Test with a Supabase post that has a `components` array
- Verify: components render and are lazy-loaded (check Network tab)

### Phase 6 — Service pages
- Build the service page template
- Create pages for all 11 services listed in the sitemap section
- Each page needs: hero, features list, process steps, CTA, SEO metadata
- Use content from the ContentConcepts website document provided

### Phase 7 — Admin interface
- Build `/[locale]/admin` with Supabase Auth protection
- Draft listing, preview, publish, and delete functionality
- Test full flow: API insert → draft appears in admin → publish → live

### Phase 8 — AI content API
- Build `/api/content/create` route handler
- Add Bearer token auth
- Test with a curl command
- Document the endpoint in `AI_CONTENT_PIPELINE.md`

### Phase 9 — Internationalisation
- Add all UI strings to `messages/en.json`
- Translate to `messages/es.json` and `messages/fr.json`
- Apply `useTranslations()` in all UI components
- Verify: switching locale changes all UI text

### Phase 10 — Polish and deploy
- Create `BLOG_AUTHORING.md` — how to write an MDX pillar post
- Create `AI_CONTENT_PIPELINE.md` — how the AI pipeline works
- Run `npm run build` — zero errors, zero TypeScript errors
- Deploy to Vercel
- Verify ISR: insert a Supabase post, wait 60 seconds, confirm it is live
  at the correct URL with full HTML in the page source

---

## 16. Content to populate the site

The following content files are available and should be used when building
service pages and the initial blog posts:

- `Website_Content_English.md` — all service page copy, hero text,
  feature lists, FAQs, and navigation structure
- `contentconcepts_style_guide.docx` — brand voice, colors, typography,
  social media content types
- `contentconcepts_content_strategy.docx` — content pillars, target
  audiences, hashtag strategy, posting schedule
- `contentconcepts-target-keywords.md` — keyword clusters and target
  keywords for each service page and blog post
- `brief-complete-guide-manuscript-editing.md` — full SEO brief for
  the first pillar blog post
- `article-complete-guide-manuscript-editing.md` — completed first
  article, ready to publish as an MDX file

Use these files to populate the site with real content from the start.
Do not use lorem ipsum placeholder text anywhere.

---

## 17. Design system

### Brand colours

```css
/* tailwind.config.ts — extend theme with these */
:root {
  --brand-green:       #1B5E20;  /* Primary — logo, headings, CTAs */
  --brand-green-light: #66BB6A;  /* Hover states, highlights */
  --brand-navy:        #0D1B2A;  /* Dark backgrounds */
  --brand-orange:      #E65100;  /* Accent — stats, urgency */
  --brand-amber:       #FFB300;  /* Star ratings, awards */
  --brand-off-white:   #F9F9F6;  /* Page backgrounds */
  --brand-gray:        #757575;  /* Body copy */
  --brand-charcoal:    #212121;  /* Primary text */
  --brand-teal-light:  #E0F2F1;  /* Info panels, cards */
}
```

### Typography
- Display / Hero: Montserrat ExtraBold 800
- Section headings: Montserrat Bold 700
- Body: Inter Regular 400, 16px, line-height 1.7
- Load via `next/font/google`

### Component defaults
- All buttons: brand green background, white text, rounded-md
- Cards: white background, 1px border (#E0E0E0), rounded-lg, shadow-sm
- Article prose: use `@tailwindcss/typography` with `prose prose-lg` classes,
  customised to use brand-charcoal for headings

---

## 18. Key constraints and things to avoid

- **Never use `create-react-app` or Vite** — this is a Next.js project
- **Never render blog content client-side** — all posts must SSG/ISR
- **Never commit `.env.local`** — service role key must never be in git
- **Never set `published: true` in the AI API endpoint** — human review
  is mandatory
- **Never use `react-helmet-async`** — use Next.js native `generateMetadata`
- **Never inline Supabase queries in page components** — all data fetching
  goes through `src/lib/blog/` utility functions
- **Never import visual components directly in MDX files** — they must be
  registered in the VISUAL_COMPONENTS registry and referenced by ID
- **Never use `any` TypeScript type** — strict TypeScript throughout
- **Never skip the human review step in documentation** — `BLOG_AUTHORING.md`
  and `AI_CONTENT_PIPELINE.md` must both emphasise this clearly

---

## 19. Definition of done

The project is complete when all of the following are true:

- [ ] `npm run build` passes with zero TypeScript errors and zero warnings
- [ ] `curl https://contentconcepts.com/en/blog/[slug]` returns full HTML
  with title, meta description, og:title, og:description in raw response
- [ ] `https://contentconcepts.com/sitemap.xml` is valid XML listing all
  service pages and published blog posts in all three locales
- [ ] A new post inserted into Supabase with `published: true` appears at
  its URL within 60 seconds without any deployment
- [ ] `/es/blog/[slug]` and `/fr/blog/[slug]` show translated UI with
  correct `hreflang` tags in the HTML head
- [ ] The admin UI at `/en/admin` requires login and can publish a draft
- [ ] The `/api/content/create` endpoint accepts a POST and inserts a draft
- [ ] All 11 service pages are live with real content (no lorem ipsum)
- [ ] The first pillar blog post (manuscript editing guide) is live as
  an MDX file with all 6 visual components rendering correctly
- [ ] Google Search Console can be verified (meta tag or DNS)
- [ ] Lighthouse score on a blog post page: Performance ≥ 90,
  SEO = 100, Accessibility ≥ 90

---
## 20. MCP Tools and Integrations

You have the following MCP tools available. Use them directly — do not
simulate their output or hardcode values they should return.

### Supabase MCP
Use the Supabase MCP tool to:
- Create the database schema (tables, indexes, RLS policies, triggers)
  defined in Section 5 — do not just output SQL, execute it
- Generate TypeScript types from the schema after creation
- Insert the test row needed for Phase 2 verification
- Query the database during development to verify data

### GitHub MCP (if connected)
Use the GitHub MCP tool to:
- Create the repository for this project
- Set up branch protection on main
- Create the initial commit after Phase 1 scaffold is complete

### Vercel MCP (if connected)
Use the Vercel MCP tool to:
- Create the Vercel project linked to the GitHub repository
- Set all environment variables from Section 12 in the Vercel dashboard
- Trigger the initial deployment after Phase 10

### Context7 MCP
Use the Context7 MCP tool to:
- Look up current documentation for any library before implementing it
- Specifically consult Context7 for: Next.js 15 App Router, next-intl v3,
  @supabase/ssr, @next/mdx, and Tailwind CSS v4 before writing any
  configuration for those packages
- Do not rely on training knowledge for version-specific APIs —
  always verify against live docs first

## 21. Subagent Usage

For phases that involve parallel or independent workstreams, spawn
subagents rather than doing everything sequentially. Specifically:

### Spawn subagents for these tasks in parallel during Phase 1:
- **Subagent A — Scaffold**: Create the Next.js project, install
  dependencies, set up folder structure, configure next.config.ts
- **Subagent B — Database**: Set up Supabase schema, RLS, triggers,
  and generate TypeScript types
- **Subagent C — Content prep**: Read all content files listed in
  Section 16 and extract structured data ready to populate service
  pages and the first blog post

Wait for all three subagents to complete before starting Phase 2.

### Spawn subagents for service pages during Phase 6:
Create one subagent per service page — they are independent and
can be built in parallel. The 11 service pages are listed in
Section 9.3. Each subagent gets: the shared page template,
the relevant section from Website_Content_English.md, and the
matching keyword cluster from contentconcepts-target-keywords.md.

### Spawn subagents for translations during Phase 9:
- **Subagent EN**: English is already done — audit and confirm
- **Subagent ES**: Translate all en.json strings to Spanish
- **Subagent FR**: Translate all en.json strings to French

These three can run fully in parallel.

### Do not spawn subagents for:
- Phases that depend on the output of the previous phase
- Database schema changes (always do these sequentially to avoid
  conflicting migrations)
- Anything touching next.config.ts or middleware.ts (configuration
  conflicts are hard to debug)

  ## 22. Skills and Capabilities to Apply

### Terminal / Bash
Run all install commands, build commands, and verification steps
directly in the terminal — do not just output the commands for me
to run manually. After each phase, run the verification command
specified and show me the output before declaring the phase complete.

Key commands to run and verify:
- `npm run dev` — after Phase 1
- `npm run build` — after every phase from Phase 3 onwards
- `npx tsc --noEmit` — TypeScript check after each phase
- `curl -s http://localhost:3000/en/blog/[slug] | grep "<title>"` — 
  after Phase 4 to verify SSR

### File system
Read all content files in the project context before starting:
- Website_Content_English.md
- contentconcepts_content_strategy.docx
- contentconcepts_style_guide.docx
- contentconcepts-target-keywords.md
- brief-complete-guide-manuscript-editing.md
- article-complete-guide-manuscript-editing.md

Use the content from these files directly — do not paraphrase or
invent placeholder content.

### Documentation lookup (Context7)
Before implementing any of the following, look up the current
documentation via Context7:
- Next.js 15 App Router — especially generateMetadata, generateStaticParams,
  revalidatePath, and the new caching model
- next-intl v3 — routing setup and middleware configuration
- @supabase/ssr — createServerClient and cookie handling in App Router
- Tailwind CSS v4 — the new config format (v4 uses CSS-first config,
  not tailwind.config.ts)
- shadcn/ui — component installation commands and theming

### Code execution
When verifying database schema, do not just write the SQL — execute it
against the Supabase project using the Supabase MCP and confirm the
tables were created correctly.

When verifying ISR, do not just confirm the code looks correct — insert
a test post, set published: true, wait 60 seconds, then fetch the URL
and confirm the HTML contains the post title.
*ContentConcepts Project Brief v1.0 — March 2026*  
*Do not start coding until you have read and confirmed understanding of all 19 sections.*
