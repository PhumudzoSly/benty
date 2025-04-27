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
import { Switch } from "@/components/ui/switch";
import { useBentoGrid } from "../bento-grid-context";
import { BentoCard } from "@/types";

export function CardAppearanceControls({ card }: { card: BentoCard }) {
  const { updateCardStyle } = useBentoGrid();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Background</Label>
            <Select
              value={card.style.backgroundColor}
              onValueChange={(value) =>
                updateCardStyle(card.id, { backgroundColor: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bg-card">Default</SelectItem>
                <SelectItem value="bg-primary">Primary</SelectItem>
                <SelectItem value="bg-secondary">Secondary</SelectItem>
                <SelectItem value="bg-muted">Muted</SelectItem>
                <SelectItem value="bg-accent">Accent</SelectItem>
                <SelectItem value="bg-black">Black</SelectItem>
                <SelectItem value="bg-white">White</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Text Color</Label>
            <Select
              value={card.style.textColor}
              onValueChange={(value) =>
                updateCardStyle(card.id, { textColor: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text-card-foreground">Default</SelectItem>
                <SelectItem value="text-primary">Primary</SelectItem>
                <SelectItem value="text-secondary">Secondary</SelectItem>
                <SelectItem value="text-muted-foreground">Muted</SelectItem>
                <SelectItem value="text-accent-foreground">Accent</SelectItem>
                <SelectItem value="text-white">White</SelectItem>
                <SelectItem value="text-black">Black</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Border</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="border-toggle">Border</Label>
            <Switch
              id="border-toggle"
              checked={card.style.border}
              onCheckedChange={(checked) =>
                updateCardStyle(card.id, { border: checked })
              }
            />
          </div>

          {card.style.border && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Border Width: {card.style.borderWidth}</Label>
              </div>
              <Slider
                value={[card.style.borderWidth]}
                min={1}
                max={4}
                step={1}
                onValueChange={([value]) =>
                  updateCardStyle(card.id, { borderWidth: value })
                }
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Border Radius</Label>
            <Select
              value={card.style.borderRadius}
              onValueChange={(value: any) =>
                updateCardStyle(card.id, { borderRadius: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Effects</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Shadow</Label>
            <Select
              value={card.style.shadow}
              onValueChange={(value: any) =>
                updateCardStyle(card.id, { shadow: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="glass-toggle">Glassmorphism</Label>
              <Switch
                id="glass-toggle"
                checked={card.style.glassmorphism}
                onCheckedChange={(checked) =>
                  updateCardStyle(card.id, { glassmorphism: checked })
                }
              />
            </div>

            {card.style.glassmorphism && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>
                    Opacity: {card.style.glassmorphismOpacity.toFixed(1)}
                  </Label>
                </div>
                <Slider
                  value={[card.style.glassmorphismOpacity]}
                  min={0.1}
                  max={0.9}
                  step={0.1}
                  onValueChange={([value]) =>
                    updateCardStyle(card.id, { glassmorphismOpacity: value })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
