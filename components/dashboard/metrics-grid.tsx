"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Droplets, TrendingUp, AlertTriangle, Users, Gauge, Calendar } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  subtitle?: string
}

function MetricCard({ title, value, icon: Icon, color, subtitle }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricsGridProps {
  userRole: string
}

export function MetricsGrid({ userRole }: MetricsGridProps) {
  const getMetrics = () => {
    switch (userRole) {
      case "farmer":
        return [
          {
            title: "Current Water Level",
            value: "12.5m",
            icon: Droplets,
            color: "text-chart-1",
            subtitle: "Depth to water",
          },
          {
            title: "Irrigation Status",
            value: "Optimal",
            icon: TrendingUp,
            color: "text-chart-4",
            subtitle: "Based on soil moisture",
          },
          {
            title: "Weekly Forecast",
            value: "Stable",
            icon: Calendar,
            color: "text-chart-2",
            subtitle: "ML prediction",
          },
          { title: "Usage Efficiency", value: "87%", icon: Gauge, color: "text-chart-5", subtitle: "This month" },
        ]
      case "resident":
        return [
          {
            title: "Local Water Level",
            value: "11.8m",
            icon: Droplets,
            color: "text-chart-1",
            subtitle: "Neighborhood avg",
          },
          {
            title: "Water Quality Index",
            value: "Good",
            icon: TrendingUp,
            color: "text-chart-4",
            subtitle: "Last tested",
          },
          { title: "Conservation Goal", value: "92%", icon: Gauge, color: "text-chart-2", subtitle: "Monthly target" },
          {
            title: "Community Alerts",
            value: "2",
            icon: AlertTriangle,
            color: "text-chart-3",
            subtitle: "Active notices",
          },
        ]
      case "industry":
        return [
          { title: "Usage Quota", value: "78%", icon: Droplets, color: "text-chart-1", subtitle: "Monthly allocation" },
          {
            title: "Efficiency Score",
            value: "85%",
            icon: TrendingUp,
            color: "text-chart-4",
            subtitle: "Industry average",
          },
          {
            title: "Compliance Status",
            value: "Good",
            icon: AlertTriangle,
            color: "text-chart-4",
            subtitle: "All parameters",
          },
          { title: "Cost Savings", value: "$2.4K", icon: Gauge, color: "text-chart-2", subtitle: "This quarter" },
        ]
      case "researcher":
        return [
          { title: "Data Points", value: "1,247", icon: Droplets, color: "text-chart-1", subtitle: "Last 30 days" },
          {
            title: "Trend Analysis",
            value: "Declining",
            icon: TrendingUp,
            color: "text-chart-3",
            subtitle: "Regional pattern",
          },
          { title: "Research Sites", value: "5", icon: Users, color: "text-chart-5", subtitle: "Active monitoring" },
          { title: "Model Accuracy", value: "94.2%", icon: Gauge, color: "text-chart-4", subtitle: "ML predictions" },
        ]
      case "policymaker":
        return [
          {
            title: "Regional Average",
            value: "10.2m",
            icon: Droplets,
            color: "text-chart-1",
            subtitle: "District-wide",
          },
          {
            title: "Policy Impact",
            value: "Positive",
            icon: TrendingUp,
            color: "text-chart-4",
            subtitle: "Conservation measures",
          },
          { title: "Stakeholders", value: "156", icon: Users, color: "text-chart-5", subtitle: "Registered users" },
          {
            title: "Budget Utilization",
            value: "67%",
            icon: Gauge,
            color: "text-chart-2",
            subtitle: "Current fiscal year",
          },
        ]
      default:
        return []
    }
  }

  const metrics = getMetrics()

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
