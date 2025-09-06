"use client"

import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"
import { generateMLPredictions, type MLPrediction } from "@/lib/ml-predictions"

interface PredictionChartProps {
  currentLevel: number
  userRole: string
}

export function PredictionChart({ currentLevel, userRole }: PredictionChartProps) {
  const [selectedHorizon, setSelectedHorizon] = useState<"daily" | "weekly" | "monthly">("weekly")
  const [prediction, setPrediction] = useState<MLPrediction>(() =>
    generateMLPredictions(currentLevel, selectedHorizon, userRole),
  )

  const handleHorizonChange = (horizon: "daily" | "weekly" | "monthly") => {
    setSelectedHorizon(horizon)
    setPrediction(generateMLPredictions(currentLevel, horizon, userRole))
  }

  // Combine historical point with predictions for smooth visualization
  const chartData = [
    {
      date: new Date().toISOString().split("T")[0],
      actual: currentLevel,
      predicted: currentLevel,
      lower: currentLevel,
      upper: currentLevel,
      formattedDate: "Today",
    },
    ...prediction.predictions.map((p) => ({
      date: p.date,
      actual: null,
      predicted: p.predicted,
      lower: p.confidence.lower,
      upper: p.confidence.upper,
      formattedDate: p.formattedDate,
    })),
  ]

  const trend = prediction.predictions[prediction.predictions.length - 1].predicted - currentLevel
  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-secondary" />
              ML Predictions
            </CardTitle>
            <CardDescription>
              {prediction.model} model • {(prediction.accuracy * 100).toFixed(1)}% accuracy
            </CardDescription>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? "text-chart-4" : "text-chart-3"}`}>
              <TrendIcon className="h-4 w-4" />
              {trend >= 0 ? "+" : ""}
              {trend.toFixed(2)}m
            </div>
            <div className="text-xs text-muted-foreground">{selectedHorizon} trend</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly"] as const).map((horizon) => (
            <Button
              key={horizon}
              variant={selectedHorizon === horizon ? "default" : "outline"}
              size="sm"
              onClick={() => handleHorizonChange(horizon)}
              className="capitalize"
            >
              {horizon}
            </Button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <XAxis dataKey="formattedDate" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={["dataMin - 1", "dataMax + 1"]} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="text-sm font-medium">{label}</p>
                      {data.actual && <p className="text-sm text-chart-1">Actual: {data.actual.toFixed(1)}m</p>}
                      {data.predicted && (
                        <>
                          <p className="text-sm text-secondary">Predicted: {data.predicted.toFixed(1)}m</p>
                          <p className="text-xs text-muted-foreground">
                            Range: {data.lower.toFixed(1)}m - {data.upper.toFixed(1)}m
                          </p>
                        </>
                      )}
                    </div>
                  )
                }
                return null
              }}
            />
            {/* Confidence interval area */}
            <Area
              type="monotone"
              dataKey="upper"
              stackId="confidence"
              stroke="none"
              fill="hsl(var(--secondary))"
              fillOpacity={0.1}
            />
            <Area
              type="monotone"
              dataKey="lower"
              stackId="confidence"
              stroke="none"
              fill="hsl(var(--background))"
              fillOpacity={1}
            />
            {/* Actual data line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
              connectNulls={false}
            />
            {/* Prediction line */}
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {prediction.model} Model
          </Badge>
          <Badge variant="outline" className="text-xs">
            {prediction.predictions.length} predictions
          </Badge>
          <Badge variant="outline" className="text-xs">
            {(prediction.accuracy * 100).toFixed(1)}% accuracy
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
