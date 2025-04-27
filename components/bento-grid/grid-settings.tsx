"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBentoGrid } from "./bento-grid-context";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { ResponsiveConfig } from "@/types";
import { useScreenSize } from "@/hooks/use-screen-size";

export function GridSettings() {
  const { gridConfig, updateGridColumns, updateGridGap } = useBentoGrid();
  const { screenSize, setScreenSize } = useScreenSize();

  const handleColumnChange = (
    screenSize: keyof ResponsiveConfig,
    value: number[]
  ) => {
    updateGridColumns(screenSize, value[0]);
  };

  const handleGapChange = (
    screenSize: keyof ResponsiveConfig,
    value: number[]
  ) => {
    updateGridGap(screenSize, value[0]);
  };

  const handleScreenSizeChange = (value: string) => {
    if (value === "sm" || value === "md" || value === "lg") {
      setScreenSize(value);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Grid Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={screenSize}
          onValueChange={handleScreenSizeChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="sm" className="flex items-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile</span>
            </TabsTrigger>
            <TabsTrigger value="md" className="flex items-center gap-1.5">
              <Tablet className="h-3.5 w-3.5" />
              <span>Tablet</span>
            </TabsTrigger>
            <TabsTrigger value="lg" className="flex items-center gap-1.5">
              <Monitor className="h-3.5 w-3.5" />
              <span>Desktop</span>
            </TabsTrigger>
          </TabsList>

          {(["sm", "md", "lg"] as (keyof ResponsiveConfig)[]).map((size) => (
            <TabsContent key={size} value={size} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`columns-${size}`}>
                      Columns: {gridConfig.columns[size].toString()}
                    </Label>
                  </div>
                  <Slider
                    id={`columns-${size}`}
                    defaultValue={[gridConfig.columns[size]]}
                    min={1}
                    max={12}
                    step={1}
                    onValueChange={(value) => handleColumnChange(size, value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`gap-${size}`}>
                      Gap: {gridConfig.gap[size].toString()}
                    </Label>
                  </div>
                  <Slider
                    id={`gap-${size}`}
                    defaultValue={[gridConfig.gap[size]]}
                    min={0}
                    max={8}
                    step={1}
                    onValueChange={(value) => handleGapChange(size, value)}
                    className="w-full"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
