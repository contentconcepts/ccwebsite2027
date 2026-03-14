export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          slug: string
          locale: string
          title: string
          description: string
          body: string
          author: string
          tags: string[]
          keywords: string[]
          cover_image: string | null
          components: Json
          has_faq: boolean
          faq_items: Json
          published: boolean
          reviewed_by: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
    }
  }
}
