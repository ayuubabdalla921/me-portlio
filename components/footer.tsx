"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Github } from "lucide-react"

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/Ayub1.Abdalla", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/ayub1.abdalla/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ayub-abdullahi-2b9303330/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/ayuubabdalla921", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <Link href="/" className="text-xl font-bold text-foreground">
              Ayuub<span className="text-primary">.dev</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
