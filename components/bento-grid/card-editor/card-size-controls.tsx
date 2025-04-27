"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Minus, Plus } from "lucide-react";
import { useBentoGrid } from "../bento-grid-context";
import { BentoCard } from "@/types";

export function CardSizeControls({ card }: { card: BentoCard }) {
  const { gridConfig, updateCardSize, updateCardStyle } = useBentoGrid();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-2">Card Size</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Column Span</Label>
            <div className="flex items-center gap-1 bg-muted p-1 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  if (card.colSpan > 1) {
                    updateCardSize(card.id, card.colSpan - 1, card.rowSpan);
                  }
                }}
                disabled={card.colSpan <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center">{card.colSpan}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  if (card.colSpan < gridConfig.columns) {
                    updateCardSize(card.id, card.colSpan + 1, card.rowSpan);
                  }
                }}
                disabled={card.colSpan >= gridConfig.columns}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Slider
            value={[card.colSpan]}
            min={1}
            max={gridConfig.columns}
            step={1}
            onValueChange={([value]) =>
              updateCardSize(card.id, value, card.rowSpan)
            }
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Row Span</Label>
            <div className="flex items-center gap-1 bg-muted p-1 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  if (card.rowSpan > 1) {
                    updateCardSize(card.id, card.colSpan, card.rowSpan - 1);
                  }
                }}
                disabled={card.rowSpan <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center">{card.rowSpan}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  if (card.rowSpan < 3) {
                    updateCardSize(card.id, card.colSpan, card.rowSpan + 1);
                  }
                }}
                disabled={card.rowSpan >= 3}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Slider
            value={[card.rowSpan]}
            min={1}
            max={3}
            step={1}
            onValueChange={([value]) =>
              updateCardSize(card.id, card.colSpan, value)
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="equal-height">Equal Height</Label>
          <Switch
            id="equal-height"
            checked={card.style.equalHeight}
            onCheckedChange={(checked) =>
              updateCardStyle(card.id, { equalHeight: checked })
            }
          />
        </div>
        <p className="text-xs text-muted-foreground">
          When enabled, all cards in the same row will have the same height.
        </p>
      </div>
    </div>
  );
}
