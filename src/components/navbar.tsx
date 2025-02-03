'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    name: 'All Posts',
    href: '/',
  },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex justify-between items-center">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              pathname === item.href && 'bg-muted',
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
