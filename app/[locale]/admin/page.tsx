import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { signOut } from '@/lib/auth/actions'
import { PublishButton } from '@/components/admin/PublishButton'
import { DeleteButton } from '@/components/admin/DeleteButton'

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  void params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/en/admin/login')

  const adminClient = createAdminClient()
  const { data: drafts } = await adminClient
    .from('blog_posts')
    .select('id, slug, locale, title, description, created_at, body')
    .eq('published', false)
    .order('created_at', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', background: '#F9F9F6' }}>
      {/* Header */}
      <div style={{ background: '#1B5E20', color: 'white', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>ContentConcepts Admin</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.875rem', color: '#A5D6A7' }}>{user.email}</span>
          <form action={signOut}>
            <button type="submit" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
              Sign Out
            </button>
          </form>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#212121', marginBottom: '8px' }}>
          Draft Posts ({drafts?.length ?? 0})
        </h2>
        <p style={{ color: '#757575', marginBottom: '32px' }}>Review and publish AI-generated draft posts.</p>

        {!drafts || drafts.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '12px', padding: '48px', textAlign: 'center', border: '1px solid #E0E0E0' }}>
            <p style={{ color: '#757575', fontSize: '1.1rem' }}>No drafts pending review.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {drafts.map(draft => (
              <div key={draft.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #E0E0E0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                      <span style={{ background: '#E0F2F1', color: '#1B5E20', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        {draft.locale}
                      </span>
                      <span style={{ color: '#757575', fontSize: '0.8rem' }}>
                        {new Date(draft.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 style={{ fontWeight: 700, color: '#212121', marginBottom: '6px', fontSize: '1.1rem' }}>{draft.title}</h3>
                    <p style={{ color: '#757575', fontSize: '0.875rem', marginBottom: '12px' }}>
                      /{draft.locale}/blog/{draft.slug}
                    </p>
                    {/* Preview snippet */}
                    <div style={{
                      background: '#F9F9F6', borderRadius: '6px', padding: '12px',
                      fontSize: '0.85rem', color: '#757575', lineHeight: 1.6,
                      maxHeight: '80px', overflow: 'hidden',
                      borderLeft: '3px solid #E0E0E0',
                    }}>
                      {draft.body.replace(/<[^>]*>/g, '').slice(0, 300)}...
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <PublishButton id={draft.id} reviewerEmail={user.email ?? 'admin'} />
                    <DeleteButton id={draft.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
