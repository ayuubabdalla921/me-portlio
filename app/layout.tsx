import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ayuub Abdalla | Full-Stack Developer & UI/UX Designer",
  description:
    "MERN Stack & Next.js developer building modern, fast, scalable digital products with beautiful UI/UX experiences.",
  keywords: ["Full-Stack Developer", "UI/UX Designer", "Next.js", "React", "MERN Stack", "WordPress", "Shopify"],
  authors: [{ name: "Ayuub Abdalla" }],
  openGraph: {
    title: "Ayuub Abdalla | Full-Stack Developer & UI/UX Designer",
    description:
      "MERN Stack & Next.js developer building modern, fast, scalable digital products with beautiful UI/UX experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayuub Abdalla | Full-Stack Developer & UI/UX Designer",
    description:
      "MERN Stack & Next.js developer building modern, fast, scalable digital products with beautiful UI/UX experiences.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
