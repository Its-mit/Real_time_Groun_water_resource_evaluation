"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, CheckCircle, AlertCircle, Info } from "lucide-react"
import { generateMLPredictions, generateRecommendations } from "@/lib/ml-predictions"

interface AIRecommendationsProps {
  currentLevel: number
  userRole: string
}

export function AIRecommendations({ currentLevel, userRole }: AIRecommendationsProps) {
  const prediction = generateMLPredictions(currentLevel, "weekly", userRole)
  const recommendations = generateRecommendations(prediction, userRole)

  const getRecommendationIcon = (recommendation: string) => {
    if (recommendation.includes("Consider") || recommendation.includes("Review")) {
      return <AlertCircle className="h-4 w-4 text-chart-2" />
    }
    if (recommendation.includes("accuracy") || recommendation.includes("analysis")) {
      return <Info className="h-4 w-4 text-chart-1" />
    }
    return <CheckCircle className="h-4 w-4 text-chart-4" />
  }

  const getRoleTitle = () => {
    switch (userRole) {
      case "farmer":
        return "Agricultural Insights"
      case "resident":
        return "Conservation Recommendations"
      case "industry":
        return "Operational Guidance"
      case "researcher":
        return "Research Analytics"
      case "policymaker":
        return "Policy Recommendations"
      default:
        return "AI Recommendations"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-chart-2" />
          {getRoleTitle()}
        </CardTitle>
        <CardDescription>AI-powered insights based on {prediction.model} predictions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">7-Day Forecast</span>
            <Badge variant="outline" className="text-xs">
              {prediction.model}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Predicted water level: {prediction.predictions[6]?.predicted.toFixed(1)}m (
            {prediction.predictions[6]?.predicted > currentLevel ? "↗" : "↘"}
            {Math.abs(prediction.predictions[6]?.predicted - currentLevel).toFixed(2)}m change)
          </p>
        </div>

        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-card border rounded-lg">
              {getRecommendationIcon(recommendation)}
              <div className="flex-1">
                <p className="text-sm">{recommendation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Model Confidence</span>
            <span className="font-medium">{(prediction.accuracy * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-1">
            <div
              className="bg-chart-4 h-2 rounded-full transition-all duration-300"
              style={{ width: `${prediction.accuracy * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
