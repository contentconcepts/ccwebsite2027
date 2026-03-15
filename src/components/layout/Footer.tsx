import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')
  return (
    <footer style={{ background: '#0D1B2A', color: 'white', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#66BB6A', marginBottom: '12px' }}>ContentConcepts</div>
            <p style={{ color: '#90A4AE', lineHeight: 1.7, fontSize: '0.9rem' }}>
              Expert academic editing and proofreading by PhD-qualified editors. Trusted by 10,000+ researchers worldwide.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '16px', color: 'white' }}>{t('services')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                ['manuscript-editing-service', 'Manuscript Editing'],
                ['thesis-editing-service', 'Thesis Editing'],
                ['scientific-editing-service', 'Scientific Editing'],
                ['proofreading-services', 'Proofreading'],
              ].map(([slug, label]) => (
                <li key={slug}>
                  <Link href={`/${locale}/services/${slug}`} style={{ color: '#90A4AE', textDecoration: 'none', fontSize: '0.9rem' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '16px', color: 'white' }}>{t('company')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                [`/${locale}/about`, tNav('about')],
                [`/${locale}/blog`, tNav('blog')],
                [`/${locale}/pricing`, tNav('pricing')],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} style={{ color: '#90A4AE', textDecoration: 'none', fontSize: '0.9rem' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1E3A5F', paddingTop: '24px', textAlign: 'center', color: '#546E7A', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} ContentConcepts. {t('rights')}
        </div>
      </div>
    </footer>
  )
}
