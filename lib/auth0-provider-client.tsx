'use client';

import { ReactNode } from 'react';
import { Auth0Provider } from './auth0-context';

interface Auth0ProviderClientProps {
  children: ReactNode;
}

export function Auth0ProviderClient({ children }: Auth0ProviderClientProps) {
  // These values should come from environment variables
  // In a real app, you'll configure these in your .env.local file
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';
  const redirectUri = typeof window !== 'undefined' 
    ? `${window.location.origin}/callback`
    : 'http://localhost:3000/callback';
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;
  
  if (!domain || !clientId) {
    console.warn('Auth0 configuration is missing. Please set NEXT_PUBLIC_AUTH0_DOMAIN and NEXT_PUBLIC_AUTH0_CLIENT_ID in your .env.local file.');
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
      scope="openid profile email"
      useRefreshTokens={true}
      cacheLocation="memory"
    >
      {children}
    </Auth0Provider>
  );
}
