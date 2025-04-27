"use client"

import { useMemo } from "react"

export type BarChartProps = {
  data: Array<{ name: string; value: number }>
  width?: number
  height?: number
  colors?: string[]
  showLabels?: boolean
  showValues?: boolean
  showGrid?: boolean
  className?: string
}

export function BarChart({
  data,
  width = 300,
  height = 200,
  colors = ["hsl(var(--primary))"],
  showLabels = true,
  showValues = true,
  showGrid = true,
  className,
}: BarChartProps) {
  const maxValue = useMemo(() => Math.max(...data.map((item) => item.value)) * 1.1, [data])
  const barWidth = useMemo(() => (width - 60) / data.length - 10, [width, data.length])

  // Calculate grid lines
  const gridLines = useMemo(() => {
    const lines = []
    const step = Math.ceil(maxValue / 5)
    for (let i = 0; i <= 5; i++) {
      lines.push(i * step)
    }
    return lines
  }, [maxValue])

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

      {/* Bars */}
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * (height - 60)
        const x = 50 + index * (barWidth + 10)
        const y = height - 40 - barHeight
        const color = colors[index % colors.length] || colors[0]

        return (
          <g key={`bar-${index}`}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill={color} rx={4} opacity={0.8} />

            {showValues && (
              <text x={x + barWidth / 2} y={y - 5} fontSize={10} textAnchor="middle" fill="currentColor">
                {item.value}
              </text>
            )}

            {showLabels && (
              <text x={x + barWidth / 2} y={height - 20} fontSize={10} textAnchor="middle" fill="currentColor">
                {item.name}
              </text>
            )}
          </g>
        )
      })}

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
