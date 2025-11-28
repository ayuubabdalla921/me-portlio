'use client'

import type React from 'react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Upload, Loader2, ImageIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type ClientProject = {
  id?: string
  title: string
  description: string
  techStack: string[]
  liveLink: string
  githubLink: string
  image: string
}

type ProjectFormProps = {
  initialData?: ClientProject
  mode: 'create' | 'edit'
}

const parseTechStack = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

export function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [techStackInput, setTechStackInput] = useState(initialData?.techStack.join(', ') ?? '')
  const [liveLink, setLiveLink] = useState(initialData?.liveLink ?? '')
  const [githubLink, setGithubLink] = useState(initialData?.githubLink ?? '')
  const [image, setImage] = useState(initialData?.image ?? '')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const techStackPreview = useMemo(() => parseTechStack(techStackInput), [techStackInput])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setImage(URL.createObjectURL(selectedFile))
    }
  }

  const uploadFile = async () => {
    if (!file) return initialData?.image ?? ''
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    setUploading(false)

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error ?? 'Failed to upload image')
    }

    const data = await response.json()
    return data.url as string
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const techStack = parseTechStack(techStackInput)
      if (!techStack.length) {
        throw new Error('Add at least one tech stack item.')
      }

      const uploadedImage = file ? await uploadFile() : image
      if (!uploadedImage) {
        throw new Error('Project image is required.')
      }

      const payload: ClientProject = {
        title,
        description,
        techStack,
        liveLink,
        githubLink,
        image: uploadedImage,
      }

      const endpoint = mode === 'edit' && initialData?.id ? `/api/projects/${initialData.id}` : '/api/projects'
      const response = await fetch(endpoint, {
        method: mode === 'edit' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error ?? 'Unable to save project')
      }

      setSuccess(mode === 'edit' ? 'Project updated successfully' : 'Project created successfully')
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card className="border border-border/70 bg-gradient-to-b from-background/70 to-background/40 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            {mode === 'edit' ? 'Edit Project' : 'Create Project'}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {mode === 'edit'
              ? 'Update project details and publish changes instantly.'
              : 'Add a new portfolio project to your dashboard.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Project title</Label>
                <Input
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Awesome Next.js SaaS"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack">Tech stack</Label>
                <Input
                  id="techStack"
                  required
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="Next.js, Tailwind, MongoDB"
                />
                {techStackPreview.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {techStackPreview.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-secondary/60 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project description</Label>
              <Textarea
                id="description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what makes this project special."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="liveLink">Live link</Label>
                <Input
                  id="liveLink"
                  type="url"
                  required
                  value={liveLink}
                  onChange={(e) => setLiveLink(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub repository</Label>
                <Input
                  id="githubLink"
                  type="url"
                  required
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Project image</Label>
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-border/70 bg-muted/40 p-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border/70 px-3 py-2 text-sm font-medium shadow-sm transition hover:border-primary/70 hover:text-primary">
                    <Upload className="size-4" />
                    <span>{file ? 'Change image' : 'Upload image'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  <div className="text-xs text-muted-foreground">
                    JPG, PNG, or WebP. Recommended 1200x800.
                    {uploading && <p className="text-primary">Uploading...</p>}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-muted/30">
                  {image ? (
                    <img src={image} alt="Project preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="mb-1 size-6" />
                      <p className="text-xs">No image selected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500">
                {success}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Fields marked with * are required. Uploaded files are stored in /public/uploads/projects.
              </p>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => router.push('/dashboard')} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || uploading}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : mode === 'edit' ? (
                    'Update project'
                  ) : (
                    'Create project'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
