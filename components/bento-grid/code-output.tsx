"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Code, FileCode } from "lucide-react"
import { useBentoGrid } from "./bento-grid-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function CodeOutput() {
  const { copied, copyToClipboard, generateCode, gridConfig, toggleRechartsForExport } = useBentoGrid()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Generated Code</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="recharts-toggle"
                checked={gridConfig.useRechartsForExport}
                onCheckedChange={toggleRechartsForExport}
              />
              <Label htmlFor="recharts-toggle" className="text-sm">
                Use Recharts
              </Label>
            </div>
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-1">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
        <div className="bg-muted p-4 rounded-md overflow-hidden">
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <FileCode className="h-4 w-4" />
            <span>bento-grid.tsx</span>
          </div>
          <pre className="overflow-x-auto text-sm">
            <code>{generateCode()}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
