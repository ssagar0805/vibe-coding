"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

interface ContactHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ContactHeader({ searchQuery, onSearchChange }: ContactHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-mint-light">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 pb-2">
        <div className="flex-1 flex justify-center">
          <h1 className="text-forest-dark text-lg sm:text-xl font-bold leading-tight tracking-tight">Contacts</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 sm:h-12 sm:w-12 text-forest-dark hover:bg-mint-medium/30 transition-colors"
          aria-label="Add contact"
        >
          <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 sm:px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 h-5 w-5 sm:h-6 sm:w-6 -translate-y-1/2 text-mint-dark" />
          <Input
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 sm:h-12 pl-10 sm:pl-12 bg-mint-medium border-none text-forest-dark placeholder:text-mint-dark focus-visible:ring-2 focus-visible:ring-mint-dark focus-visible:ring-offset-0 rounded-lg text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  )
}
