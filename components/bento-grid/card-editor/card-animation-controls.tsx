"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBentoGrid } from "../bento-grid-context";
import { AnimationType, BentoCard } from "@/types";

export function CardAnimationControls({ card }: { card: BentoCard }) {
  const { updateCardStyle } = useBentoGrid();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Animation Type</Label>
        <Select
          value={card.style.animation}
          onValueChange={(value: AnimationType) =>
            updateCardStyle(card.id, { animation: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="fade-in">Fade In</SelectItem>
            <SelectItem value="slide-up">Slide Up</SelectItem>
            <SelectItem value="slide-down">Slide Down</SelectItem>
            <SelectItem value="slide-left">Slide Left</SelectItem>
            <SelectItem value="slide-right">Slide Right</SelectItem>
            <SelectItem value="scale-up">Scale Up</SelectItem>
            <SelectItem value="scale-down">Scale Down</SelectItem>
            <SelectItem value="bounce">Bounce</SelectItem>
            <SelectItem value="pulse">Pulse</SelectItem>
            <SelectItem value="spin">Spin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {card.style.animation !== "none" && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>
                Duration: {card.style.animationDuration.toFixed(1)}s
              </Label>
            </div>
            <Slider
              value={[card.style.animationDuration]}
              min={0.1}
              max={2}
              step={0.1}
              onValueChange={([value]) =>
                updateCardStyle(card.id, { animationDuration: value })
              }
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Delay: {card.style.animationDelay.toFixed(1)}s</Label>
            </div>
            <Slider
              value={[card.style.animationDelay]}
              min={0}
              max={2}
              step={0.1}
              onValueChange={([value]) =>
                updateCardStyle(card.id, { animationDelay: value })
              }
            />
          </div>

          <div className="mt-2">
            <p className="text-xs text-muted-foreground">
              Animation will be applied when the card is rendered. You can
              preview by toggling between tabs.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
