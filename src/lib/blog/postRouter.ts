import { getMDXPost } from './mdxLoader'
import { getSupabasePost } from './supabaseLoader'
import type { BlogPost } from '@/types/blog'

export async function getPost(slug: string, locale: string): Promise<BlogPost | null> {
  const mdxPost = await getMDXPost(slug, locale)
  if (mdxPost) return mdxPost
  const supabasePost = await getSupabasePost(slug, locale)
  if (supabasePost) return supabasePost
  return null
}
