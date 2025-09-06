"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lightbulb,
  Building,
  Sprout,
  Factory,
  Droplets,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Target,
  Zap,
  Leaf,
  ThermometerSun,
} from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  category: "household" | "farmer" | "industry"
  priority: "high" | "medium" | "low"
  impact: number // percentage
  difficulty: "easy" | "medium" | "hard"
  timeframe: string
  waterSaving: string
  implemented: boolean
  tags: string[]
}

interface SmartRecommendationsProps {
  userType: "household" | "farmer" | "industry"
  waterLevel: number
  location: string
  season: "summer" | "monsoon" | "winter"
}

export default function SmartRecommendations({
  userType = "household",
  waterLevel = 12.5,
  location = "Mumbai",
  season = "summer",
}: SmartRecommendationsProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "household" | "farmer" | "industry">("all")
  const [implementedCount, setImplementedCount] = useState(0)

  const [recommendations] = useState<Recommendation[]>([
    // Household Recommendations
    {
      id: "h1",
      title: "Install Low-Flow Showerheads",
      description: "Replace standard showerheads with low-flow models to reduce water consumption by up to 40%",
      category: "household",
      priority: "high",
      impact: 40,
      difficulty: "easy",
      timeframe: "1 day",
      waterSaving: "150L/day",
      implemented: false,
      tags: ["bathroom", "fixtures", "immediate"],
    },
    {
      id: "h2",
      title: "Fix Water Leaks Immediately",
      description: "A single dripping tap can waste over 15L per day. Check and repair all leaks promptly",
      category: "household",
      priority: "high",
      impact: 35,
      difficulty: "easy",
      timeframe: "2 hours",
      waterSaving: "200L/day",
      implemented: false,
      tags: ["maintenance", "urgent", "cost-effective"],
    },
    {
      id: "h3",
      title: "Collect Rainwater",
      description: "Set up a simple rainwater harvesting system for garden irrigation and cleaning",
      category: "household",
      priority: "medium",
      impact: 25,
      difficulty: "medium",
      timeframe: "1 week",
      waterSaving: "500L/month",
      implemented: false,
      tags: ["harvesting", "sustainable", "garden"],
    },
    {
      id: "h4",
      title: "Use Greywater System",
      description: "Reuse water from washing machines and sinks for toilet flushing and gardening",
      category: "household",
      priority: "medium",
      impact: 30,
      difficulty: "hard",
      timeframe: "2 weeks",
      waterSaving: "300L/day",
      implemented: false,
      tags: ["recycling", "plumbing", "advanced"],
    },

    // Farmer Recommendations
    {
      id: "f1",
      title: "Implement Drip Irrigation",
      description: "Switch to drip irrigation to reduce water usage by 30-50% while maintaining crop yield",
      category: "farmer",
      priority: "high",
      impact: 45,
      difficulty: "medium",
      timeframe: "2 weeks",
      waterSaving: "2000L/day",
      implemented: false,
      tags: ["irrigation", "efficiency", "technology"],
    },
    {
      id: "f2",
      title: "Plant Drought-Resistant Crops",
      description: "Choose crop varieties that require less water and are suitable for your climate zone",
      category: "farmer",
      priority: "high",
      impact: 40,
      difficulty: "easy",
      timeframe: "Next season",
      waterSaving: "1500L/day",
      implemented: false,
      tags: ["crops", "adaptation", "climate"],
    },
    {
      id: "f3",
      title: "Mulching and Soil Cover",
      description: "Use organic mulch to reduce evaporation and maintain soil moisture longer",
      category: "farmer",
      priority: "medium",
      impact: 25,
      difficulty: "easy",
      timeframe: "3 days",
      waterSaving: "800L/day",
      implemented: false,
      tags: ["soil", "organic", "conservation"],
    },
    {
      id: "f4",
      title: "Smart Irrigation Scheduling",
      description: "Water crops during early morning or late evening to minimize evaporation losses",
      category: "farmer",
      priority: "medium",
      impact: 20,
      difficulty: "easy",
      timeframe: "Immediate",
      waterSaving: "600L/day",
      implemented: false,
      tags: ["timing", "scheduling", "efficiency"],
    },

    // Industry Recommendations
    {
      id: "i1",
      title: "Install Water Recycling System",
      description: "Implement closed-loop water recycling to reuse process water multiple times",
      category: "industry",
      priority: "high",
      impact: 60,
      difficulty: "hard",
      timeframe: "1 month",
      waterSaving: "5000L/day",
      implemented: false,
      tags: ["recycling", "process", "investment"],
    },
    {
      id: "i2",
      title: "Real-time Usage Monitoring",
      description: "Deploy IoT sensors to monitor water usage patterns and detect inefficiencies",
      category: "industry",
      priority: "high",
      impact: 35,
      difficulty: "medium",
      timeframe: "2 weeks",
      waterSaving: "2000L/day",
      implemented: false,
      tags: ["monitoring", "iot", "analytics"],
    },
    {
      id: "i3",
      title: "Optimize Cooling Systems",
      description: "Upgrade to air-cooled systems or implement cooling tower water treatment",
      category: "industry",
      priority: "medium",
      impact: 40,
      difficulty: "hard",
      timeframe: "6 weeks",
      waterSaving: "3000L/day",
      implemented: false,
      tags: ["cooling", "efficiency", "upgrade"],
    },
    {
      id: "i4",
      title: "Employee Water Conservation Training",
      description: "Train staff on water-saving practices and create awareness programs",
      category: "industry",
      priority: "low",
      impact: 15,
      difficulty: "easy",
      timeframe: "1 week",
      waterSaving: "500L/day",
      implemented: false,
      tags: ["training", "awareness", "culture"],
    },
  ])

  const getFilteredRecommendations = () => {
    if (activeCategory === "all") {
      return recommendations.filter((rec) => rec.category === userType)
    }
    return recommendations.filter((rec) => rec.category === activeCategory)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Zap className="w-4 h-4 text-green-600" />
      case "medium":
        return <Target className="w-4 h-4 text-yellow-600" />
      case "hard":
        return <Star className="w-4 h-4 text-red-600" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "household":
        return <Building className="w-5 h-5" />
      case "farmer":
        return <Sprout className="w-5 h-5" />
      case "industry":
        return <Factory className="w-5 h-5" />
      default:
        return <Lightbulb className="w-5 h-5" />
    }
  }

  const getSeasonalTips = () => {
    switch (season) {
      case "summer":
        return [
          "Water plants early morning or late evening",
          "Use shade cloth to reduce evaporation",
          "Check for increased leak rates due to pipe expansion",
        ]
      case "monsoon":
        return [
          "Maximize rainwater collection",
          "Clean gutters and collection systems",
          "Reduce irrigation during heavy rainfall",
        ]
      case "winter":
        return [
          "Insulate pipes to prevent freezing",
          "Adjust irrigation schedules for lower evaporation",
          "Plan water infrastructure improvements",
        ]
      default:
        return []
    }
  }

  const totalPotentialSaving = getFilteredRecommendations().reduce((sum, rec) => sum + rec.impact, 0)

  const implementedRecommendations = getFilteredRecommendations().filter((rec) => rec.implemented)

  const toggleImplementation = (id: string) => {
    const updatedRecs = recommendations.map((rec) => (rec.id === id ? { ...rec, implemented: !rec.implemented } : rec))
    setImplementedCount(updatedRecs.filter((rec) => rec.implemented).length)
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Lightbulb className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold text-primary">{getFilteredRecommendations().length}</div>
            <div className="text-xs text-muted-foreground">Available Tips</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="text-lg font-bold text-green-600">{implementedRecommendations.length}</div>
            <div className="text-xs text-muted-foreground">Implemented</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="text-lg font-bold text-blue-600">{totalPotentialSaving}%</div>
            <div className="text-xs text-muted-foreground">Potential Saving</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Droplets className="w-6 h-6 mx-auto mb-2 text-cyan-600" />
            <div className="text-lg font-bold text-cyan-600">
              {getFilteredRecommendations().reduce((sum, rec) => sum + Number.parseInt(rec.waterSaving), 0)}L
            </div>
            <div className="text-xs text-muted-foreground">Daily Savings</div>
          </CardContent>
        </Card>
      </div>

      {/* Seasonal Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <ThermometerSun className="w-4 h-4 mr-2" />
            {season.charAt(0).toUpperCase() + season.slice(1)} Season Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {getSeasonalTips().map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="household">Household</TabsTrigger>
          <TabsTrigger value="farmer">Farmer</TabsTrigger>
          <TabsTrigger value="industry">Industry</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="space-y-4">
          {/* Recommendations List */}
          <div className="space-y-4">
            {getFilteredRecommendations()
              .sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 }
                return priorityOrder[b.priority] - priorityOrder[a.priority]
              })
              .map((recommendation) => (
                <Card
                  key={recommendation.id}
                  className={`transition-all ${recommendation.implemented ? "bg-green-50 border-green-200" : "hover:shadow-md"}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            recommendation.category === "household"
                              ? "bg-chart-1/10"
                              : recommendation.category === "farmer"
                                ? "bg-chart-2/10"
                                : "bg-chart-3/10"
                          }`}
                        >
                          {getCategoryIcon(recommendation.category)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base flex items-center gap-2">
                            {recommendation.title}
                            {recommendation.implemented && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(recommendation.priority)}>{recommendation.priority}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        {getDifficultyIcon(recommendation.difficulty)}
                        <div>
                          <p className="text-muted-foreground">Difficulty</p>
                          <p className="font-medium capitalize">{recommendation.difficulty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-muted-foreground">Timeframe</p>
                          <p className="font-medium">{recommendation.timeframe}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-cyan-600" />
                        <div>
                          <p className="text-muted-foreground">Water Saving</p>
                          <p className="font-medium">{recommendation.waterSaving}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-muted-foreground">Impact</p>
                          <p className="font-medium">{recommendation.impact}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Impact Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Expected Impact</span>
                        <span>{recommendation.impact}%</span>
                      </div>
                      <Progress value={recommendation.impact} className="h-2" />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {recommendation.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      variant={recommendation.implemented ? "outline" : "default"}
                      className="w-full"
                      onClick={() => toggleImplementation(recommendation.id)}
                    >
                      {recommendation.implemented ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Implemented
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Mark as Implemented
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>

          {getFilteredRecommendations().length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No recommendations available for this category.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Impact Summary */}
      {implementedRecommendations.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center text-green-800">
              <Leaf className="w-4 h-4 mr-2" />
              Your Impact Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {implementedRecommendations.reduce((sum, rec) => sum + Number.parseInt(rec.waterSaving), 0)}L
                </p>
                <p className="text-sm text-green-700">Water Saved Daily</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {implementedRecommendations.reduce((sum, rec) => sum + rec.impact, 0)}%
                </p>
                <p className="text-sm text-green-700">Total Efficiency Gain</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
