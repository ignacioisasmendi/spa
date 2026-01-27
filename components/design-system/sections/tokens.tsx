"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function TokensSection() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const colorTokens = `// Color Tokens - Light Mode
export const lightColors = {
  // Background & Surface
  "color.bg.page": "#FAFAFC",
  "color.bg.surface": "#FFFFFF",
  "color.bg.surfaceMuted": "#F4F4F8",
  "color.bg.surfaceHover": "#F0F0F5",
  
  // Brand
  "color.brand.50": "#F4F4FB",
  "color.brand.100": "#E8E8F6",
  "color.brand.200": "#D1D2ED",
  "color.brand.300": "#9597E7",
  "color.brand.400": "#7162DF",
  "color.brand.500": "#6366BC",
  "color.brand.600": "#5A5DA2",
  "color.brand.700": "#4A4D85",
  "color.brand.800": "#3A3C68",
  "color.brand.900": "#2D2B3E",
  
  // Text
  "color.text.primary": "#1A1A2E",
  "color.text.secondary": "#6B6B80",
  "color.text.muted": "#9090A0",
  "color.text.inverse": "#FFFFFF",
  
  // Border
  "color.border.default": "#E4E4EC",
  "color.border.subtle": "#F0F0F5",
  "color.border.focus": "#7162DF",
  
  // Semantic
  "color.success.bg": "#DCFCE7",
  "color.success.text": "#166534",
  "color.success.border": "#22C55E",
  "color.warning.bg": "#FEF3C7",
  "color.warning.text": "#92400E",
  "color.warning.border": "#F59E0B",
  "color.error.bg": "#FEE2E2",
  "color.error.text": "#991B1B",
  "color.error.border": "#DC4C64",
  "color.info.bg": "#DBEAFE",
  "color.info.text": "#1E40AF",
  "color.info.border": "#3B82F6",
}

// Color Tokens - Dark Mode
export const darkColors = {
  // Background & Surface
  "color.bg.page": "#0E0E14",
  "color.bg.surface": "#1A1A24",
  "color.bg.surfaceMuted": "#211F2D",
  "color.bg.surfaceHover": "#2D2B3E",
  
  // Brand (inverted scale)
  "color.brand.50": "#2D2B3E",
  "color.brand.100": "#3A3A4A",
  "color.brand.200": "#4A4D85",
  "color.brand.300": "#5A5DA2",
  "color.brand.400": "#6366BC",
  "color.brand.500": "#7162DF",
  "color.brand.600": "#9597E7",
  "color.brand.700": "#C79CE6",
  "color.brand.800": "#E8E8F0",
  "color.brand.900": "#FFFFFF",
  
  // Text
  "color.text.primary": "#E8E8F0",
  "color.text.secondary": "#9090A0",
  "color.text.muted": "#6B6B80",
  "color.text.inverse": "#0E0E14",
  
  // Border
  "color.border.default": "#3A3A4A",
  "color.border.subtle": "#2D2B3E",
  "color.border.focus": "#9597E7",
  
  // Semantic
  "color.success.bg": "rgba(34, 197, 94, 0.15)",
  "color.success.text": "#4ADE80",
  "color.success.border": "#22C55E",
  "color.warning.bg": "rgba(245, 158, 11, 0.15)",
  "color.warning.text": "#FBBF24",
  "color.warning.border": "#F59E0B",
  "color.error.bg": "rgba(239, 68, 68, 0.15)",
  "color.error.text": "#FCA5A5",
  "color.error.border": "#EF4444",
  "color.info.bg": "rgba(59, 130, 246, 0.15)",
  "color.info.text": "#93C5FD",
  "color.info.border": "#3B82F6",
}`

  const typographyTokens = `// Typography Tokens
export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  },
  
  fontSize: {
    display: "36px",
    h1: "30px",
    h2: "24px",
    h3: "20px",
    h4: "16px",
    body: "14px",
    bodySmall: "13px",
    caption: "12px",
    overline: "11px",
  },
  
  lineHeight: {
    tight: "1.2",
    snug: "1.3",
    normal: "1.4",
    relaxed: "1.5",
    loose: "1.6",
  },
  
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
  },
  
  letterSpacing: {
    tighter: "-0.02em",
    tight: "-0.015em",
    normal: "-0.01em",
    wide: "0.01em",
    wider: "0.05em",
  },
}`

  const spacingTokens = `// Spacing Tokens (8pt grid)
export const spacing = {
  0: "0px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
}

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}`

  const radiusShadowTokens = `// Border Radius Tokens
export const radius = {
  none: "0px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
}

// Shadow Tokens - Light Mode
export const shadowsLight = {
  xs: "0 1px 2px rgba(90, 93, 162, 0.04)",
  sm: "0 1px 3px rgba(90, 93, 162, 0.08)",
  md: "0 4px 6px -1px rgba(90, 93, 162, 0.08)",
  lg: "0 10px 15px -3px rgba(90, 93, 162, 0.08)",
  xl: "0 20px 25px -5px rgba(90, 93, 162, 0.1)",
}

// Shadow Tokens - Dark Mode
export const shadowsDark = {
  xs: "0 1px 2px rgba(0, 0, 0, 0.2)",
  sm: "0 1px 3px rgba(0, 0, 0, 0.3)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
}

// Border Tokens
export const borders = {
  width: {
    default: "1px",
    thick: "2px",
  },
  style: {
    solid: "solid",
    dashed: "dashed",
  },
}`

  const componentTokens = `// Component Tokens
export const components = {
  button: {
    height: {
      sm: "36px",
      md: "40px",
      lg: "44px",
    },
    padding: {
      sm: "8px 12px",
      md: "10px 16px",
      lg: "12px 20px",
    },
    fontSize: "14px",
    fontWeight: "500",
    radius: "6px",
    transition: "150ms ease-out",
    
    primary: {
      bg: "var(--primary)",
      bgHover: "var(--brand-400)",
      bgActive: "var(--brand-600)",
      text: "var(--primary-foreground)",
    },
    secondary: {
      bg: "var(--secondary)",
      bgHover: "var(--muted)",
      text: "var(--secondary-foreground)",
    },
    ghost: {
      bg: "transparent",
      bgHover: "var(--muted)",
      text: "var(--foreground)",
    },
    destructive: {
      bg: "var(--destructive)",
      bgHover: "#C53030",
      text: "var(--destructive-foreground)",
    },
  },
  
  input: {
    height: "40px",
    padding: "10px 12px",
    fontSize: "14px",
    radius: "6px",
    borderWidth: "1px",
    borderColor: "var(--border)",
    borderColorFocus: "var(--ring)",
    bg: "var(--background)",
    placeholder: "var(--muted-foreground)",
    transition: "150ms ease-out",
  },
  
  card: {
    padding: {
      compact: "16px",
      default: "24px",
    },
    radius: "8px",
    shadow: "var(--shadow-sm)",
    border: "1px solid var(--border)",
    bg: "var(--card)",
  },
  
  modal: {
    maxWidth: "480px",
    padding: "24px",
    radius: "12px",
    shadow: "var(--shadow-lg)",
    backdropOpacity: "0.5",
  },
  
  badge: {
    padding: "4px 8px",
    fontSize: "12px",
    fontWeight: "500",
    radius: "4px",
    lineHeight: "1.4",
  },
  
  switch: {
    trackWidth: "44px",
    trackHeight: "24px",
    thumbSize: "20px",
    transition: "150ms ease-out",
  },
  
  tooltip: {
    padding: "6px 10px",
    fontSize: "12px",
    radius: "6px",
    shadow: "var(--shadow-md)",
    maxWidth: "200px",
  },
}`

  const motionTokens = `// Motion Tokens
export const motion = {
  duration: {
    instant: "0ms",
    fast: "100ms",
    normal: "150ms",
    moderate: "200ms",
    slow: "300ms",
    slower: "400ms",
  },
  
  easing: {
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  
  // Common patterns
  patterns: {
    hover: "all 150ms cubic-bezier(0, 0, 0.2, 1)",
    focus: "all 150ms cubic-bezier(0, 0, 0.2, 1)",
    modal: "all 200ms cubic-bezier(0, 0, 0.2, 1)",
    drawer: "transform 300ms cubic-bezier(0, 0, 0.2, 1)",
    toast: "all 300ms cubic-bezier(0, 0, 0.2, 1)",
  },
}`

  const sections = [
    { id: "colors", label: "Colors", code: colorTokens },
    { id: "typography", label: "Typography", code: typographyTokens },
    { id: "spacing", label: "Spacing", code: spacingTokens },
    { id: "radius", label: "Radius & Shadows", code: radiusShadowTokens },
    { id: "components", label: "Components", code: componentTokens },
    { id: "motion", label: "Motion", code: motionTokens },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Token Output
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
          Design tokens in TypeScript format, ready for implementation in Figma or code.
        </p>
      </div>

      <Card className="border-border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Token Naming Convention:</strong> We use a structured format:{" "}
            <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">
              category.property.variant
            </code>
            . For example:{" "}
            <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">
              color.bg.surface
            </code>
            ,{" "}
            <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">
              button.primary.bg
            </code>
            ,{" "}
            <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">
              motion.duration.fast
            </code>
          </p>
        </CardContent>
      </Card>

      {sections.map((section) => (
        <Card key={section.id} className="border-border overflow-hidden">
          <CardHeader className="flex-row items-center justify-between bg-muted/50">
            <CardTitle className="text-base">{section.label} Tokens</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(section.code, section.id)}
            >
              {copiedSection === section.id ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="p-4 overflow-x-auto text-xs font-mono text-foreground bg-muted/30">
              <code>{section.code}</code>
            </pre>
          </CardContent>
        </Card>
      ))}

      {/* CSS Variables Version */}
      <Card className="border-border overflow-hidden">
        <CardHeader className="flex-row items-center justify-between bg-muted/50">
          <CardTitle className="text-base">CSS Variables (globals.css)</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              copyToClipboard(
                `:root {
  /* Brand */
  --brand-50: #F4F4FB;
  --brand-100: #E8E8F6;
  --brand-200: #D1D2ED;
  --brand-300: #9597E7;
  --brand-400: #7162DF;
  --brand-500: #6366BC;
  --brand-600: #5A5DA2;
  
  /* Surfaces */
  --background: #FAFAFC;
  --foreground: #1A1A2E;
  --card: #FFFFFF;
  --muted: #F0F0F5;
  --muted-foreground: #6B6B80;
  
  /* Actions */
  --primary: #6366BC;
  --primary-foreground: #FFFFFF;
  --destructive: #DC4C64;
  
  /* Borders */
  --border: #E4E4EC;
  --ring: #7162DF;
  
  /* Radius */
  --radius: 0.5rem;
}

.dark {
  --background: #0E0E14;
  --foreground: #E8E8F0;
  --card: #1A1A24;
  --muted: #211F2D;
  --muted-foreground: #9090A0;
  --primary: #7162DF;
  --border: #3A3A4A;
  --ring: #9597E7;
}`,
                "css"
              )
            }
          >
            {copiedSection === "css" ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <pre className="p-4 overflow-x-auto text-xs font-mono text-foreground bg-muted/30">
            <code>{`:root {
  /* Brand */
  --brand-50: #F4F4FB;
  --brand-100: #E8E8F6;
  --brand-200: #D1D2ED;
  --brand-300: #9597E7;
  --brand-400: #7162DF;
  --brand-500: #6366BC;
  --brand-600: #5A5DA2;
  
  /* Surfaces */
  --background: #FAFAFC;
  --foreground: #1A1A2E;
  --card: #FFFFFF;
  --muted: #F0F0F5;
  --muted-foreground: #6B6B80;
  
  /* Actions */
  --primary: #6366BC;
  --primary-foreground: #FFFFFF;
  --destructive: #DC4C64;
  
  /* Borders */
  --border: #E4E4EC;
  --ring: #7162DF;
  
  /* Radius */
  --radius: 0.5rem;
}

.dark {
  --background: #0E0E14;
  --foreground: #E8E8F0;
  --card: #1A1A24;
  --muted: #211F2D;
  --muted-foreground: #9090A0;
  --primary: #7162DF;
  --border: #3A3A4A;
  --ring: #9597E7;
}`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
