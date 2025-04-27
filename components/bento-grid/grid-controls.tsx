"use client";

import { useBentoGrid } from "./bento-grid-context";
import { GridSettings } from "./grid-settings";

export function GridControls() {
  const { gridConfig } = useBentoGrid();

  return (
    <div className="space-y-6">
      <GridSettings />
    </div>
  );
}
