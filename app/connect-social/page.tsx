"use client"

import { useState, useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Info, 
  AlertCircle,
  ArrowLeft,
  Zap,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"

interface SocialPlatform {
  id: string
  name: string
  description: string
  icon: string
  color: string
  connected: boolean
  connectedAccount?: string
  features: string[]
  permissions: string[]
}

export default function ConnectSocialPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [connecting, setConnecting] = useState<string | null>(null)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: "instagram",
      name: "Instagram",
      description: "Share photos and stories with your audience",
      icon: "instagram",
      color: "from-purple-500 to-pink-500",
      connected: false,
      features: ["Post photos", "Schedule stories", "View insights", "Auto-publish"],
      permissions: ["Read profile", "Publish content", "View analytics"],
    },
    {
      id: "facebook",
      name: "Facebook",
      description: "Connect with your community on Facebook",
      icon: "facebook",
      color: "from-blue-600 to-blue-500",
      connected: false,
      features: ["Post updates", "Schedule posts", "Manage pages", "View metrics"],
      permissions: ["Manage pages", "Publish content", "Read insights"],
    },
    {
      id: "tiktok",
      name: "TikTok",
      description: "Create and share short-form videos",
      icon: "tiktok",
      color: "from-black to-gray-800",
      connected: false,
      features: ["Upload videos", "Schedule content", "View analytics", "Manage drafts"],
      permissions: ["Upload videos", "Read profile", "View statistics"],
    },
    {
      id: "twitter",
      name: "X (Twitter)",
      description: "Share thoughts and engage in conversations",
      icon: "twitter",
      color: "from-black to-gray-700",
      connected: false,
      features: ["Post tweets", "Schedule threads", "View engagement", "Auto-retweet"],
      permissions: ["Read and write tweets", "View analytics"],
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Build your professional network",
      icon: "linkedin",
      color: "from-blue-700 to-blue-600",
      connected: false,
      features: ["Post updates", "Share articles", "Schedule posts", "View impressions"],
      permissions: ["Read profile", "Share content", "View analytics"],
    },
    {
      id: "youtube",
      name: "YouTube",
      description: "Upload and manage your video content",
      icon: "youtube",
      color: "from-red-600 to-red-500",
      connected: false,
      features: ["Upload videos", "Manage channel", "Schedule releases", "View metrics"],
      permissions: ["Upload videos", "Manage channel", "View analytics"],
    },
  ])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
    }

    // Check if Instagram was just connected
    const instagramConnected = searchParams.get('instagram')
    if (instagramConnected === 'connected') {
      setShowSuccessBanner(true)
      // Mark Instagram as connected
      setPlatforms(platforms.map(p => 
        p.id === 'instagram' 
          ? { ...p, connected: true, connectedAccount: '@your_instagram' }
          : p
      ))
      // Auto-hide banner after 5 seconds
      setTimeout(() => setShowSuccessBanner(false), 5000)
    }
  }, [user, isLoading, router, searchParams])

  const connectInstagram = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!,
      redirect_uri: 'https://app.planer.com.ar/auth/instagram/callback',
      scope: [
        'instagram_business_basic',
        'instagram_business_manage_messages',
        'instagram_business_manage_comments',
        'instagram_business_content_publish',
        'instagram_business_manage_insights',
      ].join(','),
      response_type: 'code',
      state: crypto.randomUUID()
    })
  
    window.location.href = `https://api.instagram.com/oauth/authorize?${params.toString()}`
  }

  const handleConnect = async (platformId: string) => {
    // Instagram uses real OAuth flow
    if (platformId === 'instagram') {
      connectInstagram()
      return
    }

    // Other platforms simulate connection
    setConnecting(platformId)
    
    // Simulate API call
    setTimeout(() => {
      setPlatforms(platforms.map(p => 
        p.id === platformId 
          ? { ...p, connected: true, connectedAccount: `@user_${platformId}` }
          : p
      ))
      setConnecting(null)
    }, 2000)
  }

  const handleDisconnect = async (platformId: string) => {
    setConnecting(platformId)
    
    // Simulate API call
    setTimeout(() => {
      setPlatforms(platforms.map(p => 
        p.id === platformId 
          ? { ...p, connected: false, connectedAccount: undefined }
          : p
      ))
      setConnecting(null)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const connectedCount = platforms.filter(p => p.connected).length

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar user={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Success Banner */}
            {showSuccessBanner && (
              <Card className="border-primary bg-primary/5 relative overflow-hidden">
                <CardContent className="flex items-start gap-3 pt-6">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Instagram Connected Successfully!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your Instagram account is now connected. You can start scheduling and publishing content.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => setShowSuccessBanner(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Header */}
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.back()}
                className="mb-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Connect Your Accounts</h1>
                  <p className="text-muted-foreground mt-1">
                    Link your social media accounts to start scheduling and publishing content
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground">{connectedCount}/6</div>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-start gap-3 pt-6">
                <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Secure Connection
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your accounts are connected securely using OAuth 2.0. We never store your passwords and you can revoke access anytime.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Platforms Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {platforms.map((platform) => (
                <Card key={platform.id} className={cn(
                  "relative overflow-hidden transition-all hover:shadow-lg",
                  platform.connected && "border-primary/50"
                )}>
                  {platform.connected && (
                    <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16">
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-10 rounded-full",
                        platform.color
                      )} />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shrink-0",
                          platform.color
                        )}>
                          <SocialIcon platform={platform.icon} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">{platform.name}</CardTitle>
                            {platform.connected && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                <CheckCircle2 className="h-3 w-3" />
                                Connected
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="mt-1">
                            {platform.description}
                          </CardDescription>
                          {platform.connected && platform.connectedAccount && (
                            <p className="text-sm text-muted-foreground mt-2 font-medium">
                              {platform.connectedAccount}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        Features
                      </h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        Permissions Required
                      </h4>
                      <ul className="space-y-1">
                        {platform.permissions.map((permission, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Circle className="h-1.5 w-1.5 fill-current" />
                            {permission}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex gap-2">
                      {platform.connected ? (
                        <>
                          <Button
                            variant="outline"
                            className="flex-1"
                            size="sm"
                            disabled={connecting === platform.id}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Manage
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleDisconnect(platform.id)}
                            disabled={connecting === platform.id}
                            size="sm"
                            className="flex-1"
                          >
                            {connecting === platform.id ? "Disconnecting..." : "Disconnect"}
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleConnect(platform.id)}
                          disabled={connecting === platform.id}
                          className="w-full"
                          size="sm"
                        >
                          {connecting === platform.id ? (
                            <>
                              <div className="mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Connect {platform.name}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Help Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Need Help?
                </CardTitle>
                <CardDescription>
                  Learn more about connecting your social media accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="text-left">
                      <p className="font-medium text-sm">Setup Guide</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Step-by-step instructions
                      </p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="text-left">
                      <p className="font-medium text-sm">Troubleshooting</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Common connection issues
                      </p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="text-left">
                      <p className="font-medium text-sm">Contact Support</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Get help from our team
                      </p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function SocialIcon({ platform }: { platform: string }) {
  const iconClass = "h-6 w-6 text-white"
  
  switch (platform) {
    case "instagram":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    case "facebook":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    case "tiktok":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      )
    case "twitter":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    case "linkedin":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    case "youtube":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    default:
      return null
  }
}
