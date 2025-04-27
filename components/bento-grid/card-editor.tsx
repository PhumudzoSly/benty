"use client"
import { useBentoGrid } from "./bento-grid-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMemo } from "react"
import { CardBasicInfo } from "./card-editor/card-basic-info"
import { CardSizeControls } from "./card-editor/card-size-controls"
import { CardContentFields } from "./card-editor/card-content-fields"
import { CardAppearanceControls } from "./card-editor/card-appearance-controls"
import { CardAnimationControls } from "./card-editor/card-animation-controls"
import { CardHoverControls } from "./card-editor/card-hover-controls"

export function CardEditor() {
  const { gridConfig, selectedCardId } = useBentoGrid()

  const selectedCard = useMemo(() => {
    return selectedCardId ? gridConfig.cards.find((card) => card.id === selectedCardId) : null
  }, [selectedCardId, gridConfig.cards])

  if (!selectedCard) return null

  return (
    <div className="space-y-6">
      <CardBasicInfo card={selectedCard} />
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
  )
}
