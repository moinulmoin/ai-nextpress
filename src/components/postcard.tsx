'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'

type PostCardProps = {
  id: string
  title: string
}

// Delete post mutation
async function deletePost(url: string) {
  const response = await fetch(url, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete post')
  }

  return response.json()
}

export function PostCard({ id, title }: PostCardProps) {
  const { trigger: triggerDelete, isMutating } = useSWRMutation(`/api/posts/${id}`, deletePost)

  async function handleDelete() {
    try {
      await triggerDelete()
      // Revalidate the posts list
      mutate('/api/posts')
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <Link href={`/posts/${id}`} className="underline underline-offset-4 hover:text-primary">
        <h2 className="text-lg font-medium">{title}</h2>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isMutating}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
