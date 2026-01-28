"use client"
import { ContentCalendar } from "@/components/dashboard/content-calendar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"
import { useUser } from "@auth0/nextjs-auth0"


// Skeleton Loading Component
function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Skeleton */}
      <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
        {/* Workspace selector skeleton */}
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-muted rounded animate-pulse w-24" />
              <div className="h-2 bg-muted rounded animate-pulse w-16" />
            </div>
          </div>
        </div>

        {/* Navigation skeleton */}
        <div className="p-3 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5">
              <div className="h-5 w-5 rounded bg-muted animate-pulse" />
              <div className="h-3 bg-muted rounded animate-pulse w-20" />
            </div>
          ))}
        </div>

        {/* Channels skeleton */}
        <div className="flex-1 border-t border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="h-3 bg-muted rounded animate-pulse w-16" />
            <div className="h-6 w-6 rounded bg-muted animate-pulse" />
          </div>
          <div className="px-3 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <div className="h-7 w-7 rounded-full bg-muted animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-3 bg-muted rounded animate-pulse w-20" />
                  <div className="h-2 bg-muted rounded animate-pulse w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User profile skeleton */}
        <div className="border-t border-border p-3">
          <div className="mt-3 flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-muted rounded animate-pulse w-24" />
              <div className="h-2 bg-muted rounded animate-pulse w-32" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content skeleton */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar skeleton */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="h-4 bg-muted rounded animate-pulse w-32" />
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
            <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
            <div className="h-9 w-24 rounded-lg bg-muted animate-pulse" />
          </div>
        </header>

        {/* Content area skeleton */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded animate-pulse w-48" />
              <div className="h-4 bg-muted rounded animate-pulse w-64" />
            </div>
            <div className="h-10 w-32 bg-muted rounded-lg animate-pulse" />
          </div>

          {/* Calendar skeleton */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="h-8 bg-muted rounded animate-pulse w-40" />
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                <div className="h-8 w-8 bg-muted rounded animate-pulse" />
              </div>
            </div>
            
            {/* Calendar grid skeleton */}
            <div className="grid grid-cols-7 gap-4">
              {/* Day headers */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={`header-${i}`} className="h-4 bg-muted rounded animate-pulse" />
              ))}
              
              {/* Calendar cells */}
              {[...Array(35)].map((_, i) => (
                <div key={`cell-${i}`} className="aspect-square rounded-lg bg-muted/50 animate-pulse" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar user={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-auto p-6">
          <ContentCalendar />
        </main>
      </div>
    </div>
  )
}
