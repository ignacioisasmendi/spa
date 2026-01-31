import { NextRequest, NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function GET(request: NextRequest) {
  try {
    // Get the Auth0 session
    const session = await auth0.getSession(request)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    // Get the Auth0 access token
    const accessToken = await auth0.getAccessToken()

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token available' },
        { status: 401 }
      )
    }

    // Call the backend API to get user's social accounts
    const backendResponse = await fetch(`${BACKEND_URL}/users/me/social-accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.token}`,
      },
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch social accounts' },
        { status: backendResponse.status }
      )
    }

    const socialAccounts = await backendResponse.json()

    return NextResponse.json({
      success: true,
      data: socialAccounts,
    })

  } catch (error) {
    console.error('Get social accounts API error:', error)
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
