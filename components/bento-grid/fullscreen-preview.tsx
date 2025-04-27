"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minimize2, Smartphone, Tablet, Monitor } from "lucide-react";
import { useBentoGrid } from "./bento-grid-context";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CardContentRenderer } from "./card-content-renderer";
import { useScreenSize } from "@/hooks/use-screen-size";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function FullscreenPreview() {
  const {
    isFullscreenPreview,
    toggleFullscreenPreview,
    gridConfig,
    generateCardClass,
    generateGlassmorphismStyle,
    generateCardAnimationStyle,
  } = useBentoGrid();
  const { screenSize, setScreenSize } = useScreenSize();

  // Sort cards by order
  const sortedCards = [...gridConfig.cards].sort((a, b) => a.order - b.order);

  // Get current grid settings based on screen size
  const currentColumns = gridConfig.columns[screenSize];
  const currentGap = gridConfig.gap[screenSize];

  return (
    <Dialog open={isFullscreenPreview} onOpenChange={toggleFullscreenPreview}>
      <DialogContent className="max-w-[90vw] w-[90vw] max-h-[90vh] h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Fullscreen Preview</h2>
          <div className="flex items-center gap-4">
            <ToggleGroup
              type="single"
              value={screenSize}
              onValueChange={(value: "sm" | "md" | "lg") => {
                if (value) setScreenSize(value);
              }}
              aria-label="Preview Size"
              className="h-9"
            >
              <ToggleGroupItem value="sm" aria-label="Mobile Preview" size="sm">
                <Smartphone className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Mobile</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="md" aria-label="Tablet Preview" size="sm">
                <Tablet className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Tablet</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="lg"
                aria-label="Desktop Preview"
                size="sm"
              >
                <Monitor className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Desktop</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreenPreview}
            >
              <Minimize2 className="h-4 w-4" />
              <span className="sr-only">Exit Fullscreen</span>
            </Button>
          </div>
        </div>

        <div className="relative border rounded-md p-4 bg-muted/20">
          <div className="text-sm text-muted-foreground mb-2">
            Current view: <strong>{screenSize.toUpperCase()}</strong> (
            {currentColumns} columns, gap: {currentGap})
          </div>

          <div
            className={cn(
              "relative transition-all duration-300 ease-in-out mx-auto",
              {
                "w-full": screenSize === "lg",
                "max-w-2xl": screenSize === "md",
                "max-w-sm": screenSize === "sm",
              }
            )}
          >
            {/* Background Grid Lines */}
            <div
              className="absolute inset-0 grid pointer-events-none opacity-10"
              style={{
                gridTemplateColumns: `repeat(${currentColumns}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: currentColumns }).map((_, i) => (
                <div key={`bg-${i}`} className="bg-primary/20 rounded-sm"></div>
              ))}
            </div>

            {/* Actual Content Grid */}
            <div
              className={cn("grid", `gap-${currentGap}`)}
              style={{
                gridTemplateColumns: `repeat(${currentColumns}, minmax(0, 1fr))`,
              }}
            >
              {sortedCards.map((card) => {
                // Get the current span based on preview size for display purposes
                const currentColSpan = Number(card.colSpan[screenSize] || 1);
                const currentRowSpan = Number(card.rowSpan[screenSize] || 1);

                // For the preview, dynamically generate grid classes
                const gridItemStyle: React.CSSProperties = {
                  gridColumn: `span ${currentColSpan} / span ${currentColSpan}`,
                  gridRow: `span ${currentRowSpan} / span ${currentRowSpan}`,
                  height: card.style.equalHeight ? "100%" : "auto",
                };

                return (
                  <div
                    key={card.id}
                    className="transition-all duration-200"
                    style={gridItemStyle}
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
                      <CardContent className="p-4 flex flex-col h-full relative">
                        <div className="absolute top-1 right-1 bg-primary/10 text-[10px] px-1.5 py-0.5 rounded-full z-10">
                          {currentColSpan} × {currentRowSpan}
                        </div>
                        <CardContentRenderer card={card} />
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
