"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const mockUsageData = [
  { category: "Agriculture", usage: 45, color: "hsl(var(--chart-1))" },
  { category: "Domestic", usage: 25, color: "hsl(var(--chart-2))" },
  { category: "Industrial", usage: 20, color: "hsl(var(--chart-3))" },
  { category: "Commercial", usage: 10, color: "hsl(var(--chart-4))" },
]

interface UsageChartProps {
  userRole?: string
}

export function UsageChart({ userRole }: UsageChartProps) {
  const getTitle = () => {
    switch (userRole) {
      case "farmer":
        return "Agricultural Water Usage"
      case "industry":
        return "Industrial Water Consumption"
      case "policymaker":
        return "Regional Water Distribution"
      default:
        return "Water Usage by Sector"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>Current month distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockUsageData}>
            <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-sm">Usage: {payload[0].value}%</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="usage" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
