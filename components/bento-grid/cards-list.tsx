"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Plus, Minus, Edit, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBentoGrid } from "./bento-grid-context"
import { Input } from "@/components/ui/input"
import { useState } from "react"

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
  } = useBentoGrid()
  const [editingCardId, setEditingCardId] = useState<number | null>(null)
  const [draggedCardId, setDraggedCardId] = useState<number | null>(null)
  const [dragOverCardId, setDragOverCardId] = useState<number | null>(null)

  const handleNameChange = (cardId: number, name: string) => {
    updateCardName(cardId, name)
  }

  const startEditing = (cardId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingCardId(cardId)
  }

  const stopEditing = () => {
    setEditingCardId(null)
  }

  const handleDragStart = (e: React.DragEvent, cardId: number) => {
    setDraggedCardId(cardId)
    e.dataTransfer.effectAllowed = "move"
    // Required for Firefox
    e.dataTransfer.setData("text/plain", cardId.toString())
  }

  const handleDragOver = (e: React.DragEvent, cardId: number) => {
    e.preventDefault()
    if (draggedCardId === cardId) return
    setDragOverCardId(cardId)
  }

  const handleDragEnd = () => {
    setDraggedCardId(null)
    setDragOverCardId(null)
  }

  const handleDrop = (e: React.DragEvent, cardId: number) => {
    e.preventDefault()
    if (draggedCardId === null || draggedCardId === cardId) return

    reorderCards(draggedCardId, cardId)
    setDraggedCardId(null)
    setDragOverCardId(null)
  }

  // Sort cards by order
  const sortedCards = [...gridConfig.cards].sort((a, b) => a.order - b.order)

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Cards</h3>
        <Button variant="outline" size="sm" onClick={addCard} className="flex items-center gap-1">
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
              dragOverCardId === card.id && "border-2 border-dashed border-primary",
              draggedCardId === card.id && "opacity-50",
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
              <div className="flex items-center text-xs bg-muted-foreground/10 px-2 py-1 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (card.colSpan > 1) {
                      updateCardSize(card.id, card.colSpan - 1, card.rowSpan)
                    }
                  }}
                  disabled={card.colSpan <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-5 text-center">{card.colSpan}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (card.colSpan < gridConfig.columns) {
                      updateCardSize(card.id, card.colSpan + 1, card.rowSpan)
                    }
                  }}
                  disabled={card.colSpan >= gridConfig.columns}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  removeCard(card.id)
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
