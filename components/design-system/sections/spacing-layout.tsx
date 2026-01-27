import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SpacingLayout() {
  const spacingScale = [
    { name: "0", value: "0px", usage: "Reset" },
    { name: "0.5", value: "2px", usage: "Hairline dividers" },
    { name: "1", value: "4px", usage: "Tight inline spacing" },
    { name: "1.5", value: "6px", usage: "Compact chip padding" },
    { name: "2", value: "8px", usage: "Standard inline spacing, small gaps" },
    { name: "2.5", value: "10px", usage: "Button padding-y" },
    { name: "3", value: "12px", usage: "Card padding (compact), input padding" },
    { name: "4", value: "16px", usage: "Standard card padding, section gaps" },
    { name: "5", value: "20px", usage: "Modal padding" },
    { name: "6", value: "24px", usage: "Large section gaps" },
    { name: "8", value: "32px", usage: "Page sections" },
    { name: "10", value: "40px", usage: "Major section separators" },
    { name: "12", value: "48px", usage: "Page top/bottom padding" },
    { name: "16", value: "64px", usage: "Large page sections" },
  ]

  const breakpoints = [
    {
      name: "sm",
      value: "640px",
      columns: "1",
      sidebar: "Hidden",
      usage: "Mobile phones",
    },
    {
      name: "md",
      value: "768px",
      columns: "2",
      sidebar: "Collapsible",
      usage: "Tablets, small laptops",
    },
    {
      name: "lg",
      value: "1024px",
      columns: "3",
      sidebar: "Visible",
      usage: "Laptops, desktops",
    },
    {
      name: "xl",
      value: "1280px",
      columns: "4",
      sidebar: "Expanded",
      usage: "Large desktops",
    },
    {
      name: "2xl",
      value: "1536px",
      columns: "4-6",
      sidebar: "Expanded",
      usage: "Ultra-wide monitors",
    },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Spacing & Layout
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
          An 8pt grid system with consistent spacing tokens for predictable, harmonious layouts.
        </p>
      </div>

      {/* Base Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">8pt Grid System</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              All spacing values are multiples of <strong>4px</strong> (base
              unit), with <strong>8px</strong> as the primary increment. This
              creates visual rhythm and makes alignment intuitive.
            </p>
            <div className="flex items-end gap-2 p-4 bg-muted rounded-lg">
              {[4, 8, 12, 16, 24, 32, 48].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <div
                    className="bg-primary rounded"
                    style={{ width: size, height: size }}
                  />
                  <span className="text-xs text-muted-foreground">{size}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Spacing Scale */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Spacing Scale</h2>
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
                {spacingScale.map((row) => (
                  <tr key={row.name}>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      space-{row.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.value}
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className="h-3 bg-primary/30 rounded"
                        style={{ width: row.value }}
                      />
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

      {/* Breakpoints */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">
          Responsive Breakpoints
        </h2>
        <Card className="border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Breakpoint
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Min Width
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Grid Columns
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Sidebar
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Typical Device
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {breakpoints.map((row) => (
                  <tr key={row.name}>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      {row.name}:
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.value}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {row.columns}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {row.sidebar}
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

      {/* Dashboard Layout */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">
          Dashboard Layout Structure
        </h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="bg-muted rounded-lg p-4 aspect-video relative">
              {/* Sidebar */}
              <div className="absolute left-4 top-4 bottom-4 w-16 bg-card rounded-lg border border-border flex flex-col items-center py-3 gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg" />
                <div className="flex-1 flex flex-col gap-1 pt-2">
                  <div className="w-6 h-6 bg-muted-foreground/20 rounded" />
                  <div className="w-6 h-6 bg-muted-foreground/20 rounded" />
                  <div className="w-6 h-6 bg-muted-foreground/20 rounded" />
                </div>
              </div>
              {/* Main Content */}
              <div className="ml-20 h-full flex flex-col gap-3">
                {/* Header */}
                <div className="h-10 bg-card rounded-lg border border-border flex items-center px-3 gap-2">
                  <div className="w-20 h-4 bg-muted-foreground/20 rounded" />
                  <div className="flex-1" />
                  <div className="w-6 h-6 bg-muted-foreground/20 rounded-full" />
                </div>
                {/* Content Area */}
                <div className="flex-1 bg-card rounded-lg border border-border p-3">
                  <div className="grid grid-cols-4 gap-2 h-full">
                    <div className="bg-muted rounded h-12" />
                    <div className="bg-muted rounded h-12" />
                    <div className="bg-muted rounded h-12" />
                    <div className="bg-muted rounded h-12" />
                    <div className="col-span-4 bg-muted rounded flex-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="font-medium text-foreground">Sidebar Width</p>
                <p className="text-muted-foreground">64px (collapsed) / 240px (expanded)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Content Padding</p>
                <p className="text-muted-foreground">24px (lg:32px)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Card Gaps</p>
                <p className="text-muted-foreground">16px standard</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Max Content Width</p>
                <p className="text-muted-foreground">1280px (centered)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Component Spacing */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">
          Component Spacing Guidelines
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Internal Padding</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong>Buttons:</strong> 10px vertical, 16px horizontal
                </li>
                <li>
                  <strong>Inputs:</strong> 10px vertical, 12px horizontal
                </li>
                <li>
                  <strong>Cards:</strong> 16px (compact) / 24px (standard)
                </li>
                <li>
                  <strong>Modals:</strong> 24px padding
                </li>
                <li>
                  <strong>Chips:</strong> 6px vertical, 12px horizontal
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Gap Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong>Inline elements:</strong> 8px gap
                </li>
                <li>
                  <strong>Form fields:</strong> 16px vertical gap
                </li>
                <li>
                  <strong>Card groups:</strong> 16px gap
                </li>
                <li>
                  <strong>Section separators:</strong> 32-48px
                </li>
                <li>
                  <strong>Page sections:</strong> 48-64px
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
