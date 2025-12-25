import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { PricingPreviewSection } from "@/components/landing/pricing-preview-section"
import { FeaturesSection } from "@/components/landing/features-section"

console.log("[v0] HomePage: Starting to render")

export default function HomePage() {
  console.log("[v0] HomePage: Rendering component")
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingPreviewSection />
      </main>
      <Footer />
    </div>
  )
}
