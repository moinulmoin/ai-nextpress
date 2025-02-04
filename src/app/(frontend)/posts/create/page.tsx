'use client'

import { blogDraftSchema } from '@/app/(payload)/api/completion/route'
import { postFormSchema } from '@/lib/validations/post'
import { postsService } from '@/services/posts'
import { experimental_useObject as useObject } from 'ai/react'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import * as z from 'zod'
import DraftForm from './draft-form'
import PreviewCard from './preview-card'

type FormData = z.infer<typeof postFormSchema>

export default function CreatePage() {
  const router = useRouter()
  const { isMutating, trigger: triggerCreate } = useSWRMutation(
    '/api/posts',
    postsService.createPost,
  )

  const {
    object,
    submit: generateDraft,
    isLoading: isGenerating,
  } = useObject({
    api: '/api/completion',
    schema: blogDraftSchema,
  })

  const handleGenerate = (data: FormData) => {
    generateDraft(
      `Generate a blog post headline and draft body content about ${data.topic} in ${data.tone} tone for ${data.audience} audience.`,
    )
  }

  const shouldSubmitDisabled = isGenerating || isMutating

  async function onCreatePost() {
    try {
      const result = await triggerCreate({
        title: object?.post?.title ?? '',
        content: object?.post?.content ?? '',
      })

      await mutate('/api/posts')
      router.push(`/posts/${result.doc.id}`)
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <DraftForm
        isLoading={isGenerating}
        shouldSubmitDisabled={shouldSubmitDisabled || !!object?.post}
        onSubmit={handleGenerate}
      />
      <PreviewCard
        object={object!}
        onCreatePost={onCreatePost}
        shouldSubmitDisabled={shouldSubmitDisabled}
        isLoading={isMutating}
      />
    </div>
  )
}
