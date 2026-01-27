"use client"

import { ContentCalendar } from "@/components/dashboard/content-calendar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-auto p-6">
          <ContentCalendar />
        </main>
      </div>
    </div>
  )
}
