import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPublishedPosts } from '@/lib/blog/supabaseLoader'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Blog — ContentConcepts',
    description: 'Expert guides on academic editing, manuscript preparation, and research writing.',
    alternates: {
      canonical: `https://contentconcepts.com/${locale}/blog`,
    },
  }
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const posts = await getAllPublishedPosts()
  const localePosts = posts.filter(p => p.locale === locale)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-charcoal mb-4">Blog</h1>
      <p className="text-xl text-brand-gray mb-12">Expert guides on academic editing and research writing.</p>

      {localePosts.length === 0 ? (
        <p className="text-brand-gray">No posts yet. Check back soon.</p>
      ) : (
        <div className="space-y-8">
          {localePosts.map((post) => (
            <article key={post.slug} className="border border-gray-200 rounded-lg p-6 hover:border-brand-green transition-colors">
              <Link href={`/${locale}/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold text-brand-charcoal hover:text-brand-green mb-3">{post.title ?? post.slug}</h2>
              </Link>
              {post.description && (
                <p className="text-brand-gray mb-4">{post.description}</p>
              )}
              <Link href={`/${locale}/blog/${post.slug}`} className="text-brand-green font-medium hover:underline">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
