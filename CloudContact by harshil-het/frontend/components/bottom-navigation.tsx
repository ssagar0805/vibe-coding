"use client"

import { Button } from "@/components/ui/button"
import { Users, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "contacts", icon: Users, label: "Contact List" },
    { id: "manage", icon: Settings, label: "Manage Contacts" },
    { id: "profile", icon: User, label: "User Profile" },
  ]

  return (
    <div className="sticky bottom-0 bg-mint-light border-t border-mint-medium">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 h-14 sm:h-16 py-2 px-1 rounded-none hover:bg-mint-medium/30 transition-colors touch-manipulation",
                isActive ? "text-forest-dark" : "text-mint-dark",
              )}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-pressed={isActive}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" fill={isActive ? "currentColor" : "none"} />
              <span className="text-xs font-medium leading-tight text-center">{tab.label}</span>
            </Button>
          )
        })}
      </div>

      {/* Safe area padding for devices with home indicators */}
      <div className="h-safe bg-mint-light" />
    </div>
  )
}
