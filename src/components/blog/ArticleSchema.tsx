import type { BlogPost } from '@/types/blog'

export function ArticleSchema({ post, locale }: { post: BlogPost; locale: string }) {
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
      '@id': `https://contentconcepts.com/${locale}/blog/${post.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
