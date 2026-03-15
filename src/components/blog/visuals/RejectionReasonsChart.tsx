'use client'

const DATA = [
  { reason: 'Poor English / language errors', pct: 47 },
  { reason: 'Insufficient literature review', pct: 38 },
  { reason: 'Weak methodology', pct: 35 },
  { reason: 'Unclear results presentation', pct: 31 },
  { reason: 'Inappropriate for journal scope', pct: 28 },
  { reason: 'Formatting / style guide violations', pct: 22 },
  { reason: 'Incomplete references', pct: 18 },
]

export default function RejectionReasonsChart() {
  const max = DATA[0].pct

  return (
    <div style={{ background: '#F9F9F6', borderRadius: '12px', padding: '32px' }}>
      <h3 style={{ color: '#1B5E20', fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>
        Top Reasons Journals Reject Manuscripts
      </h3>
      <p style={{ color: '#757575', marginBottom: '28px', fontSize: '0.9rem' }}>
        Source: survey of 2,000+ journal editors. Language errors are the #1 avoidable reason.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {DATA.map((item, i) => (
          <div key={item.reason}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.875rem', color: '#212121', fontWeight: i === 0 ? 700 : 400 }}>
                {item.reason}
                {i === 0 && (
                  <span style={{ marginLeft: '8px', background: '#E65100', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    Preventable
                  </span>
                )}
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: i === 0 ? '#E65100' : '#1B5E20', minWidth: '40px', textAlign: 'right' }}>
                {item.pct}%
              </span>
            </div>
            <div style={{ height: '8px', background: '#E0E0E0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(item.pct / max) * 100}%`,
                background: i === 0 ? '#E65100' : '#1B5E20',
                borderRadius: '4px',
                transition: 'width 0.6s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
