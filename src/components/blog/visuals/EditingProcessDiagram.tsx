'use client'

const STEPS = [
  { num: 1, title: 'Submission', desc: 'Upload your document securely', icon: '📄' },
  { num: 2, title: 'Assessment', desc: 'Editor reviews scope and requirements', icon: '🔍' },
  { num: 3, title: 'Editing', desc: 'Expert editor works through your document', icon: '✏️' },
  { num: 4, title: 'QA Review', desc: 'Second pass for quality assurance', icon: '✅' },
  { num: 5, title: 'Delivery', desc: 'Edited document returned with changelog', icon: '📬' },
  { num: 6, title: 'Revisions', desc: 'Free revisions within 7 days', icon: '🔄' },
]

export default function EditingProcessDiagram() {
  return (
    <div style={{ background: '#F9F9F6', borderRadius: '12px', padding: '32px' }}>
      <h3 style={{ color: '#1B5E20', fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
        Our Editing Process
      </h3>
      <p style={{ color: '#757575', textAlign: 'center', marginBottom: '32px' }}>
        A transparent, quality-assured workflow from submission to delivery
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
        {STEPS.map((step, i) => (
          <div key={step.num} style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#1B5E20',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              margin: '0 auto 12px',
              boxShadow: '0 2px 8px rgba(27,94,32,0.3)',
            }}>
              {step.icon}
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                position: 'absolute',
                top: '28px',
                left: 'calc(50% + 28px)',
                right: 'calc(-50% + 28px)',
                height: '2px',
                background: '#66BB6A',
                zIndex: 0,
              }} />
            )}
            <div style={{ fontWeight: 700, color: '#212121', fontSize: '0.9rem', marginBottom: '4px' }}>
              Step {step.num}: {step.title}
            </div>
            <div style={{ color: '#757575', fontSize: '0.8rem', lineHeight: 1.4 }}>{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
