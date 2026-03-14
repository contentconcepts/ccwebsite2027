import Link from 'next/link'

export function Footer({ locale }: { locale: string }) {
  return (
    <footer className="bg-brand-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center">© 2024 ContentConcepts. All rights reserved.</p>
      </div>
    </footer>
  )
}
