import { Navbar } from "@/components/navbar"
import { SocialSidebar } from "@/components/social-sidebar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { TechStackSection } from "@/components/sections/tech-stack-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main>
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <PortfolioSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
