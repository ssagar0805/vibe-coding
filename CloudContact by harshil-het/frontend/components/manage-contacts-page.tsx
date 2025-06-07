"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Plus } from "lucide-react"
import { useState } from "react"

const manageContacts = [
  {
    id: 1,
    name: "Ethan Carter",
    phone: "555-123-4567",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 2,
    name: "Olivia Bennett",
    phone: "555-987-6543",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 3,
    name: "Noah Thompson",
    phone: "555-246-8013",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 4,
    name: "Sophia Davis",
    phone: "555-369-1470",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 5,
    name: "Liam Walker",
    phone: "555-789-0123",
    avatar: "/placeholder.svg?height=56&width=56",
  },
]

export function ManageContactsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-mint-light">
        <div className="flex items-center justify-between p-3 sm:p-4 pb-2 max-w-7xl mx-auto w-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-12 sm:w-12 text-forest-dark hover:bg-mint-medium/30 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <h1 className="text-forest-dark text-lg sm:text-xl font-bold leading-tight tracking-tight flex-1 text-center pr-10 sm:pr-12">
            Contacts
          </h1>
          {/* Desktop View Toggle */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="text-sm"
            >
              List
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="text-sm"
            >
              Grid
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-forest-dark text-lg font-bold leading-tight tracking-tight">
              My Contacts
            </h2>
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="outline" size="sm" className="text-sm">
                Import Contacts
              </Button>
              <Button variant="outline" size="sm" className="text-sm">
                Export Contacts
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="divide-y divide-mint-medium/50">
              {manageContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center gap-3 sm:gap-4 bg-mint-light px-3 sm:px-4 py-3 sm:py-4 hover:bg-mint-medium/30 active:bg-mint-medium/50 transition-colors cursor-pointer touch-manipulation"
                  role="button"
                  tabIndex={0}
                  aria-label={`Manage contact ${contact.name}, ${contact.phone}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      // Handle contact management
                    }
                  }}
                >
                  <Avatar className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0">
                    <AvatarImage
                      src={contact.avatar || "/placeholder.svg"}
                      alt={`${contact.name}'s profile picture`}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-mint-dark text-white font-medium text-sm sm:text-base">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <p className="text-forest-dark text-sm sm:text-base font-medium leading-tight truncate">
                      {contact.name}
                    </p>
                    <p className="text-mint-dark text-xs sm:text-sm font-normal leading-tight mt-0.5 truncate">
                      {contact.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {manageContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex flex-col items-center p-4 bg-mint-light rounded-lg hover:bg-mint-medium/30 active:bg-mint-medium/50 transition-colors cursor-pointer touch-manipulation"
                  role="button"
                  tabIndex={0}
                  aria-label={`Manage contact ${contact.name}, ${contact.phone}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      // Handle contact management
                    }
                  }}
                >
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage
                      src={contact.avatar || "/placeholder.svg"}
                      alt={`${contact.name}'s profile picture`}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-mint-dark text-white font-medium text-lg">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center">
                    <p className="text-forest-dark text-base font-medium leading-tight">
                      {contact.name}
                    </p>
                    <p className="text-mint-dark text-sm font-normal leading-tight mt-1">
                      {contact.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-6 lg:right-8">
        <Button
          size="lg"
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 p-0"
          aria-label="Add new contact"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom spacing */}
      <div className="h-safe bg-mint-light" />
    </div>
  )
}
