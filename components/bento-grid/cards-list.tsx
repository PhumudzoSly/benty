"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Plus,
  Minus,
  Edit,
  GripVertical,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBentoGrid } from "./bento-grid-context";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import type { ResponsiveSpan } from "@/types";
import { useScreenSize } from "@/hooks/use-screen-size";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function CardsList() {
  const {
    gridConfig,
    selectedCardId,
    setSelectedCardId,
    addCard,
    removeCard,
    updateCardSize,
    updateCardName,
    reorderCards,
  } = useBentoGrid();
  const { screenSize, setScreenSize } = useScreenSize();
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
  const [dragOverCardId, setDragOverCardId] = useState<number | null>(null);

  const handleNameChange = (cardId: number, name: string) => {
    updateCardName(cardId, name);
  };

  const startEditing = (cardId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCardId(cardId);
  };

  const stopEditing = () => {
    setEditingCardId(null);
  };

  const handleDragStart = (e: React.DragEvent, cardId: number) => {
    setDraggedCardId(cardId);
    e.dataTransfer.effectAllowed = "move";
    // Required for Firefox
    e.dataTransfer.setData("text/plain", cardId.toString());
  };

  const handleDragOver = (e: React.DragEvent, cardId: number) => {
    e.preventDefault();
    if (draggedCardId === cardId) return;
    setDragOverCardId(cardId);
  };

  const handleDragEnd = () => {
    setDraggedCardId(null);
    setDragOverCardId(null);
  };

  const handleDrop = (e: React.DragEvent, cardId: number) => {
    e.preventDefault();
    if (draggedCardId === null || draggedCardId === cardId) return;

    reorderCards(draggedCardId, cardId);
    setDraggedCardId(null);
    setDragOverCardId(null);
  };

  // Sort cards by order
  const sortedCards = [...gridConfig.cards].sort((a, b) => a.order - b.order);

  const handleSpanChange = (
    cardId: number,
    screenSize: keyof ResponsiveSpan,
    type: "col" | "row",
    delta: number
  ) => {
    console.log("handleSpanChange called with:", {
      cardId,
      screenSize,
      type,
      delta,
    });

    const card = gridConfig.cards.find((c) => c.id === cardId);
    if (!card) {
      console.error("Card not found:", cardId);
      return;
    }

    if (type === "col") {
      // Handle column span update
      const currentColSpan = card.colSpan[screenSize] || 1;
      const newColSpanValue = currentColSpan + delta;
      const maxColumns = gridConfig.columns[screenSize];

      if (newColSpanValue >= 1 && newColSpanValue <= maxColumns) {
        const newColSpan = {
          ...card.colSpan,
          [screenSize]: newColSpanValue,
        };
        console.log("Updating colSpan to:", newColSpan);
        updateCardSize(cardId, newColSpan, card.rowSpan);
      }
    } else {
      // Handle row span update
      const currentRowSpan = card.rowSpan[screenSize] || 1;
      const newRowSpanValue = currentRowSpan + delta;
      const maxRows = 6; // We keep a max of 6 rows

      if (newRowSpanValue >= 1 && newRowSpanValue <= maxRows) {
        const newRowSpan = {
          ...card.rowSpan,
          [screenSize]: newRowSpanValue,
        };
        console.log("Updating rowSpan to:", newRowSpan);
        updateCardSize(cardId, card.colSpan, newRowSpan);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Cards</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addCard}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Card
        </Button>
      </div>
      <div className="space-y-2">
        {sortedCards.map((card) => (
          <div
            key={card.id}
            className={cn(
              "flex justify-between items-center p-2 rounded-md cursor-pointer",
              selectedCardId === card.id ? "bg-muted" : "hover:bg-muted/50",
              dragOverCardId === card.id &&
                "border-2 border-dashed border-primary",
              draggedCardId === card.id && "opacity-50"
            )}
            onClick={() => setSelectedCardId(card.id)}
            draggable
            onDragStart={(e) => handleDragStart(e, card.id)}
            onDragOver={(e) => handleDragOver(e, card.id)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, card.id)}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted-foreground/10 rounded"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>

              {editingCardId === card.id ? (
                <Input
                  value={card.name}
                  onChange={(e) => handleNameChange(card.id, e.target.value)}
                  onBlur={stopEditing}
                  onKeyDown={(e) => e.key === "Enter" && stopEditing()}
                  autoFocus
                  className="h-7 py-1"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <span className="truncate">{card.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-50 hover:opacity-100"
                    onClick={(e) => startEditing(card.id, e)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[200px]">
                {/* Screen Size Toggle */}
                <div className="mb-1">
                  <ToggleGroup
                    type="single"
                    value={screenSize}
                    onValueChange={(value: "sm" | "md" | "lg") => {
                      if (value) setScreenSize(value);
                    }}
                    aria-label="Screen Size"
                    className="grid w-full grid-cols-3 h-7"
                  >
                    <ToggleGroupItem
                      value="sm"
                      aria-label="Mobile Preview"
                      size="sm"
                      className="h-5 text-xs"
                    >
                      <Smartphone className="h-3 w-3 mr-1" />
                      Mob
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="md"
                      aria-label="Tablet Preview"
                      size="sm"
                      className="h-5 text-xs"
                    >
                      <Tablet className="h-3 w-3 mr-1" />
                      Tab
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="lg"
                      aria-label="Desktop Preview"
                      size="sm"
                      className="h-5 text-xs"
                    >
                      <Monitor className="h-3 w-3 mr-1" />
                      Desk
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Column Controls */}
                <div className="flex items-center justify-between text-xs bg-muted-foreground/10 px-1 py-0.5 rounded-md">
                  <Label className="text-xs mr-1">Col:</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpanChange(card.id, screenSize, "col", -1);
                    }}
                    disabled={(card.colSpan[screenSize] || 1) <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-5 text-center">
                    {Number(card.colSpan[screenSize] || 1)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpanChange(card.id, screenSize, "col", 1);
                    }}
                    disabled={
                      Number(card.colSpan[screenSize] || 1) >=
                      Number(gridConfig.columns[screenSize])
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Row Span Controls */}
                <div className="flex items-center justify-between text-xs bg-muted-foreground/10 px-1 py-0.5 rounded-md mt-1">
                  <Label className="text-xs mr-1">Row:</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpanChange(card.id, screenSize, "row", -1);
                    }}
                    disabled={Number(card.rowSpan[screenSize] || 1) <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-5 text-center">
                    {Number(card.rowSpan[screenSize] || 1)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpanChange(card.id, screenSize, "row", 1);
                    }}
                    disabled={Number(card.rowSpan[screenSize] || 1) >= 6}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCard(card.id);
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
