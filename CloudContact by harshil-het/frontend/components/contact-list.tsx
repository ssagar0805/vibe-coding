"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

interface Contact {
  id: number
  name: string
  phone: string
  avatar: string
}

interface ContactListProps {
  contacts: Contact[]
}

export function ContactList({ contacts }: ContactListProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="text-mint-dark text-4xl sm:text-5xl mb-4">📱</div>
        <h3 className="text-forest-dark font-semibold text-base sm:text-lg mb-2">No contacts found</h3>
        <p className="text-mint-dark text-sm sm:text-base">Try adjusting your search terms</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* View Toggle - Desktop Only */}
      <div className="hidden lg:flex justify-end mb-4 px-4">
        <div className="flex items-center gap-2 bg-mint-medium/20 rounded-lg p-1">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 px-3"
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 px-3"
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Grid
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="divide-y divide-mint-medium/50">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 sm:gap-4 bg-mint-light px-3 sm:px-4 py-3 sm:py-4 hover:bg-mint-medium/30 active:bg-mint-medium/50 transition-colors cursor-pointer touch-manipulation"
              role="button"
              tabIndex={0}
              aria-label={`Contact ${contact.name}, ${contact.phone}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  // Handle contact selection
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
                <p className="text-forest-dark text-sm sm:text-base font-medium leading-tight truncate">{contact.name}</p>
                <p className="text-mint-dark text-xs sm:text-sm font-normal leading-tight mt-0.5 truncate">
                  {contact.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col items-center p-4 bg-mint-light rounded-lg hover:bg-mint-medium/30 active:bg-mint-medium/50 transition-colors cursor-pointer touch-manipulation"
              role="button"
              tabIndex={0}
              aria-label={`Contact ${contact.name}, ${contact.phone}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  // Handle contact selection
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
                <p className="text-forest-dark text-base font-medium leading-tight">{contact.name}</p>
                <p className="text-mint-dark text-sm font-normal leading-tight mt-1">{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
