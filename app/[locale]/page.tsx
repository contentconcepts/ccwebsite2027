import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('nav')
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-green-900">ContentConcepts</h1>
      <p>Professional editing and proofreading services</p>
    </main>
  )
}
