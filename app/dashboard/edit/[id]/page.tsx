import { notFound, redirect } from 'next/navigation'

import { ProjectForm } from '@/components/forms/project-form'
import { getSessionFromCookies } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const metadata = {
  title: 'Edit Project | Portfolio Admin',
  description: 'Update an existing portfolio project.',
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromCookies()
  if (!session) {
    redirect('/login')
  }

  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) {
    notFound()
  }

  const clientProject = {
    ...project,
    createdAt: project.createdAt.toISOString(),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-primary/5">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Edit project</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
          <p className="text-sm text-muted-foreground">Update details, links, and tech stack.</p>
        </div>
        <ProjectForm mode="edit" initialData={clientProject} />
      </div>
    </div>
  )
}
