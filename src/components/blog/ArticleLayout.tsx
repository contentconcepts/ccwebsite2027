import { Suspense } from 'react'
import { VISUAL_COMPONENTS } from './visuals'
import type { BlogPost } from '@/types/blog'

// MDX rendering for markdown content from MDX files
async function MDXBody({ content }: { content: string }) {
  const { MDXRemote } = await import('next-mdx-remote/rsc')
  return <MDXRemote source={content} />
}

export function ArticleLayout({ post }: { post: BlogPost }) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-brand-charcoal mb-4">{post.title}</h1>
        <p className="text-xl text-brand-gray mb-6">{post.description}</p>
        <div className="flex gap-4 text-sm text-brand-gray">
          <span>By {post.author}</span>
          {post.publishedAt && (
            <span>Published {new Date(post.publishedAt).toLocaleDateString()}</span>
          )}
        </div>
        {post.tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="bg-brand-teal-light text-brand-green px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg max-w-none prose-headings:text-brand-charcoal prose-a:text-brand-green">
        {post.source === 'mdx' ? (
          <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded" />}>
            <MDXBody content={post.body} />
          </Suspense>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        )}
      </div>

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

      {post.hasFaq && post.faqItems.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-brand-charcoal mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {post.faqItems.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-brand-charcoal mb-3">{item.question}</h3>
                <p className="text-brand-gray">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
