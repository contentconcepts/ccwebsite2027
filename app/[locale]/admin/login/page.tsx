import { signIn } from '@/lib/auth/actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  void searchParams
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F9F6' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '48px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #E0E0E0' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1B5E20', marginBottom: '8px' }}>ContentConcepts</h1>
        <p style={{ color: '#757575', marginBottom: '32px' }}>Admin — Sign in to continue</p>
        <form action={signIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, color: '#212121', marginBottom: '6px', fontSize: '0.875rem' }}>Email</label>
            <input
              name="email"
              type="email"
              required
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #E0E0E0', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, color: '#212121', marginBottom: '6px', fontSize: '0.875rem' }}>Password</label>
            <input
              name="password"
              type="password"
              required
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #E0E0E0', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            style={{ background: '#1B5E20', color: 'white', padding: '12px', borderRadius: '6px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', marginTop: '8px' }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
