"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Clock } from "lucide-react"
import type { EventData } from "@/app/page"

interface EventFormProps {
  onSubmit: (data: EventData) => void
}

export function EventForm({ onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState({
    duration: "",
    objective: "",
    audienceType: "",
    estimatedAttendees: "",
    venue: "" as "online" | "offline" | "hybrid" | "",
    venueDetails: "",
  })

  const [tasks, setTasks] = useState([{ name: "", duration: 0, description: "" }])

  const addTask = () => {
    setTasks([...tasks, { name: "", duration: 0, description: "" }])
  }

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const updateTask = (index: number, field: string, value: string | number) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? { ...task, [field]: value } : task))
    setTasks(updatedTasks)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validTasks = tasks.filter((task) => task.name.trim() && task.duration > 0)

    const eventData: EventData = {
      duration: formData.duration,
      objective: formData.objective,
      audienceType: formData.audienceType,
      estimatedAttendees: Number.parseInt(formData.estimatedAttendees),
      venue: formData.venue as "online" | "offline" | "hybrid",
      venueDetails: formData.venueDetails,
      tasks: validTasks,
    }

    onSubmit(eventData)
  }

  const totalDuration = tasks.reduce((sum, task) => sum + (task.duration || 0), 0)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Event Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Event Duration</Label>
          <Input
            id="duration"
            placeholder="e.g., 2 hours, Half day, Full day"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="attendees">Estimated Attendees</Label>
          <Input
            id="attendees"
            type="number"
            placeholder="e.g., 50"
            value={formData.estimatedAttendees}
            onChange={(e) => setFormData({ ...formData, estimatedAttendees: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="objective">Event Objective</Label>
        <Textarea
          id="objective"
          placeholder="Describe the main purpose and goals of your event..."
          value={formData.objective}
          onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="audience">Audience Type</Label>
        <Textarea
          id="audience"
          placeholder="Describe your target audience (e.g., employees, clients, stakeholders, industry professionals)..."
          value={formData.audienceType}
          onChange={(e) => setFormData({ ...formData, audienceType: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="venue">Venue Type</Label>
          <Select value={formData.venue} onValueChange={(value) => setFormData({ ...formData, venue: value as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Select venue type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="venueDetails">Venue Details</Label>
          <Input
            id="venueDetails"
            placeholder="e.g., Conference Room A, Zoom, Hotel Ballroom"
            value={formData.venueDetails}
            onChange={(e) => setFormData({ ...formData, venueDetails: e.target.value })}
          />
        </div>
      </div>

      {/* Tasks Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Event Tasks & Activities</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Total: {totalDuration} min
            </Badge>
            <Button type="button" onClick={addTask} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 p-4 border rounded-lg">
              <div className="md:col-span-4">
                <Input
                  placeholder="Task name"
                  value={task.name}
                  onChange={(e) => updateTask(index, "name", e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  type="number"
                  placeholder="Duration (min)"
                  value={task.duration || ""}
                  onChange={(e) => updateTask(index, "duration", Number.parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="md:col-span-5">
                <Input
                  placeholder="Description (optional)"
                  value={task.description}
                  onChange={(e) => updateTask(index, "description", e.target.value)}
                />
              </div>
              <div className="md:col-span-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeTask(index)}
                  disabled={tasks.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg">
        Generate Event Plan
      </Button>
    </form>
  )
}
