import { redirect } from 'next/navigation'

import { ProjectForm } from '@/components/forms/project-form'
import { getSessionFromCookies } from '@/lib/auth'

export const metadata = {
  title: 'New Project | Portfolio Admin',
  description: 'Create a new portfolio project from the dashboard.',
}

export default async function NewProjectPage() {
  const session = await getSessionFromCookies()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-primary/5">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Add project</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Create a new showcase</h1>
          <p className="text-sm text-muted-foreground">Upload imagery, add links, and describe your latest work.</p>
        </div>
        <ProjectForm mode="create" />
      </div>
    </div>
  )
}
