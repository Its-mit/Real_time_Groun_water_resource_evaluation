"use client"

import { useState } from "react"
import { SplashScreen } from "@/components/screens/splash-screen"
import { UserTypeSelection } from "@/components/screens/user-type-selection"
import { AdminFlow } from "@/components/flows/admin-flow"
import { UserFlow } from "@/components/flows/user-flow"

type Screen = "splash" | "user-type" | "admin" | "user"
type UserType = "admin" | "user" | null

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash")
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null)

  const handleGetStarted = () => {
    setCurrentScreen("user-type")
  }

  const handleUserTypeSelect = (type: "admin" | "user") => {
    setSelectedUserType(type)
    setCurrentScreen(type)
  }

  const handleBack = () => {
    if (currentScreen === "admin" || currentScreen === "user") {
      setCurrentScreen("user-type")
      setSelectedUserType(null)
    } else if (currentScreen === "user-type") {
      setCurrentScreen("splash")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "splash" && <SplashScreen onGetStarted={handleGetStarted} />}

      {currentScreen === "user-type" && (
        <UserTypeSelection onSelectUserType={handleUserTypeSelect} onBack={handleBack} />
      )}

      {currentScreen === "admin" && <AdminFlow onBack={handleBack} />}

      {currentScreen === "user" && <UserFlow onBack={handleBack} />}
    </div>
  )
}
