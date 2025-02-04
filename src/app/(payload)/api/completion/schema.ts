import { z } from 'zod'

export const blogDraftSchema = z.object({
  post: z.object({
    title: z.string().describe('Headline of the blog post.'),
    content: z.string().describe('Initial draft body of the blog post.'),
  }),
})
