"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, MapPin, Users } from "lucide-react"
import type { EventData } from "@/app/page"

interface EventScheduleProps {
  eventData: EventData | null
  schedule: any
  isGenerating: boolean
}

export function EventSchedule({ eventData, schedule, isGenerating }: EventScheduleProps) {
  if (!eventData) return null

  if (isGenerating) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Event Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Event Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Duration: {eventData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Attendees: {eventData.estimatedAttendees}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                {eventData.venue.charAt(0).toUpperCase() + eventData.venue.slice(1)}
                {eventData.venueDetails && ` - ${eventData.venueDetails}`}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Objective:</h4>
            <p className="text-sm text-muted-foreground">{eventData.objective}</p>
          </div>
        </CardContent>
      </Card>

      {/* Generated Schedule */}
      {schedule && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.timeline?.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <Badge variant="outline" className="mt-1">
                    {item.time}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.activity}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.duration} min
                      </Badge>
                      {item.type && (
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Task Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventData.tasks.map((task, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{task.name}</h4>
                  <Badge variant="secondary">{task.duration} min</Badge>
                </div>
                {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {schedule?.recommendations && (
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {schedule.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
