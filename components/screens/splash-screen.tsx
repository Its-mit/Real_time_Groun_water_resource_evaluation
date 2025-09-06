"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Droplets, TrendingUp, Shield } from "lucide-react"

interface SplashScreenProps {
  onGetStarted: () => void
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-sm">
        {/* Logo and App Name */}
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <Droplets className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">AquaWatch</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Monitor groundwater levels with real-time insights and AI-powered recommendations
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-3">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-chart-1/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-chart-1" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-card-foreground">Real-time Monitoring</p>
                <p className="text-xs text-muted-foreground">Live DWLR sensor data</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-chart-2" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-card-foreground">AI Recommendations</p>
                <p className="text-xs text-muted-foreground">Smart water management</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Get Started Button */}
        <Button
          onClick={onGetStarted}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3"
          size="lg"
        >
          Get Started
        </Button>

        <p className="text-xs text-muted-foreground">Sustainable water monitoring for everyone</p>
      </div>
    </div>
  )
}
