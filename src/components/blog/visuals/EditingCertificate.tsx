'use client'

const DETAILS: [string, string][] = [
  ['Editor', 'Dr. Sarah Mitchell'],
  ['Service', 'Manuscript Editing'],
  ['Date', 'March 2026'],
]

export default function EditingCertificate() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
      <div style={{
        background: 'white',
        border: '3px solid #1B5E20',
        borderRadius: '12px',
        padding: '40px 48px',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Corner decoration — top left */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '60px', height: '60px',
          background: '#1B5E20',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
        }} />
        {/* Corner decoration — bottom right */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '60px', height: '60px',
          background: '#1B5E20',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
        }} />

        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏅</div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: '#757575', textTransform: 'uppercase', marginBottom: '16px' }}>
          Certificate of Editing
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1B5E20', marginBottom: '8px', lineHeight: 1.2 }}>
          ContentConcepts
        </h3>
        <p style={{ color: '#757575', marginBottom: '20px', fontSize: '0.9rem' }}>
          This certifies that the following document has been professionally edited and proofread to the highest standards
        </p>
        <div style={{
          background: '#F9F9F6',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px',
        }}>
          <div style={{ fontWeight: 700, color: '#212121', fontSize: '1rem' }}>
            &ldquo;Effects of Climate Change on Marine Biodiversity&rdquo;
          </div>
          <div style={{ color: '#757575', fontSize: '0.85rem', marginTop: '4px' }}>
            Manuscript Editing &middot; 8,450 words
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          {DETAILS.map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: '0.75rem', color: '#757575', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontSize: '0.85rem', color: '#212121', fontWeight: 600 }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: '1px solid #E0E0E0',
          paddingTop: '16px',
          fontSize: '0.75rem',
          color: '#757575',
        }}>
          Certificate ID: CC-2026-83741 &middot; Verify at contentconcepts.com/verify
        </div>
      </div>
    </div>
  )
}
