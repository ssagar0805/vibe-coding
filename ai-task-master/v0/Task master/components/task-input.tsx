"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Mic, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface TaskInputProps {
  onAddTask: (task: string) => void
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsGenerating(true)

    // Simulate AI task generation
    setTimeout(() => {
      const suggestions = generateAITasks(input)
      setAiSuggestions(suggestions)
      setIsGenerating(false)
    }, 1500)
  }

  const generateAITasks = (prompt: string): string[] => {
    // Simulate AI-generated tasks based on input
    const taskTemplates = {
      meeting: [
        "Review agenda and prepare talking points",
        "Gather relevant documents and materials",
        "Set up meeting room or video call",
        "Send reminder to all participants",
        "Prepare follow-up action items template",
      ],
      trip: [
        "Research destination and create itinerary",
        "Book flights and accommodation",
        "Check passport and visa requirements",
        "Pack appropriate clothing and essentials",
        "Arrange transportation to/from airport",
      ],
      project: [
        "Define project scope and objectives",
        "Create timeline and milestones",
        "Identify required resources and team members",
        "Set up project tracking system",
        "Schedule kickoff meeting",
      ],
    }

    const lowerInput = prompt.toLowerCase()
    if (lowerInput.includes("meeting")) return taskTemplates.meeting
    if (lowerInput.includes("trip") || lowerInput.includes("travel")) return taskTemplates.trip
    if (lowerInput.includes("project")) return taskTemplates.project

    return [
      `Complete: ${prompt}`,
      `Research requirements for: ${prompt}`,
      `Create plan for: ${prompt}`,
      `Review and finalize: ${prompt}`,
    ]
  }

  const addSuggestion = (suggestion: string) => {
    onAddTask(suggestion)
    setAiSuggestions(aiSuggestions.filter((s) => s !== suggestion))
  }

  const addAllSuggestions = () => {
    aiSuggestions.forEach((suggestion) => onAddTask(suggestion))
    setAiSuggestions([])
    setInput("")
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Task Generator</h3>
          </div>

          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you need to do... (e.g., 'Prepare for tomorrow's client meeting')"
                className="pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Button type="submit" disabled={!input.trim() || isGenerating} className="bg-blue-600 hover:bg-blue-700">
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Generate Tasks
            </Button>
          </div>
        </form>
      </Card>

      {aiSuggestions.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-gray-900">AI Generated Tasks</h4>
            <Button onClick={addAllSuggestions} variant="outline" size="sm">
              Add All Tasks
            </Button>
          </div>
          <div className="space-y-2">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
              >
                <span className="text-gray-800">{suggestion}</span>
                <Button
                  onClick={() => addSuggestion(suggestion)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
