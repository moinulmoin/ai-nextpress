'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DeepPartial } from 'ai'
import { Loader2 } from 'lucide-react'
import Markdown from 'react-markdown'

interface PreviewCardProps {
  object: DeepPartial<{
    post: {
      title: string
      content: string
    }
  }>
  onCreatePost: () => void
  shouldSubmitDisabled: boolean
  isLoading: boolean
}

export default function PreviewCard({
  object,
  onCreatePost,
  shouldSubmitDisabled,
  isLoading,
}: PreviewCardProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {object?.post ? (
          <div className="space-y-4 overflow-auto max-h-[300px] ">
            <h1 className="text-2xl font-bold">{object?.post.title}</h1>
            <div className="prose">
              <Markdown>{object?.post.content}</Markdown>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Fill out the form and generate content to see the preview
          </div>
        )}

        {object?.post && (
          <Button className="w-full mt-4" onClick={onCreatePost} disabled={shouldSubmitDisabled}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Post'
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
