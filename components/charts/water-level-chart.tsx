"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock DWLR data for demonstration
const generateMockData = (days = 30) => {
  const data = []
  const baseLevel = 12.5
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Simulate seasonal variation and random fluctuations
    const seasonalVariation = Math.sin((date.getMonth() / 12) * 2 * Math.PI) * 2
    const randomVariation = (Math.random() - 0.5) * 1.5
    const level = baseLevel + seasonalVariation + randomVariation

    data.push({
      date: date.toISOString().split("T")[0],
      level: Math.max(8, Math.min(18, level)), // Keep within realistic bounds
      formattedDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    })
  }

  return data
}

interface WaterLevelChartProps {
  title?: string
  description?: string
  days?: number
}

export function WaterLevelChart({
  title = "Groundwater Level Trend",
  description = "Daily water level measurements from DWLR sensors",
  days = 30,
}: WaterLevelChartProps) {
  const data = generateMockData(days)
  const currentLevel = data[data.length - 1]?.level || 0
  const previousLevel = data[data.length - 2]?.level || 0
  const trend = currentLevel - previousLevel

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <div className="text-right">
            <div className="text-2xl font-bold text-chart-1">{currentLevel.toFixed(1)}m</div>
            <div className={`text-sm ${trend >= 0 ? "text-chart-4" : "text-chart-3"}`}>
              {trend >= 0 ? "↗" : "↘"} {Math.abs(trend).toFixed(2)}m
            </div>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="formattedDate" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={["dataMin - 1", "dataMax + 1"]} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-sm text-chart-1">Water Level: {payload[0].value}m</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="level"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(var(--chart-1))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
