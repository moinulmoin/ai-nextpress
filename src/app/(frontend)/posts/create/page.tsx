'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, WandSparklesIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'

// Create post mutation
async function createPost(url: string, { arg }: { arg: { title: string; content: string } }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    throw new Error('Failed to create post')
  }

  return response.json()
}

// AI completion mutation
async function generateContent(url: string, { arg }: { arg: { prompt: string } }) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    throw new Error('Failed to generate content')
  }

  return response.json()
}

export default function CreatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    topic: '',
    tone: '',
    audience: '',
  })

  // Setup mutations
  const { trigger: triggerAI, isMutating: isGenerating } = useSWRMutation(
    '/api/completion',
    generateContent,
  )
  const { trigger: triggerCreate, isMutating: isCreating } = useSWRMutation(
    '/api/posts',
    createPost,
  )

  const isLoading = isGenerating || isCreating

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Generate content with AI
      const aiResult = await triggerAI({
        prompt: `
          Generate a blog post headline and draft body content about ${formData.topic} in ${formData.tone} tone for ${formData.audience} audience.
        `,
      })

      // Create post with generated content
      const result = await triggerCreate({
        title: aiResult.post[0].title,
        content: aiResult.post[0].content,
      })

      // Revalidate the posts list
      mutate('/api/posts')

      // Redirect to the new post
      router.push(`/posts/${result.doc.id}`)
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">What is your topic?</Label>
              <Input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                placeholder="Enter your topic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">What tone should the post have?</Label>
              <Input
                type="text"
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                required
                placeholder="e.g., Professional, Casual, Academic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Who is your audience? (Optional)</Label>
              <Input
                type="text"
                id="audience"
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                placeholder="e.g., Beginners, Professionals, Students"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isGenerating ? 'Generating...' : 'Saving...'}
                </>
              ) : (
                <>
                  <WandSparklesIcon className="mr-2 h-4 w-4" />
                  Generate Draft
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
