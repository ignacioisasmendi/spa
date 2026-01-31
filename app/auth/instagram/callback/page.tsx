'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Loader2, Instagram } from 'lucide-react'

type Status = 'loading' | 'success' | 'error'

export default function InstagramCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    // Handle OAuth errors
    if (error) {
      setStatus('error')
      setErrorMessage(
        errorDescription || 'Authorization was denied or an error occurred'
      )
      return
    }

    // Handle successful authorization
    if (code) {
      // Send the code to backend
      fetch('http://localhost:5000/auth/instagram/callback', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // For session cookies
        body: JSON.stringify({ code, state })
      })
        .then(async (res) => {
          const data = await res.json()
          
          if (!res.ok) {
            throw new Error(data.message || 'Failed to connect Instagram account')
          }
          
          return data
        })
        .then((data) => {
          if (data.success) {
            setStatus('success')
            // Redirect after showing success message
            setTimeout(() => {
              router.push('/connect-social?instagram=connected')
            }, 2000)
          } else {
            throw new Error(data.message || 'Connection failed')
          }
        })
        .catch((error) => {
          console.error('Instagram connection error:', error)
          setStatus('error')
          setErrorMessage(
            error.message || 'Failed to connect your Instagram account. Please try again.'
          )
        })
    } else {
      // No code and no error means something went wrong
      setStatus('error')
      setErrorMessage('No authorization code received. Please try again.')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            {status === 'loading' && (
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircle2 className="h-8 w-8 text-white" />
            )}
            {status === 'error' && (
              <XCircle className="h-8 w-8 text-white" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {status === 'loading' && 'Connecting Instagram'}
            {status === 'success' && 'Successfully Connected!'}
            {status === 'error' && 'Connection Failed'}
          </CardTitle>
          <CardDescription>
            {status === 'loading' && 'Please wait while we connect your Instagram account...'}
            {status === 'success' && 'Your Instagram account has been successfully connected to Planer'}
            {status === 'error' && 'We couldn\'t connect your Instagram account'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {status === 'loading' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>Verifying authorization...</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-100" />
                <span>Connecting to your account...</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-200" />
                <span>Setting up permissions...</span>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
                <div className="flex items-start gap-3">
                  <Instagram className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      What's next?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You can now schedule posts, view insights, and manage your Instagram content directly from Planer.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Redirecting you back to your account settings...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                <p className="text-sm text-foreground">
                  {errorMessage}
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => router.push('/connect-social')}
                  className="w-full"
                >
                  Try Again
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                  className="w-full"
                >
                  Back to Dashboard
                </Button>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs font-medium text-foreground mb-2">
                  Common issues:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Make sure you approved the permissions request</li>
                  <li>• Check that your Instagram account is a Business or Creator account</li>
                  <li>• Verify that your account is connected to a Facebook Page</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
