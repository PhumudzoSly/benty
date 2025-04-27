"use client"

import { useMemo } from "react"

export type LineChartProps = {
  data: Array<{ name: string; value: number }>
  width?: number
  height?: number
  color?: string
  showLabels?: boolean
  showValues?: boolean
  showGrid?: boolean
  className?: string
}

export function LineChart({
  data,
  width = 300,
  height = 200,
  color = "hsl(var(--primary))",
  showLabels = true,
  showValues = true,
  showGrid = true,
  className,
}: LineChartProps) {
  const maxValue = useMemo(() => Math.max(...data.map((item) => item.value)) * 1.1, [data])

  // Calculate grid lines
  const gridLines = useMemo(() => {
    const lines = []
    const step = Math.ceil(maxValue / 5)
    for (let i = 0; i <= 5; i++) {
      lines.push(i * step)
    }
    return lines
  }, [maxValue])

  // Calculate points
  const points = useMemo(() => {
    const pointWidth = (width - 60) / (data.length - 1)
    return data.map((item, index) => {
      const x = 40 + index * pointWidth
      const y = height - 40 - (item.value / maxValue) * (height - 60)
      return { x, y, name: item.name, value: item.value }
    })
  }, [data, width, height, maxValue])

  // Create path
  const path = useMemo(() => {
    if (points.length < 2) return ""
    return points.map((point, index) => (index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`)).join(" ")
  }, [points])

  // Create area path (for fill)
  const areaPath = useMemo(() => {
    if (points.length < 2) return ""
    return [path, `L ${points[points.length - 1].x} ${height - 40}`, `L ${points[0].x} ${height - 40}`, "Z"].join(" ")
  }, [path, points, height])

  return (
    <svg width={width} height={height} className={className} viewBox={`0 0 ${width} ${height}`}>
      {/* Grid lines */}
      {showGrid &&
        gridLines.map((value, index) => {
          const y = height - 40 - (value / maxValue) * (height - 60)
          return (
            <g key={`grid-${index}`}>
              <line x1={40} y1={y} x2={width - 20} y2={y} stroke="currentColor" strokeOpacity={0.1} strokeWidth={1} />
              {showValues && (
                <text x={35} y={y + 4} fontSize={10} textAnchor="end" fill="currentColor" fillOpacity={0.6}>
                  {value}
                </text>
              )}
            </g>
          )
        })}

      {/* Area fill */}
      <path d={areaPath} fill={color} fillOpacity={0.1} />

      {/* Line */}
      <path d={path} fill="none" stroke={color} strokeWidth={2} />

      {/* Points */}
      {points.map((point, index) => (
        <g key={`point-${index}`}>
          <circle cx={point.x} cy={point.y} r={4} fill={color} />

          {showValues && (
            <text x={point.x} y={point.y - 10} fontSize={10} textAnchor="middle" fill="currentColor">
              {point.value}
            </text>
          )}

          {showLabels && (
            <text x={point.x} y={height - 20} fontSize={10} textAnchor="middle" fill="currentColor">
              {point.name}
            </text>
          )}
        </g>
      ))}

      {/* Axes */}
      <line
        x1={40}
        y1={height - 40}
        x2={width - 20}
        y2={height - 40}
        stroke="currentColor"
        strokeOpacity={0.3}
        strokeWidth={1}
      />
      <line x1={40} y1={20} x2={40} y2={height - 40} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} />
    </svg>
  )
}
