"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { type AnimationType, type HoverEffectType, useBentoGrid } from "./bento-grid-context"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnimationControls() {
  const { selectedCardId, gridConfig, updateCardStyle, applyAnimationToAll, applyHoverEffectToAll } = useBentoGrid()

  const selectedCard = selectedCardId ? gridConfig.cards.find((card) => card.id === selectedCardId) : null

  const [globalAnimation, setGlobalAnimation] = useState<AnimationType>("fade-in")
  const [globalDuration, setGlobalDuration] = useState(0.5)
  const [globalDelay, setGlobalDelay] = useState(0)

  const [globalHoverEffect, setGlobalHoverEffect] = useState<HoverEffectType>("scale")
  const [globalHoverDuration, setGlobalHoverDuration] = useState(0.3)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="animation">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="animation">Animation</TabsTrigger>
          <TabsTrigger value="hover">Hover Effects</TabsTrigger>
        </TabsList>

        <TabsContent value="animation">
          <div>
            <h3 className="text-lg font-medium mb-4">Card Animations</h3>

            {selectedCard ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Animation Type</Label>
                  <Select
                    value={selectedCard.style.animation}
                    onValueChange={(value: AnimationType) => updateCardStyle(selectedCard.id, { animation: value })}
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

                {selectedCard.style.animation !== "none" && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Duration: {selectedCard.style.animationDuration.toFixed(1)}s</Label>
                      </div>
                      <Slider
                        value={[selectedCard.style.animationDuration]}
                        min={0.1}
                        max={2}
                        step={0.1}
                        onValueChange={([value]) => updateCardStyle(selectedCard.id, { animationDuration: value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Delay: {selectedCard.style.animationDelay.toFixed(1)}s</Label>
                      </div>
                      <Slider
                        value={[selectedCard.style.animationDelay]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={([value]) => updateCardStyle(selectedCard.id, { animationDelay: value })}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a card to edit its animation.</p>
            )}
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-medium mb-4">Apply Animation to All Cards</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Animation Type</Label>
                <Select value={globalAnimation} onValueChange={(value: AnimationType) => setGlobalAnimation(value)}>
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

              {globalAnimation !== "none" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Duration: {globalDuration.toFixed(1)}s</Label>
                    </div>
                    <Slider
                      value={[globalDuration]}
                      min={0.1}
                      max={2}
                      step={0.1}
                      onValueChange={([value]) => setGlobalDuration(value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Delay: {globalDelay.toFixed(1)}s</Label>
                    </div>
                    <Slider
                      value={[globalDelay]}
                      min={0}
                      max={2}
                      step={0.1}
                      onValueChange={([value]) => setGlobalDelay(value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      This will apply the same animation to all cards. You can add staggered delays for a sequence
                      effect.
                    </Label>
                    <Button
                      className="w-full"
                      onClick={() => applyAnimationToAll(globalAnimation, globalDuration, globalDelay)}
                    >
                      Apply to All Cards
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hover">
          <div>
            <h3 className="text-lg font-medium mb-4">Hover Effects</h3>

            {selectedCard ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Hover Effect</Label>
                  <Select
                    value={selectedCard.style.hoverEffect}
                    onValueChange={(value: HoverEffectType) => updateCardStyle(selectedCard.id, { hoverEffect: value })}
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

                {selectedCard.style.hoverEffect !== "none" && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Transition Duration: {selectedCard.style.hoverTransitionDuration.toFixed(1)}s</Label>
                    </div>
                    <Slider
                      value={[selectedCard.style.hoverTransitionDuration]}
                      min={0.1}
                      max={1}
                      step={0.1}
                      onValueChange={([value]) => updateCardStyle(selectedCard.id, { hoverTransitionDuration: value })}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a card to edit its hover effect.</p>
            )}
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-medium mb-4">Apply Hover Effect to All Cards</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Hover Effect</Label>
                <Select
                  value={globalHoverEffect}
                  onValueChange={(value: HoverEffectType) => setGlobalHoverEffect(value)}
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

              {globalHoverEffect !== "none" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Transition Duration: {globalHoverDuration.toFixed(1)}s</Label>
                    </div>
                    <Slider
                      value={[globalHoverDuration]}
                      min={0.1}
                      max={1}
                      step={0.1}
                      onValueChange={([value]) => setGlobalHoverDuration(value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      This will apply the same hover effect to all cards.
                    </Label>
                    <Button
                      className="w-full"
                      onClick={() => applyHoverEffectToAll(globalHoverEffect, globalHoverDuration)}
                    >
                      Apply to All Cards
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
