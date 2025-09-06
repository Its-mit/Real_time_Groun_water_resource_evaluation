"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Users } from "lucide-react"

interface UserTypeSelectionProps {
  onSelectUserType: (type: "admin" | "user") => void
  onBack: () => void
}

export function UserTypeSelection({ onSelectUserType, onBack }: UserTypeSelectionProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground ml-2">Select User Type</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Welcome to AquaWatch</h2>
          <p className="text-muted-foreground text-sm">Choose your role to access personalized features</p>
        </div>

        <div className="space-y-4">
          {/* Admin Option */}
          <Card
            className="cursor-pointer hover:bg-card/80 transition-colors border-2 hover:border-primary/20"
            onClick={() => onSelectUserType("admin")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Admin</CardTitle>
                  <CardDescription className="text-sm">System administration and oversight</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Manage user accounts and permissions</li>
                <li>• View comprehensive data insights</li>
                <li>• Monitor system performance</li>
                <li>• Access advanced analytics</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Option */}
          <Card
            className="cursor-pointer hover:bg-card/80 transition-colors border-2 hover:border-secondary/20"
            onClick={() => onSelectUserType("user")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">User</CardTitle>
                  <CardDescription className="text-sm">Personal groundwater monitoring</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Monitor local groundwater levels</li>
                <li>• Receive personalized recommendations</li>
                <li>• Access AI-powered insights</li>
                <li>• Join community discussions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
