import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SocialSidebar } from "@/components/social-sidebar"
import { Footer } from "@/components/footer"
import { AboutPageContent } from "@/components/pages/about-page-content"

export const metadata: Metadata = {
  title: "About | Ayuub Abdalla",
  description: "Learn more about Ayuub Abdalla - Full-Stack Developer & UI/UX Designer",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main className="pt-20">
        <AboutPageContent />
      </main>
      <Footer />
    </>
  )
}
