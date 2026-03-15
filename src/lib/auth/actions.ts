'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect('/en/admin/login?error=Invalid+credentials')
  revalidatePath('/en/admin')
  redirect('/en/admin')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/en/admin/login')
}

export async function publishPost(id: string, reviewerEmail: string) {
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('blog_posts')
    .update({ published: true, reviewed_by: reviewerEmail, reviewed_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/en/admin')
  revalidatePath('/en/blog')
}

export async function deletePost(id: string) {
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/en/admin')
}
