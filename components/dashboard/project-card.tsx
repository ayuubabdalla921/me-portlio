'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Pencil, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export type DashboardProject = {
  id: string
  title: string
  description: string
  techStack: string[]
  liveLink: string
  githubLink: string
  image: string
  createdAt?: string
}

type ProjectCardProps = {
  project: DashboardProject
  onDelete: (id: string) => Promise<void> | void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await onDelete(project.id)
      setIsDialogOpen(false)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Card className="overflow-hidden border border-border/70 bg-card/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-40 w-full overflow-hidden border-b border-border/60">
          <img
            src={project.image || '/placeholder.jpg'}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-start justify-between gap-3 text-lg">
            <span>{project.title}</span>
            <span className="text-xs font-medium text-muted-foreground">
              {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-3 text-sm text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-secondary/70 text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60">
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={project.liveLink} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 size-4" />
                Live
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href={project.githubLink} target="_blank" rel="noreferrer">
                <Github className="mr-2 size-4" />
                Repo
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="secondary">
              <Link href={`/dashboard/edit/${project.id}`}>
                <Pencil className="mr-2 size-4" />
                Edit
              </Link>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete project?</DialogTitle>
                  <DialogDescription>
                    This action will permanently remove <strong>{project.title}</strong> from the portfolio.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Confirm'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
