import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function CTAButton({ href, children, variant = 'primary', className }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-block px-6 py-3 rounded-md font-semibold transition-colors',
        variant === 'primary' && 'bg-brand-green text-white hover:bg-brand-green-light',
        variant === 'secondary' && 'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white',
        className
      )}
    >
      {children}
    </Link>
  )
}
