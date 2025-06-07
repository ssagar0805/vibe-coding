"use client"

import { Search, Bell, Focus, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface TaskFlowHeaderProps {
  onFocusMode: () => void
  activeView: string
}

export function TaskFlowHeader({ onFocusMode, activeView }: TaskFlowHeaderProps) {
  const [isOnline, setIsOnline] = useState(true)

  const getViewTitle = () => {
    switch (activeView) {
      case "tasks":
        return "All Tasks"
      case "calendar":
        return "Calendar & Events"
      case "insights":
        return "Productivity Insights"
      default:
        return "Task Master"
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">{getViewTitle()}</h2>
          <Badge variant="outline" className="text-xs">
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3 mr-1" />
                Synced
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </>
            )}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search tasks..." className="pl-10 w-64" />
          </div>

          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>

          <Button onClick={onFocusMode} className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Focus className="w-4 h-4 mr-2" />
            Focus Mode
          </Button>
        </div>
      </div>
    </header>
  )
}
