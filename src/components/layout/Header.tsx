import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-2xl font-bold text-brand-green">
          ContentConcepts
        </Link>
        <ul className="flex gap-6 items-center">
          <li><Link href={`/${locale}/about`} className="text-brand-gray hover:text-brand-green">{t('about')}</Link></li>
          <li><Link href={`/${locale}/services`} className="text-brand-gray hover:text-brand-green">{t('services')}</Link></li>
          <li><Link href={`/${locale}/pricing`} className="text-brand-gray hover:text-brand-green">{t('pricing')}</Link></li>
          <li><Link href={`/${locale}/blog`} className="text-brand-gray hover:text-brand-green">{t('blog')}</Link></li>
        </ul>
        <Link href={`/${locale}/contact`} className="bg-brand-green text-white px-4 py-2 rounded-md hover:bg-brand-green-light">
          {t('getQuote')}
        </Link>
      </nav>
    </header>
  )
}
