"use client";
import { BentoGridPreview } from "./bento-grid/bento-grid-preview";
import { CodeOutput } from "./bento-grid/code-output";
import { BentoGridProvider } from "./bento-grid/bento-grid-context";
import { useState } from "react";
import { BentoGridControls } from "./bento-grid/bento-grid-controls";
import { FullscreenPreview } from "./bento-grid/fullscreen-preview";
import { ScreenSizeProvider } from "@/hooks/use-screen-size";
import { GridDebug } from "./bento-grid/grid-debug";

export default function BentoGridGenerator() {
  return (
    <ScreenSizeProvider>
      <BentoGridProvider>
        <GridDebug />
        <div id="generator" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BentoGridPreview className="mb-8 bg-transparent" />
              <CodeOutputToggle />
            </div>
            <div>
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
    <div>
      <button
        onClick={() => setShowCode(!showCode)}
        className="mb-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        {showCode ? "Hide Code" : "Show Code"}
      </button>

      {showCode && <CodeOutput />}
    </div>
  );
}
