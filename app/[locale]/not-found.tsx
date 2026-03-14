import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('errors')
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-xl">{t('notFound')}</p>
      </div>
    </div>
  )
}
