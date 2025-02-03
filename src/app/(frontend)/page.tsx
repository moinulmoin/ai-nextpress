import { getPayload } from 'payload'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.docs.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-2">{post.content}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/posts/${post.id}`}
                  className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
                >
                  Read More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <h2 className="text-xl font-semibold">No posts to show</h2>
          <p className="text-muted-foreground mb-6">Create your first post!</p>
          <Link href="/create" className={cn(buttonVariants({ variant: 'default' }))}>
            Create Post
          </Link>
        </Card>
      )}
    </div>
  )
}
