"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, MapPin, CreditCard } from "lucide-react"

interface UserRegistrationProps {
  onComplete: (userData: any) => void
}

export function UserRegistration({ onComplete }: UserRegistrationProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    aadhaar: "",
    userType: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
          <p className="text-muted-foreground text-sm">Join the groundwater monitoring community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <User className="h-4 w-4 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location & Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State, PIN Code"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">User Category</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, userType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="resident">Resident</SelectItem>
                    <SelectItem value="industry">Industry</SelectItem>
                    <SelectItem value="researcher">Researcher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Aadhaar Authentication
              </CardTitle>
              <CardDescription className="text-xs">Required for identity verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  value={formData.aadhaar}
                  onChange={(e) =>
                    setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12) })
                  }
                  placeholder="XXXX XXXX XXXX"
                  maxLength={12}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg">
            Create Account & Continue
          </Button>
        </form>
      </div>
    </div>
  )
}
