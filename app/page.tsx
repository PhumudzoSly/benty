import BentoGridGenerator from "@/components/bento-grid-generator"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <main className="container mx-auto py-8 px-4 flex-1">
        <BentoGridGenerator />
      </main>
      <Footer />
    </div>
  )
}
