"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventForm } from "@/components/event-form"
import { EventSchedule } from "@/components/event-schedule"
import { SocialMediaPosts } from "@/components/social-media-posts"
import { EventPoster } from "@/components/event-poster"
import { Calendar, Users, MessageSquare, ImageIcon } from "lucide-react"

export interface EventData {
  duration: string
  objective: string
  audienceType: string
  estimatedAttendees: number
  venue: "online" | "offline" | "hybrid"
  venueDetails?: string
  tasks: Array<{
    name: string
    duration: number
    description?: string
  }>
}

export interface GeneratedContent {
  schedule?: any
  socialPosts?: {
    instagram: string
    twitter: string
    linkedin: string
  }
  poster?: string
}

export default function EventOrganizerAgent() {
  const [eventData, setEventData] = useState<EventData | null>(null)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({})
  const [activeTab, setActiveTab] = useState("form")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleEventSubmit = async (data: EventData) => {
    setEventData(data)
    setActiveTab("schedule")
    setIsGenerating(true)

    try {
      // Generate all content
      const response = await fetch("/api/generate-event-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const content = await response.json()
      setGeneratedContent(content)
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const resetForm = () => {
    setEventData(null)
    setGeneratedContent({})
    setActiveTab("form")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Event Organizer Assistant</h1>
          <p className="text-lg text-gray-600">Your intelligent companion for planning and promoting company events</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Event Details
            </TabsTrigger>
            <TabsTrigger value="schedule" disabled={!eventData} className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="social" disabled={!eventData} className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Social Media
            </TabsTrigger>
            <TabsTrigger value="poster" disabled={!eventData} className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Poster & Labels
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
                <CardDescription>
                  Please provide details about your event so I can assist you with planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EventForm onSubmit={handleEventSubmit} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Event Schedule</CardTitle>
                  <CardDescription>AI-generated schedule based on your event details</CardDescription>
                </div>
                <Button variant="outline" onClick={resetForm}>
                  Edit Event Details
                </Button>
              </CardHeader>
              <CardContent>
                <EventSchedule eventData={eventData} schedule={generatedContent.schedule} isGenerating={isGenerating} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Announcements</CardTitle>
                <CardDescription>Platform-specific posts tailored for Instagram, Twitter, and LinkedIn</CardDescription>
              </CardHeader>
              <CardContent>
                <SocialMediaPosts
                  eventData={eventData}
                  socialPosts={generatedContent.socialPosts}
                  isGenerating={isGenerating}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="poster">
            <Card>
              <CardHeader>
                <CardTitle>Event Poster & Labels</CardTitle>
                <CardDescription>Visual materials for your event promotion</CardDescription>
              </CardHeader>
              <CardContent>
                <EventPoster eventData={eventData} poster={generatedContent.poster} isGenerating={isGenerating} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
