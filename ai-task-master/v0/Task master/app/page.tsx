"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TaskFlowSidebar } from "@/components/taskflow-sidebar"
import { TaskFlowHeader } from "@/components/taskflow-header"
import { TaskInput } from "@/components/task-input"
import { TaskList } from "@/components/task-list"
import { CalendarView } from "@/components/calendar-view"
import { ProductivityDashboard } from "@/components/productivity-dashboard"
import { FocusMode } from "@/components/focus-mode"

export default function TaskFlowApp() {
  const [activeView, setActiveView] = useState("tasks")
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review Q3 financial reports",
      completed: false,
      priority: "high",
      dueDate: "2024-01-15",
      project: "Finance",
      aiGenerated: true,
    },
    {
      id: 2,
      title: "Prepare presentation slides",
      completed: false,
      priority: "medium",
      dueDate: "2024-01-16",
      project: "Marketing",
      aiGenerated: true,
    },
    {
      id: 3,
      title: "Book hotel for weekend trip",
      completed: true,
      priority: "low",
      dueDate: "2024-01-14",
      project: "Personal",
      aiGenerated: false,
    },
  ])

  const addTask = (taskTitle: string) => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
      priority: "medium",
      dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      project: "General",
      aiGenerated: true,
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  if (isFocusMode) {
    return <FocusMode tasks={tasks} onExitFocus={() => setIsFocusMode(false)} />
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-gray-50">
        <TaskFlowSidebar activeView={activeView} setActiveView={setActiveView} tasks={tasks} />

        <div className="flex-1 flex flex-col">
          <TaskFlowHeader onFocusMode={() => setIsFocusMode(true)} activeView={activeView} />

          <main className="flex-1 p-6 overflow-auto">
            {activeView === "tasks" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <TaskInput onAddTask={addTask} />
                <TaskList tasks={tasks} onToggleTask={toggleTask} onUpdateTasks={setTasks} />
              </div>
            )}

            {activeView === "calendar" && (
              <div className="max-w-6xl mx-auto">
                <CalendarView tasks={tasks} />
              </div>
            )}

            {activeView === "insights" && (
              <div className="max-w-6xl mx-auto">
                <ProductivityDashboard tasks={tasks} />
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
