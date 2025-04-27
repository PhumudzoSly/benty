"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useBentoGrid } from "./bento-grid-context";
import { CardContentRenderer } from "./card-content-renderer";
import {
  Maximize2,
  Minimize2,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ModeToggle } from "../mode-switcher";
import { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useScreenSize } from "@/hooks/use-screen-size";

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
  const { screenSize, setScreenSize } = useScreenSize();
  // Force re-render when grid config changes
  const [, forceUpdate] = useState({});

  // Re-render when gridConfig changes to ensure preview updates
  useEffect(() => {
    forceUpdate({});
  }, [gridConfig]);

  // Sort cards by order
  const sortedCards = [...gridConfig.cards].sort((a, b) => a.order - b.order);

  const renderGrid = (isDialog: boolean = false) => {
    const containerClasses = cn(
      "relative transition-all duration-300 ease-in-out mx-auto",
      {
        "w-full": screenSize === "lg",
        "max-w-2xl": screenSize === "md", // Adjusted for better tablet view
        "max-w-sm": screenSize === "sm",
      },
      isDialog ? "w-full max-w-none" : "" // Full width in dialog
    );

    // Get columns and gap based on current preview size
    const currentColumns = gridConfig.columns[screenSize];
    const currentGap = gridConfig.gap[screenSize];

    // Create classes for grid based on the current preview size
    const gridClasses = cn("grid", `gap-${currentGap}`);

    // Responsive grid columns based on preview size
    const gridStyle: React.CSSProperties = {
      gridTemplateColumns: `repeat(${currentColumns}, minmax(0, 1fr))`,
    };

    return (
      <div className={containerClasses}>
        {/* Background Grid Lines */}
        <div
          className="absolute inset-0 grid pointer-events-none opacity-10"
          style={gridStyle}
        >
          {Array.from({ length: currentColumns }).map((_, i) => (
            <div key={`bg-${i}`} className="bg-primary/20 rounded-sm"></div>
          ))}
        </div>

        {/* Actual Content Grid */}
        <div className={gridClasses} style={gridStyle}>
          {sortedCards.map((card) => {
            // Get the current span based on preview size for display purposes
            const currentColSpan = Number(card.colSpan[screenSize] || 1);
            const currentRowSpan = Number(card.rowSpan[screenSize] || 1);

            console.log(
              `Rendering card ${card.id} with col: ${currentColSpan}, row: ${currentRowSpan}`
            );

            // For the preview, dynamically generate grid classes
            const gridItemStyle: React.CSSProperties = {
              gridColumn: `span ${currentColSpan} / span ${currentColSpan}`,
              gridRow: `span ${currentRowSpan} / span ${currentRowSpan}`,
              height: card.style.equalHeight ? "100%" : "auto",
            };

            return (
              <div
                key={card.id}
                className={cn(
                  "transition-all duration-200",
                  selectedCardId === card.id &&
                    !isFullscreenPreview &&
                    !isDialog
                    ? "ring-2 ring-primary"
                    : ""
                )}
                style={gridItemStyle}
                onClick={() =>
                  !isFullscreenPreview &&
                  !isDialog &&
                  setSelectedCardId(card.id)
                }
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
                    {!isFullscreenPreview && !isDialog && (
                      <div className="absolute top-1 right-1 bg-primary/10 text-[10px] px-1.5 py-0.5 rounded-full z-10">
                        {currentColSpan} × {currentRowSpan} (
                        {screenSize.toUpperCase()})
                      </div>
                    )}
                    <CardContentRenderer card={card} />
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className={cn(className, "bg-transparent overflow-hidden")}>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-xl font-bold">Preview</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <ToggleGroup
                type="single"
                value={screenSize}
                onValueChange={(value: "sm" | "md" | "lg") => {
                  if (value) setScreenSize(value);
                }}
                aria-label="Preview Size"
                className="h-9"
              >
                <ToggleGroupItem
                  value="sm"
                  aria-label="Mobile Preview"
                  size="sm"
                >
                  <Smartphone className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="md"
                  aria-label="Tablet Preview"
                  size="sm"
                >
                  <Tablet className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="lg"
                  aria-label="Desktop Preview"
                  size="sm"
                >
                  <Monitor className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              <div className="text-xs text-muted-foreground hidden md:block">
                {!isFullscreenPreview && "Click card to edit"}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={toggleFullscreenPreview}
              >
                <Maximize2 className="h-4 w-4" />
                <span className="sr-only">Fullscreen Preview</span>
              </Button>
              <ModeToggle />
            </div>
          </div>
          <div className="relative border rounded-md p-4 bg-muted/20">
            {renderGrid()}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isFullscreenPreview} onOpenChange={toggleFullscreenPreview}>
        <DialogContent className="max-w-[95vw] w-[95vw] max-h-[90vh] h-[90vh] overflow-auto p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">
              Fullscreen Preview
            </h2>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreenPreview}
            >
              <Minimize2 className="h-4 w-4" />
              <span className="sr-only">Exit Fullscreen</span>
            </Button>
          </div>
          {renderGrid(true)}
        </DialogContent>
      </Dialog>
    </>
  );
}
