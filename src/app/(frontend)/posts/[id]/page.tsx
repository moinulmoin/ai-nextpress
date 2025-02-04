import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Markdown from 'react-markdown'

async function SinglePostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const post = await payload.findByID({
    collection: 'posts',
    id: id,
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-6">{post.title}</h1>
      <div className=" prose">
        <Markdown>{post.content}</Markdown>
      </div>
    </div>
  )
}

export default SinglePostPage
