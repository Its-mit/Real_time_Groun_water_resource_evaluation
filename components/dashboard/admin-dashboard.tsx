"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  BarChart3,
  Users,
  Database,
  Settings,
  Bell,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Cloud,
  Thermometer,
  Droplets,
  Activity,
} from "lucide-react"

interface AdminDashboardProps {
  onBack: () => void
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "sensors" | "reports" | "settings">("overview")

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center">
                    <Users className="h-3 w-3 mr-1" />
                    Active Users
                  </div>
                  <div className="text-xs text-chart-4 flex items-center justify-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% this month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-chart-1">89</div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center">
                    <Activity className="h-3 w-3 mr-1" />
                    DWLR Sensors
                  </div>
                  <div className="text-xs text-chart-4 flex items-center justify-center mt-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    87 Active
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* India Groundwater Status */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-chart-1" />
                    <CardTitle className="text-base">India Groundwater Status</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Live Data
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium">Critical Zones</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-destructive">23%</div>
                      <div className="text-xs text-muted-foreground">256 districts</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Semi-Critical</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-yellow-600">31%</div>
                      <div className="text-xs text-muted-foreground">342 districts</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-chart-4/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-chart-4" />
                      <span className="text-sm font-medium">Safe Zones</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-chart-4">46%</div>
                      <div className="text-xs text-muted-foreground">512 districts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Climate & Duty Data */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Climate & Environmental Data</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-chart-1" />
                        <span className="text-sm">Rainfall</span>
                      </div>
                      <span className="text-sm font-medium">127mm</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-chart-2" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="text-sm font-medium">28°C</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Humidity</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wind Speed</span>
                      <span className="text-sm font-medium">12 km/h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Distribution */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-base">User Distribution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                      <span className="text-sm">Farmers</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">687</span>
                      <div className="text-xs text-muted-foreground">55%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                      <span className="text-sm">Residents</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">423</span>
                      <div className="text-xs text-muted-foreground">34%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                      <span className="text-sm">Industries</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">89</span>
                      <div className="text-xs text-muted-foreground">7%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                      <span className="text-sm">Researchers</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">48</span>
                      <div className="text-xs text-muted-foreground">4%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "users":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Input placeholder="Search users..." className="flex-1" />
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { name: "Rajesh Kumar", type: "Farmer", location: "Punjab", status: "Active" },
                { name: "Priya Sharma", type: "Resident", location: "Delhi", status: "Active" },
                { name: "Tech Industries Ltd", type: "Industry", location: "Mumbai", status: "Pending" },
                { name: "Dr. Amit Singh", type: "Researcher", location: "Bangalore", status: "Active" },
              ].map((user, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.type} • {user.location}
                        </div>
                      </div>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"} className="text-xs">
                        {user.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "sensors":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-chart-4">87</div>
                  <div className="text-xs text-muted-foreground">Active Sensors</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-destructive">2</div>
                  <div className="text-xs text-muted-foreground">Offline Sensors</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "DWLR-001",
                  location: "Punjab Sector 12",
                  status: "Active",
                  battery: "87%",
                  lastReading: "2 min ago",
                },
                {
                  id: "DWLR-002",
                  location: "Delhi Ward 5",
                  status: "Active",
                  battery: "92%",
                  lastReading: "1 min ago",
                },
                {
                  id: "DWLR-003",
                  location: "Mumbai Zone A",
                  status: "Offline",
                  battery: "12%",
                  lastReading: "2 hours ago",
                },
              ].map((sensor, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">{sensor.id}</div>
                      <Badge variant={sensor.status === "Active" ? "default" : "destructive"} className="text-xs">
                        {sensor.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{sensor.location}</div>
                    <div className="flex justify-between text-xs">
                      <span>Battery: {sensor.battery}</span>
                      <span>Last: {sensor.lastReading}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "reports":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">System Reports</h3>
            <div className="space-y-3">
              {[
                { title: "Monthly Water Level Report", date: "Dec 2024", status: "Ready" },
                { title: "User Activity Summary", date: "Dec 2024", status: "Generating" },
                { title: "Sensor Performance Report", date: "Nov 2024", status: "Ready" },
              ].map((report, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{report.title}</div>
                        <div className="text-xs text-muted-foreground">{report.date}</div>
                      </div>
                      <Badge variant={report.status === "Ready" ? "default" : "secondary"} className="text-xs">
                        {report.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">System Settings</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Critical Level Alerts</span>
                      <Badge className="bg-chart-4 text-white">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily Reports</span>
                      <Badge className="bg-chart-4 text-white">Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Data Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Export All Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Backup Database
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground ml-2">Admin Dashboard</h1>
        </div>
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-md">
        <div className="p-6 pb-20">{renderTabContent()}</div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="container mx-auto max-w-md">
            <div className="flex items-center justify-around py-2">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("overview")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs">Overview</span>
              </Button>
              <Button
                variant={activeTab === "users" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("users")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Users className="h-4 w-4" />
                <span className="text-xs">Users</span>
              </Button>
              <Button
                variant={activeTab === "sensors" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("sensors")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Database className="h-4 w-4" />
                <span className="text-xs">Sensors</span>
              </Button>
              <Button
                variant={activeTab === "reports" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("reports")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs">Reports</span>
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("settings")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Settings className="h-4 w-4" />
                <span className="text-xs">Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
