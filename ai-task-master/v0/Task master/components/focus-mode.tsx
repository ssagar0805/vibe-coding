"use client"

import { X, Play, Pause, RotateCcw } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FocusModeProps {
  tasks: any[]
  onExitFocus: () => void
}

export function FocusMode({ tasks, onExitFocus }: FocusModeProps) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const activeTasks = tasks.filter((task) => !task.completed)
  const currentTask = activeTasks[currentTaskIndex]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setIsRunning(false)
      // Auto-advance to next task when timer completes
      if (currentTaskIndex < activeTasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1)
        setTimeRemaining(25 * 60)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeRemaining, currentTaskIndex, activeTasks.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTimeRemaining(25 * 60)
    setIsRunning(false)
  }

  const markTaskComplete = () => {
    if (currentTask) {
      setCompletedTasks([...completedTasks, currentTask.id])
      if (currentTaskIndex < activeTasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1)
        setTimeRemaining(25 * 60)
        setIsRunning(false)
      }
    }
  }

  const nextTask = () => {
    if (currentTaskIndex < activeTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1)
      setTimeRemaining(25 * 60)
      setIsRunning(false)
    }
  }

  const progress = ((25 * 60 - timeRemaining) / (25 * 60)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Master - Focus Mode</h1>
          <Button onClick={onExitFocus} variant="outline" size="sm">
            <X className="w-4 h-4 mr-2" />
            Exit Focus
          </Button>
        </div>

        {/* Main Focus Card */}
        <Card className="p-8 mb-6 text-center">
          {currentTask ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Current Task</h2>
                <p className="text-lg text-gray-600">{currentTask.title}</p>
              </div>

              {/* Timer */}
              <div className="mb-8">
                <div className="text-6xl font-mono font-bold text-blue-600 mb-4">{formatTime(timeRemaining)}</div>
                <Progress value={progress} className="h-3 mb-4" />
                <p className="text-sm text-gray-500">
                  Pomodoro Session ({currentTaskIndex + 1} of {activeTasks.length})
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button onClick={toggleTimer} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                <Button onClick={resetTimer} variant="outline" size="lg">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Task Actions */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={markTaskComplete}
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  Mark Complete
                </Button>
                {currentTaskIndex < activeTasks.length - 1 && (
                  <Button onClick={nextTask} variant="outline">
                    Skip Task
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">All Tasks Completed! 🎉</h2>
              <p className="text-gray-600 mb-6">Great job! You've completed all your active tasks.</p>
              <Button onClick={onExitFocus} className="bg-blue-600 hover:bg-blue-700">
                Return to Dashboard
              </Button>
            </div>
          )}
        </Card>

        {/* Task Progress */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Progress</h3>
          <div className="space-y-3">
            {activeTasks.map((task, index) => (
              <div
                key={task.id}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  index === currentTaskIndex
                    ? "bg-blue-50 border border-blue-200"
                    : completedTasks.includes(task.id)
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    completedTasks.includes(task.id)
                      ? "bg-green-500"
                      : index === currentTaskIndex
                        ? "bg-blue-500"
                        : "bg-gray-300"
                  }`}
                />
                <span
                  className={`flex-1 ${
                    completedTasks.includes(task.id) ? "line-through text-gray-500" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </span>
                {index === currentTaskIndex && <span className="text-xs text-blue-600 font-medium">Current</span>}
                {completedTasks.includes(task.id) && (
                  <span className="text-xs text-green-600 font-medium">Complete</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
