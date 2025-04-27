"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useBentoGrid } from "./bento-grid-context"

export function GridControls() {
  const { gridConfig, updateGridConfig } = useBentoGrid()

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Grid Layout</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Columns: {gridConfig.columns}</Label>
          </div>
          <Slider
            value={[gridConfig.columns]}
            min={1}
            max={6}
            step={1}
            onValueChange={([value]) => updateGridConfig({ columns: value })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Gap: {gridConfig.gap}</Label>
          </div>
          <Slider
            value={[gridConfig.gap]}
            min={0}
            max={8}
            step={1}
            onValueChange={([value]) => updateGridConfig({ gap: value })}
          />
        </div>
      </div>
    </div>
  )
}
