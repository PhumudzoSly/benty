"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBentoGrid } from "./bento-grid-context"
import { GridControls } from "./grid-controls"
import { CardsList } from "./cards-list"
import { CardEditor } from "./card-editor"
import { AnimationControls } from "./animation-controls"

export function BentoGridControls() {
  const { selectedCardId } = useBentoGrid()

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <Tabs defaultValue="grid">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="card" disabled={!selectedCardId}>
              Card
            </TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="space-y-6">
              <GridControls />
              <CardsList />
            </div>
          </TabsContent>

          <TabsContent value="card">
            <CardEditor />
          </TabsContent>

          <TabsContent value="animations">
            <AnimationControls />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
