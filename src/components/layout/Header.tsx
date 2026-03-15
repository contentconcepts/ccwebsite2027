import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function Header({ locale }: { locale: string }) {
  const t = await getTranslations('nav')
  return (
    <header style={{ background: 'white', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0, zIndex: 50 }}>
      <nav style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href={`/${locale}`} style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1B5E20', textDecoration: 'none' }}>
          ContentConcepts
        </Link>
        <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
          <li><Link href={`/${locale}/about`} style={{ color: '#757575', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>{t('about')}</Link></li>
          <li><Link href={`/${locale}/services/manuscript-editing-service`} style={{ color: '#757575', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>{t('services')}</Link></li>
          <li><Link href={`/${locale}/pricing`} style={{ color: '#757575', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>{t('pricing')}</Link></li>
          <li><Link href={`/${locale}/blog`} style={{ color: '#757575', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>{t('blog')}</Link></li>
        </ul>
        <Link href={`/${locale}/pricing`} style={{
          background: '#1B5E20', color: 'white', padding: '10px 20px',
          borderRadius: '6px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
        }}>
          {t('getQuote')}
        </Link>
      </nav>
    </header>
  )
}
