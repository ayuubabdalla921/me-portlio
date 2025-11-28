import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma"

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
    return projects
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export async function PortfolioSection() {
  const projects = await getProjects()

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">Featured Projects</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            A selection of my recent work across web development and design
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects yet. Add your first project from the dashboard!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      asChild
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-background/90 hover:bg-background"
                    >
                      <Link href={project.liveLink} target="_blank">
                        <ExternalLink className="w-5 h-5" />
                        <span className="sr-only">Book Now</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-background/90 hover:bg-background"
                    >
                      <Link href={project.githubLink} target="_blank">
                        <Github className="w-5 h-5" />
                        <span className="sr-only">View source code</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50 text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/#contact">Book Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
