"use client"

import { Calendar, CheckSquare, BarChart3, Settings, FolderOpen, Clock, Star } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

interface TaskFlowSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  tasks: any[]
}

export function TaskFlowSidebar({ activeView, setActiveView, tasks }: TaskFlowSidebarProps) {
  const pendingTasks = tasks.filter((task) => !task.completed).length
  const todayTasks = tasks.filter((task) => {
    const today = new Date().toISOString().split("T")[0]
    return task.dueDate === today && !task.completed
  }).length

  const navigationItems = [
    {
      title: "All Tasks",
      icon: CheckSquare,
      id: "tasks",
      badge: pendingTasks,
    },
    {
      title: "Calendar",
      icon: Calendar,
      id: "calendar",
    },
    {
      title: "Insights",
      icon: BarChart3,
      id: "insights",
    },
  ]

  const filterItems = [
    {
      title: "Today",
      icon: Clock,
      badge: todayTasks,
    },
    {
      title: "High Priority",
      icon: Star,
      badge: tasks.filter((t) => t.priority === "high" && !t.completed).length,
    },
    {
      title: "Projects",
      icon: FolderOpen,
    },
  ]

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Task Master</h1>
            <p className="text-sm text-gray-500">Intelligent Task Manager</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="w-full justify-between">
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <Badge variant="outline" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
