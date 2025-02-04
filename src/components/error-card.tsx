'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RotateCcw } from 'lucide-react'

interface ErrorCardProps {
  title?: string
  message?: string
  retry?: () => void
}

export function ErrorCard({
  title = 'Something went wrong',
  message = 'An error occurred. Please try again.',
  retry,
}: ErrorCardProps) {
  return (
    <Card className="p-6 text-center">
      <h2 className="text-xl font-semibold text-destructive mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4">{message}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      )}
    </Card>
  )
}
