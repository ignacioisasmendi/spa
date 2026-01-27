import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TypographyFoundation() {
  const typeScale = [
    {
      name: "Display",
      size: "36px / 2.25rem",
      lineHeight: "1.2",
      weight: "600",
      tracking: "-0.02em",
      usage: "Hero sections, empty states",
    },
    {
      name: "H1",
      size: "30px / 1.875rem",
      lineHeight: "1.25",
      weight: "600",
      tracking: "-0.015em",
      usage: "Page titles",
    },
    {
      name: "H2",
      size: "24px / 1.5rem",
      lineHeight: "1.3",
      weight: "600",
      tracking: "-0.01em",
      usage: "Section headings",
    },
    {
      name: "H3",
      size: "20px / 1.25rem",
      lineHeight: "1.4",
      weight: "500",
      tracking: "-0.005em",
      usage: "Card titles, modal headers",
    },
    {
      name: "H4",
      size: "16px / 1rem",
      lineHeight: "1.5",
      weight: "500",
      tracking: "0",
      usage: "Subsection headings",
    },
    {
      name: "Body",
      size: "14px / 0.875rem",
      lineHeight: "1.5",
      weight: "400",
      tracking: "0",
      usage: "Primary body text, descriptions",
    },
    {
      name: "Body Small",
      size: "13px / 0.8125rem",
      lineHeight: "1.5",
      weight: "400",
      tracking: "0",
      usage: "Dense UI, tables, metadata",
    },
    {
      name: "Caption",
      size: "12px / 0.75rem",
      lineHeight: "1.4",
      weight: "400",
      tracking: "0.01em",
      usage: "Helper text, timestamps",
    },
    {
      name: "Overline",
      size: "11px / 0.6875rem",
      lineHeight: "1.4",
      weight: "500",
      tracking: "0.05em",
      usage: "Labels, badges (uppercase)",
    },
  ]

  const fontWeights = [
    { name: "Regular", value: "400", usage: "Body text, descriptions" },
    { name: "Medium", value: "500", usage: "Labels, buttons, emphasis" },
    { name: "Semibold", value: "600", usage: "Headings, important text" },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Typography
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
          A clear, readable type system optimized for data-dense dashboard interfaces.
        </p>
      </div>

      {/* Font Stack */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Font Stack</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Primary: Inter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold mb-2">Aa</p>
              <p className="text-sm text-muted-foreground mb-4">
                A clean, geometric sans-serif optimized for screen readability.
                Excellent for dashboard UIs with tight spacing needs.
              </p>
              <div className="text-xs font-mono text-muted-foreground bg-muted p-3 rounded-lg">
                {`font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base font-mono">
                Monospace: JetBrains Mono
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-mono font-semibold mb-2">Aa</p>
              <p className="text-sm text-muted-foreground mb-4">
                For code snippets, data values, and technical content. Clear
                distinction between similar characters.
              </p>
              <div className="text-xs font-mono text-muted-foreground bg-muted p-3 rounded-lg">
                {`font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;`}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Type Scale */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Type Scale</h2>
        <Card className="border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Size
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Line Height
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Weight
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Tracking
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Usage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {typeScale.map((row) => (
                  <tr key={row.name}>
                    <td className="py-3 px-4 font-medium text-foreground">
                      {row.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.size}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.lineHeight}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.weight}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                      {row.tracking}
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

      {/* Live Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Live Examples</h2>
        <Card className="border-border">
          <CardContent className="pt-6 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Display
              </p>
              <p className="text-4xl font-semibold tracking-tight text-foreground">
                Welcome to SocialFlow
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                H1
              </p>
              <p className="text-3xl font-semibold tracking-tight text-foreground">
                Content Calendar
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                H2
              </p>
              <p className="text-2xl font-semibold text-foreground">
                Analytics Overview
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                H3
              </p>
              <p className="text-xl font-medium text-foreground">
                Engagement Metrics
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Body
              </p>
              <p className="text-sm text-foreground leading-relaxed max-w-lg">
                Schedule and manage your social media content across multiple
                platforms. Track performance with real-time analytics and
                collaborate with your team seamlessly.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Caption
              </p>
              <p className="text-xs text-muted-foreground">
                Last updated: Jan 22, 2026 at 3:45 PM
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Overline
              </p>
              <p className="text-[11px] uppercase tracking-widest font-medium text-muted-foreground">
                Beta Feature
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Font Weights */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Font Weights</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {fontWeights.map((weight) => (
            <Card key={weight.name} className="border-border">
              <CardContent className="pt-6">
                <p
                  className="text-2xl mb-2 text-foreground"
                  style={{ fontWeight: weight.value }}
                >
                  {weight.name}
                </p>
                <p className="text-xs font-mono text-muted-foreground mb-2">
                  font-weight: {weight.value}
                </p>
                <p className="text-xs text-muted-foreground">{weight.usage}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Guidelines */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-foreground">Guidelines</h2>
        <Card className="border-border">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Minimum body text size: <strong>13px</strong> for readability
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Line length: <strong>60-80 characters</strong> maximum for
                  comfortable reading
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Use <strong>text-balance</strong> for headings and{" "}
                  <strong>text-pretty</strong> for body text
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Apply negative tracking (<strong>-0.01em to -0.02em</strong>)
                  for headings 20px+
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Use line-height <strong>1.4-1.6</strong> for body text to
                  ensure readability
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
