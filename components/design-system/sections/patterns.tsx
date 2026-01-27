"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  ImageIcon,
  Calendar,
  Hash,
  Instagram,
  ChevronRight,
  Check,
  X,
  Upload,
  Eye,
  Send,
  Clock,
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  ArrowUpRight,
  Settings,
  Shield,
  Trash2,
  Edit,
  Link,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function PatternsSection() {
  const [activePattern, setActivePattern] = useState("create-post")
  const [currentStep, setCurrentStep] = useState(1)

  const patterns = [
    { id: "create-post", label: "Create Post Flow" },
    { id: "calendar", label: "Calendar View" },
    { id: "analytics", label: "Analytics Dashboard" },
    { id: "roles", label: "Roles & Permissions" },
    { id: "onboarding", label: "Connect Account" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Patterns
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
          Real product experiences showing how components work together.
        </p>
      </div>

      {/* Pattern Navigation */}
      <div className="border-b border-border overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => setActivePattern(pattern.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activePattern === pattern.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {pattern.label}
            </button>
          ))}
        </div>
      </div>

      {/* Create Post Flow */}
      {activePattern === "create-post" && (
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>Create Post Wizard</span>
                <div className="flex items-center gap-2 text-sm font-normal">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                          step < currentStep
                            ? "bg-primary text-primary-foreground"
                            : step === currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {step < currentStep ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          step
                        )}
                      </div>
                      {step < 4 && (
                        <div
                          className={cn(
                            "w-8 h-0.5 mx-1",
                            step < currentStep ? "bg-primary" : "bg-muted"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">
                    Step 1: Upload Media
                  </h3>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground mb-1">
                      Drop files here or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, MP4 up to 100MB
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-20 h-20 bg-muted rounded-lg relative group">
                      <ImageIcon className="w-6 h-6 text-muted-foreground absolute inset-0 m-auto" />
                      <button className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">
                    Step 2: Write Copy
                  </h3>
                  <div className="space-y-2">
                    <Label>Caption</Label>
                    <Textarea
                      placeholder="Write your caption..."
                      className="min-h-[120px]"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      0 / 2200 characters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Hashtags
                    </Label>
                    <Input placeholder="#marketing #socialmedia" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">
                    Step 3: Select Platforms
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: "Instagram", selected: true },
                      { name: "TikTok", selected: true },
                      { name: "Facebook", selected: false },
                      { name: "LinkedIn", selected: false },
                    ].map((platform) => (
                      <div
                        key={platform.name}
                        className={cn(
                          "p-4 rounded-lg border-2 cursor-pointer transition-colors text-center",
                          platform.selected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Instagram className="w-6 h-6 mx-auto mb-2 text-foreground" />
                        <p className="text-sm font-medium">{platform.name}</p>
                        {platform.selected && (
                          <Check className="w-4 h-4 text-primary mx-auto mt-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">
                    Step 4: Schedule
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="Jan 25, 2026" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="10:00 AM" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Best time to post
                    </p>
                    <div className="flex gap-2">
                      {["9:00 AM", "12:00 PM", "6:00 PM"].map((time) => (
                        <Badge key={time} variant="outline" className="cursor-pointer hover:bg-primary/10">
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  {currentStep < 4 ? (
                    <Button onClick={() => setCurrentStep(currentStep + 1)}>
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button>
                      <Send className="w-4 h-4 mr-2" />
                      Schedule Post
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Calendar View */}
      {activePattern === "calendar" && (
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Content Calendar</CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-36">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex bg-muted p-1 rounded-lg">
                  {["Week", "Month"].map((view) => (
                    <button
                      key={view}
                      className={cn(
                        "px-3 py-1 text-sm rounded-md transition-colors",
                        view === "Week"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground"
                      )}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Week View */}
              <div className="grid grid-cols-7 gap-2">
                {["Mon 20", "Tue 21", "Wed 22", "Thu 23", "Fri 24", "Sat 25", "Sun 26"].map(
                  (day, i) => (
                    <div key={day} className="text-center">
                      <p className={cn(
                        "text-xs font-medium mb-2 py-1 rounded",
                        i === 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      )}>
                        {day}
                      </p>
                      <div className="min-h-[200px] bg-muted/30 rounded-lg p-2 space-y-2">
                        {i === 2 && (
                          <>
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">
                              <p className="font-medium text-blue-800 dark:text-blue-200 truncate">
                                Product Launch
                              </p>
                              <p className="text-blue-600 dark:text-blue-300">
                                10:00 AM
                              </p>
                            </div>
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded text-xs">
                              <p className="font-medium text-purple-800 dark:text-purple-200 truncate">
                                Weekly Tips
                              </p>
                              <p className="text-purple-600 dark:text-purple-300">
                                2:00 PM
                              </p>
                            </div>
                          </>
                        )}
                        {i === 4 && (
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded text-xs">
                            <p className="font-medium text-green-800 dark:text-green-200 truncate">
                              BTS Video
                            </p>
                            <p className="text-green-600 dark:text-green-300">
                              6:00 PM
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span>Scheduled</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span>Published</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 bg-amber-500 rounded" />
                  <span>Draft</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Drag & Drop States</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <p className="text-sm font-medium mb-2">Normal</p>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs cursor-grab">
                    <p className="font-medium text-blue-800 dark:text-blue-200">
                      Draggable Post
                    </p>
                  </div>
                </div>
                <div className="p-4 border-2 border-dashed border-primary rounded-lg bg-primary/5">
                  <p className="text-sm font-medium mb-2">Drop Zone Active</p>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs opacity-50">
                    <p className="font-medium text-blue-800 dark:text-blue-200">
                      Dragging Post
                    </p>
                  </div>
                </div>
                <div className="p-4 border border-destructive rounded-lg bg-destructive/5">
                  <p className="text-sm font-medium mb-2 text-destructive">
                    Conflict
                  </p>
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs">
                    <p className="font-medium text-red-800 dark:text-red-200">
                      Time slot occupied
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics Dashboard */}
      {activePattern === "analytics" && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Reach", value: "124.5K", change: "+12.3%", up: true },
              { label: "Engagement", value: "8.2K", change: "+5.7%", up: true },
              { label: "Followers", value: "45.2K", change: "+892", up: true },
              { label: "Posts", value: "28", change: "-2", up: false },
            ].map((kpi) => (
              <Card key={kpi.label} className="border-border">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-semibold text-foreground">
                    {kpi.value}
                  </p>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs mt-1",
                      kpi.up ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {kpi.up ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {kpi.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart Area */}
          <Card className="border-border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Engagement Over Time</CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {["7D", "30D", "90D"].map((period) => (
                    <button
                      key={period}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                        period === "30D"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Placeholder Chart */}
              <div className="h-64 bg-muted/50 rounded-lg flex items-end p-4 gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Posts Table */}
          <Card className="border-border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Top Performing Posts</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Post</th>
                    <th className="text-left py-3 px-4 font-medium">Platform</th>
                    <th className="text-right py-3 px-4 font-medium">Reach</th>
                    <th className="text-right py-3 px-4 font-medium">Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { post: "Product Launch Reel", platform: "Instagram", reach: "45.2K", engagement: "3.2K" },
                    { post: "Behind the Scenes", platform: "TikTok", reach: "32.1K", engagement: "2.8K" },
                    { post: "Weekly Tips Carousel", platform: "LinkedIn", reach: "18.5K", engagement: "1.2K" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{row.post}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.platform}</td>
                      <td className="py-3 px-4 text-right">{row.reach}</td>
                      <td className="py-3 px-4 text-right">{row.engagement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Roles & Permissions */}
      {activePattern === "roles" && (
        <div className="space-y-6">
          {/* Users/Roles Tabs */}
          <Card className="border-border">
            <CardHeader className="flex-row items-center justify-between">
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
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Invite User
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left py-3 px-4 font-medium">User</th>
                    <th className="text-left py-3 px-4 font-medium">Email</th>
                    <th className="text-left py-3 px-4 font-medium">Role</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: "Sarah Chen", email: "sarah@company.com", role: "Admin", status: "Active" },
                    { name: "Mike Johnson", email: "mike@company.com", role: "Editor", status: "Active" },
                    { name: "Alex Rivera", email: "alex@company.com", role: "Viewer", status: "Pending" },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          {user.role === "Admin" && <Shield className="w-3 h-3" />}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={cn(
                            user.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                          )}
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium">Permission</th>
                    <th className="text-center py-2 font-medium">Admin</th>
                    <th className="text-center py-2 font-medium">Editor</th>
                    <th className="text-center py-2 font-medium">Viewer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { perm: "Create Posts", admin: true, editor: true, viewer: false },
                    { perm: "Edit Posts", admin: true, editor: true, viewer: false },
                    { perm: "Delete Posts", admin: true, editor: false, viewer: false },
                    { perm: "View Analytics", admin: true, editor: true, viewer: true },
                    { perm: "Manage Users", admin: true, editor: false, viewer: false },
                    { perm: "Account Settings", admin: true, editor: false, viewer: false },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-3 text-muted-foreground">{row.perm}</td>
                      <td className="py-3 text-center">
                        {row.admin ? (
                          <Check className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 text-center">
                        {row.editor ? (
                          <Check className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 text-center">
                        {row.viewer ? (
                          <Check className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Connect Account / Onboarding */}
      {activePattern === "onboarding" && (
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Connect Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Instagram", connected: true, account: "@company_ig" },
                { name: "TikTok", connected: true, account: "@company_tiktok" },
                { name: "Facebook", connected: false, account: null },
                { name: "LinkedIn", connected: false, account: null },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      platform.connected ? "bg-primary/10" : "bg-muted"
                    )}>
                      <Instagram className={cn(
                        "w-5 h-5",
                        platform.connected ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{platform.name}</p>
                      {platform.connected ? (
                        <p className="text-xs text-muted-foreground">
                          Connected as {platform.account}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Not connected</p>
                      )}
                    </div>
                  </div>
                  {platform.connected ? (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline">
                      <Link className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* OAuth Flow States */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">OAuth Flow States</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg text-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                    <Link className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Connecting...</p>
                  <p className="text-xs text-muted-foreground">
                    Redirecting to Instagram
                  </p>
                  <div className="mt-3">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                </div>

                <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Success!</p>
                  <p className="text-xs text-muted-foreground">
                    Account connected successfully
                  </p>
                </div>

                <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mx-auto mb-3">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Failed</p>
                  <p className="text-xs text-muted-foreground">
                    Connection was denied
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
