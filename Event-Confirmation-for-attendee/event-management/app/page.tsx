import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tech Innovation Summit 2024</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join industry leaders and innovators for a day of cutting-edge technology discussions, networking, and
            insights into the future of tech.
          </p>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>March 15, 2024</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Convention Center, Downtown</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-gray-500" />
                <span>500+ Expected Attendees</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Keynote speeches from industry leaders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Interactive workshops and demos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Networking opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Exhibition of latest technologies</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="space-x-4">
            <Link href="/confirm-attendance">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Confirm Your Attendance
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="lg">
                Event Management
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            Already registered? Please confirm your attendance by the day before the event.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mt-12 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800">Important Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700">
              All registered attendees must confirm their attendance by <strong>March 14, 2024</strong> to secure their
              spot. Unconfirmed registrations may be released to waitlisted participants.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
