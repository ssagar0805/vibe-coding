"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Palette, Calendar, MapPin, Users } from "lucide-react"
import type { EventData } from "@/app/page"

interface EventPosterProps {
  eventData: EventData | null
  poster: string | undefined
  isGenerating: boolean
}

export function EventPoster({ eventData, poster, isGenerating }: EventPosterProps) {
  if (!eventData) return null

  if (isGenerating) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Poster Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Event Poster
            </CardTitle>
            <p className="text-sm text-muted-foreground">AI-generated poster design for your event</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-8 text-white min-h-[500px] flex flex-col justify-between">
            {/* Header */}
            <div className="text-center">
              <Badge className="bg-white/20 text-white mb-4">{eventData.venue.toUpperCase()} EVENT</Badge>
              <h1 className="text-4xl font-bold mb-2">{eventData.objective.split(" ").slice(0, 3).join(" ")}</h1>
              <p className="text-xl opacity-90">
                {eventData.objective.length > 50 ? eventData.objective.substring(0, 50) + "..." : eventData.objective}
              </p>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{eventData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{eventData.estimatedAttendees} Attendees</span>
                </div>
              </div>

              {eventData.venueDetails && (
                <div className="flex items-center justify-center gap-2 text-lg">
                  <MapPin className="w-5 h-5" />
                  <span>{eventData.venueDetails}</span>
                </div>
              )}

              {/* Key Activities */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Key Activities</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {eventData.tasks.slice(0, 4).map((task, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                      {task.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-lg font-semibold">Join Us for an Amazing Experience!</p>
              <p className="opacity-75">Register now to secure your spot</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Labels and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Name Tags Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample Name Tag */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="text-center space-y-2">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {eventData.objective.split(" ").slice(0, 2).join(" ")}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">[ATTENDEE NAME]</div>
                  <div className="text-sm text-gray-600">{eventData.audienceType.split(",")[0]}</div>
                  <div className="text-xs text-gray-500">
                    {eventData.venue.charAt(0).toUpperCase() + eventData.venue.slice(1)} Event
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Labels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample Labels */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-100 text-blue-800 p-2 rounded text-center text-sm font-medium">SPEAKER</div>
                <div className="bg-green-100 text-green-800 p-2 rounded text-center text-sm font-medium">ATTENDEE</div>
                <div className="bg-purple-100 text-purple-800 p-2 rounded text-center text-sm font-medium">VIP</div>
                <div className="bg-orange-100 text-orange-800 p-2 rounded text-center text-sm font-medium">STAFF</div>
              </div>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Labels
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Design Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Design Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Poster Dimensions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Standard: 18" x 24" (Print)</li>
                <li>• Digital: 1080 x 1350px (Instagram)</li>
                <li>• Landscape: 1200 x 630px (Facebook)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Color Scheme</h4>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
                <div className="w-6 h-6 bg-purple-700 rounded"></div>
                <div className="w-6 h-6 bg-white border rounded"></div>
              </div>
              <p className="text-sm text-muted-foreground">Professional blue gradient</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Typography</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Heading: Bold Sans-serif</li>
                <li>• Body: Regular Sans-serif</li>
                <li>• Accent: Medium weight</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
