import { createClient } from '../supabase/server'
import { createAdminClient } from '../supabase/admin'
import type { BlogPost } from '@/types/blog'

export async function getSupabasePost(slug: string, locale: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('locale', locale)
    .eq('published', true)
    .single()
  if (!data) return null
  return {
    slug: data.slug,
    locale: data.locale as 'en' | 'es' | 'fr',
    title: data.title,
    description: data.description,
    body: data.body,
    author: data.author,
    tags: data.tags,
    keywords: data.keywords,
    coverImage: data.cover_image ?? undefined,
    components: Array.isArray(data.components) ? data.components as { slot: string; id: string }[] : [],
    hasFaq: data.has_faq,
    faqItems: Array.isArray(data.faq_items) ? data.faq_items as { question: string; answer: string }[] : [],
    published: data.published,
    publishedAt: data.published_at ?? undefined,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    source: 'supabase',
  }
}

export async function getAllPublishedPosts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('slug, locale, title, description, updated_at, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false })
  return data ?? []
}

// Uses the service-role client so it can be called from generateStaticParams
// (outside of a request scope, where cookies() is unavailable)
export async function getAllPublishedPostsForStaticGen() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('slug, locale')
    .eq('published', true)
  return data ?? []
}
