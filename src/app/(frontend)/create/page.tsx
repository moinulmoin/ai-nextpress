'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { WandSparklesIcon } from 'lucide-react'
import { useState } from 'react'

export default function CreatePage() {
  const [formData, setFormData] = useState({
    topic: '',
    tone: '',
    audience: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
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

            <Button type="submit" className="w-full">
              <WandSparklesIcon /> Generate Draft
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
