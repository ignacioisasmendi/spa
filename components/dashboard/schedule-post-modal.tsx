"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"

export enum Platform {
  INSTAGRAM = "INSTAGRAM",
  FACEBOOK = "FACEBOOK",
  X = "X",
  TIKTOK = "TIKTOK",
}

export enum ContentFormat {
  FEED = "FEED",
  REEL = "REEL",
  STORY = "STORY",
  VIDEO = "VIDEO",
}

interface SchedulePostModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  onSuccess?: () => void
}

interface FormData {
  title: string
  platform: Platform
  format: ContentFormat
  time: string
  imageUrl: string
  caption: string
}

export function SchedulePostModal({
  isOpen,
  onClose,
  selectedDate,
  onSuccess,
}: SchedulePostModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    platform: Platform.INSTAGRAM,
    format: ContentFormat.FEED,
    time: "09:00",
    imageUrl: "",
    caption: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const publishAt = selectedDate
        ? `${selectedDate.toISOString().split("T")[0]}T${formData.time}:00`
        : undefined

      // Build the payload object
      const payload = {
        image_url: formData.imageUrl,
        caption: formData.caption,
      }

      const res = await fetch(
        `/api/publications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            platform: formData.platform,
            format: formData.format,
            publishAt: publishAt,
            payload: payload,
          }),
        }
      )

      if (res.ok) {
        // Success - close modal and reset form
        handleClose()
        console.log("Post scheduled successfully!")
        // Call onSuccess callback to refresh calendar
        if (onSuccess) {
          onSuccess()
        }
        // You can add a toast notification here
      } else {
        const errorData = await res.json().catch(() => ({}))
        setError(errorData.message || "Failed to schedule post")
      }
    } catch (error) {
      console.error("Error scheduling post:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      title: "",
      platform: Platform.INSTAGRAM,
      format: ContentFormat.FEED,
      time: "09:00",
      imageUrl: "",
      caption: "",
    })
    setError(null)
    onClose()
  }

  const handlePlatformChange = (platform: Platform) => {
    setFormData({ ...formData, platform })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Social Media Post</DialogTitle>
          <DialogDescription>
            {selectedDate && (
              <span className="inline-flex items-center gap-2 text-foreground">
                <CalendarIcon className="h-4 w-4" />
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., New Product Launch"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* Platform */}
            <div className="grid gap-2">
              <Label htmlFor="platform">
                Platform <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.platform}
                onValueChange={handlePlatformChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Platform.INSTAGRAM}>Instagram</SelectItem>
                  <SelectItem value={Platform.FACEBOOK}>Facebook</SelectItem>
                  <SelectItem value={Platform.X}>X (Twitter)</SelectItem>
                  <SelectItem value={Platform.TIKTOK}>TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Format */}
            <div className="grid gap-2">
              <Label htmlFor="format">
                Format <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.format}
                onValueChange={(value) =>
                  setFormData({ ...formData, format: value as ContentFormat })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ContentFormat.FEED}>Feed Post</SelectItem>
                  <SelectItem value={ContentFormat.REEL}>Reel</SelectItem>
                  <SelectItem value={ContentFormat.STORY}>Story</SelectItem>
                  <SelectItem value={ContentFormat.VIDEO}>Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time */}
            <div className="grid gap-2">
              <Label htmlFor="time">
                Publish Time <span className="text-destructive">*</span>
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">
                Image URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </div>

            {/* Caption */}
            <div className="grid gap-2">
              <Label htmlFor="caption">
                Caption <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="caption"
                placeholder="Write your Instagram caption..."
                value={formData.caption}
                onChange={(e) =>
                  setFormData({ ...formData, caption: e.target.value })
                }
                required
                className="min-h-[120px]"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Scheduling..." : "Schedule Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
