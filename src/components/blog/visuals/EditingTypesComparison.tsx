'use client'

interface Feature {
  label: string
  yes: boolean
}

interface Service {
  name: string
  price: string
  color: string
  border: string
  highlight?: boolean
  features: Feature[]
  best: string
}

const SERVICES: Service[] = [
  {
    name: 'Proofreading',
    price: 'From $0.025/word',
    color: '#E0F2F1',
    border: '#80CBC4',
    features: [
      { label: 'Spelling & grammar', yes: true },
      { label: 'Punctuation', yes: true },
      { label: 'Formatting consistency', yes: true },
      { label: 'Sentence restructuring', yes: false },
      { label: 'Clarity improvements', yes: false },
      { label: 'Structural feedback', yes: false },
      { label: 'Reference checking', yes: false },
    ],
    best: 'Final polish before submission',
  },
  {
    name: 'Copy Editing',
    price: 'From $0.04/word',
    color: '#E8F5E9',
    border: '#1B5E20',
    highlight: true,
    features: [
      { label: 'Spelling & grammar', yes: true },
      { label: 'Punctuation', yes: true },
      { label: 'Formatting consistency', yes: true },
      { label: 'Sentence restructuring', yes: true },
      { label: 'Clarity improvements', yes: true },
      { label: 'Structural feedback', yes: false },
      { label: 'Reference checking', yes: false },
    ],
    best: 'Most popular — complete language edit',
  },
  {
    name: 'Substantive Editing',
    price: 'From $0.065/word',
    color: '#FFF8E1',
    border: '#FFB300',
    features: [
      { label: 'Spelling & grammar', yes: true },
      { label: 'Punctuation', yes: true },
      { label: 'Formatting consistency', yes: true },
      { label: 'Sentence restructuring', yes: true },
      { label: 'Clarity improvements', yes: true },
      { label: 'Structural feedback', yes: true },
      { label: 'Reference checking', yes: true },
    ],
    best: 'Deep edit for complex manuscripts',
  },
]

export default function EditingTypesComparison() {
  return (
    <div style={{ padding: '16px 0' }}>
      <h3 style={{ color: '#1B5E20', fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
        Which Editing Service Do You Need?
      </h3>
      <p style={{ color: '#757575', textAlign: 'center', marginBottom: '32px' }}>
        Compare our services to find the right fit for your document
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {SERVICES.map(svc => (
          <div key={svc.name} style={{
            background: svc.color,
            border: `2px solid ${svc.border}`,
            borderRadius: '12px',
            padding: '24px',
            position: 'relative',
          }}>
            {svc.highlight && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#1B5E20',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
              }}>
                MOST POPULAR
              </div>
            )}
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#212121', marginBottom: '4px' }}>{svc.name}</h4>
            <div style={{ color: '#1B5E20', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px' }}>{svc.price}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {svc.features.map(f => (
                <li key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
                  <span style={{ color: f.yes ? '#1B5E20' : '#BDBDBD', fontWeight: 700, fontSize: '1rem' }}>
                    {f.yes ? '✓' : '✗'}
                  </span>
                  <span style={{ color: f.yes ? '#212121' : '#9E9E9E' }}>{f.label}</span>
                </li>
              ))}
            </ul>
            <div style={{ fontSize: '0.8rem', color: '#757575', fontStyle: 'italic' }}>Best for: {svc.best}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
