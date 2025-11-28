import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SocialSidebar } from "@/components/social-sidebar"
import { Footer } from "@/components/footer"
import { ContactPageContent } from "@/components/pages/contact-page-content"

export const metadata: Metadata = {
  title: "Contact | Ayuub Abdalla",
  description: "Get in touch with Ayuub Abdalla for your web development projects",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main className="pt-20">
        <ContactPageContent />
      </main>
      <Footer />
    </>
  )
}
