"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ConfirmAttendancePage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [registrationId, setRegistrationId] = useState("")
  const [firstConfirmation, setFirstConfirmation] = useState("")
  const [secondConfirmation, setSecondConfirmation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [attendeeInfo, setAttendeeInfo] = useState<any>(null)

  const handleVerifyRegistration = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Mock attendee data
      setAttendeeInfo({
        name: "John Doe",
        email: email,
        registrationId: registrationId,
        eventName: "Tech Innovation Summit 2024",
        eventDate: "March 15, 2024",
      })
      setStep(2)
      setIsLoading(false)
    }, 1000)
  }

  const handleFirstConfirmation = () => {
    if (firstConfirmation) {
      setStep(3)
    }
  }

  const handleFinalConfirmation = async () => {
    setIsLoading(true)
    // Simulate API call to save confirmation
    setTimeout(() => {
      setStep(4)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            Back to Event Details
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Confirm Your Attendance</CardTitle>
            <CardDescription>Please verify your registration and confirm your attendance for the event</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationId">Registration ID</Label>
                  <Input
                    id="registrationId"
                    placeholder="Enter your registration ID"
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleVerifyRegistration}
                  disabled={!email || !registrationId || isLoading}
                  className="w-full"
                >
                  {isLoading ? "Verifying..." : "Verify Registration"}
                </Button>
              </div>
            )}

            {step === 2 && attendeeInfo && (
              <div className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>Registration verified successfully!</AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Registration Details</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {attendeeInfo.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {attendeeInfo.email}
                    </p>
                    <p>
                      <strong>Event:</strong> {attendeeInfo.eventName}
                    </p>
                    <p>
                      <strong>Date:</strong> {attendeeInfo.eventDate}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Will you be attending the event? (First Confirmation)</Label>
                  <RadioGroup value={firstConfirmation} onValueChange={setFirstConfirmation}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes1" />
                      <Label htmlFor="yes1">Yes, I will attend</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no1" />
                      <Label htmlFor="no1">No, I cannot attend</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button onClick={handleFirstConfirmation} disabled={!firstConfirmation} className="w-full">
                  Continue
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {firstConfirmation === "yes" ? (
                  <>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>Please confirm once more to finalize your attendance.</AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <Label className="text-base font-medium">
                        Final Confirmation: Are you sure you will attend the event?
                      </Label>
                      <RadioGroup value={secondConfirmation} onValueChange={setSecondConfirmation}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="confirmed" id="confirmed" />
                          <Label htmlFor="confirmed">Yes, I confirm my attendance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cancel" id="cancel" />
                          <Label htmlFor="cancel">No, I need to cancel</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      onClick={handleFinalConfirmation}
                      disabled={!secondConfirmation || isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Processing..." : "Submit Final Confirmation"}
                    </Button>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        We're sorry you can't attend. Your registration has been cancelled.
                      </AlertDescription>
                    </Alert>
                    <Button onClick={() => setStep(1)} variant="outline">
                      Start Over
                    </Button>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-xl font-semibold text-green-700">
                  {secondConfirmation === "confirmed" ? "Attendance Confirmed!" : "Registration Cancelled"}
                </h3>
                <p className="text-gray-600">
                  {secondConfirmation === "confirmed"
                    ? "Thank you for confirming your attendance. We look forward to seeing you at the event!"
                    : "Your registration has been cancelled. Thank you for letting us know."}
                </p>
                <Button onClick={() => (window.location.href = "/")} className="mt-4">
                  Return to Event Page
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
