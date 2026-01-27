"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function MotionSection() {
  const [playDemo, setPlayDemo] = useState<string | null>(null)

  const durations = [
    { name: "instant", value: "0ms", usage: "Immediate state changes" },
    { name: "fast", value: "100ms", usage: "Micro-interactions, hover" },
    { name: "normal", value: "150ms", usage: "Standard transitions" },
    { name: "moderate", value: "200ms", usage: "Reveals, emphasis" },
    { name: "slow", value: "300ms", usage: "Modals, drawers" },
    { name: "slower", value: "400ms", usage: "Page transitions" },
  ]

  const easings = [
    {
      name: "ease-out",
      value: "cubic-bezier(0, 0, 0.2, 1)",
      usage: "Elements entering, expanding",
      description: "Fast start, slow end",
    },
    {
      name: "ease-in",
      value: "cubic-bezier(0.4, 0, 1, 1)",
      usage: "Elements exiting, collapsing",
      description: "Slow start, fast end",
    },
    {
      name: "ease-in-out",
      value: "cubic-bezier(0.4, 0, 0.2, 1)",
      usage: "State changes, transforms",
      description: "Smooth both ends",
    },
    {
      name: "spring",
      value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      usage: "Playful emphasis (use sparingly)",
      description: "Slight overshoot",
    },
  ]

  const patterns = [
    {
      name: "Hover",
      duration: "150ms",
      easing: "ease-out",
      properties: "background-color, border-color, box-shadow",
      example: "Button hover, card hover",
    },
    {
      name: "Press/Active",
      duration: "100ms",
      easing: "ease-in",
      properties: "transform (scale 0.98)",
      example: "Button press feedback",
    },
    {
      name: "Focus",
      duration: "150ms",
      easing: "ease-out",
      properties: "box-shadow (ring), outline",
      example: "Input focus, keyboard navigation",
    },
    {
      name: "Modal Enter",
      duration: "200ms",
      easing: "ease-out",
      properties: "opacity, transform (scale, translate)",
      example: "Dialog appears from center",
    },
    {
      name: "Modal Exit",
      duration: "150ms",
      easing: "ease-in",
      properties: "opacity, transform",
      example: "Dialog fades out",
    },
    {
      name: "Dropdown",
      duration: "150ms",
      easing: "ease-out",
      properties: "opacity, transform (translateY -4px)",
      example: "Menu expands down",
    },
    {
      name: "Toast",
      duration: "300ms",
      easing: "ease-out",
      properties: "transform (translateX), opacity",
      example: "Slides in from right",
    },
    {
      name: "Drawer",
      duration: "300ms",
      easing: "ease-out",
      properties: "transform (translateX/Y)",
      example: "Slides from edge",
    },
    {
      name: "Skeleton",
      duration: "1500ms",
      easing: "ease-in-out",
      properties: "background-position (infinite)",
      example: "Loading shimmer",
    },
    {
      name: "Spinner",
      duration: "600ms",
      easing: "linear",
      properties: "transform (rotate, infinite)",
      example: "Loading indicator",
    },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Motion & Animation
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
          Subtle, purposeful animations that enhance usability without distraction.
        </p>
      </div>

      {/* Principles */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Motion Principles</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-foreground mb-2">Purposeful</h3>
                <p className="text-sm text-muted-foreground">
                  Every animation should have a functional reason—guiding
                  attention, showing state change, or providing feedback.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Subtle</h3>
                <p className="text-sm text-muted-foreground">
                  Keep animations minimal and elegant. Users should feel them
                  subconsciously, not consciously notice them.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Most transitions should complete in 150-200ms. Anything longer
                  feels sluggish in a productivity app.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Duration Scale */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Duration Scale</h2>
        <Card className="border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Token
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Value
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Visual
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Usage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {durations.map((row) => (
                  <tr key={row.name}>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      duration-{row.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.value}
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${Math.min(100, parseInt(row.value) / 4)}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {row.usage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Easing Functions */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Easing Functions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {easings.map((easing) => (
            <Card key={easing.name} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-mono text-sm font-medium text-foreground">
                      {easing.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {easing.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPlayDemo(easing.name)}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                <div className="h-16 bg-muted rounded-lg relative overflow-hidden">
                  <div
                    className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-lg transition-transform duration-500 ${
                      playDemo === easing.name ? "translate-x-[calc(100%-3rem)]" : ""
                    }`}
                    style={{
                      transitionTimingFunction: easing.value,
                      transform: playDemo === easing.name 
                        ? "translateX(calc(100% - 3rem)) translateY(-50%)" 
                        : "translateX(0) translateY(-50%)",
                    }}
                    onTransitionEnd={() => setPlayDemo(null)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <strong>Usage:</strong> {easing.usage}
                </p>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  {easing.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Animation Patterns */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Animation Patterns</h2>
        <Card className="border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Pattern
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Duration
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Easing
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Properties
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {patterns.map((row) => (
                  <tr key={row.name}>
                    <td className="py-3 px-4 font-medium text-foreground">
                      {row.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.duration}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.easing}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      {row.properties}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Live Demos */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Live Demos</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm">Button Hover</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full transition-all duration-150 ease-out hover:shadow-md">
                Hover me
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm">Scale on Press</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full transition-transform duration-100 active:scale-[0.98]">
                Click me
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm">Loading Spinner</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">
          Accessibility Considerations
        </h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Respect prefers-reduced-motion:</strong> Disable or
                  reduce animations when users have this preference enabled.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>No flashing:</strong> Avoid content that flashes more
                  than 3 times per second.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Pause controls:</strong> Any animation lasting more
                  than 5 seconds should be pausable.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Focus transitions:</strong> Keep focus ring
                  transitions under 200ms for keyboard navigation.
                </span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs font-mono text-muted-foreground">
                {`@media (prefers-reduced-motion: reduce) {`}
                <br />
                {`  *, *::before, *::after {`}
                <br />
                {`    animation-duration: 0.01ms !important;`}
                <br />
                {`    transition-duration: 0.01ms !important;`}
                <br />
                {`  }`}
                <br />
                {`}`}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
