'use client'
import { useState } from 'react'

const EXAMPLES = [
  {
    label: 'Clarity',
    before: 'The data that was collected by the researchers in the study that was conducted demonstrated results that were significant in terms of their implications for the field of oncology.',
    after: 'The study data revealed significant implications for oncology.',
  },
  {
    label: 'Grammar',
    before: 'Each of the participants were asked to completed the survey which was taking approximately 20 minutes and was containing 40 questions about their experiences.',
    after: 'Each participant completed a 20-minute, 40-question survey about their experiences.',
  },
  {
    label: 'Academic tone',
    before: 'We found out that the new drug worked really well and patients got better faster than the old treatment which was pretty slow.',
    after: 'The novel therapeutic demonstrated superior efficacy, with patients achieving recovery significantly faster than with the conventional treatment.',
  },
]

export default function BeforeAfterExamples() {
  const [active, setActive] = useState(0)

  return (
    <div style={{ background: '#F9F9F6', borderRadius: '12px', padding: '32px' }}>
      <h3 style={{ color: '#1B5E20', fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
        See the Difference
      </h3>
      <p style={{ color: '#757575', textAlign: 'center', marginBottom: '24px' }}>Real before-and-after editing examples</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {EXAMPLES.map((ex, i) => (
          <button
            key={ex.label}
            onClick={() => setActive(i)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: active === i ? '2px solid #1B5E20' : '2px solid #E0E0E0',
              background: active === i ? '#1B5E20' : 'white',
              color: active === i ? 'white' : '#212121',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{
          background: '#FFEBEE',
          borderRadius: '8px',
          padding: '20px',
          border: '1px solid #FFCDD2',
        }}>
          <div style={{ fontWeight: 700, color: '#C62828', marginBottom: '12px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ✗ Before
          </div>
          <p style={{ color: '#212121', lineHeight: 1.7, margin: 0 }}>{EXAMPLES[active].before}</p>
        </div>
        <div style={{
          background: '#E8F5E9',
          borderRadius: '8px',
          padding: '20px',
          border: '1px solid #A5D6A7',
        }}>
          <div style={{ fontWeight: 700, color: '#1B5E20', marginBottom: '12px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ✓ After
          </div>
          <p style={{ color: '#212121', lineHeight: 1.7, margin: 0 }}>{EXAMPLES[active].after}</p>
        </div>
      </div>
    </div>
  )
}
