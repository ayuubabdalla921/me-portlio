import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SocialSidebar } from "@/components/social-sidebar"
import { Footer } from "@/components/footer"
import { ServicesPageContent } from "@/components/pages/services-page-content"

export const metadata: Metadata = {
  title: "Services | Ayuub Abdalla",
  description: "Web development and design services offered by Ayuub Abdalla",
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main className="pt-20">
        <ServicesPageContent />
      </main>
      <Footer />
    </>
  )
}
