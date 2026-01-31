"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutGrid,
  BarChart3,
  MessageSquare,
  Megaphone,
  ChevronDown,
  Settings,
  HelpCircle,
  Plus,
  LogOutIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const mainNavItems = [
  { icon: LayoutGrid, label: "Content", href: "/dashboard", active: true },
  { icon: Megaphone, label: "Campaigns", href: "/dashboard/campaigns" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: MessageSquare, label: "Engagement", href: "/dashboard/engagement" },
]

const socialChannels = [
  { name: "Instagram", handle: "@socialflow", icon: "/social-media-icons/instagram-circle.svg" },
  { name: "TikTok", handle: "@socialflow", icon: "/social-media-icons/tiktok-circle.svg" },
  { name: "Facebook", handle: "SocialFlow", icon: "/social-media-icons/facebook-circle.svg" },
  { name: "LinkedIn", handle: "SocialFlow Inc", icon: "/social-media-icons/linkedin-circle.svg" },
  { name: "X", handle: "@socialflow", icon: "/social-media-icons/twitter-circle.svg" },
]

interface DashboardSidebarProps {
  user?: {
    name?: string;
    email?: string;
    picture?: string;
    nickname?: string;
  };
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Helper function to get user initials
function getUserInitials(name?: string, email?: string): string {
  if (name) {
    const nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  if (email) {
    return email.substring(0, 2).toUpperCase();
  }
  return 'U';
}

export function DashboardSidebar({ user, isOpen = true, onOpenChange }: DashboardSidebarProps) {
  const [activeNav, setActiveNav] = useState("Content")
  const [isCollapsed, setIsCollapsed] = useState(false)

  const logoutUrl = `/auth/logout?returnTo=${encodeURIComponent(process.env.NEXT_PUBLIC_LANDING_URL || '')}`;
  
  // Get user display values
  const displayName = user?.name || user?.nickname || user?.email?.split('@')[0] || 'Usuario';
  const displayEmail = user?.email || '';
  const userInitials = getUserInitials(user?.name, user?.email);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Sidebar content component to reuse in both desktop and mobile
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Workspace Selector */}
      <div className="border-b border-border p-4">
        {!isCollapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between px-3 py-2 h-auto"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
                    SF
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">SocialFlow</p>
                    <p className="text-xs text-muted-foreground">Pro Plan</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-xs">
                    SF
                  </div>
                  <span>SocialFlow</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-semibold text-xs">
                    AC
                  </div>
                  <span>Acme Corp</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                Add Workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {isCollapsed && (
          <div className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
              SF
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="p-3">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Tooltip key={item.label} delayDuration={isCollapsed ? 0 : 1000}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    setActiveNav(item.label)
                    if (isMobile && onOpenChange) {
                      onOpenChange(false)
                    }
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    activeNav === item.label
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && item.label}
                </button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
      </div>

      {/* Channels Section */}
      <div className="flex-1 overflow-hidden border-t border-border">
        <div className="flex items-center justify-between px-4 py-3">
          {!isCollapsed && (
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Channels
            </span>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/connect-social" className={cn(isCollapsed && "mx-auto")}>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Connect social media</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ScrollArea className="h-[calc(100%-48px)] px-3">
          <div className="space-y-1 pb-3">
            {socialChannels.map((channel) => (
              <Tooltip key={channel.name} delayDuration={isCollapsed ? 0 : 1000}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      if (isMobile && onOpenChange) {
                        onOpenChange(false)
                      }
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <Image 
                      src={channel.icon} 
                      alt={`${channel.name} icon`} 
                      width={28} 
                      height={28}
                      className="object-contain shrink-0"
                    />
                    {!isCollapsed && (
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">{channel.name}</p>
                        <p className="text-xs text-muted-foreground">{channel.handle}</p>
                      </div>
                    )}
                  </button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{channel.name}</p>
                    <p className="text-xs text-muted-foreground">{channel.handle}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border p-3">
        <div className="space-y-1">
          <Tooltip delayDuration={isCollapsed ? 0 : 1000}>
            <TooltipTrigger asChild>
              <button 
                onClick={() => {
                  if (isMobile && onOpenChange) {
                    onOpenChange(false)
                  }
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <Settings className="h-5 w-5 shrink-0" />
                {!isCollapsed && "Settings"}
              </button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            )}
          </Tooltip>
          <Tooltip delayDuration={isCollapsed ? 0 : 1000}>
            <TooltipTrigger asChild>
              <button 
                onClick={() => {
                  if (isMobile && onOpenChange) {
                    onOpenChange(false)
                  }
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <HelpCircle className="h-5 w-5 shrink-0" />
                {!isCollapsed && "Help & Support"}
              </button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Help & Support</p>
              </TooltipContent>
            )}
          </Tooltip>
          <Tooltip delayDuration={isCollapsed ? 0 : 1000}>
            <TooltipTrigger asChild>
              <button 
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <LogOutIcon className="h-5 w-5 shrink-0" />
                <a href={logoutUrl} className={cn(isCollapsed && "sr-only")}>
                  Log out
                </a>
              </button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Log out</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
        {!isCollapsed && (
          <div className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.picture || "/avatar.jpg"} alt={displayName} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-medium text-foreground truncate">
                {displayName}
              </p>
              {displayEmail && (
                <p className="text-xs text-muted-foreground truncate">
                  {displayEmail}
                </p>
              )}
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="mt-3 flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user?.picture || "/avatar.jpg"} alt={displayName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{displayName}</p>
                {displayEmail && <p className="text-xs text-muted-foreground">{displayEmail}</p>}
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="p-0 w-64 lg:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <SidebarContent isMobile={true} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden lg:flex h-full flex-col border-r border-border bg-card transition-all duration-300 relative",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent />
        
        {/* Collapse/Expand Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-border bg-background shadow-sm hover:bg-accent z-10"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </aside>
    </>
  )
}
