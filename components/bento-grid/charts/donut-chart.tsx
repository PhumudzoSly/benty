"use client"

import { useMemo } from "react"

export type DonutChartProps = {
  data: Array<{ name: string; value: number; fill?: string }>
  width?: number
  height?: number
  colors?: string[]
  thickness?: number
  showLabels?: boolean
  showLegend?: boolean
  className?: string
}

export function DonutChart({
  data,
  width = 300,
  height = 300,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"],
  thickness = 40,
  showLabels = true,
  showLegend = true,
  className,
}: DonutChartProps) {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data])
  const radius = Math.min(width, height) / 2 - 40
  const innerRadius = radius - thickness
  const centerX = width / 2
  const centerY = height / 2

  // Calculate the segments
  const segments = useMemo(() => {
    let startAngle = 0
    return data.map((item, index) => {
      const percentage = item.value / total
      const angle = percentage * 360
      const endAngle = startAngle + angle

      // Calculate the path
      const startRad = (startAngle - 90) * (Math.PI / 180)
      const endRad = (endAngle - 90) * (Math.PI / 180)

      const x1 = centerX + radius * Math.cos(startRad)
      const y1 = centerY + radius * Math.sin(startRad)
      const x2 = centerX + radius * Math.cos(endRad)
      const y2 = centerY + radius * Math.sin(endRad)

      const x3 = centerX + innerRadius * Math.cos(endRad)
      const y3 = centerY + innerRadius * Math.sin(endRad)
      const x4 = centerX + innerRadius * Math.cos(startRad)
      const y4 = centerY + innerRadius * Math.sin(startRad)

      // Determine if the arc should be drawn as a large arc
      const largeArcFlag = angle > 180 ? 1 : 0

      // Create the path
      const path = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        "Z",
      ].join(" ")

      // Calculate label position
      const labelRad = (startAngle + angle / 2 - 90) * (Math.PI / 180)
      const labelX = centerX + ((radius + innerRadius) / 2) * Math.cos(labelRad)
      const labelY = centerY + ((radius + innerRadius) / 2) * Math.sin(labelRad)

      // Calculate legend position
      const legendY = 30 + index * 20

      const fill = item.fill || colors[index % colors.length]

      const result = {
        path,
        percentage,
        fill,
        labelX,
        labelY,
        legendY,
        name: item.name,
        value: item.value,
      }

      startAngle = endAngle
      return result
    })
  }, [data, total, radius, innerRadius, centerX, centerY, colors])

  return (
    <svg width={width} height={height} className={className} viewBox={`0 0 ${width} ${height}`}>
      {/* Donut segments */}
      {segments.map((segment, index) => (
        <path key={`segment-${index}`} d={segment.path} fill={segment.fill} stroke="white" strokeWidth={1} />
      ))}

      {/* Center text */}
      <text x={centerX} y={centerY} fontSize={16} textAnchor="middle" dominantBaseline="middle" fill="currentColor">
        {total}
      </text>

      {/* Labels */}
      {showLabels &&
        segments.map((segment, index) => {
          // Only show label if segment is large enough
          if (segment.percentage < 0.05) return null

          return (
            <text
              key={`label-${index}`}
              x={segment.labelX}
              y={segment.labelY}
              fontSize={10}
              textAnchor="middle"
              fill="white"
              fontWeight="bold"
            >
              {Math.round(segment.percentage * 100)}%
            </text>
          )
        })}

      {/* Legend */}
      {showLegend && (
        <g transform={`translate(${width - 80}, 20)`}>
          {segments.map((segment, index) => (
            <g key={`legend-${index}`} transform={`translate(0, ${index * 20})`}>
              <rect width={12} height={12} fill={segment.fill} />
              <text x={20} y={10} fontSize={10} fill="currentColor">
                {segment.name}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  )
}
