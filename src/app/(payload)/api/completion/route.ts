import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { blogDraftSchema } from './schema'

export const maxDuration = 30

export async function POST(req: Request) {
  const prompt = await req.json()

  const result = streamObject({
    model: openai('gpt-4o-mini'),
    system:
      'You are an expert content writer specializing in creating engaging and human-like blog posts. Based on the information provided below, generate a compelling blog post headline and a well-structured initial draft for the article body. The tone of the article should match the specified style, and the content should feel authentic and relatable to the target audience.',
    prompt,
    schema: blogDraftSchema,
  })

  return result.toTextStreamResponse()
}
