"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Plus,
  Trash2,
  Download,
  Search,
  Eye,
  EyeOff,
  Calendar,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Check,
  X,
  AlertCircle,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ComponentsSection() {
  const [activeTab, setActiveTab] = useState("buttons")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("week")
  const [switchValue, setSwitchValue] = useState(true)

  const componentTabs = [
    { id: "buttons", label: "Buttons" },
    { id: "inputs", label: "Inputs" },
    { id: "selects", label: "Selects" },
    { id: "tabs", label: "Tabs & Filters" },
    { id: "switches", label: "Switches" },
    { id: "badges", label: "Badges" },
    { id: "cards", label: "Cards" },
    { id: "tables", label: "Tables" },
    { id: "calendar", label: "Calendar" },
    { id: "modals", label: "Modals & Toast" },
    { id: "loading", label: "Loading" },
    { id: "empty", label: "Empty States" },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
            Components
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
            UI components with variants, states, and usage guidelines.
          </p>
        </div>

        {/* Component Navigation */}
        <div className="border-b border-border overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {componentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        {activeTab === "buttons" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Button Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    With Icons
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Icon Only
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add new</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="outline">
                          <Search className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Search</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Calendar</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    States
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button className="hover:bg-primary/90">Hover</Button>
                    <Button disabled>Disabled</Button>
                    <Button disabled>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Sizes
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Button Specs</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Property</th>
                      <th className="text-left py-2 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-muted-foreground">
                    <tr>
                      <td className="py-2">Height</td>
                      <td className="py-2 font-mono text-xs">
                        36px (sm) / 40px (md) / 44px (lg)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Padding</td>
                      <td className="py-2 font-mono text-xs">
                        10px 16px (horizontal)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Border Radius</td>
                      <td className="py-2 font-mono text-xs">6px (md)</td>
                    </tr>
                    <tr>
                      <td className="py-2">Font</td>
                      <td className="py-2 font-mono text-xs">
                        14px / 500 weight
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Transition</td>
                      <td className="py-2 font-mono text-xs">150ms ease-out</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Inputs */}
        {activeTab === "inputs" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Input Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Default Input</Label>
                    <Input placeholder="Enter text..." />
                  </div>

                  <div className="space-y-2">
                    <Label>With Helper Text</Label>
                    <Input placeholder="username" />
                    <p className="text-xs text-muted-foreground">
                      Choose a unique username
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Search posts..." />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-destructive">Error State</Label>
                    <Input
                      className="border-destructive focus-visible:ring-destructive"
                      placeholder="Invalid input"
                    />
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      This field is required
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Disabled</Label>
                    <Input disabled placeholder="Disabled input" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Input Specs</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Property</th>
                      <th className="text-left py-2 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-muted-foreground">
                    <tr>
                      <td className="py-2">Height</td>
                      <td className="py-2 font-mono text-xs">40px</td>
                    </tr>
                    <tr>
                      <td className="py-2">Padding</td>
                      <td className="py-2 font-mono text-xs">10px 12px</td>
                    </tr>
                    <tr>
                      <td className="py-2">Border</td>
                      <td className="py-2 font-mono text-xs">1px solid border</td>
                    </tr>
                    <tr>
                      <td className="py-2">Border Radius</td>
                      <td className="py-2 font-mono text-xs">6px</td>
                    </tr>
                    <tr>
                      <td className="py-2">Focus Ring</td>
                      <td className="py-2 font-mono text-xs">
                        2px ring primary
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Selects */}
        {activeTab === "selects" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Select / Dropdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Default Select</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>With Icon</Label>
                    <Select defaultValue="instagram">
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <Instagram className="w-4 h-4" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Disabled</Label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Disabled" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option">Option</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs & Filters */}
        {activeTab === "tabs" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">
                  Segmented Control / Tabs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Users / Roles Tab (from reference)
                  </p>
                  <div className="inline-flex bg-muted p-1 rounded-lg">
                    {["Users", "Roles"].map((tab) => (
                      <button
                        key={tab}
                        className={cn(
                          "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                          tab === "Users"
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Time Filter Chips
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Day", "Week", "Month", "Year"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter.toLowerCase())}
                        className={cn(
                          "px-3 py-1.5 text-sm font-medium rounded-full border transition-colors",
                          selectedFilter === filter.toLowerCase()
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/20"
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Underline Tabs
                  </p>
                  <div className="border-b border-border">
                    <div className="flex gap-6">
                      {["Overview", "Analytics", "Settings"].map((tab, i) => (
                        <button
                          key={tab}
                          className={cn(
                            "pb-3 text-sm font-medium border-b-2 transition-colors",
                            i === 0
                              ? "border-primary text-primary"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Switches */}
        {activeTab === "switches" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Switch / Toggle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Dark Mode
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Toggle dark theme
                      </p>
                    </div>
                    <Switch
                      checked={switchValue}
                      onCheckedChange={setSwitchValue}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Notifications
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Receive push notifications
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between opacity-50">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Disabled
                      </p>
                      <p className="text-xs text-muted-foreground">
                        This option is disabled
                      </p>
                    </div>
                    <Switch disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Switch Specs</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Property</th>
                      <th className="text-left py-2 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-muted-foreground">
                    <tr>
                      <td className="py-2">Track Size</td>
                      <td className="py-2 font-mono text-xs">44px × 24px</td>
                    </tr>
                    <tr>
                      <td className="py-2">Thumb Size</td>
                      <td className="py-2 font-mono text-xs">20px</td>
                    </tr>
                    <tr>
                      <td className="py-2">Border Radius</td>
                      <td className="py-2 font-mono text-xs">full (9999px)</td>
                    </tr>
                    <tr>
                      <td className="py-2">Transition</td>
                      <td className="py-2 font-mono text-xs">150ms ease-out</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Badges */}
        {activeTab === "badges" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Status Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Post Status
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 hover:bg-amber-100">
                      Draft
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 hover:bg-blue-100">
                      Scheduled
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 hover:bg-green-100">
                      Published
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 hover:bg-red-100">
                      Failed
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 hover:bg-purple-100">
                      Pending Approval
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Default Variants
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    With Icons
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                      <Check className="w-3 h-3 mr-1" />
                      Approved
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                      <X className="w-3 h-3 mr-1" />
                      Rejected
                    </Badge>
                    <Badge variant="outline">
                      <Info className="w-3 h-3 mr-1" />
                      Info
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Badge Specs</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Property</th>
                      <th className="text-left py-2 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-muted-foreground">
                    <tr>
                      <td className="py-2">Padding</td>
                      <td className="py-2 font-mono text-xs">4px 8px</td>
                    </tr>
                    <tr>
                      <td className="py-2">Font Size</td>
                      <td className="py-2 font-mono text-xs">12px / 500</td>
                    </tr>
                    <tr>
                      <td className="py-2">Border Radius</td>
                      <td className="py-2 font-mono text-xs">4px (sm)</td>
                    </tr>
                    <tr>
                      <td className="py-2">Line Height</td>
                      <td className="py-2 font-mono text-xs">1.4</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cards */}
        {activeTab === "cards" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Card Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-base">Default Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Standard card with header and content. Use for grouping
                        related information.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">Muted Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Subtle background for secondary content or nested cards.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border border-primary/50 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-base">Highlighted</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Emphasis card for important or selected items.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 border-border">
                    <CardContent className="pt-6 text-center">
                      <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Dashed border for drop zones or "add new" areas
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tables */}
        {activeTab === "tables" && (
          <div className="space-y-8">
            <Card className="border-border overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">Data Table</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="text-left py-3 px-4 font-medium text-foreground">
                          Post
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">
                          Platform
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">
                          Scheduled
                        </th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        {
                          post: "New product launch announcement",
                          platform: "Instagram",
                          status: "Scheduled",
                          date: "Jan 25, 2026",
                        },
                        {
                          post: "Weekly tips carousel",
                          platform: "LinkedIn",
                          status: "Draft",
                          date: "—",
                        },
                        {
                          post: "Behind the scenes video",
                          platform: "TikTok",
                          status: "Published",
                          date: "Jan 22, 2026",
                        },
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium text-foreground">
                            {row.post}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {row.platform}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={cn(
                                row.status === "Scheduled" &&
                                  "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
                                row.status === "Draft" &&
                                  "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
                                row.status === "Published" &&
                                  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                              )}
                            >
                              {row.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {row.date}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Empty State */}
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-1">
                  No posts scheduled
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get started by creating your first post
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Calendar */}
        {activeTab === "calendar" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">January 2026</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div key={day} className="py-2 font-medium">
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 3
                    const isCurrentMonth = day > 0 && day <= 31
                    const isToday = day === 22
                    const hasPost = [5, 12, 15, 22, 25].includes(day)

                    return (
                      <div
                        key={i}
                        className={cn(
                          "aspect-square p-1 rounded-lg text-sm flex flex-col",
                          isCurrentMonth
                            ? "hover:bg-muted cursor-pointer"
                            : "text-muted-foreground/40",
                          isToday && "bg-primary/10 ring-1 ring-primary"
                        )}
                      >
                        <span
                          className={cn(
                            "text-xs",
                            isToday && "font-medium text-primary"
                          )}
                        >
                          {isCurrentMonth ? day : ""}
                        </span>
                        {hasPost && isCurrentMonth && (
                          <div className="mt-auto">
                            <div className="h-1 w-full bg-primary rounded-full" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Event Pills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Instagram className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Product Launch
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-300 ml-auto">
                    10:00 AM
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Weekly Tips
                  </span>
                  <Badge className="text-xs bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                    LinkedIn
                  </Badge>
                  <span className="text-xs text-purple-600 dark:text-purple-300 ml-auto">
                    2:00 PM
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modals & Toast */}
        {activeTab === "modals" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Modal / Dialog</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-xl p-8 flex items-center justify-center">
                  <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Delete Post?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        This action cannot be undone. The post will be
                        permanently removed from your calendar.
                      </p>
                    </CardContent>
                    <div className="flex justify-end gap-2 p-6 pt-0">
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </Card>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <strong>Specs:</strong> max-width 480px, padding 24px, radius
                  12px, shadow-lg
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Toast / Snackbar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    type: "success",
                    message: "Post scheduled successfully",
                    icon: Check,
                    bg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                    iconColor: "text-green-600",
                  },
                  {
                    type: "error",
                    message: "Failed to connect account",
                    icon: X,
                    bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                    iconColor: "text-red-600",
                  },
                  {
                    type: "info",
                    message: "New feature available",
                    icon: Info,
                    bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                    iconColor: "text-blue-600",
                  },
                ].map((toast) => (
                  <div
                    key={toast.type}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border",
                      toast.bg
                    )}
                  >
                    <toast.icon className={cn("w-5 h-5", toast.iconColor)} />
                    <span className="text-sm font-medium text-foreground flex-1">
                      {toast.message}
                    </span>
                    <button className="text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Tooltip</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading */}
        {activeTab === "loading" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Spinner</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-8">
                <div className="text-center">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-muted-foreground mt-2">Small</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-muted-foreground mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                  <p className="text-xs text-muted-foreground mt-2">Icon</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Skeleton</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                    <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty States */}
        {activeTab === "empty" && (
          <div className="space-y-8">
            <Card className="border-border">
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No posts scheduled
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                  Your calendar is empty. Start by creating a new post or
                  importing content from drafts.
                </p>
                <div className="flex justify-center gap-3">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                  <Button variant="outline">Import Drafts</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-1">
                  No results found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pagination */}
        <Card className="border-border mt-8">
          <CardHeader>
            <CardTitle className="text-base">Pagination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing 1-10 of 47 results
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {[1, 2, 3, "...", 5].map((page, i) => (
                  <Button
                    key={i}
                    variant={page === 1 ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
