'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { postFormSchema } from '@/lib/validations/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, WandSparklesIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormData = z.infer<typeof postFormSchema>

interface DraftFormProps {
  isLoading: boolean
  shouldSubmitDisabled: boolean
  onSubmit: (data: FormData) => void
}

export default function DraftForm({ isLoading, shouldSubmitDisabled, onSubmit }: DraftFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      topic: 'React useState',
      tone: 'casual',
      audience: 'beginners',
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Create your post</CardTitle>
        <CardDescription>
          Generate draft content first, then preview and create the post.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your topic?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., React Hooks"
                      disabled={shouldSubmitDisabled}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What tone should the content have?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Formal, Casual, Friendly"
                      disabled={shouldSubmitDisabled}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="audience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Who is your target audience?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Beginners, Experts"
                      disabled={shouldSubmitDisabled}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={shouldSubmitDisabled}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <WandSparklesIcon className="mr-2 h-4 w-4" />
                  Generate Draft
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
