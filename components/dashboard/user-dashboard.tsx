"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { AIChatbot } from "@/components/chat/ai-chatbot"
import WaterLevelMonitor from "@/components/monitoring/water-level-monitor"
import SmartRecommendations from "@/components/recommendations/smart-recommendations"
import {
  Home,
  BarChart3,
  User,
  Droplets,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Plus,
  Send,
  MapPin,
  Users,
  FileText,
  Lightbulb,
  MessageCircle,
  Activity,
} from "lucide-react"

interface UserDashboardProps {
  user: any
  onBack: () => void
}

export function UserDashboard({ user, onBack }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "home" | "general" | "dashboard" | "monitoring" | "recommendations" | "community" | "reports" | "chat"
  >("home")
  const [reportText, setReportText] = useState("")
  const [feedbackText, setFeedbackText] = useState("")

  const renderTabContent = () => {
    switch (activeTab) {
      case "monitoring":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Water Level Monitoring</h2>
              <p className="text-muted-foreground text-sm">Real-time DWLR data and predictions</p>
            </div>
            <WaterLevelMonitor userLocation={user?.location} isAdmin={false} />
          </div>
        )

      case "chat":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">AI Assistant</h2>
              <p className="text-muted-foreground text-sm">Get instant help with groundwater insights</p>
            </div>

            {/* AI Chat Interface */}
            <Card className="h-[500px]">
              <CardContent className="p-0 h-full">
                <AIChatbot user={user} />
              </CardContent>
            </Card>

            {/* FAQ Quick Access */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 border rounded-lg">
                    <div className="text-sm font-medium">How often should I check water levels?</div>
                    <div className="text-xs text-muted-foreground">
                      Daily monitoring recommended for optimal management
                    </div>
                  </div>
                  <div className="p-2 border rounded-lg">
                    <div className="text-sm font-medium">What does "critical level" mean?</div>
                    <div className="text-xs text-muted-foreground">
                      Water level below 15m requires immediate conservation
                    </div>
                  </div>
                  <div className="p-2 border rounded-lg">
                    <div className="text-sm font-medium">How can I improve water efficiency?</div>
                    <div className="text-xs text-muted-foreground">
                      Use drip irrigation, fix leaks, and monitor usage patterns
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "home":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h2>
              <p className="text-muted-foreground text-sm">Your personalized groundwater insights</p>
              <div className="flex items-center justify-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {user?.location}
              </div>
            </div>

            {/* Water Level Status Check */}
            <Card className="border-2 border-chart-4/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center">
                    <Droplets className="h-5 w-5 mr-2 text-primary" />
                    Water Level Status
                  </CardTitle>
                  <Badge className="bg-chart-4 text-white">Safe</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">12.5m</div>
                    <div className="text-sm text-muted-foreground">Below ground level</div>
                  </div>
                  <div className="p-3 bg-chart-4/10 rounded-lg">
                    <div className="flex items-center text-sm text-chart-4 mb-2">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="font-medium">Safe Level Detected</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Water level is within safe range. Continue current usage patterns.
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setActiveTab("monitoring")}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    View Detailed Monitoring
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-chart-1" />
                  <div className="text-lg font-bold text-chart-1">+2.3m</div>
                  <div className="text-xs text-muted-foreground">This Month</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                  <div className="text-lg font-bold text-yellow-600">3</div>
                  <div className="text-xs text-muted-foreground">Active Alerts</div>
                </CardContent>
              </Card>
            </div>

            {/* Personalized Insights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Today's Insights</CardTitle>
                <CardDescription>Tailored for {user?.userType}s in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <div className="text-sm font-medium">Optimal Usage Window</div>
                    <div className="text-xs text-muted-foreground">Best water usage time: 5:00 AM - 7:00 AM today</div>
                  </div>
                  <div className="p-3 bg-chart-1/5 rounded-lg border-l-4 border-chart-1">
                    <div className="text-sm font-medium">Weather Impact</div>
                    <div className="text-xs text-muted-foreground">
                      Expected rainfall this week may improve groundwater levels
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick AI Assistant Access */}
            <Card className="cursor-pointer hover:bg-card/80 transition-colors" onClick={() => setActiveTab("chat")}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Ask AI Assistant</div>
                    <div className="text-xs text-muted-foreground">Get instant answers about your water levels</div>
                  </div>
                  <div className="text-xs text-primary">Chat now →</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "general":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">India's Groundwater Overview</h2>
              <p className="text-muted-foreground text-sm">National groundwater status and insights</p>
            </div>

            {/* National Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">National Groundwater Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Critical Areas</div>
                      <div className="text-xs text-muted-foreground">256 districts</div>
                    </div>
                    <div className="text-lg font-bold text-destructive">23%</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Semi-Critical</div>
                      <div className="text-xs text-muted-foreground">342 districts</div>
                    </div>
                    <div className="text-lg font-bold text-yellow-600">31%</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-chart-4/10 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Safe Areas</div>
                      <div className="text-xs text-muted-foreground">512 districts</div>
                    </div>
                    <div className="text-lg font-bold text-chart-4">46%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Low-level Areas Blog */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Critical Areas Spotlight</CardTitle>
                <CardDescription>Latest updates from low groundwater regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm font-medium mb-1">Rajasthan Water Crisis Update</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      New conservation measures implemented in 15 districts...
                    </div>
                    <div className="text-xs text-primary">Read more →</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm font-medium mb-1">Tamil Nadu Groundwater Recovery</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Monsoon brings relief to coastal districts...
                    </div>
                    <div className="text-xs text-primary">Read more →</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">User Dashboard</h2>
              <p className="text-muted-foreground text-sm">Submit reports and view AI predictions</p>
            </div>

            {/* Submit Report */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Water Level Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe any water level changes, issues, or observations..."
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  className="min-h-20"
                />
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Feedback & Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Share your feedback or suggestions for improvement..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="min-h-20"
                />
                <Button variant="outline" className="w-full bg-transparent">
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            {/* AI Predictions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">AI Predictions & Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-chart-1/10 rounded-lg">
                    <div className="text-sm font-medium">7-Day Forecast</div>
                    <div className="text-xs text-muted-foreground">
                      Water level expected to rise by 0.8m due to predicted rainfall
                    </div>
                  </div>
                  <div className="p-3 bg-chart-2/10 rounded-lg">
                    <div className="text-sm font-medium">Usage Recommendation</div>
                    <div className="text-xs text-muted-foreground">Reduce usage by 15% during peak hours (12-4 PM)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "recommendations":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Smart Recommendations</h2>
              <p className="text-muted-foreground text-sm">AI-powered water conservation tips</p>
            </div>
            <SmartRecommendations
              userType={user?.userType || "household"}
              waterLevel={12.5}
              location={user?.location || "Mumbai"}
              season="summer"
            />
          </div>
        )

      case "community":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Community Hub</h2>
              <p className="text-muted-foreground text-sm">Discussion forum & sharing board</p>
            </div>

            {/* Add Post */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Share with Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Share your water conservation tips, observations, or questions..."
                  className="min-h-20"
                />
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Post to Community
                </Button>
              </CardContent>
            </Card>

            {/* Community Posts */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Farmer Raj</div>
                      <div className="text-xs text-muted-foreground mb-2">2 hours ago</div>
                      <div className="text-sm">
                        Great results with drip irrigation this season! Water usage down 40% with same yield.
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                          👍 12 likes
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                          💬 3 replies
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Priya S.</div>
                      <div className="text-xs text-muted-foreground mb-2">5 hours ago</div>
                      <div className="text-sm">Anyone else noticing water levels improving after the recent rains?</div>
                      <div className="flex items-center space-x-4 mt-2">
                        <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                          👍 8 likes
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                          💬 7 replies
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "reports":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Impact Tracking</h2>
              <p className="text-muted-foreground text-sm">Visualized reports & analytics</p>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Droplets className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold text-primary">2,340L</div>
                  <div className="text-xs text-muted-foreground">Water Saved</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-chart-1" />
                  <div className="text-lg font-bold text-chart-1">15%</div>
                  <div className="text-xs text-muted-foreground">Efficiency Gain</div>
                </CardContent>
              </Card>
            </div>

            {/* Reports */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Monthly Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="text-sm font-medium">December 2024</div>
                      <div className="text-xs text-muted-foreground">Usage & conservation report</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="text-sm font-medium">November 2024</div>
                      <div className="text-xs text-muted-foreground">Impact analysis report</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts History */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Alert History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="flex-1">
                      <div className="text-sm">High usage detected</div>
                      <div className="text-xs text-muted-foreground">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2">
                    <CheckCircle className="h-4 w-4 text-chart-4" />
                    <div className="flex-1">
                      <div className="text-sm">Level returned to normal</div>
                      <div className="text-xs text-muted-foreground">1 week ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-md">
        {/* Content */}
        <div className="p-6 pb-20">{renderTabContent()}</div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="container mx-auto max-w-md">
            <div className="grid grid-cols-8 py-2">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("home")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Home className="h-3 w-3" />
                <span className="text-xs">Home</span>
              </Button>
              <Button
                variant={activeTab === "general" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("general")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <MapPin className="h-3 w-3" />
                <span className="text-xs">General</span>
              </Button>
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("dashboard")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <BarChart3 className="h-3 w-3" />
                <span className="text-xs">Dashboard</span>
              </Button>
              <Button
                variant={activeTab === "monitoring" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("monitoring")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Activity className="h-3 w-3" />
                <span className="text-xs">Monitor</span>
              </Button>
              <Button
                variant={activeTab === "recommendations" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("recommendations")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Lightbulb className="h-3 w-3" />
                <span className="text-xs">Tips</span>
              </Button>
              <Button
                variant={activeTab === "community" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("community")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Users className="h-3 w-3" />
                <span className="text-xs">Community</span>
              </Button>
              <Button
                variant={activeTab === "reports" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("reports")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <FileText className="h-3 w-3" />
                <span className="text-xs">Reports</span>
              </Button>
              <Button
                variant={activeTab === "chat" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("chat")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <MessageCircle className="h-3 w-3" />
                <span className="text-xs">AI Chat</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
