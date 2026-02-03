"use client";
import { BentoGridPreview } from "./bento-grid/bento-grid-preview";
import { CodeOutput } from "./bento-grid/code-output";
import { BentoGridProvider } from "./bento-grid/bento-grid-context";
import { useState } from "react";
import { BentoGridControls } from "./bento-grid/bento-grid-controls";
import { FullscreenPreview } from "./bento-grid/fullscreen-preview";
import { ScreenSizeProvider } from "@/hooks/use-screen-size";
import { GridDebug } from "./bento-grid/grid-debug";
import { Button } from "./ui/button";

export default function BentoGridGenerator() {
  return (
    <ScreenSizeProvider>
      <BentoGridProvider>
        <GridDebug />
        <div id="generator" className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Build your layout
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Customize your bento grid, tweak card styles, and export the code
              when you&apos;re ready to ship.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <BentoGridPreview className="bg-transparent" />
              <CodeOutputToggle />
            </div>
            <div className="space-y-6">
              <BentoGridControls />
            </div>
          </div>
          <FullscreenPreview />
        </div>
      </BentoGridProvider>
    </ScreenSizeProvider>
  );
}

function CodeOutputToggle() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Export</h3>
        <Button onClick={() => setShowCode(!showCode)} size="sm">
          {showCode ? "Hide Code" : "Show Code"}
        </Button>
      </div>
      {showCode && <CodeOutput />}
    </div>
  );
}
