"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  ImageIcon,
  Share2,
  Plus,
  Search,
  Bell,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

interface DashboardTopbarProps {
  onMenuClick?: () => void;
}

export function DashboardTopbar({ onMenuClick }: DashboardTopbarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [filterPlatforms, setFilterPlatforms] = useState<string[]>([])

  const currentMonth = months[currentDate.getMonth()]
  const currentYear = currentDate.getFullYear()

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const togglePlatform = (platform: string) => {
    setFilterPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
      {/* Left Section - Breadcrumb & Calendar Nav */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Content</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground">Calendar</span>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center gap-1 lg:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={goToPreviousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs lg:text-sm font-semibold text-foreground min-w-[100px] lg:min-w-[140px] text-center">
              {currentMonth} {currentYear}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={goToNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="ml-1 lg:ml-2 h-8 text-xs bg-transparent"
            onClick={goToToday}
          >
            Today
          </Button>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Search - Hidden on small screens */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            className="h-9 w-32 lg:w-48 pl-9 text-sm"
          />
        </div>

        {/* Search Icon for mobile */}
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
          <Search className="h-4 w-4" />
        </Button>

        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
              {filterPlatforms.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {filterPlatforms.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Platforms
            </div>
            <DropdownMenuCheckboxItem
              checked={filterPlatforms.includes("instagram")}
              onCheckedChange={() => togglePlatform("instagram")}
            >
              Instagram
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterPlatforms.includes("tiktok")}
              onCheckedChange={() => togglePlatform("tiktok")}
            >
              TikTok
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterPlatforms.includes("facebook")}
              onCheckedChange={() => togglePlatform("facebook")}
            >
              Facebook
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterPlatforms.includes("linkedin")}
              onCheckedChange={() => togglePlatform("linkedin")}
            >
              LinkedIn
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterPlatforms.includes("x")}
              onCheckedChange={() => togglePlatform("x")}
            >
              X (Twitter)
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Status
            </div>
            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Scheduled</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Published</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Media Library - Hidden on small screens */}
        <Button variant="outline" size="sm" className="hidden lg:flex h-9 gap-2 bg-transparent">
          <ImageIcon className="h-4 w-4" />
          Media
        </Button>

        {/* Share - Hidden on small screens */}
        <Button variant="outline" size="sm" className="hidden xl:flex h-9 gap-2 bg-transparent">
          <Share2 className="h-4 w-4" />
          Share
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {/* Compose CTA */}
        <Button size="sm" className="h-9 gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Compose</span>
        </Button>
      </div>
    </header>
  )
}
