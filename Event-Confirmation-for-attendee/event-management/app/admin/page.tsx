"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, UserCheck, UserX, Clock, Search, Download, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Attendee {
  id: string
  name: string
  email: string
  registrationDate: string
  confirmationStatus: "pending" | "confirmed" | "cancelled"
  confirmationDate?: string
}

export default function AdminDashboard() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in real app, this would come from an API
  useEffect(() => {
    const mockAttendees: Attendee[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        registrationDate: "2024-02-15",
        confirmationStatus: "confirmed",
        confirmationDate: "2024-03-10",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        registrationDate: "2024-02-18",
        confirmationStatus: "pending",
      },
      {
        id: "3",
        name: "Mike Johnson",
        email: "mike@example.com",
        registrationDate: "2024-02-20",
        confirmationStatus: "confirmed",
        confirmationDate: "2024-03-11",
      },
      {
        id: "4",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        registrationDate: "2024-02-22",
        confirmationStatus: "cancelled",
        confirmationDate: "2024-03-12",
      },
      {
        id: "5",
        name: "David Brown",
        email: "david@example.com",
        registrationDate: "2024-02-25",
        confirmationStatus: "pending",
      },
    ]

    setTimeout(() => {
      setAttendees(mockAttendees)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    total: attendees.length,
    confirmed: attendees.filter((a) => a.confirmationStatus === "confirmed").length,
    pending: attendees.filter((a) => a.confirmationStatus === "pending").length,
    cancelled: attendees.filter((a) => a.confirmationStatus === "cancelled").length,
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Registration Date", "Status", "Confirmation Date"],
      ...attendees.map((a) => [a.name, a.email, a.registrationDate, a.confirmationStatus, a.confirmationDate || "N/A"]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "event-attendees.csv"
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            Back to Event Page
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management Dashboard</h1>
          <p className="text-gray-600">Monitor registrations and attendance confirmations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.confirmed / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.cancelled / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Attendees List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Attendee List</CardTitle>
                <CardDescription>Manage and monitor all event registrations</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={handleExport} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Loading attendees...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">Registration Date</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Confirmation Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttendees.map((attendee) => (
                      <tr key={attendee.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{attendee.name}</td>
                        <td className="py-3 px-4 text-gray-600">{attendee.email}</td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(attendee.registrationDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(attendee.confirmationStatus)}</td>
                        <td className="py-3 px-4 text-gray-600">
                          {attendee.confirmationDate ? new Date(attendee.confirmationDate).toLocaleDateString() : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredAttendees.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No attendees found matching your search.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
