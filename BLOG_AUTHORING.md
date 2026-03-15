# Blog Authoring Guide

## Two ways to publish posts

### 1. MDX files (local, fast, visual components)

Place files in `src/content/blog/`:

```
src/content/blog/
  my-post.en.mdx
  my-post.es.mdx   # optional translations
```

**Frontmatter fields:**

```yaml
---
title: "Your Post Title"
description: "SEO description (150–160 chars)"
author: "ContentConcepts"
tags: ["academic editing", "proofreading"]
keywords: ["manuscript editing", "journal submission"]
cover_image: "/images/blog/my-post.jpg"
published: true
published_at: "2026-03-15"
has_faq: false
faq_items: []
components: []
---
```

**Visual component slots** (add to `components` array):

```yaml
components:
  - id: pricing-calculator
    position: after-intro
  - id: editing-process-diagram
    position: after-section-2
  - id: editing-types-comparison
    position: after-section-3
  - id: before-after-examples
    position: before-conclusion
  - id: rejection-reasons-chart
    position: after-intro
  - id: editing-certificate
    position: conclusion
```

Available `position` values: `after-intro`, `after-section-1`, `after-section-2`,
`after-section-3`, `before-conclusion`, `conclusion`.

---

### 2. AI Content Pipeline (remote, Supabase)

POST to `/api/content/create` — see `AI_CONTENT_PIPELINE.md` for full docs.

Posts inserted via API are always `published: false`. Review and publish
via the Admin UI at `/en/admin`.

---

## Admin UI

URL: `https://your-domain.com/en/admin`

- Log in with your Supabase email + password
- Review draft posts (title, description, tags)
- Click **Publish** to make live (sets `published_at`)
- Click **Delete** to remove permanently

ISR revalidates every 60 seconds — published posts appear within 1 minute.

---

## MDX vs Supabase routing

`postRouter.ts` checks for an MDX file first; if found, serves it.
Otherwise falls back to Supabase. This means local MDX files always
take priority over database entries with the same slug.

---

## SEO checklist for each post

- [ ] `title` is 50–60 chars
- [ ] `description` is 150–160 chars
- [ ] Primary keyword in title and first paragraph
- [ ] At least 3 `keywords` in frontmatter
- [ ] `cover_image` present (1200×630 px recommended)
- [ ] FAQ section if targeting "people also ask" snippets (`has_faq: true`)
