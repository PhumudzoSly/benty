"use client";
import { useBentoGrid } from "./bento-grid-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";
import { CardBasicInfo } from "./card-editor/card-basic-info";
import { CardSizeControls } from "./card-editor/card-size-controls";
import { CardContentFields } from "./card-editor/card-content-fields";
import { CardAppearanceControls } from "./card-editor/card-appearance-controls";
import { CardAnimationControls } from "./card-editor/card-animation-controls";
import { CardHoverControls } from "./card-editor/card-hover-controls";
import { useScreenSize } from "@/hooks/use-screen-size";
import { Button } from "@/components/ui/button";
import { Smartphone, Tablet, Monitor } from "lucide-react";

export function CardEditor() {
  const { gridConfig, selectedCardId } = useBentoGrid();
  const { screenSize, setScreenSize } = useScreenSize();

  const selectedCard = useMemo(() => {
    return selectedCardId
      ? gridConfig.cards.find((card) => card.id === selectedCardId)
      : null;
  }, [selectedCardId, gridConfig.cards]);

  if (!selectedCard) return null;

  return (
    <div className="space-y-6">
      <CardBasicInfo card={selectedCard} />

      {/* Screen Size Controls */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Preview Screen Size</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={screenSize === "sm" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setScreenSize("sm")}
            aria-label="Mobile Preview"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
          <Button
            variant={screenSize === "md" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setScreenSize("md")}
            aria-label="Tablet Preview"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={screenSize === "lg" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setScreenSize("lg")}
            aria-label="Desktop Preview"
          >
            <Monitor className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardSizeControls card={selectedCard} />

      <Tabs defaultValue="content">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>
          <TabsTrigger value="hover">Hover</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <CardContentFields card={selectedCard} />
        </TabsContent>

        <TabsContent value="appearance">
          <CardAppearanceControls card={selectedCard} />
        </TabsContent>

        <TabsContent value="animation">
          <CardAnimationControls card={selectedCard} />
        </TabsContent>

        <TabsContent value="hover">
          <CardHoverControls card={selectedCard} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
