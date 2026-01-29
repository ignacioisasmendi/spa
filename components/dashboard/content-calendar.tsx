"use client"

import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit2, Copy, Trash2, Clock, CheckCircle2, FileEdit, ExternalLink } from "lucide-react"
import { SchedulePostModal } from "./schedule-post-modal"
type PostStatus = "draft" | "scheduled" | "published"
type Platform = "instagram" | "tiktok" | "facebook" | "linkedin" | "x"

interface ContentPost {
  id: string
  title: string
  platform: Platform
  status: PostStatus
  time?: string
  thumbnail?: string
  link?: string
}

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  posts: ContentPost[]
}

// API Response interfaces
interface Publication {
  id: string
  contentId: string
  platform: string
  format: string
  publishAt: string
  status: string
  error: string | null
  payload: any
  createdAt: string
  link?: string
  content: {
    id: string
    title: string
    createdAt: string
  }
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Transform API publication to ContentPost
function transformPublication(publication: Publication): ContentPost {
  const publishDate = new Date(publication.publishAt)
  const hours = publishDate.getHours()
  const minutes = publishDate.getMinutes()
  const ampm = hours >= 12 ? "PM" : "AM"
  const displayHours = hours % 12 || 12
  const time = `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`

  // Map platform from API (uppercase) to lowercase
  const platformMap: Record<string, Platform> = {
    INSTAGRAM: "instagram",
    TIKTOK: "tiktok",
    FACEBOOK: "facebook",
    LINKEDIN: "linkedin",
    X: "x",
  }

  // Map status from API (uppercase) to lowercase
  const statusMap: Record<string, PostStatus> = {
    PUBLISHED: "published",
    SCHEDULED: "scheduled",
    DRAFT: "draft",
    PENDING: "scheduled",
  }

  return {
    id: publication.id,
    title: publication.content.title,
    platform: platformMap[publication.platform] || "instagram",
    status: statusMap[publication.status] || "scheduled",
    time: time,
    link: publication.link,
  }
}

// Group publications by day of month
function groupPublicationsByDay(
  publications: Publication[],
  year: number,
  month: number
): Record<number, ContentPost[]> {
  const grouped: Record<number, ContentPost[]> = {}

  publications.forEach((publication) => {
    const publishDate = new Date(publication.publishAt)
    
    // Only include publications from the current month
    if (
      publishDate.getFullYear() === year &&
      publishDate.getMonth() === month
    ) {
      const day = publishDate.getDate()
      if (!grouped[day]) {
        grouped[day] = []
      }
      grouped[day].push(transformPublication(publication))
    }
  })

  return grouped
}

function getCalendarDays(
  year: number,
  month: number,
  postsData: Record<number, ContentPost[]>
): CalendarDay[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  const today = new Date()

  const days: CalendarDay[] = []

  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: false,
      posts: [],
    })
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      today.getDate() === i &&
      today.getMonth() === month &&
      today.getFullYear() === year

    days.push({
      date: i,
      isCurrentMonth: true,
      isToday,
      posts: postsData[i] || [],
    })
  }

  // Next month days
  const remainingDays = 42 - days.length // 6 weeks * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      isToday: false,
      posts: [],
    })
  }

  return days
}

export function ContentCalendar() {
  const [currentDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [publications, setPublications] = useState<Publication[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch publications from API
  useEffect(() => {
    const fetchPublications = async () => {
      const response = await fetch('/api/publications')
      const data = await response.json()
      setPublications(data)
      setIsLoading(false)
    }

    fetchPublications()
  }, [])

  const postsData = useMemo(
    () =>
      groupPublicationsByDay(
        publications,
        currentDate.getFullYear(),
        currentDate.getMonth()
      ),
    [publications, currentDate]
  )

  const calendarDays = useMemo(
    () =>
      getCalendarDays(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        postsData
      ),
    [currentDate, postsData]
  )

  const handleAddPost = (date: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    )
    setSelectedDate(newDate)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    // Refetch publications after closing modal (in case a new post was added)
    fetchPublicationsData()
  }

  const fetchPublicationsData = async () => {
    const response = await fetch('/api/publications')
    const data = await response.json()
    setPublications(data)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card">
        <p className="text-muted-foreground">Loading calendar...</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex h-full flex-col rounded-xl border border-border bg-card">
        {/* Week Header */}
        <div className="grid grid-cols-7 border-b border-border">
          {weekDays.map((day) => (
            <div
              key={day}
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid flex-1 grid-cols-7 grid-rows-6">
          {calendarDays.map((day, index) => (
            <CalendarCell key={index} day={day} onAddPost={handleAddPost} />
          ))}
        </div>
      </div>

      <SchedulePostModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedDate={selectedDate}
        onSuccess={fetchPublicationsData}
      />
    </>
  )
}

function CalendarCell({ day, onAddPost }: { day: CalendarDay; onAddPost: (date: number) => void }) {
  const visiblePosts = day.posts.slice(0, 3)
  const remainingCount = day.posts.length - 3

  return (
    <div
      className={cn(
        "group relative flex flex-col border-b border-r border-border p-2 transition-colors hover:bg-muted/30",
        !day.isCurrentMonth && "bg-muted/20",
        day.isToday && "bg-primary/5"
      )}
    >
      {/* Date Number */}
      <div className="mb-1 flex items-center justify-between">
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full text-sm",
            day.isToday
              ? "bg-primary font-semibold text-primary-foreground"
              : day.isCurrentMonth
                ? "text-foreground"
                : "text-muted-foreground"
          )}
        >
          {day.date}
        </span>
        {day.isCurrentMonth && (
          <button 
            onClick={() => onAddPost(day.date)}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
          >
            <span className="text-lg leading-none">+</span>
          </button>
        )}
      </div>

      {/* Posts */}
      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        {visiblePosts.map((post) => (
          <ContentCard key={post.id} post={post} />
        ))}
        {remainingCount > 0 && (
          <button className="mt-auto text-left text-xs font-medium text-muted-foreground hover:text-foreground">
            +{remainingCount} more
          </button>
        )}
      </div>
    </div>
  )
}

function ContentCard({ post }: { post: ContentPost }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "group/card flex w-full items-start gap-1.5 rounded-md border px-2 py-1.5 text-left transition-all hover:shadow-sm",
            post.status === "draft" && "border-border bg-muted/50",
            post.status === "scheduled" && "border-primary/20 bg-primary/5",
            post.status === "published" && "border-[color:var(--success)]/20 bg-[color:var(--success)]/5"
          )}
        >
          <PlatformIcon platform={post.platform} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              {post.title}
            </p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <StatusBadge status={post.status} />
              {post.time && (
                <span className="text-[10px] text-muted-foreground">{post.time}</span>
              )}
            </div>
          </div>
          <MoreHorizontal className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/card:opacity-100" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {post.link && (
          <>
            <DropdownMenuItem asChild>
              <a 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Post
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>
          <Edit2 className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PlatformIcon({ platform }: { platform: Platform }) {
  const baseClass = "h-4 w-4 shrink-0 rounded"
  
  switch (platform) {
    case "instagram":
      return (
        <div className={cn(baseClass, "flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500")}>
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
      )
    case "tiktok":
      return (
        <div className={cn(baseClass, "flex items-center justify-center bg-black")}>
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </div>
      )
    case "facebook":
      return (
        <div className={cn(baseClass, "flex items-center justify-center bg-blue-600")}>
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      )
    case "linkedin":
      return (
        <div className={cn(baseClass, "flex items-center justify-center bg-blue-700")}>
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
      )
    case "x":
      return (
        <div className={cn(baseClass, "flex items-center justify-center bg-black")}>
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
      )
  }
}

function StatusBadge({ status }: { status: PostStatus }) {
  switch (status) {
    case "draft":
      return (
        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <FileEdit className="h-2.5 w-2.5" />
          Draft
        </span>
      )
    case "scheduled":
      return (
        <span className="inline-flex items-center gap-1 text-[10px] text-primary">
          <Clock className="h-2.5 w-2.5" />
          Scheduled
        </span>
      )
    case "published":
      return (
        <span className="inline-flex items-center gap-1 text-[10px] text-[color:var(--success)]">
          <CheckCircle2 className="h-2.5 w-2.5" />
          Published
        </span>
      )
  }
}
