'use client'
import { deletePost } from '@/lib/auth/actions'
import { useState } from 'react'

export function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  return (
    <button
      onClick={async () => {
        if (!confirm('Delete this draft? This cannot be undone.')) return
        setLoading(true)
        try {
          await deletePost(id)
        } finally {
          setLoading(false)
        }
      }}
      disabled={loading}
      style={{
        background: '#C62828', color: 'white', padding: '8px 16px',
        borderRadius: '6px', fontWeight: 600, fontSize: '0.875rem',
        border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}
