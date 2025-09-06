"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown, AlertTriangle, MapPin, Calendar, Activity } from "lucide-react"

interface WaterLevelData {
  timestamp: string
  level: number
  status: "safe" | "warning" | "critical"
  location: string
  dwlrId: string
}

interface WaterLevelMonitorProps {
  userLocation?: string
  isAdmin?: boolean
}

export default function WaterLevelMonitor({
  userLocation = "Mumbai, Maharashtra",
  isAdmin = false,
}: WaterLevelMonitorProps) {
  const [currentData, setCurrentData] = useState<WaterLevelData>({
    timestamp: new Date().toISOString(),
    level: 12.5,
    status: "warning",
    location: userLocation,
    dwlrId: "DWLR-MH-001",
  })

  const [historicalData, setHistoricalData] = useState([
    { date: "2024-01-01", level: 15.2, rainfall: 45, temperature: 28 },
    { date: "2024-01-02", level: 14.8, rainfall: 32, temperature: 29 },
    { date: "2024-01-03", level: 14.1, rainfall: 28, temperature: 31 },
    { date: "2024-01-04", level: 13.5, rainfall: 15, temperature: 32 },
    { date: "2024-01-05", level: 12.9, rainfall: 8, temperature: 33 },
    { date: "2024-01-06", level: 12.5, rainfall: 5, temperature: 34 },
    { date: "2024-01-07", level: 12.1, rainfall: 2, temperature: 35 },
  ])

  const [predictions, setPredictions] = useState([
    { date: "2024-01-08", predicted: 11.8, confidence: 85 },
    { date: "2024-01-09", predicted: 11.5, confidence: 82 },
    { date: "2024-01-10", predicted: 11.2, confidence: 78 },
    { date: "2024-01-11", predicted: 10.9, confidence: 75 },
    { date: "2024-01-12", predicted: 10.6, confidence: 72 },
    { date: "2024-01-13", predicted: 10.3, confidence: 68 },
    { date: "2024-01-14", predicted: 10.1, confidence: 65 },
  ])

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Water level approaching critical threshold",
      timestamp: "2 hours ago",
      location: "Mumbai Central",
    },
    {
      id: 2,
      type: "info",
      message: "Seasonal decline detected in groundwater levels",
      timestamp: "1 day ago",
      location: "Andheri West",
    },
    {
      id: 3,
      type: "critical",
      message: "Critical water level detected in nearby area",
      timestamp: "3 days ago",
      location: "Bandra East",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (level: number) => {
    if (level > 15) return { status: "safe", text: "Safe Level" }
    if (level > 10) return { status: "warning", text: "Moderate Risk" }
    return { status: "critical", text: "Critical Level" }
  }

  const statusInfo = getStatusText(currentData.level)

  return (
    <div className="space-y-6">
      {/* Current Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Level</p>
                <p className="text-2xl font-bold">{currentData.level}m</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(statusInfo.status)}`} />
            </div>
            <div className="mt-4">
              <Badge
                variant={
                  statusInfo.status === "safe"
                    ? "default"
                    : statusInfo.status === "warning"
                      ? "secondary"
                      : "destructive"
                }
              >
                {statusInfo.text}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">24h Change</p>
                <p className="text-2xl font-bold text-red-600">-0.4m</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Declining trend</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">DWLR Status</p>
                <p className="text-sm font-bold text-green-600">Active</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">ID: {currentData.dwlrId}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="text-sm font-bold">{currentData.location}</p>
              </div>
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last updated: 5 min ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Monitoring */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Water Level Trends (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="level" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environmental Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="rainfall"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    stackId="2"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                AI-Powered Predictions (Next 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.slice(0, 4).map((pred, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">{pred.date}</p>
                      <p className="text-lg font-bold">{pred.predicted}m</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <Progress value={pred.confidence} className="w-16 h-2" />
                      <p className="text-xs text-muted-foreground">{pred.confidence}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className={`border-l-4 ${
                  alert.type === "critical"
                    ? "border-l-red-500"
                    : alert.type === "warning"
                      ? "border-l-yellow-500"
                      : "border-l-blue-500"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`w-5 h-5 mt-0.5 ${
                          alert.type === "critical"
                            ? "text-red-500"
                            : alert.type === "warning"
                              ? "text-yellow-500"
                              : "text-blue-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {alert.timestamp}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        alert.type === "critical" ? "destructive" : alert.type === "warning" ? "secondary" : "default"
                      }
                    >
                      {alert.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Depletion Risk</span>
                    <span>High (75%)</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Seasonal Impact</span>
                    <span>Moderate (60%)</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Recovery Potential</span>
                    <span>Low (30%)</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <p className="text-sm">Immediate water conservation measures required</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                    <p className="text-sm">Monitor usage patterns closely</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <p className="text-sm">Consider alternative water sources</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Historical Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">14.2m</p>
                  <p className="text-sm text-muted-foreground">Same period last year</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">16.8m</p>
                  <p className="text-sm text-muted-foreground">5-year average</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">9.1m</p>
                  <p className="text-sm text-muted-foreground">Historical minimum</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
