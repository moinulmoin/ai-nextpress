'use client'

import { ErrorCard } from '@/components/error-card'
import { PostCard } from '@/components/postcard'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Post } from '@/payload-types'
import { postsService } from '@/services/posts'
import Link from 'next/link'
import useSWR from 'swr'

export default function HomePage() {
  const { data: posts, error, isLoading } = useSWR('/api/posts', postsService.getAllPosts)

  if (error) {
    return (
      <ErrorCard
        title="Error Loading Posts"
        message={error.message || 'Failed to load posts. Please try again.'}
        retry={() => window.location.reload()}
      />
    )
  }

  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <div className="grid gap-6">
      {posts?.docs?.length > 0 ? (
        <div className="flex flex-col gap-6 w-full">
          {posts.docs.map((post: Post) => (
            <PostCard key={post.id} id={'' + post.id} title={post.title ?? ''} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <h2 className="text-xl font-semibold">No posts to show</h2>
          <p className="text-muted-foreground mb-6">Create your first post!</p>
          <Link href="/posts/create" className={cn(buttonVariants({ variant: 'default' }))}>
            Create Post
          </Link>
        </Card>
      )}
    </div>
  )
}
