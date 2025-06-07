"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Plus, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CalendarViewProps {
  tasks: any[]
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isConnected, setIsConnected] = useState(false)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return tasks.filter((task) => task.dueDate === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const mockEvents = [
    {
      id: 1,
      title: "Q3 Review Meeting",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Client Presentation",
      date: "2024-01-16",
      time: "2:00 PM",
      type: "presentation",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Google Calendar Integration */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Google Calendar Integration</h3>
              <p className="text-sm text-gray-500">
                {isConnected
                  ? "Connected - AI will scan your events for task suggestions"
                  : "Connect your Google Calendar to get AI-powered task suggestions"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsConnected(!isConnected)}
            variant={isConnected ? "outline" : "default"}
            className={isConnected ? "" : "bg-blue-600 hover:bg-blue-700"}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {isConnected ? "Disconnect" : "Connect Google Calendar"}
          </Button>
        </div>
      </Card>

      {/* Calendar Grid */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentDate).map((date, index) => {
            if (!date) {
              return <div key={index} className="p-2 h-24"></div>
            }

            const dayTasks = getTasksForDate(date)
            const isToday = date.toDateString() === new Date().toDateString()

            return (
              <div
                key={date.toISOString()}
                className={`p-2 h-24 border border-gray-200 rounded-lg ${
                  isToday ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div key={task.id} className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && <div className="text-xs text-gray-500">+{dayTasks.length - 2} more</div>}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Upcoming Events */}
      {isConnected && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events & AI Suggestions</h3>
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-500">
                    {event.date} at {event.time}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Calendar Event</Badge>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Generate Tasks
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
