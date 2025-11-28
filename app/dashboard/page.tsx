import { redirect } from 'next/navigation'

import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { getSessionFromCookies } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const metadata = {
  title: 'Dashboard | Portfolio Admin',
  description: 'Manage portfolio projects from a secure admin dashboard.',
}

export default async function DashboardPage() {
  const session = await getSessionFromCookies()
  if (!session) {
    redirect('/login')
  }

  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  const serializedProjects = projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-primary/5">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <DashboardShell initialProjects={serializedProjects} />
      </div>
    </div>
  )
}
