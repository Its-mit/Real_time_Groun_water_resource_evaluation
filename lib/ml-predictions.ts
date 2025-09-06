// ML Prediction Service - Simulates Prophet/LSTM model predictions
export interface PredictionPoint {
  date: string
  predicted: number
  confidence: {
    lower: number
    upper: number
  }
  formattedDate: string
}

export interface MLPrediction {
  horizon: "daily" | "weekly" | "monthly"
  predictions: PredictionPoint[]
  accuracy: number
  model: "Prophet" | "LSTM" | "LightGBM"
}

// Simulate Prophet-like seasonal decomposition
function generateSeasonalComponent(date: Date): number {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  const seasonal = Math.sin((dayOfYear / 365) * 2 * Math.PI) * 1.5 // Annual seasonality
  const weekly = Math.sin((date.getDay() / 7) * 2 * Math.PI) * 0.3 // Weekly pattern
  return seasonal + weekly
}

// Simulate trend component with slight decline (common in groundwater)
function generateTrendComponent(dayOffset: number): number {
  return -0.002 * dayOffset // Slight declining trend
}

// Generate ML predictions using simulated Prophet/LSTM models
export function generateMLPredictions(
  currentLevel: number,
  horizon: "daily" | "weekly" | "monthly",
  userRole: string,
): MLPrediction {
  const predictions: PredictionPoint[] = []
  const today = new Date()

  let days: number
  let model: "Prophet" | "LSTM" | "LightGBM"
  let accuracy: number

  // Configure prediction parameters based on horizon and user role
  switch (horizon) {
    case "daily":
      days = 7
      model = "LSTM"
      accuracy = userRole === "researcher" ? 0.94 : 0.89
      break
    case "weekly":
      days = 28
      model = "Prophet"
      accuracy = userRole === "researcher" ? 0.91 : 0.87
      break
    case "monthly":
      days = 90
      model = "Prophet"
      accuracy = userRole === "researcher" ? 0.88 : 0.83
      break
  }

  for (let i = 1; i <= days; i++) {
    const predictionDate = new Date(today)
    predictionDate.setDate(predictionDate.getDate() + i)

    // Combine trend, seasonal, and noise components
    const trend = generateTrendComponent(i)
    const seasonal = generateSeasonalComponent(predictionDate)
    const noise = (Math.random() - 0.5) * 0.5 // Reduced noise for predictions

    const predicted = currentLevel + trend + seasonal + noise

    // Calculate confidence intervals (wider for longer horizons)
    const confidenceWidth = 0.5 + (i / days) * 1.5
    const confidence = {
      lower: Math.max(0, predicted - confidenceWidth),
      upper: predicted + confidenceWidth,
    }

    predictions.push({
      date: predictionDate.toISOString().split("T")[0],
      predicted: Math.max(0, predicted),
      confidence,
      formattedDate: predictionDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    })
  }

  return {
    horizon,
    predictions,
    accuracy,
    model,
  }
}

// Generate role-specific recommendations based on predictions
export function generateRecommendations(predictions: MLPrediction, userRole: string): string[] {
  const avgPredicted = predictions.predictions.reduce((sum, p) => sum + p.predicted, 0) / predictions.predictions.length
  const trend =
    predictions.predictions[predictions.predictions.length - 1].predicted - predictions.predictions[0].predicted

  const recommendations: string[] = []

  switch (userRole) {
    case "farmer":
      if (trend < -0.5) {
        recommendations.push("Consider reducing irrigation frequency")
        recommendations.push("Switch to drought-resistant crops")
      } else if (avgPredicted > 15) {
        recommendations.push("Optimal conditions for water-intensive crops")
      }
      recommendations.push("Monitor soil moisture levels closely")
      break

    case "resident":
      if (trend < -0.3) {
        recommendations.push("Implement water conservation measures")
        recommendations.push("Check for household water leaks")
      }
      recommendations.push("Consider rainwater harvesting")
      break

    case "industry":
      if (avgPredicted < 10) {
        recommendations.push("Review water usage efficiency")
        recommendations.push("Consider alternative water sources")
      }
      recommendations.push("Optimize production schedules")
      break

    case "researcher":
      recommendations.push(`Model accuracy: ${(predictions.accuracy * 100).toFixed(1)}%`)
      recommendations.push(`Trend analysis: ${trend > 0 ? "Rising" : "Declining"} pattern detected`)
      recommendations.push("Collect additional sensor data for validation")
      break

    case "policymaker":
      if (trend < -0.5) {
        recommendations.push("Consider implementing water restrictions")
        recommendations.push("Review regional water allocation policies")
      }
      recommendations.push("Engage stakeholders in conservation efforts")
      break
  }

  return recommendations
}
