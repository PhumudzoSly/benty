"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Minus, Plus } from "lucide-react";
import { useBentoGrid } from "../bento-grid-context";
import { BentoCard, ResponsiveSpan } from "@/types";
import { useScreenSize } from "@/hooks/use-screen-size";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Smartphone, Tablet, Monitor } from "lucide-react";

export function CardSizeControls({ card }: { card: BentoCard }) {
  const { gridConfig, updateCardSize, updateCardStyle } = useBentoGrid();
  const { screenSize, setScreenSize } = useScreenSize();

  // Helper to get current span values based on active screen size
  const getActiveColSpan = () => {
    return card.colSpan[screenSize];
  };

  const getActiveRowSpan = () => {
    return card.rowSpan[screenSize];
  };

  const getMaxColumns = () => {
    return gridConfig.columns[screenSize];
  };

  const updateColumnSpan = (value: number) => {
    const newColSpan: ResponsiveSpan = {
      ...card.colSpan,
      [screenSize]: value,
    };
    updateCardSize(card.id, newColSpan, card.rowSpan);
  };

  const updateRowSpan = (value: number) => {
    const newRowSpan: ResponsiveSpan = {
      ...card.rowSpan,
      [screenSize]: value,
    };
    updateCardSize(card.id, card.colSpan, newRowSpan);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-2">Card Size</h3>

      <div className="flex items-center justify-between mb-4">
        <Label className="mr-2">Screen Size:</Label>
        <ToggleGroup
          type="single"
          value={screenSize}
          onValueChange={(value) => {
            if (value) setScreenSize(value as "sm" | "md" | "lg");
          }}
          aria-label="Screen Size"
          className="h-8"
        >
          <ToggleGroupItem value="sm" aria-label="Mobile View" size="sm">
            <Smartphone className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="md" aria-label="Tablet View" size="sm">
            <Tablet className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="lg" aria-label="Desktop View" size="sm">
            <Monitor className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

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
                  const currentSpan = getActiveColSpan();
                  if (currentSpan > 1) {
                    updateColumnSpan(currentSpan - 1);
                  }
                }}
                disabled={getActiveColSpan() <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center">{getActiveColSpan()}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  const currentSpan = getActiveColSpan();
                  if (currentSpan < getMaxColumns()) {
                    updateColumnSpan(currentSpan + 1);
                  }
                }}
                disabled={getActiveColSpan() >= getMaxColumns()}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Slider
            value={[getActiveColSpan()]}
            min={1}
            max={getMaxColumns()}
            step={1}
            onValueChange={([value]) => updateColumnSpan(value)}
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
                  const currentSpan = getActiveRowSpan();
                  if (currentSpan > 1) {
                    updateRowSpan(currentSpan - 1);
                  }
                }}
                disabled={getActiveRowSpan() <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center">{getActiveRowSpan()}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  const currentSpan = getActiveRowSpan();
                  if (currentSpan < 3) {
                    updateRowSpan(currentSpan + 1);
                  }
                }}
                disabled={getActiveRowSpan() >= 3}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Slider
            value={[getActiveRowSpan()]}
            min={1}
            max={3}
            step={1}
            onValueChange={([value]) => updateRowSpan(value)}
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
