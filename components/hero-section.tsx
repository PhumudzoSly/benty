import { Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-primary/10 to-background pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <div className="bg-primary/20 p-3 rounded-full">
              <div className="bg-primary text-primary-foreground p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight">Benty</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Create beautiful bento grid layouts with customizable styles and components. Perfect for dashboards and
            marketing pages.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <a href="#generator">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://github.com/PhumudzoSly" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Twitter className="h-4 w-4" />
            <Link href="https://x.com/amazing_sly" target="_blank" className="hover:text-primary">
              @amazing_sly
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
