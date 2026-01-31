import { NextRequest, NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  try {
    // Get the Auth0 session
    const session = await auth0.getSession(request)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    // Get the Instagram authorization code from request body
    const body = await request.json()
    const { code, state } = body

    if (!code) {
      return NextResponse.json(
        { success: false, message: 'Missing authorization code' },
        { status: 400 }
      )
    }

    // Get the Auth0 access token from session
   
    const accessToken = await auth0.getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token available' },
        { status: 401 }
      );
    }

    // Prepare the data to send to backend
    const backendPayload = {
      code,
      state
    }

    // Call the backend API with the Auth0 token
    const backendResponse = await fetch(`${BACKEND_URL}/auth/instagram/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.token}`, // Send Auth0 token for authentication
      },
      body: JSON.stringify(backendPayload),
    })

    const backendData = await backendResponse.json()

    if (!backendResponse.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: backendData.message || 'Failed to connect Instagram account' 
        },
        { status: backendResponse.status }
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Instagram account connected successfully',
      data: backendData,
    })

  } catch (error) {
    console.error('Instagram callback API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
