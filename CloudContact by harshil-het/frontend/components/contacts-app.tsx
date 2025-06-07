"use client"

import { useState } from "react"
import { ContactHeader } from "./contact-header"
import { ContactList } from "./contact-list"
import { ManageContactsPage } from "./manage-contacts-page"
import { UserProfilePage } from "./user-profile-page"
import { BottomNavigation } from "./bottom-navigation"

const contacts = [
  {
    id: 1,
    name: "Sophia Clark",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 2,
    name: "Ethan Miller",
    phone: "+1 (555) 987-6543",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 3,
    name: "Olivia Davis",
    phone: "+1 (555) 246-8013",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 4,
    name: "Noah Wilson",
    phone: "+1 (555) 135-7911",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 5,
    name: "Ava Thompson",
    phone: "+1 (555) 369-2580",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 6,
    name: "Liam Harris",
    phone: "+1 (555) 789-0123",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 7,
    name: "Isabella Martin",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 8,
    name: "Jackson Garcia",
    phone: "+1 (555) 654-3210",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 9,
    name: "Mia Lopez",
    phone: "+1 (555) 111-2222",
    avatar: "/placeholder.svg?height=56&width=56",
  },
  {
    id: 10,
    name: "Lucas Clark",
    phone: "+1 (555) 333-4444",
    avatar: "/placeholder.svg?height=56&width=56",
  },
]

export function ContactsApp() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("contacts")

  const filteredContacts = contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery),
  )

  const renderContent = () => {
    switch (activeTab) {
      case "contacts":
        return (
          <>
            <ContactHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <div className="flex-1 overflow-y-auto pb-safe">
              <ContactList contacts={filteredContacts} />
            </div>
          </>
        )
      case "manage":
        return <ManageContactsPage />
      case "profile":
        return <UserProfilePage />
      default:
        return null
    }
  }

  return (
    <div className="relative flex min-h-screen bg-mint-light font-system">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200">
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-semibold text-gray-900">Cloud Contacts</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <button
                onClick={() => setActiveTab("contacts")}
                className={`${
                  activeTab === "contacts"
                    ? "bg-mint-light text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                Contacts
              </button>
              <button
                onClick={() => setActiveTab("manage")}
                className={`${
                  activeTab === "manage"
                    ? "bg-mint-light text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                Manage Contacts
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`${
                  activeTab === "profile"
                    ? "bg-mint-light text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                Profile
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="flex-1 relative">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  )
}
