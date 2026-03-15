import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Montserrat, Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '../../src/styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const locales = ['en', 'es', 'fr']

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()
  const messages = await getMessages()
  return (
    <html lang={locale} className={`${montserrat.variable} ${inter.variable}`}>
      <body style={{ margin: 0, fontFamily: 'var(--font-inter, Inter, sans-serif)', background: '#F9F9F6' }}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <div style={{ minHeight: 'calc(100vh - 64px)' }}>
            {children}
          </div>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
