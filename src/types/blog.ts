export interface BlogFrontmatter {
  slug: string
  locale: 'en' | 'es' | 'fr'
  title: string
  description: string
  author: string
  tags: string[]
  keywords: string[]
  coverImage?: string
  components: ComponentSlot[]
  hasFaq: boolean
  faqItems: FAQItem[]
  published: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface ComponentSlot {
  slot: string
  id: string
}

export interface FAQItem {
  question: string
  answer: string
}

export type BlogPost = BlogFrontmatter & {
  body: string
  source: 'mdx' | 'supabase'
}
