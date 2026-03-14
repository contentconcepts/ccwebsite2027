import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPost } from '@/lib/blog/postRouter'
import { getAllPublishedPostsForStaticGen } from '@/lib/blog/supabaseLoader'
import { getAllMDXSlugs } from '@/lib/blog/mdxLoader'
import { ArticleLayout } from '@/components/blog/ArticleLayout'
import { ArticleSchema } from '@/components/blog/ArticleSchema'
import { FAQSchema } from '@/components/blog/FAQSchema'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const [supabasePosts, mdxSlugs] = await Promise.all([
    getAllPublishedPostsForStaticGen(),
    getAllMDXSlugs(),
  ])
  const all = [
    ...supabasePosts.map(p => ({ locale: p.locale, slug: p.slug })),
    ...mdxSlugs,
  ]
  // deduplicate
  const seen = new Set<string>()
  return all.filter(p => {
    const key = `${p.locale}/${p.slug}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await getPost(slug, locale)
  if (!post) notFound()

  return (
    <>
      <ArticleSchema post={post} locale={locale} />
      {post.hasFaq && <FAQSchema items={post.faqItems} />}
      <ArticleLayout post={post} />
    </>
  )
}
