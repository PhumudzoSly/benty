"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Minimize2 } from "lucide-react"
import { useBentoGrid } from "./bento-grid-context"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CardContentRenderer } from "./card-content-renderer"

export function FullscreenPreview() {
  const {
    isFullscreenPreview,
    toggleFullscreenPreview,
    gridConfig,
    generateCardClass,
    generateGlassmorphismStyle,
    generateCardAnimationStyle,
  } = useBentoGrid()

  // Sort cards by order
  const sortedCards = [...gridConfig.cards].sort((a, b) => a.order - b.order)

  return (
    <Dialog open={isFullscreenPreview} onOpenChange={toggleFullscreenPreview}>
      <DialogContent className="max-w-[90vw] w-[90vw] max-h-[90vh] h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Fullscreen Preview</h2>
          <Button variant="outline" size="icon" onClick={toggleFullscreenPreview}>
            <Minimize2 className="h-4 w-4" />
            <span className="sr-only">Exit Fullscreen</span>
          </Button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridConfig.columns}, minmax(0, 1fr))`,
            gap: `${gridConfig.gap * 0.25}rem`,
          }}
        >
          {sortedCards.map((card) => (
            <div
              key={card.id}
              style={{
                gridColumn: `span ${card.colSpan} / span ${card.colSpan}`,
                gridRow: `span ${card.rowSpan} / span ${card.rowSpan}`,
                height: card.style.equalHeight ? "100%" : "auto",
              }}
            >
              <Card
                className={cn(generateCardClass(card), "h-full")}
                style={{
                  ...generateGlassmorphismStyle(card.style.glassmorphism, card.style.glassmorphismOpacity),
                  ...generateCardAnimationStyle(card),
                }}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <CardContentRenderer card={card} />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
