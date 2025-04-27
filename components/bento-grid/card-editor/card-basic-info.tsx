"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBentoGrid } from "../bento-grid-context";
import { BentoCard } from "@/types";

export function CardBasicInfo({ card }: { card: BentoCard }) {
  const { updateCardName } = useBentoGrid();

  return (
    <div className="space-y-2">
      <Label htmlFor="card-name">Card Name</Label>
      <Input
        id="card-name"
        value={card.name}
        onChange={(e) => updateCardName(card.id, e.target.value)}
        placeholder="Enter card name"
      />
      <p className="text-xs text-muted-foreground">
        This name is used for identification in the editor and code comments.
      </p>
    </div>
  );
}
