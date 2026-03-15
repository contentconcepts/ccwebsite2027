# AI Content Pipeline

This document describes how to use the `/api/content/create` endpoint to insert AI-generated blog posts.

## Warning: Human Review Required

All posts inserted via this API are saved as **drafts** (`published: false`). A human reviewer **must** approve each post before it goes live. This is a non-negotiable requirement. The API will never set `published: true`.

## Endpoint

```
POST https://contentconcepts.com/api/content/create
```

## Authentication

Use Bearer token authentication with the `SUPABASE_SERVICE_ROLE_KEY`:

```bash
Authorization: Bearer YOUR_SERVICE_ROLE_KEY
```

## Request Body

```json
{
  "slug": "your-post-slug",
  "locale": "en",
  "title": "Your Post Title",
  "description": "A 150-160 character meta description for SEO.",
  "body": "# Heading\n\nMarkdown content here...",
  "author": "ContentConcepts",
  "tags": ["academic editing", "research"],
  "keywords": ["manuscript editing", "journal submission"],
  "coverImage": "https://...",
  "components": [
    { "slot": "after-intro", "id": "PricingCalculator" }
  ],
  "hasFaq": true,
  "faqItems": [
    { "question": "What is manuscript editing?", "answer": "..." }
  ]
}
```

### Required fields
- `slug` — URL slug (lowercase, hyphens only, unique per locale)
- `locale` — `en`, `es`, or `fr`
- `title` — Post title
- `description` — Meta description (aim for 150-160 chars)
- `body` — Markdown string (the full article body)
- `tags` — Array of topic tags
- `keywords` — Array of SEO keywords

### Optional fields
- `author` — Defaults to `"ContentConcepts"`
- `coverImage` — URL to cover image in Supabase Storage
- `components` — Array of visual component slots (see below)
- `hasFaq` — Boolean, defaults to `false`
- `faqItems` — Array of FAQ items (required if `hasFaq: true`)

## Available Visual Components

These component IDs can be used in the `components` array:

| ID | Description |
|----|-------------|
| `PricingCalculator` | Interactive word count x service level price calculator |
| `EditingProcessDiagram` | 6-step editing process visual |
| `EditingTypesComparison` | Comparison table: proofreading vs copy editing vs substantive |
| `BeforeAfterExamples` | Before/after editing example toggles |
| `RejectionReasonsChart` | Bar chart of journal rejection reasons |
| `EditingCertificate` | Sample editing certificate visual |

## Example curl command

```bash
curl -X POST https://contentconcepts.com/api/content/create \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "how-to-write-a-research-paper",
    "locale": "en",
    "title": "How to Write a Research Paper: A Complete Guide",
    "description": "A step-by-step guide to writing, structuring, and editing research papers for journal submission.",
    "body": "# How to Write a Research Paper\n\nWriting a research paper...",
    "tags": ["research writing", "academic writing"],
    "keywords": ["how to write a research paper", "research paper guide"],
    "hasFaq": false,
    "faqItems": []
  }'
```

## Response

### Success (201)
```json
{
  "success": true,
  "id": "uuid",
  "slug": "your-post-slug",
  "locale": "en"
}
```

### Error (400/409/500)
```json
{
  "success": false,
  "error": "Error message"
}
```

## Publishing Workflow

1. AI pipeline calls `POST /api/content/create` — post saved as draft
2. Human reviewer logs into `/en/admin`
3. Reviewer reads the draft preview
4. Reviewer clicks **Publish** — post goes live within 60 seconds via ISR
5. Post appears at `https://contentconcepts.com/[locale]/blog/[slug]`

## ISR — How Posts Go Live Without Redeployment

After publishing, the first request to the post URL triggers ISR generation. Vercel builds and caches the static HTML. All subsequent requests are served from cache. Cache invalidates every 60 seconds.
