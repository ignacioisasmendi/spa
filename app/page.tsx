"use client"

import { useState } from "react"
import { DesignSystemNav } from "@/components/design-system/nav"
import { DesignPrinciples } from "@/components/design-system/sections/design-principles"
import { ColorFoundation } from "@/components/design-system/sections/color-foundation"
import { TypographyFoundation } from "@/components/design-system/sections/typography-foundation"
import { SpacingLayout } from "@/components/design-system/sections/spacing-layout"
import { RadiusElevation } from "@/components/design-system/sections/radius-elevation"
import { IconographySection } from "@/components/design-system/sections/iconography"
import { MotionSection } from "@/components/design-system/sections/motion"
import { ComponentsSection } from "@/components/design-system/sections/components"
import { PatternsSection } from "@/components/design-system/sections/patterns"
import { TokensSection } from "@/components/design-system/sections/tokens"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const sections = [
  { id: "principles", label: "Design Principles" },
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing & Layout" },
  { id: "radius", label: "Radius & Elevation" },
  { id: "iconography", label: "Iconography" },
  { id: "motion", label: "Motion" },
  { id: "components", label: "Components" },
  { id: "patterns", label: "Patterns" },
  { id: "tokens", label: "Token Output" },
  { id: "qa", label: "QA Checklist" },
  { id: "publisher", label: "Publisher" },
  { id: "auth-demo", label: "Auth0 Demo" },
]

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState("principles")
  const [isDark, setIsDark] = useState(false)
  const router = useRouter()

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  useEffect(() => {
    if (activeSection === "publisher") {
      router.push("/instagram-publish")
    }
    if (activeSection === "auth-demo") {
      router.push("/auth-demo")
    }
  }, [activeSection, router])

  return (
    <div className={`min-h-screen bg-background ${isDark ? "dark" : ""}`}>
      <DesignSystemNav
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      
      <main className="lg:pl-72">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {activeSection === "principles" && <DesignPrinciples />}
          {activeSection === "color" && <ColorFoundation />}
          {activeSection === "typography" && <TypographyFoundation />}
          {activeSection === "spacing" && <SpacingLayout />}
          {activeSection === "radius" && <RadiusElevation />}
          {activeSection === "iconography" && <IconographySection />}
          {activeSection === "motion" && <MotionSection />}
          {activeSection === "components" && <ComponentsSection />}
          {activeSection === "patterns" && <PatternsSection />}
          {activeSection === "tokens" && <TokensSection />}
        </div>
      </main>
    </div>
  )
}
