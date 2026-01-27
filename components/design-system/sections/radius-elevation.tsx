import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RadiusElevation() {
  const radiusScale = [
    { name: "none", value: "0px", usage: "Sharp edges, tables" },
    { name: "sm", value: "4px", usage: "Chips, small badges" },
    { name: "md", value: "6px", usage: "Buttons, inputs, dropdowns" },
    { name: "lg", value: "8px", usage: "Cards, panels" },
    { name: "xl", value: "12px", usage: "Modals, large cards" },
    { name: "2xl", value: "16px", usage: "Feature cards, hero sections" },
    { name: "full", value: "9999px", usage: "Pills, avatars, toggles" },
  ]

  const shadowsLight = [
    {
      name: "shadow-xs",
      value: "0 1px 2px rgba(90, 93, 162, 0.04)",
      usage: "Subtle elevation, inputs",
    },
    {
      name: "shadow-sm",
      value: "0 1px 3px rgba(90, 93, 162, 0.08)",
      usage: "Cards, dropdowns",
    },
    {
      name: "shadow-md",
      value: "0 4px 6px -1px rgba(90, 93, 162, 0.08)",
      usage: "Elevated cards, popovers",
    },
    {
      name: "shadow-lg",
      value: "0 10px 15px -3px rgba(90, 93, 162, 0.08)",
      usage: "Modals, dialogs",
    },
  ]

  const shadowsDark = [
    {
      name: "shadow-xs",
      value: "0 1px 2px rgba(0, 0, 0, 0.2)",
      usage: "Subtle elevation, inputs",
    },
    {
      name: "shadow-sm",
      value: "0 1px 3px rgba(0, 0, 0, 0.3)",
      usage: "Cards, dropdowns",
    },
    {
      name: "shadow-md",
      value: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
      usage: "Elevated cards, popovers",
    },
    {
      name: "shadow-lg",
      value: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
      usage: "Modals, dialogs",
    },
  ]

  const borderStyles = [
    { name: "Default", value: "1px solid", color: "border", usage: "Cards, inputs, dividers" },
    { name: "Subtle", value: "1px solid", color: "border/50", usage: "Secondary dividers" },
    { name: "Focus Ring", value: "2px solid", color: "ring", usage: "Focus states" },
    { name: "Dashed", value: "1px dashed", color: "border", usage: "Empty states, drop zones" },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Radius & Elevation
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
          Soft corners and subtle shadows create depth without visual clutter.
        </p>
      </div>

      {/* Border Radius */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Border Radius</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-6 mb-6">
              {radiusScale.map((radius) => (
                <div key={radius.name} className="text-center">
                  <div
                    className="w-16 h-16 bg-primary/10 border-2 border-primary mb-2"
                    style={{ borderRadius: radius.value }}
                  />
                  <p className="text-xs font-mono text-foreground">
                    {radius.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{radius.value}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium text-foreground">
                      Token
                    </th>
                    <th className="text-left py-2 px-3 font-medium text-foreground">
                      Value
                    </th>
                    <th className="text-left py-2 px-3 font-medium text-foreground">
                      Component Usage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {radiusScale.map((row) => (
                    <tr key={row.name}>
                      <td className="py-2 px-3 font-mono text-xs text-foreground">
                        rounded-{row.name}
                      </td>
                      <td className="py-2 px-3 font-mono text-xs text-muted-foreground">
                        {row.value}
                      </td>
                      <td className="py-2 px-3 text-muted-foreground text-xs">
                        {row.usage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Shadows */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Elevation / Shadows</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Shadows are intentionally subtle, using the brand color (indigo) tinted
          for warmth in light mode and pure black for dark mode.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Light Mode Shadows */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Light Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {shadowsLight.map((shadow) => (
                <div key={shadow.name} className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 bg-white rounded-lg shrink-0"
                    style={{ boxShadow: shadow.value }}
                  />
                  <div>
                    <p className="text-sm font-mono text-foreground">
                      {shadow.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {shadow.usage}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dark Mode Shadows */}
          <Card className="border-border bg-[#0E0E14]">
            <CardHeader>
              <CardTitle className="text-base text-white">Dark Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {shadowsDark.map((shadow) => (
                <div key={shadow.name} className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-lg shrink-0"
                    style={{
                      backgroundColor: "#1A1A24",
                      boxShadow: shadow.value,
                    }}
                  />
                  <div>
                    <p className="text-sm font-mono text-white">
                      {shadow.name}
                    </p>
                    <p className="text-xs text-gray-400">{shadow.usage}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Borders */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Borders & Dividers</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {borderStyles.map((border) => (
                <div
                  key={border.name}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-24 h-10 rounded-lg ${
                        border.name === "Dashed"
                          ? "border-dashed border-2 border-border"
                          : border.name === "Focus Ring"
                          ? "border-2 border-primary ring-2 ring-primary/20"
                          : "border border-border"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {border.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {border.value} {border.color}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{border.usage}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Component Reference */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">
          Component Radius Reference
        </h2>
        <Card className="border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Component
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Radius
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Shadow
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Border
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { component: "Button", radius: "md (6px)", shadow: "none", border: "none" },
                  { component: "Input", radius: "md (6px)", shadow: "xs", border: "1px solid" },
                  { component: "Card", radius: "lg (8px)", shadow: "sm", border: "1px solid" },
                  { component: "Modal", radius: "xl (12px)", shadow: "lg", border: "1px solid" },
                  { component: "Dropdown", radius: "lg (8px)", shadow: "md", border: "1px solid" },
                  { component: "Chip/Badge", radius: "sm (4px)", shadow: "none", border: "1px solid" },
                  { component: "Avatar", radius: "full", shadow: "none", border: "2px solid" },
                  { component: "Toggle", radius: "full", shadow: "xs", border: "none" },
                  { component: "Tooltip", radius: "md (6px)", shadow: "md", border: "none" },
                  { component: "Toast", radius: "lg (8px)", shadow: "lg", border: "1px solid" },
                ].map((row) => (
                  <tr key={row.component}>
                    <td className="py-3 px-4 font-medium text-foreground">
                      {row.component}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.radius}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.shadow}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.border}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  )
}
