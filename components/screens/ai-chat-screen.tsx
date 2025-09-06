"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AIChatbot } from "@/components/chat/ai-chatbot"

interface AIChatScreenProps {
  user?: any
  onBack: () => void
}

export function AIChatScreen({ user, onBack }: AIChatScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border bg-card/50">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground ml-2">AI Assistant</h1>
      </div>

      {/* Chat Interface */}
      <div className="flex-1">
        <AIChatbot user={user} />
      </div>
    </div>
  )
}
