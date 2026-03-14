import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ContentConcepts',
  description: 'Professional academic and business editing and proofreading services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
