import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex gap-4">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }))}>
          All Posts
        </Link>
      </div>
    </nav>
  )
}
