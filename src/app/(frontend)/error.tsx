'use client'

import { ErrorCard } from '@/components/error-card'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <ErrorCard
      title="Something went wrong!"
      message={error.message || 'An error occurred. Please try again.'}
      retry={reset}
    />
  )
}
