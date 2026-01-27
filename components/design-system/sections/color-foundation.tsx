import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ColorSwatch({
  name,
  value,
  textColor = "text-foreground",
}: {
  name: string
  value: string
  textColor?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-lg border border-border shrink-0"
        style={{ backgroundColor: value }}
      />
      <div>
        <p className={`text-sm font-medium ${textColor}`}>{name}</p>
        <p className="text-xs text-muted-foreground uppercase">{value}</p>
      </div>
    </div>
  )
}

function ColorRow({
  colors,
}: {
  colors: { name: string; value: string; textColor?: string }[]
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {colors.map((color) => (
        <ColorSwatch key={color.name} {...color} />
      ))}
    </div>
  )
}

export function ColorFoundation() {
  const brandColors = [
    { name: "Brand 500", value: "#5A5DA2" },
    { name: "Brand 400", value: "#6366BC" },
    { name: "Brand 300", value: "#7162DF" },
    { name: "Accent Light", value: "#9597E7" },
    { name: "Accent Soft", value: "#C79CE6" },
  ]

  const neutralsLight = [
    { name: "White", value: "#FFFFFF" },
    { name: "Gray 50", value: "#FAFAFC" },
    { name: "Gray 100", value: "#F4F4F8" },
    { name: "Gray 200", value: "#E4E4EC" },
    { name: "Gray 500", value: "#6B6B80" },
    { name: "Gray 800", value: "#2D2B3E" },
    { name: "Gray 900", value: "#1A1A2E" },
    { name: "Black", value: "#0E0E14" },
  ]

  const neutralsDark = [
    { name: "Surface 0", value: "#0E0E14" },
    { name: "Surface 1", value: "#1A1A24" },
    { name: "Surface 2", value: "#211F2D" },
    { name: "Surface 3", value: "#2D2B3E" },
    { name: "Border", value: "#3A3A4A" },
    { name: "Muted", value: "#9090A0" },
    { name: "Text", value: "#E8E8F0" },
    { name: "White", value: "#FFFFFF" },
  ]

  const semanticColors = [
    { name: "Success", value: "#22C55E" },
    { name: "Warning", value: "#F59E0B" },
    { name: "Destructive", value: "#DC4C64" },
    { name: "Info", value: "#3B82F6" },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Color System
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
          A restrained palette built around indigo/violet accents with carefully balanced neutrals for both light and dark modes.
        </p>
      </div>

      {/* Brand Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Brand Colors</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          The core brand palette. Use <strong>#6366BC</strong> as the primary action color. Reserve brighter violets for hover states and accents.
        </p>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              {brandColors.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className="w-20 h-20 rounded-xl mb-2"
                    style={{ backgroundColor: color.value }}
                  />
                  <p className="text-xs font-medium text-foreground">
                    {color.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{color.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Neutrals */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Neutrals</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Light Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {neutralsLight.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-[#0E0E14]">
            <CardHeader>
              <CardTitle className="text-base text-white">Dark Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {neutralsDark.map((color) => (
                  <ColorSwatch
                    key={color.name}
                    {...color}
                    textColor="text-white"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Semantic Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Semantic Colors</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Status and feedback colors. These are consistent across light and dark modes with minor adjustments for contrast.
        </p>
        <Card className="border-border">
          <CardContent className="pt-6">
            <ColorRow colors={semanticColors} />
          </CardContent>
        </Card>
      </section>

      {/* Token Mapping */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Semantic Tokens</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  Token
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  Light
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  Dark
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  Usage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  token: "background",
                  light: "#FAFAFC",
                  dark: "#0E0E14",
                  usage: "Page background",
                },
                {
                  token: "surface",
                  light: "#FFFFFF",
                  dark: "#1A1A24",
                  usage: "Cards, panels, modals",
                },
                {
                  token: "surface-muted",
                  light: "#F4F4F8",
                  dark: "#211F2D",
                  usage: "Hover states, secondary areas",
                },
                {
                  token: "border",
                  light: "#E4E4EC",
                  dark: "#3A3A4A",
                  usage: "Dividers, outlines",
                },
                {
                  token: "text-primary",
                  light: "#1A1A2E",
                  dark: "#E8E8F0",
                  usage: "Headings, body text",
                },
                {
                  token: "text-secondary",
                  light: "#6B6B80",
                  dark: "#9090A0",
                  usage: "Muted text, captions",
                },
                {
                  token: "primary",
                  light: "#6366BC",
                  dark: "#7162DF",
                  usage: "Primary buttons, links",
                },
                {
                  token: "primary-hover",
                  light: "#7162DF",
                  dark: "#9597E7",
                  usage: "Primary hover state",
                },
              ].map((row) => (
                <tr key={row.token}>
                  <td className="py-3 px-4 font-mono text-xs text-foreground">
                    {row.token}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded border border-border"
                        style={{ backgroundColor: row.light }}
                      />
                      <span className="text-muted-foreground text-xs">
                        {row.light}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded border border-border"
                        style={{ backgroundColor: row.dark }}
                      />
                      <span className="text-muted-foreground text-xs">
                        {row.dark}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {row.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Gradient Guidelines */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">
          Gradient Guidelines
        </h2>
        <Card className="border-border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-2">
              Gradients: Use Sparingly
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Avoid gradients on primary UI surfaces. If absolutely necessary,
              use only for subtle background accents with analogous colors
              (e.g., Brand 400 → Accent Light). Never use opposing temperature
              gradients like pink→green or orange→blue.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
