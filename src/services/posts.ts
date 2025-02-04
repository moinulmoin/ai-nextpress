import { Post } from '@/payload-types'

interface CreatePostPayload {
  title: string
  content: string
}

interface GenerateContentPayload {
  prompt: string
}

export const postsService = {
  async getAllPosts() {
    const response = await fetch('/api/posts')
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    return response.json()
  },

  async createPost(_key: string, { arg }: { arg: CreatePostPayload }) {
    const response = await fetch('/api/posts', {
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
  },

  async generateContent(data: GenerateContentPayload) {
    const response = await fetch('/api/completion', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to generate content')
    }

    return response.json()
  },

  async getPostById(id: string): Promise<Post> {
    const response = await fetch(`/api/posts/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }
    return response.json()
  },
}
