"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AuthLogin } from "@/components/auth/auth-login"
import { UserRegistration } from "@/components/auth/user-registration"
import { UserDashboard } from "@/components/dashboard/user-dashboard"

interface UserFlowProps {
  onBack: () => void
}

export function UserFlow({ onBack }: UserFlowProps) {
  const [step, setStep] = useState<"login" | "register" | "dashboard">("login")
  const [user, setUser] = useState<any>(null)

  const handleLoginComplete = (userData: any) => {
    setUser(userData)
    setStep("dashboard")
  }

  const handleRegistrationComplete = (userData: any) => {
    setUser(userData)
    setStep("dashboard")
  }

  const handleSwitchToRegister = () => {
    setStep("register")
  }

  const handleSwitchToLogin = () => {
    setStep("login")
  }

  if (step === "login") {
    return <AuthLogin onLogin={handleLoginComplete} onBack={onBack} onSwitchToRegister={handleSwitchToRegister} />
  }

  if (step === "register") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={handleSwitchToLogin}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground ml-2">Create Account</h1>
        </div>
        <UserRegistration onComplete={handleRegistrationComplete} />
      </div>
    )
  }

  return <UserDashboard user={user} onBack={onBack} />
}
