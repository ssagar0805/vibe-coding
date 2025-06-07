"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Settings, LogOut } from "lucide-react"

export function UserProfilePage() {
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
            Profile
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full">
          {/* Profile Section */}
          <div className="flex p-4 sm:p-6 lg:p-8">
            <div className="flex w-full flex-col lg:flex-row gap-8">
              {/* Left Column - Profile Info */}
              <div className="flex flex-col gap-6 lg:w-1/3">
                <div className="flex flex-col items-center lg:items-start gap-4">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
                    <AvatarImage
                      src="/placeholder.svg?height=160&width=160"
                      alt="Sophia Carter's profile picture"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-mint-dark text-white font-bold text-2xl sm:text-3xl lg:text-4xl">SC</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h2 className="text-forest-dark text-xl sm:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                      Sophia Carter
                    </h2>
                    <p className="text-mint-dark text-sm sm:text-base lg:text-lg font-normal leading-normal mt-1">
                      sophia.carter@email.com
                    </p>
                  </div>
                </div>

                {/* Desktop Quick Actions */}
                <div className="hidden lg:flex flex-col gap-2">
                  <Button variant="outline" className="justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>

              {/* Right Column - Contact Details */}
              <div className="flex flex-col gap-6 lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-forest-dark text-lg font-bold leading-tight tracking-tight mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center rounded-lg bg-mint-medium shrink-0 h-10 w-10">
                        <Phone className="h-5 w-5 text-forest-dark" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-forest-dark text-sm font-medium">Phone</p>
                        <p className="text-mint-dark text-sm">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center rounded-lg bg-mint-medium shrink-0 h-10 w-10">
                        <Mail className="h-5 w-5 text-forest-dark" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-forest-dark text-sm font-medium">Email</p>
                        <p className="text-mint-dark text-sm">sophia.carter@email.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center rounded-lg bg-mint-medium shrink-0 h-10 w-10">
                        <MapPin className="h-5 w-5 text-forest-dark" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-forest-dark text-sm font-medium">Location</p>
                        <p className="text-mint-dark text-sm">San Francisco, CA</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center rounded-lg bg-mint-medium shrink-0 h-10 w-10">
                        <Calendar className="h-5 w-5 text-forest-dark" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-forest-dark text-sm font-medium">Member Since</p>
                        <p className="text-mint-dark text-sm">January 2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Section - Desktop Only */}
                <div className="hidden lg:block bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-forest-dark text-lg font-bold leading-tight tracking-tight mb-4">About</h3>
                  <p className="text-mint-dark text-sm leading-relaxed">
                    Software engineer with a passion for building user-friendly applications. 
                    Currently working on cloud-based solutions and mobile development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Button - Mobile Only */}
      <div className="lg:hidden sticky bottom-0 bg-mint-light border-t border-mint-medium/50">
        <div className="flex px-3 sm:px-4 py-3">
          <Button className="flex-1 h-10 sm:h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base">
            Edit Profile
          </Button>
        </div>
        <div className="h-safe bg-mint-light" />
      </div>

      {/* Desktop Edit Button */}
      <div className="hidden lg:block sticky bottom-0 bg-mint-light border-t border-mint-medium/50">
        <div className="max-w-7xl mx-auto w-full px-8 py-4">
          <Button className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
