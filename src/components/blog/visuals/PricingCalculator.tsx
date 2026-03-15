'use client'
import { useState } from 'react'

const RATES = {
  proofreading: 0.025,
  copy_editing: 0.04,
  substantive: 0.065,
} as const

const SERVICE_LABELS: Record<keyof typeof RATES, string> = {
  proofreading: 'Proofreading',
  copy_editing: 'Copy Editing',
  substantive: 'Substantive Editing',
}

const TURNAROUND: Record<keyof typeof RATES, string> = {
  proofreading: '2-3 days',
  copy_editing: '3-5 days',
  substantive: '5-7 days',
}

export default function PricingCalculator() {
  const [wordCount, setWordCount] = useState(5000)
  const [service, setService] = useState<keyof typeof RATES>('copy_editing')

  const price = Math.ceil(wordCount * RATES[service])
  const priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

  return (
    <div style={{ background: '#E0F2F1', borderRadius: '12px', padding: '32px', border: '1px solid #B2DFDB' }}>
      <h3 style={{ color: '#1B5E20', fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
        Instant Price Calculator
      </h3>
      <p style={{ color: '#757575', marginBottom: '24px' }}>Get an instant estimate for your document</p>

      <div style={{ display: 'grid', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, color: '#212121', marginBottom: '8px' }}>
            Word Count: {wordCount.toLocaleString()}
          </label>
          <input
            type="range"
            min={500}
            max={100000}
            step={500}
            value={wordCount}
            onChange={e => setWordCount(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#1B5E20' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#757575' }}>
            <span>500</span><span>100,000</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, color: '#212121', marginBottom: '8px' }}>
            Service Level
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {(Object.keys(RATES) as (keyof typeof RATES)[]).map(key => (
              <button
                key={key}
                onClick={() => setService(key)}
                style={{
                  padding: '10px 8px',
                  borderRadius: '8px',
                  border: service === key ? '2px solid #1B5E20' : '2px solid #E0E0E0',
                  background: service === key ? '#1B5E20' : 'white',
                  color: service === key ? 'white' : '#212121',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {SERVICE_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
          border: '2px solid #1B5E20',
        }}>
          <div style={{ fontSize: '0.875rem', color: '#757575', marginBottom: '4px' }}>Estimated price</div>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: '#1B5E20', lineHeight: 1 }}>{priceFormatted}</div>
          <div style={{ fontSize: '0.875rem', color: '#757575', marginTop: '8px' }}>
            Turnaround: {TURNAROUND[service]}
          </div>
          <a
            href="/en/pricing"
            style={{
              display: 'inline-block',
              marginTop: '16px',
              background: '#E65100',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '6px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Get Exact Quote &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
