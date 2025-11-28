"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const categories = ["All", "Web Apps", "E-Commerce", "WordPress", "UI/UX"]

const projects = [
  {
    title: "Task Management System",
    description:
      "A comprehensive task management application with real-time updates, team collaboration features, and detailed analytics dashboard for productivity tracking.",
    image: "/task-management-dashboard-dark-theme.jpg",
    tags: ["Next.js", "MongoDB", "Prisma", "Tailwind"],
    category: "Web Apps",
    liveUrl: "#",
    githubUrl: "https://github.com/ayuubabdalla921",
  },
  {
    title: "GoShop E-Commerce",
    description:
      "Modern e-commerce platform with product management, shopping cart functionality, Stripe payment integration, and comprehensive order tracking system.",
    image: "/modern-ecommerce-website.png",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    category: "E-Commerce",
    liveUrl: "#",
    githubUrl: "https://github.com/ayuubabdalla921",
  },
  {
    title: "AIFA Institute Website",
    description:
      "Educational institution website featuring course management system, student portal, online enrollment, and resource library.",
    image: "/education-institute-website.jpg",
    tags: ["WordPress", "PHP", "MySQL", "UI/UX"],
    category: "WordPress",
    liveUrl: "#",
    githubUrl: "https://github.com/ayuubabdalla921",
  },
  {
    title: "School Management System",
    description:
      "Comprehensive school management solution with attendance tracking, grade management, parent communication portal, and administrative tools.",
    image: "/school-management-dashboard.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    category: "Web Apps",
    liveUrl: "#",
    githubUrl: "https://github.com/ayuubabdalla921",
  },
  {
    title: "Chat AI Web App",
    description:
      "AI-powered conversational application with natural language processing, conversation history management, and intelligent response generation.",
    image: "/ai-chat-application-dark-interface.jpg",
    tags: ["Next.js", "OpenAI", "Tailwind", "Vercel"],
    category: "Web Apps",
    liveUrl: "#",
    githubUrl: "https://github.com/ayuubabdalla921",
  },
  {
    title: "JobSync Platform",
    description:
      "Job matching platform connecting employers with candidates using AI-powered recommendations, advanced filtering, and application tracking.",
    image: "/job-platform-dashboard-modern.jpg",
    tags: ["React", "Node.js", "MongoDB", "AI/ML"],
    category: "Web Apps",
    liveUrl: "#",
    githubUrl: "https://github.com/ayuubabdalla921",
  },
  {
    title: "Fashion Store",
    description:
      "Shopify-based fashion e-commerce store with custom theme, lookbook features, size guides, and wishlist functionality.",
    image: "/fashion-ecommerce-store.png",
    tags: ["Shopify", "Liquid", "JavaScript", "CSS"],
    category: "E-Commerce",
    liveUrl: "#",
    githubUrl: "https://github.com/ayuubabdalla921",
  },
  {
    title: "Restaurant Website",
    description:
      "Modern restaurant website with online ordering, reservation system, menu management, and location finder.",
    image: "/restaurant-website-modern.jpg",
    tags: ["WordPress", "WooCommerce", "PHP", "UI/UX"],
    category: "WordPress",
    liveUrl: "#",
    githubUrl: "https://github.com/ayuubabdalla921",
  },
  {
    title: "Fitness App Dashboard",
    description:
      "UI/UX design for a fitness tracking application with workout logging, progress visualization, and social features.",
    image: "/fitness-app-dashboard-design.jpg",
    tags: ["Figma", "UI/UX", "Prototyping", "Design System"],
    category: "UI/UX",
    liveUrl: "#",
    githubUrl: "https://github.com/ayuubabdalla921",
  },
]

export function PortfolioPageContent() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2">My Work</h1>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web development and design
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    asChild
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-background/90 hover:bg-background"
                  >
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="w-5 h-5" />
                      <span className="sr-only">View live</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-background/90 hover:bg-background"
                  >
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="w-5 h-5" />
                      <span className="sr-only">View code</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50 text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
