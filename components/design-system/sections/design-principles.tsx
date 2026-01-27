import { Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DesignPrinciples() {
  const principles = [
    {
      title: "Calm Productivity",
      description:
        "The interface should feel like a quiet workspace. Avoid visual noise—every element earns its place through utility, not decoration.",
    },
    {
      title: "Clarity Over Cleverness",
      description:
        "Prioritize immediate comprehension. Users managing multiple social accounts need information hierarchy that's scannable at a glance.",
    },
    {
      title: "Consistent Rhythm",
      description:
        "Maintain predictable spacing, alignment, and interaction patterns. Familiarity reduces cognitive load across dense dashboard views.",
    },
    {
      title: "Subtle Sophistication",
      description:
        "Premium feel comes from restraint—soft shadows, refined typography, and indigo accents used purposefully, not excessively.",
    },
    {
      title: "Accessible by Default",
      description:
        "Every component must meet WCAG AA standards. Focus states, color contrast, and keyboard navigation are non-negotiable foundations.",
    },
    {
      title: "Responsive Density",
      description:
        "Dashboards need information density. Design for data-rich contexts while maintaining breathing room through strategic whitespace.",
    },
    {
      title: "State Transparency",
      description:
        "Users should always know what's happening. Loading, success, error, and empty states must be clearly communicated and consistently styled.",
    },
  ]

  const doList = [
    "Use the indigo/violet palette as accent, not primary surface color",
    "Maintain minimum 4.5:1 contrast ratio for text",
    "Group related actions and provide clear visual hierarchy",
    "Use subtle shadows (2-4px blur) for elevation",
    "Prefer outlined icons with consistent 1.5px stroke",
    "Animate with purpose: 150-200ms for micro-interactions",
    "Design empty states that guide users toward action",
  ]

  const dontList = [
    "Use gradients on primary UI surfaces",
    "Apply glassmorphism or heavy blur effects",
    "Mix warm and cool accent colors",
    "Use decorative elements without functional purpose",
    "Create buttons smaller than 36px touch target",
    "Hide critical actions behind menus unnecessarily",
    "Use more than 2 font families",
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Design Principles
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
          Guiding philosophy for building a minimal, modern, and premium Social Media Management platform.
        </p>
      </div>

      <div className="grid gap-4">
        {principles.map((principle, index) => (
          <Card key={index} className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-foreground">
                {index + 1}. {principle.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              </div>
              Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {doList.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              </div>
              {"Don't"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dontList.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
