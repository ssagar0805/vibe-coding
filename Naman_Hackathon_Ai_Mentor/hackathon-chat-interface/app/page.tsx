"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Code, Lightbulb, Users, Send, Paperclip } from "lucide-react"

interface TeamMember {
  fullName: string
  email: string
}

interface RegistrationData {
  teamName: string
  projectIdea: string
  members: TeamMember[]
}

export default function HackathonChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "🚀 Welcome to HackBot! I'm here to guide you through your hackathon journey. Let's start by getting your team registered!\n\nWhat's your full name?",
        parts: [
          {
            type: "text",
            text: "🚀 Welcome to HackBot! I'm here to guide you through your hackathon journey. Let's start by getting your team registered!\n\nWhat's your full name?",
          },
        ],
      },
    ],
  })

  const [currentStep, setCurrentStep] = useState<"registration" | "mentorship" | "ui-feedback" | "code-analysis">(
    "registration",
  )
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    teamName: "",
    projectIdea: "",
    members: [],
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const getStepIcon = (step: string) => {
    switch (step) {
      case "registration":
        return <Users className="w-4 h-4" />
      case "mentorship":
        return <Lightbulb className="w-4 h-4" />
      case "ui-feedback":
        return <Upload className="w-4 h-4" />
      case "code-analysis":
        return <Code className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStepColor = (step: string) => {
    if (step === currentStep) return "bg-blue-500 text-white"
    return "bg-gray-200 text-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HackBot Assistant</h1>
                <p className="text-sm text-gray-500">Your hackathon companion</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-2">
              {[
                { key: "registration", label: "Registration" },
                { key: "mentorship", label: "Mentorship" },
                { key: "ui-feedback", label: "UI Feedback" },
                { key: "code-analysis", label: "Code Analysis" },
              ].map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <Badge variant="secondary" className={`${getStepColor(step.key)} px-3 py-1`}>
                    {getStepIcon(step.key)}
                    <span className="ml-1 text-xs">{step.label}</span>
                  </Badge>
                  {index < 3 && <div className="w-8 h-px bg-gray-300 mx-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="h-[calc(100vh-200px)] flex flex-col shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-white/50">
            <CardTitle className="flex items-center space-x-2 text-gray-800">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🤖</span>
              </div>
              <span>Chat with HackBot</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  {message.role === "user" ? (
                    <>
                      <AvatarFallback className="bg-blue-500 text-white text-sm">U</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
                        🤖
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.parts?.map((part, index) => {
                      if (part.type === "text") {
                        return <span key={index}>{part.text}</span>
                      }
                      return null
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
                    🤖
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="border-t border-gray-100 p-4 bg-white/50">
            <form onSubmit={handleSubmit} className="flex items-end space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="min-h-[44px] max-h-32 resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl pr-12"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e as any)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 bottom-2 h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>

                {uploadedFile && (
                  <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                    <Paperclip className="w-4 h-4" />
                    <span>{uploadedFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl h-11 px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
