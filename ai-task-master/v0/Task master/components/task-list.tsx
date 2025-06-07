"use client"

import type React from "react"

import { useState } from "react"
import { Star, Calendar, FolderOpen, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Task {
  id: number
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate: string
  project: string
  aiGenerated: boolean
}

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (taskId: number) => void
  onUpdateTasks: (tasks: Task[]) => void
}

export function TaskList({ tasks, onToggleTask, onUpdateTasks }: TaskListProps) {
  const [draggedTask, setDraggedTask] = useState<number | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetTaskId: number) => {
    e.preventDefault()
    if (draggedTask === null || draggedTask === targetTaskId) return

    const newTasks = [...tasks]
    const draggedIndex = newTasks.findIndex((task) => task.id === draggedTask)
    const targetIndex = newTasks.findIndex((task) => task.id === targetTaskId)

    const [draggedItem] = newTasks.splice(draggedIndex, 1)
    newTasks.splice(targetIndex, 0, draggedItem)

    onUpdateTasks(newTasks)
    setDraggedTask(null)
  }

  const deleteTask = (taskId: number) => {
    onUpdateTasks(tasks.filter((task) => task.id !== taskId))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return "Today"
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow"
    return date.toLocaleDateString()
  }

  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks ({pendingTasks.length})</h3>
        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <Card
              key={task.id}
              className="p-4 hover:shadow-md transition-shadow cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, task.id)}
            >
              <div className="flex items-center space-x-4">
                <Checkbox checked={task.completed} onCheckedChange={() => onToggleTask(task.id)} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{task.title}</h4>
                    {task.aiGenerated && (
                      <Badge variant="outline" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FolderOpen className="w-3 h-3" />
                      <span>{task.project}</span>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed Tasks ({completedTasks.length})</h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <Card key={task.id} className="p-4 opacity-60">
                <div className="flex items-center space-x-4">
                  <Checkbox checked={task.completed} onCheckedChange={() => onToggleTask(task.id)} />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-through">{task.title}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>Completed</span>
                      <span>{task.project}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
