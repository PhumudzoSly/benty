"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBentoGrid, type BentoCard, type HoverEffectType } from "../bento-grid-context"

export function CardHoverControls({ card }: { card: BentoCard }) {
  const { updateCardStyle } = useBentoGrid()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Hover Effect</Label>
        <Select
          value={card.style.hoverEffect}
          onValueChange={(value: HoverEffectType) => updateCardStyle(card.id, { hoverEffect: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="scale">Scale</SelectItem>
            <SelectItem value="lift">Lift</SelectItem>
            <SelectItem value="glow">Glow</SelectItem>
            <SelectItem value="border-glow">Border Glow</SelectItem>
            <SelectItem value="background-shift">Background Shift</SelectItem>
            <SelectItem value="text-shift">Text Color Shift</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {card.style.hoverEffect !== "none" && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Transition Duration: {card.style.hoverTransitionDuration.toFixed(1)}s</Label>
            </div>
            <Slider
              value={[card.style.hoverTransitionDuration]}
              min={0.1}
              max={1}
              step={0.1}
              onValueChange={([value]) => updateCardStyle(card.id, { hoverTransitionDuration: value })}
            />
          </div>

          <div className="mt-2">
            <p className="text-xs text-muted-foreground">
              Hover over the card in the preview to see the effect. The hover effect will be included in the generated
              code.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
