'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogOut, Plus, RefreshCcw, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ProjectCard, type DashboardProject } from '@/components/dashboard/project-card'

type DashboardShellProps = {
  initialProjects: DashboardProject[]
}

export function DashboardShell({ initialProjects }: DashboardShellProps) {
  const router = useRouter()
  const [projects, setProjects] = useState(initialProjects)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects
    return projects.filter((project) => {
      const haystack = `${project.title} ${project.description} ${project.techStack.join(' ')}`.toLowerCase()
      return haystack.includes(query.toLowerCase())
    })
  }, [projects, query])

  const handleDelete = async (id: string) => {
    setError(null)
    const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      const data = await response.json()
      setError(data.error ?? 'Unable to delete project')
      return
    }
    setProjects((prev) => prev.filter((project) => project.id !== id))
  }

  const handleRefresh = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Failed to refresh projects')
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh projects')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/login', { method: 'DELETE' })
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Portfolio Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage your showcased work, update details, and publish new projects in real time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCcw className="mr-2 size-4" />
            Refresh
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link href="/dashboard/new">
              <Plus className="mr-2 size-4" />
              New Project
            </Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>
        </div>
      </div>

      <Card className="border border-border/70 bg-card/80 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Quick filters</CardTitle>
          <CardDescription>Search and filter projects instantly.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, tech stack, or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-semibold">{filteredProjects.length}</span> of{' '}
            <span className="font-semibold">{projects.length}</span> projects
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <Card className="border border-dashed border-border/60 bg-muted/40">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <p className="text-base font-semibold">No projects match your search.</p>
            <p className="max-w-lg text-sm text-muted-foreground">
              Try adjusting the keywords or create a new project to showcase your latest work.
            </p>
            <Button asChild>
              <Link href="/dashboard/new">
                <Plus className="mr-2 size-4" />
                Add your first project
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
