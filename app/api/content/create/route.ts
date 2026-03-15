import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

interface ComponentSlot {
  slot: string
  id: string
}

interface FAQItem {
  question: string
  answer: string
}

interface CreatePostPayload {
  slug: string
  locale: 'en' | 'es' | 'fr'
  title: string
  description: string
  body: string
  author?: string
  tags: string[]
  keywords: string[]
  coverImage?: string
  components?: ComponentSlot[]
  hasFaq?: boolean
  faqItems?: FAQItem[]
}

function validatePayload(body: unknown): { valid: boolean; error?: string; data?: CreatePostPayload } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object' }
  }
  const b = body as Record<string, unknown>

  const required = ['slug', 'locale', 'title', 'description', 'body', 'tags', 'keywords']
  for (const field of required) {
    if (!b[field]) return { valid: false, error: `Missing required field: ${field}` }
  }

  if (!['en', 'es', 'fr'].includes(b.locale as string)) {
    return { valid: false, error: 'locale must be one of: en, es, fr' }
  }

  if (!Array.isArray(b.tags)) return { valid: false, error: 'tags must be an array' }
  if (!Array.isArray(b.keywords)) return { valid: false, error: 'keywords must be an array' }

  if (typeof b.slug !== 'string' || !/^[a-z0-9-]+$/.test(b.slug)) {
    return { valid: false, error: 'slug must contain only lowercase letters, numbers, and hyphens' }
  }

  return {
    valid: true,
    data: {
      slug: b.slug as string,
      locale: b.locale as 'en' | 'es' | 'fr',
      title: b.title as string,
      description: b.description as string,
      body: b.body as string,
      author: (b.author as string) ?? 'ContentConcepts',
      tags: b.tags as string[],
      keywords: b.keywords as string[],
      coverImage: b.coverImage as string | undefined,
      components: (b.components as ComponentSlot[]) ?? [],
      hasFaq: (b.hasFaq as boolean) ?? false,
      faqItems: (b.faqItems as FAQItem[]) ?? [],
    },
  }
}

export async function POST(request: NextRequest) {
  // Bearer token auth
  const authHeader = request.headers.get('authorization')
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!authHeader || authHeader !== `Bearer ${serviceRoleKey}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const validation = validatePayload(body)
  if (!validation.valid) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
  }

  const payload = validation.data!
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      slug: payload.slug,
      locale: payload.locale,
      title: payload.title,
      description: payload.description,
      body: payload.body,
      author: payload.author ?? 'ContentConcepts',
      tags: payload.tags,
      keywords: payload.keywords,
      cover_image: payload.coverImage ?? null,
      components: payload.components ?? [],
      has_faq: payload.hasFaq ?? false,
      faq_items: payload.faqItems ?? [],
      published: false,  // NEVER set to true — human review required
    })
    .select('id, slug, locale')
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ success: false, error: `Post with slug '${payload.slug}' already exists for locale '${payload.locale}'` }, { status: 409 })
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data.id, slug: data.slug, locale: data.locale }, { status: 201 })
}

// Only POST is allowed
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
