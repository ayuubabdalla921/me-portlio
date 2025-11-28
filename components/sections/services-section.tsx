"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Globe, ShoppingCart } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "Building scalable, high-performance web applications using modern technologies like React, Next.js, Node.js, and MongoDB.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating beautiful, intuitive user interfaces with a focus on user experience, accessibility, and modern design principles.",
  },
  {
    icon: Globe,
    title: "WordPress Development",
    description:
      "Custom WordPress themes and plugins, performance optimization, and complete website solutions for businesses.",
  },
  {
    icon: ShoppingCart,
    title: "Shopify Store Setup",
    description:
      "End-to-end Shopify store development including theme customization, app integration, and payment gateway setup.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">What I Offer</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive digital solutions to help bring your ideas to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-card border border-border rounded-2xl p-6 lg:p-8 text-center hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="relative text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
