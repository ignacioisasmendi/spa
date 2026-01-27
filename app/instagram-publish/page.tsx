"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export default function InstagramPublishPage() {
  // Publish Now state
  const [imageUrl, setImageUrl] = useState("")
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null)

  // Schedule state
  const [scheduleImageUrl, setScheduleImageUrl] = useState("")
  const [scheduleCaption, setScheduleCaption] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [scheduleLoading, setScheduleLoading] = useState(false)
  const [scheduleResponse, setScheduleResponse] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch("http://localhost:3000/instagram/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: caption,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setResponse({ success: true, message: "Successfully published to Instagram!" })
        setImageUrl("")
        setCaption("")
      } else {
        setResponse({ success: false, message: data.message || "Failed to publish" })
      }
    } catch (error) {
      setResponse({ success: false, message: error instanceof Error ? error.message : "An error occurred" })
    } finally {
      setLoading(false)
    }
  }

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setScheduleLoading(true)
    setScheduleResponse(null)

    if (!selectedDate || !selectedTime) {
      setScheduleResponse({ success: false, message: "Please select both date and time" })
      setScheduleLoading(false)
      return
    }

    try {
      // Combine date and time into ISO string
      const [hours, minutes] = selectedTime.split(":")
      const publishDate = new Date(selectedDate)
      publishDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      const publishAt = publishDate.toISOString()

      const res = await fetch("http://localhost:3000/instagram/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mediaUrl: scheduleImageUrl,
          caption: scheduleCaption,
          publishAt: publishAt,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setScheduleResponse({ success: true, message: "Successfully scheduled for Instagram!" })
        setScheduleImageUrl("")
        setScheduleCaption("")
        setSelectedDate(undefined)
        setSelectedTime("")
      } else {
        setScheduleResponse({ success: false, message: data.message || "Failed to schedule" })
      }
    } catch (error) {
      setScheduleResponse({ success: false, message: error instanceof Error ? error.message : "An error occurred" })
    } finally {
      setScheduleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Instagram Publisher</CardTitle>
          <CardDescription>
            Publish or schedule images to Instagram
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="publish" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="publish" className="flex-1">
                Publish Now
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex-1">
                Schedule Post
              </TabsTrigger>
            </TabsList>

            <TabsContent value="publish" className="mt-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caption">Caption</Label>
                    <Textarea
                      id="caption"
                      placeholder="Enter your caption here..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      required
                      rows={4}
                    />
                  </div>

                  {response && (
                    <div
                      className={`p-4 rounded-md ${
                        response.success
                          ? "bg-success/10 text-success border border-success/20"
                          : "bg-destructive/10 text-destructive border border-destructive/20"
                      }`}
                    >
                      {response.message}
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImageUrl("")
                        setCaption("")
                        setResponse(null)
                      }}
                      disabled={loading}
                    >
                      Clear
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Publishing..." : "Publish to Instagram"}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <form onSubmit={handleScheduleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-image-url">Image URL</Label>
                    <Input
                      id="schedule-image-url"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={scheduleImageUrl}
                      onChange={(e) => setScheduleImageUrl(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schedule-caption">Caption</Label>
                    <Textarea
                      id="schedule-caption"
                      placeholder="Enter your caption here..."
                      value={scheduleCaption}
                      onChange={(e) => setScheduleCaption(e.target.value)}
                      required
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              !selectedDate && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              selectedDate.toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="schedule-time">Select Time</Label>
                      <Input
                        id="schedule-time"
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                      />
                      {selectedDate && selectedTime && (
                        <div className="mt-4 p-4 bg-muted rounded-md">
                          <p className="text-sm font-medium mb-2">Scheduled for:</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            at {selectedTime}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {scheduleResponse && (
                    <div
                      className={`p-4 rounded-md ${
                        scheduleResponse.success
                          ? "bg-success/10 text-success border border-success/20"
                          : "bg-destructive/10 text-destructive border border-destructive/20"
                      }`}
                    >
                      {scheduleResponse.message}
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setScheduleImageUrl("")
                        setScheduleCaption("")
                        setSelectedDate(undefined)
                        setSelectedTime("")
                        setScheduleResponse(null)
                      }}
                      disabled={scheduleLoading}
                    >
                      Clear
                    </Button>
                    <Button type="submit" disabled={scheduleLoading}>
                      {scheduleLoading ? "Scheduling..." : "Schedule Post"}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
