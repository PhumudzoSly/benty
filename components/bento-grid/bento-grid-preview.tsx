"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useBentoGrid } from "./bento-grid-context";
import { CardContentRenderer } from "./card-content-renderer";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ModeToggle } from "../mode-switcher";

export function BentoGridPreview({ className }: { className?: string }) {
  const {
    gridConfig,
    selectedCardId,
    setSelectedCardId,
    generateCardClass,
    generateGlassmorphismStyle,
    generateCardAnimationStyle,
    isFullscreenPreview,
    toggleFullscreenPreview,
  } = useBentoGrid();

  // Sort cards by order
  const sortedCards = [...gridConfig.cards].sort((a, b) => a.order - b.order);

  const renderGrid = () => (
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
          className={cn(
            "transition-all duration-200",
            selectedCardId === card.id && !isFullscreenPreview
              ? "ring-2 ring-primary"
              : ""
          )}
          style={{
            gridColumn: `span ${card.colSpan} / span ${card.colSpan}`,
            gridRow: `span ${card.rowSpan} / span ${card.rowSpan}`,
            height: card.style.equalHeight ? "100%" : "auto",
          }}
          onClick={() => !isFullscreenPreview && setSelectedCardId(card.id)}
        >
          <Card
            className={cn(generateCardClass(card), "h-full")}
            style={{
              ...generateGlassmorphismStyle(
                card.style.glassmorphism,
                card.style.glassmorphismOpacity
              ),
              ...generateCardAnimationStyle(card),
            }}
          >
            <CardContent className="p-6 flex flex-col h-full relative">
              {!isFullscreenPreview && (
                <div className="absolute top-2 right-2 bg-primary/10 text-xs px-2 py-1 rounded-full">
                  {card.colSpan} × {card.rowSpan}
                </div>
              )}
              <CardContentRenderer card={card} />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Card className={cn(className, "bg-transparent")}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Preview</h2>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground mr-2">
                {!isFullscreenPreview && "Click on a card to edit"}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreenPreview}
              >
                <Maximize2 className="h-4 w-4" />
                <span className="sr-only">Fullscreen Preview</span>
              </Button>
              <ModeToggle />
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 grid pointer-events-none opacity-10"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridConfig.columns}, minmax(0, 1fr))`,
                gap: `${gridConfig.gap * 0.25}rem`,
              }}
            >
              {Array.from({ length: gridConfig.columns }).map((_, i) => (
                <div key={i} className="bg-primary/20 rounded-sm"></div>
              ))}
            </div>
            {renderGrid()}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isFullscreenPreview} onOpenChange={toggleFullscreenPreview}>
        <DialogContent className="max-w-[90vw] w-[90vw] max-h-[90vh] h-[90vh] overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Fullscreen Preview</h2>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreenPreview}
            >
              <Minimize2 className="h-4 w-4" />
              <span className="sr-only">Exit Fullscreen</span>
            </Button>
          </div>
          {renderGrid()}
        </DialogContent>
      </Dialog>
    </>
  );
}
