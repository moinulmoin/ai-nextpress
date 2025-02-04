import * as z from 'zod'

export const postFormSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
  tone: z.string().min(2, {
    message: 'Tone must be at least 2 characters.',
  }),
  audience: z.string().min(2, {
    message: 'Target audience must be at least 2 characters.',
  }),
})
