import { getPayload } from 'payload'

import { PostCard } from '@/components/postcard'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import config from '@/payload.config'
import Link from 'next/link'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload
    .find({
      collection: 'posts',
      limit: 10,
    })
    .catch(() => ({ docs: [] }))

  return (
    <div className="grid gap-6">
      {posts.docs.length > 0 ? (
        <div className="flex flex-col gap-6 w-full">
          {posts.docs.map((post) => (
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
