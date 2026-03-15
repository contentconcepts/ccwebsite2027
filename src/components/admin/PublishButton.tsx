'use client'
import { publishPost } from '@/lib/auth/actions'
import { useState } from 'react'

export function PublishButton({ id, reviewerEmail }: { id: string; reviewerEmail: string }) {
  const [loading, setLoading] = useState(false)
  return (
    <button
      onClick={async () => {
        setLoading(true)
        try {
          await publishPost(id, reviewerEmail)
        } finally {
          setLoading(false)
        }
      }}
      disabled={loading}
      style={{
        background: '#1B5E20', color: 'white', padding: '8px 16px',
        borderRadius: '6px', fontWeight: 600, fontSize: '0.875rem',
        border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Publishing...' : 'Publish'}
    </button>
  )
}
