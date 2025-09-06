"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Shield } from "lucide-react"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

interface AdminFlowProps {
  onBack: () => void
}

export function AdminFlow({ onBack }: AdminFlowProps) {
  const [step, setStep] = useState<"otp" | "dashboard">("otp")
  const [otp, setOtp] = useState("")

  const handleOtpVerification = () => {
    if (otp.length === 6) {
      setStep("dashboard")
    }
  }

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground ml-2">Admin Verification</h1>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>OTP Verification</CardTitle>
              <CardDescription>Enter the 6-digit code sent to your registered device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
              <Button onClick={handleOtpVerification} disabled={otp.length !== 6} className="w-full">
                Verify & Continue
              </Button>
              <Button variant="ghost" className="w-full text-sm">
                Resend OTP
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return <AdminDashboard onBack={onBack} />
}
