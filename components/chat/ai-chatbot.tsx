"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Lightbulb, Droplets, TrendingUp, AlertTriangle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface AIChatbotProps {
  user?: any
}

export function AIChatbot({ user }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hello ${user?.name || "there"}! I'm your groundwater monitoring assistant. I can help you with water level insights, conservation tips, and answer questions about your local groundwater conditions. How can I assist you today?`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickQuestions = [
    {
      icon: Droplets,
      text: "What's my current water level status?",
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      text: "How can I improve water efficiency?",
      color: "text-chart-1",
    },
    {
      icon: AlertTriangle,
      text: "What do my recent alerts mean?",
      color: "text-yellow-600",
    },
    {
      icon: Lightbulb,
      text: "Give me conservation tips for my area",
      color: "text-chart-2",
    },
  ]

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("water level") || lowerMessage.includes("current status")) {
      return `Based on your location in ${user?.location || "your area"}, your current groundwater level is 12.5m below ground level, which is within the safe range. The level has increased by 2.3m this month due to recent rainfall. Your area is currently classified as "Safe" for groundwater availability.`
    }

    if (lowerMessage.includes("efficiency") || lowerMessage.includes("improve") || lowerMessage.includes("save")) {
      const userType = user?.userType || "user"
      if (userType === "farmer") {
        return "For farmers like you, I recommend: 1) Switch to drip irrigation to reduce water usage by 30-50%, 2) Plant drought-resistant crop varieties, 3) Use mulching to retain soil moisture, 4) Schedule irrigation during early morning (5-7 AM) for optimal efficiency."
      } else if (userType === "industry") {
        return "For industrial water efficiency: 1) Implement closed-loop water systems, 2) Install water recycling units, 3) Monitor usage with smart meters, 4) Regular maintenance to prevent leaks, 5) Use treated wastewater for non-critical processes."
      } else {
        return "For household water efficiency: 1) Install low-flow fixtures and aerators, 2) Fix leaks immediately, 3) Use greywater for gardening, 4) Collect rainwater for non-potable uses, 5) Run dishwashers and washing machines with full loads only."
      }
    }

    if (lowerMessage.includes("alert") || lowerMessage.includes("warning")) {
      return "Your recent alerts indicate: 1) High usage detected 2 days ago during peak hours (12-4 PM), 2) A minor drop in groundwater level was observed but has since recovered, 3) Weather forecast suggests continued improvement with expected rainfall this week. No immediate action required, but continue monitoring usage patterns."
    }

    if (lowerMessage.includes("conservation") || lowerMessage.includes("tips")) {
      return `Here are personalized conservation tips for ${user?.location || "your area"}: 1) Take advantage of the upcoming monsoon season by setting up rainwater harvesting, 2) Your soil type retains moisture well - consider reducing irrigation frequency by 20%, 3) Local groundwater recharge rate is good, but avoid peak usage hours, 4) Join community water-sharing initiatives in your area.`
    }

    if (lowerMessage.includes("prediction") || lowerMessage.includes("forecast")) {
      return "Based on AI analysis: 1) Your groundwater level is predicted to rise by 0.8m over the next 7 days due to expected rainfall, 2) Optimal usage window: 5-7 AM daily, 3) Recommended to reduce usage by 15% during peak hours this week, 4) Long-term outlook: Stable to improving conditions for the next 3 months."
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return `Hello! I'm here to help you with groundwater monitoring and conservation. I can provide insights about your local water levels, efficiency tips, and answer questions about water management. What would you like to know?`
    }

    // Default response
    return "I understand you're asking about groundwater management. I can help with water level status, conservation tips, efficiency improvements, and interpreting your alerts. Could you be more specific about what you'd like to know? You can also try one of the quick questions below."
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim()
    if (!textToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(textToSend),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Chat Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-border bg-card/50">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="font-medium text-sm">AquaWatch AI Assistant</div>
          <div className="text-xs text-muted-foreground">Groundwater monitoring expert</div>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="text-xs">
            Online
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === "user" ? "bg-primary/10" : "bg-secondary/10"}`}
              >
                {message.type === "user" ? (
                  <User className="h-4 w-4 text-primary" />
                ) : (
                  <Bot className="h-4 w-4 text-secondary" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <div className="text-sm leading-relaxed">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-secondary" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="p-4 border-t border-border bg-card/30">
          <div className="text-xs text-muted-foreground mb-3">Quick questions:</div>
          <div className="grid grid-cols-1 gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(question.text)}
                className="justify-start text-left h-auto p-3 bg-transparent"
              >
                <question.icon className={`h-4 w-4 mr-2 ${question.color}`} />
                <span className="text-xs">{question.text}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-card/50">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about groundwater levels, conservation tips..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isTyping} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
