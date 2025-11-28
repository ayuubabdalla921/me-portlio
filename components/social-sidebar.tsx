"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Github } from "lucide-react"
import Link from "next/link"

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/Ayub1.Abdalla", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/ayub1.abdalla/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ayub-abdullahi-2b9303330/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/ayuubabdalla921", label: "GitHub" },
]

export function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4"
    >
      {socials.map((social, index) => (
        <motion.div
          key={social.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + index * 0.1 }}
        >
          <Link
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            aria-label={social.label}
          >
            <social.icon className="w-4 h-4" />
          </Link>
        </motion.div>
      ))}
      <div className="w-px h-20 bg-border mx-auto mt-2" />
    </motion.div>
  )
}
