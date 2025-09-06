"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Activity, Battery, Wifi, AlertCircle, CheckCircle, Search } from "lucide-react"

interface DWLRSensor {
  id: string
  location: string
  coordinates: { lat: number; lng: number }
  status: "active" | "inactive" | "maintenance" | "error"
  batteryLevel: number
  signalStrength: number
  lastReading: {
    timestamp: string
    waterLevel: number
    temperature: number
  }
  installDate: string
  nextMaintenance: string
}

export default function DWLRSensors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [sensors] = useState<DWLRSensor[]>([
    {
      id: "DWLR-MH-001",
      location: "Mumbai Central",
      coordinates: { lat: 19.0176, lng: 72.8562 },
      status: "active",
      batteryLevel: 85,
      signalStrength: 92,
      lastReading: {
        timestamp: "2024-01-07T10:30:00Z",
        waterLevel: 12.5,
        temperature: 28.5,
      },
      installDate: "2023-06-15",
      nextMaintenance: "2024-02-15",
    },
    {
      id: "DWLR-MH-002",
      location: "Andheri West",
      coordinates: { lat: 19.1136, lng: 72.8697 },
      status: "active",
      batteryLevel: 72,
      signalStrength: 88,
      lastReading: {
        timestamp: "2024-01-07T10:25:00Z",
        waterLevel: 15.2,
        temperature: 27.8,
      },
      installDate: "2023-07-20",
      nextMaintenance: "2024-03-20",
    },
    {
      id: "DWLR-MH-003",
      location: "Bandra East",
      coordinates: { lat: 19.0596, lng: 72.8656 },
      status: "maintenance",
      batteryLevel: 45,
      signalStrength: 65,
      lastReading: {
        timestamp: "2024-01-06T14:20:00Z",
        waterLevel: 8.9,
        temperature: 29.2,
      },
      installDate: "2023-05-10",
      nextMaintenance: "2024-01-10",
    },
    {
      id: "DWLR-MH-004",
      location: "Powai",
      coordinates: { lat: 19.1197, lng: 72.9056 },
      status: "error",
      batteryLevel: 15,
      signalStrength: 25,
      lastReading: {
        timestamp: "2024-01-05T08:15:00Z",
        waterLevel: 11.3,
        temperature: 30.1,
      },
      installDate: "2023-08-05",
      nextMaintenance: "2024-04-05",
    },
    {
      id: "DWLR-MH-005",
      location: "Thane",
      coordinates: { lat: 19.2183, lng: 72.9781 },
      status: "active",
      batteryLevel: 91,
      signalStrength: 95,
      lastReading: {
        timestamp: "2024-01-07T10:35:00Z",
        waterLevel: 18.7,
        temperature: 26.9,
      },
      installDate: "2023-09-12",
      nextMaintenance: "2024-05-12",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "maintenance":
        return <Activity className="w-4 h-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getBatteryColor = (level: number) => {
    if (level > 60) return "text-green-600"
    if (level > 30) return "text-yellow-600"
    return "text-red-600"
  }

  const getSignalColor = (strength: number) => {
    if (strength > 70) return "text-green-600"
    if (strength > 40) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredSensors = sensors.filter((sensor) => {
    const matchesSearch =
      sensor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sensor.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    active: sensors.filter((s) => s.status === "active").length,
    maintenance: sensors.filter((s) => s.status === "maintenance").length,
    error: sensors.filter((s) => s.status === "error").length,
    total: sensors.length,
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{statusCounts.total}</p>
              <p className="text-sm text-muted-foreground">Total Sensors</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.maintenance}</p>
              <p className="text-sm text-muted-foreground">Maintenance</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{statusCounts.error}</p>
              <p className="text-sm text-muted-foreground">Errors</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search sensors by location or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === "maintenance" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("maintenance")}
          >
            Maintenance
          </Button>
          <Button
            variant={statusFilter === "error" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("error")}
          >
            Error
          </Button>
        </div>
      </div>

      {/* Sensors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSensors.map((sensor) => (
          <Card key={sensor.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{sensor.id}</CardTitle>
                <Badge className={getStatusColor(sensor.status)}>
                  {getStatusIcon(sensor.status)}
                  <span className="ml-1 capitalize">{sensor.status}</span>
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {sensor.location}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Latest Reading */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium mb-2">Latest Reading</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Water Level</p>
                    <p className="font-medium">{sensor.lastReading.waterLevel}m</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Temperature</p>
                    <p className="font-medium">{sensor.lastReading.temperature}°C</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(sensor.lastReading.timestamp).toLocaleString()}
                </p>
              </div>

              {/* System Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Battery className={`w-4 h-4 ${getBatteryColor(sensor.batteryLevel)}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">Battery</p>
                    <p className={`text-sm font-medium ${getBatteryColor(sensor.batteryLevel)}`}>
                      {sensor.batteryLevel}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className={`w-4 h-4 ${getSignalColor(sensor.signalStrength)}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">Signal</p>
                    <p className={`text-sm font-medium ${getSignalColor(sensor.signalStrength)}`}>
                      {sensor.signalStrength}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Maintenance Info */}
              <div className="text-xs text-muted-foreground">
                <p>Installed: {new Date(sensor.installDate).toLocaleDateString()}</p>
                <p>Next Maintenance: {new Date(sensor.nextMaintenance).toLocaleDateString()}</p>
              </div>

              {/* Action Button */}
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSensors.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No sensors found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
