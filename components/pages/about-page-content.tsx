"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Award, Briefcase, GraduationCap } from "lucide-react"

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "WordPress",
  "Shopify",
  "Figma",
  "Git",
]

const experience = [
  {
    title: "Senior Full-Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description: "Leading development of enterprise-level web applications using Next.js and Node.js.",
  },
  {
    title: "UI/UX Designer & Developer",
    company: "Creative Agency",
    period: "2020 - 2022",
    description: "Designed and developed user interfaces for various clients across different industries.",
  },
  {
    title: "WordPress Developer",
    company: "Digital Studio",
    period: "2019 - 2020",
    description: "Built custom WordPress themes and plugins for small to medium businesses.",
  },
]

const education = [
  {
    degree: "Bachelor's in Computer Science",
    school: "University of Technology",
    period: "2015 - 2019",
  },
  {
    degree: "UI/UX Design Certification",
    school: "Design Academy",
    period: "2020",
  },
]

export function AboutPageContent() {
  return (
    <div className="py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">About Me</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2">My Journey</h1>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 mb-20"
        >
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border">
              <img src="/professional-developer-portrait.png" alt="Ayuub Abdalla" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Hello! I'm <span className="text-primary">Ayuub Abdalla</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate Full-Stack Developer and UI/UX Designer with over 5 years of experience creating
                digital experiences that are both beautiful and functional.
              </p>
              <p>
                My journey in web development started with a curiosity about how websites work, which evolved into a
                full-blown passion for creating impactful digital solutions. I specialize in the MERN stack, Next.js,
                and modern design systems.
              </p>
              <p>
                When I'm not coding, you can find me exploring new design trends, contributing to open-source projects,
                or sharing knowledge with the developer community.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
            <Button className="w-fit mt-8 rounded-full bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
        </motion.div>

        {/* Experience & Education */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Experience</h3>
            </div>
            <div className="space-y-6">
              {experience.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-6 border-l-2 border-border hover:border-primary transition-colors"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                  <span className="text-sm text-primary font-medium">{item.period}</span>
                  <h4 className="text-lg font-bold text-foreground mt-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.company}</p>
                  <p className="text-muted-foreground text-sm mt-2">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((item, index) => (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-medium">{item.period}</span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground">{item.degree}</h4>
                  <p className="text-muted-foreground text-sm">{item.school}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
