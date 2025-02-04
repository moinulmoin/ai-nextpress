import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { z } from 'zod'

export const maxDuration = 30

export const blogDraftSchema = z.object({
  post: z.object({
    title: z.string().describe('Headline of the blog post.'),
    content: z.string().describe('Initial draft body of the blog post.'),
  }),
})

export async function POST(req: Request) {
  const prompt = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    system:
      'You are an expert content writer specializing in creating engaging and human-like blog posts. Based on the information provided below, generate a compelling blog post headline and a well-structured initial draft for the article body. The tone of the article should match the specified style, and the content should feel authentic and relatable to the target audience.',
    prompt,
    schema: blogDraftSchema,
  })

  return result.toTextStreamResponse()
}
