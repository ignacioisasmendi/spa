import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Download,
  Link,
  ExternalLink,
  Instagram,
  Clock,
  Send,
  Filter,
  RefreshCw,
  Copy,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from "lucide-react"

export function IconographySection() {
  const iconSizes = [
    { name: "xs", size: 12, usage: "Inline indicators" },
    { name: "sm", size: 16, usage: "Dense UI, badges, inputs" },
    { name: "md", size: 20, usage: "Standard buttons, nav items" },
    { name: "lg", size: 24, usage: "Primary actions, cards" },
    { name: "xl", size: 32, usage: "Empty states, features" },
  ]

  const commonIcons = [
    { icon: Calendar, name: "Calendar", usage: "Scheduling, dates" },
    { icon: BarChart3, name: "Analytics", usage: "Charts, metrics" },
    { icon: Users, name: "Users", usage: "Team, audience" },
    { icon: Settings, name: "Settings", usage: "Configuration" },
    { icon: Bell, name: "Notifications", usage: "Alerts, updates" },
    { icon: Search, name: "Search", usage: "Find, filter" },
    { icon: Plus, name: "Add", usage: "Create new" },
    { icon: ChevronDown, name: "Expand", usage: "Dropdowns" },
    { icon: ChevronRight, name: "Navigate", usage: "Links, breadcrumbs" },
    { icon: Check, name: "Success", usage: "Confirm, complete" },
    { icon: X, name: "Close", usage: "Dismiss, remove" },
    { icon: MoreHorizontal, name: "More", usage: "Overflow menu" },
    { icon: Edit, name: "Edit", usage: "Modify content" },
    { icon: Trash2, name: "Delete", usage: "Remove item" },
    { icon: Eye, name: "View", usage: "Preview, visibility" },
    { icon: EyeOff, name: "Hide", usage: "Toggle visibility" },
    { icon: Upload, name: "Upload", usage: "Add files" },
    { icon: Download, name: "Download", usage: "Export" },
    { icon: Link, name: "Link", usage: "Connect, attach" },
    { icon: ExternalLink, name: "External", usage: "Open in new tab" },
    { icon: Instagram, name: "Social", usage: "Platform icons" },
    { icon: Clock, name: "Schedule", usage: "Time, history" },
    { icon: Send, name: "Publish", usage: "Send, post" },
    { icon: Filter, name: "Filter", usage: "Refine results" },
    { icon: RefreshCw, name: "Refresh", usage: "Reload, sync" },
    { icon: Copy, name: "Copy", usage: "Duplicate" },
    { icon: Sparkles, name: "AI", usage: "AI features" },
  ]

  const statusIcons = [
    {
      icon: CheckCircle,
      name: "Success",
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: AlertCircle,
      name: "Error",
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-900/20",
    },
    {
      icon: AlertTriangle,
      name: "Warning",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      icon: Info,
      name: "Info",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Iconography
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
          Consistent, readable icons with uniform stroke weight and sizing.
        </p>
      </div>

      {/* Icon Style */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Icon Style</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Recommended Set
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-mono text-sm text-foreground mb-2">
                    Lucide React
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Open source, consistent 24x24 grid, 1.5px stroke weight,
                    rounded corners. MIT licensed.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Style Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    Stroke weight: 1.5px (consistent)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    Corner radius: 2px (rounded)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    Outline style only (no filled)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    Use currentColor for flexibility
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Icon Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Size Scale</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-end gap-8">
              {iconSizes.map((size) => (
                <div key={size.name} className="text-center">
                  <div className="flex items-center justify-center h-16 mb-2">
                    <Calendar
                      style={{ width: size.size, height: size.size }}
                      className="text-foreground"
                    />
                  </div>
                  <p className="text-xs font-mono text-foreground">
                    {size.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{size.size}px</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {size.usage}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Common Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Common Icons</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
              {commonIcons.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <item.icon className="w-5 h-5 text-foreground" />
                  <span className="text-xs text-muted-foreground text-center">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Status Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Status Icons</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statusIcons.map((item) => (
                <div
                  key={item.name}
                  className={`flex items-center gap-3 p-4 rounded-lg ${item.bg}`}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Icon Button States */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Icon Button States</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              {[
                { name: "Default", classes: "text-muted-foreground" },
                { name: "Hover", classes: "text-foreground bg-muted" },
                { name: "Active", classes: "text-primary bg-primary/10" },
                { name: "Disabled", classes: "text-muted-foreground/40 cursor-not-allowed" },
              ].map((state) => (
                <div key={state.name} className="text-center">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${state.classes}`}
                  >
                    <Settings className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {state.name}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Usage Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Use icons with text labels for clarity</li>
                <li>Maintain consistent sizing within context</li>
                <li>Use muted color for secondary icons</li>
                <li>Add tooltips for icon-only buttons</li>
                <li>Ensure 44x44px minimum touch target</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                {"Don't"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Mix filled and outline icon styles</li>
                <li>Use icons smaller than 12px</li>
                <li>Use decorative icons without purpose</li>
                <li>Mix icon sets with different weights</li>
                <li>Use icons as primary content alone</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
