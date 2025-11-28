"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Code2, Palette, Globe, ShoppingCart, Smartphone, Zap } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description: "End-to-end web application development using modern technologies.",
    features: [
      "Custom web applications",
      "RESTful API development",
      "Database design & optimization",
      "Performance optimization",
      "Code review & refactoring",
    ],
    price: "Starting at $2,500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that convert visitors into customers.",
    features: [
      "User research & analysis",
      "Wireframing & prototyping",
      "Visual design systems",
      "Responsive design",
      "Design handoff",
    ],
    price: "Starting at $1,500",
  },
  {
    icon: Globe,
    title: "WordPress Development",
    description: "Custom WordPress solutions for businesses of all sizes.",
    features: [
      "Custom theme development",
      "Plugin development",
      "WooCommerce setup",
      "Performance optimization",
      "Ongoing maintenance",
    ],
    price: "Starting at $1,000",
  },
  {
    icon: ShoppingCart,
    title: "Shopify Development",
    description: "Complete Shopify store setup and customization.",
    features: [
      "Store setup & configuration",
      "Theme customization",
      "App integration",
      "Payment gateway setup",
      "SEO optimization",
    ],
    price: "Starting at $1,500",
  },
  {
    icon: Smartphone,
    title: "Responsive Web Design",
    description: "Mobile-first designs that look great on all devices.",
    features: [
      "Mobile-first approach",
      "Cross-browser compatibility",
      "Touch-friendly interfaces",
      "Retina-ready graphics",
      "Progressive enhancement",
    ],
    price: "Starting at $800",
  },
  {
    icon: Zap,
    title: "Web Performance",
    description: "Speed optimization for better user experience and SEO.",
    features: ["Performance audit", "Image optimization", "Code minification", "Caching strategies", "Core Web Vitals"],
    price: "Starting at $500",
  },
]

export function ServicesPageContent() {
  return (
    <div className="py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Services</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2">What I Offer</h1>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-border">
                <p className="text-lg font-bold text-primary">{service.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to start your project?</h3>
          <p className="text-muted-foreground mb-6">Let's discuss how I can help bring your ideas to life.</p>
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90">
            <Link href="/#contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
