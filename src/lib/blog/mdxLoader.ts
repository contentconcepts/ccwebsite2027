import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/types/blog'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

export async function getMDXPost(slug: string, locale: string): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    locale: locale as 'en' | 'es' | 'fr',
    title: data.title ?? '',
    description: data.description ?? '',
    body: content,
    author: data.author ?? 'ContentConcepts',
    tags: data.tags ?? [],
    keywords: data.keywords ?? [],
    coverImage: data.coverImage,
    components: data.components ?? [],
    hasFaq: data.hasFaq ?? false,
    faqItems: data.faqItems ?? [],
    published: data.published ?? false,
    publishedAt: data.publishedAt,
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? new Date().toISOString(),
    source: 'mdx',
  }
}

export async function getAllMDXSlugs(): Promise<{ locale: string; slug: string }[]> {
  const results: { locale: string; slug: string }[] = []
  const locales = ['en', 'es', 'fr']
  for (const locale of locales) {
    const dir = path.join(CONTENT_DIR, locale)
    if (!fs.existsSync(dir)) continue
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
    for (const file of files) {
      results.push({ locale, slug: file.replace('.mdx', '') })
    }
  }
  return results
}
