# Auth0 SPA Setup Guide

This project uses **Auth0 SPA SDK** (`@auth0/auth0-spa-js`) for client-side authentication with callback-only flow.

## 🎯 Architecture Overview

- **No local login page with forms** - all authentication happens via Auth0 hosted pages
- **Separate landing page** can redirect to Auth0, then Auth0 redirects back to this SPA
- **Callback-only flow** - the SPA handles the Auth0 callback and manages authentication state
- **Client-side authentication** - all auth logic runs in the browser using the Auth0 SPA SDK

## 📋 Prerequisites

1. An Auth0 account (free tier works fine)
2. Auth0 tenant and application configured

## 🔧 Auth0 Configuration

### Step 1: Create an Auth0 Application

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **Applications** → **Applications**
3. Click **Create Application**
4. Choose:
   - Name: `Planer SPA`
   - Type: **Single Page Application** (important!)
5. Click **Create**

### Step 2: Get Your Credentials

In your application settings, find:

- **Domain**: `your-tenant.auth0.com`
- **Client ID**: `abc123...`

### Step 3: Configure Application URLs

In your Auth0 application settings, add these URLs:

#### For Local Development:
```
Allowed Callback URLs:
http://localhost:3000/callback

Allowed Logout URLs:
http://localhost:3000

Allowed Web Origins:
http://localhost:3000

Allowed Origins (CORS):
http://localhost:3000
```

#### For Production:
```
Allowed Callback URLs:
https://yourdomain.com/callback

Allowed Logout URLs:
https://yourdomain.com

Allowed Web Origins:
https://yourdomain.com

Allowed Origins (CORS):
https://yourdomain.com
```

**Important:** If you have multiple environments (staging, production), add all callback URLs separated by commas.

### Step 4: Enable Social Connections (Optional)

1. Go to **Authentication** → **Social**
2. Enable providers you want (Google, GitHub, etc.)
3. Configure each provider with your OAuth credentials

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```bash
# Auth0 SPA Configuration
NEXT_PUBLIC_AUTH0_DOMAIN=your-tenant.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your_client_id_here

# Optional: If you have a custom API
# NEXT_PUBLIC_AUTH0_AUDIENCE=https://your-api-identifier
```

**Note:** Variables must be prefixed with `NEXT_PUBLIC_` because they're used in client-side code.

## 🚀 How It Works

### Authentication Flow

```
1. User clicks "Sign In" (from landing page or SPA)
   ↓
2. Redirects to Auth0 hosted login page
   ↓
3. User authenticates with Auth0
   ↓
4. Auth0 redirects back to: yourdomain.com/callback?code=...
   ↓
5. SPA callback handler processes the token
   ↓
6. User is redirected to /dashboard
```

### Key Files

- **`/lib/auth0-context.tsx`** - Auth0 React context and hooks
- **`/lib/auth0-provider-client.tsx`** - Client-side provider wrapper
- **`/app/callback/page.tsx`** - Handles Auth0 callback redirect
- **`/app/login/page.tsx`** - Auto-redirects to Auth0 login
- **`/app/layout.tsx`** - Wraps app with Auth0Provider
- **`/components/auth/LoginButton.tsx`** - Triggers login redirect
- **`/components/auth/LogoutButton.tsx`** - Handles logout
- **`/components/auth/Profile.tsx`** - Displays user info
- **`/app/dashboard/page.tsx`** - Protected route example

## 🔌 Integration with Separate Landing Page

If you have a **separate landing page** (different project/domain), follow this integration:

### Option 1: Simple Redirect (Recommended)

Your landing page's "Sign In" button should link to:
```
https://your-spa-domain.com/login
```

The SPA's `/login` page will automatically redirect to Auth0.

### Option 2: Direct Auth0 Redirect

Your landing page can directly redirect to Auth0:

```javascript
// Landing page button handler
const handleSignIn = () => {
  const auth0Domain = 'your-tenant.auth0.com';
  const clientId = 'your_client_id';
  const redirectUri = 'https://your-spa-domain.com/callback';
  const scope = 'openid profile email';
  
  // Generate random state for CSRF protection
  const state = generateRandomString(32);
  sessionStorage.setItem('auth0_state', state);
  
  const authUrl = `https://${auth0Domain}/authorize?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `state=${state}`;
  
  window.location.href = authUrl;
};

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}
```

## 🎨 Using Auth0 in Your Components

### Get User Info

```tsx
'use client';

import { useAuth0 } from '@/lib/auth0-context';

export function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;
  
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>{user?.email}</p>
    </div>
  );
}
```

### Trigger Login

```tsx
'use client';

import { useAuth0 } from '@/lib/auth0-context';

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <button onClick={() => loginWithRedirect()}>
      Sign In
    </button>
  );
}
```

### Trigger Logout

```tsx
'use client';

import { useAuth0 } from '@/lib/auth0-context';

export function LogoutButton() {
  const { logout } = useAuth0();
  
  return (
    <button onClick={() => logout()}>
      Sign Out
    </button>
  );
}
```

### Get Access Token for API Calls

```tsx
'use client';

import { useAuth0 } from '@/lib/auth0-context';

export function MyApiComponent() {
  const { getAccessTokenSilently } = useAuth0();
  
  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      
      const response = await fetch('https://your-api.com/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      // Use data...
    } catch (error) {
      console.error('API call failed:', error);
    }
  };
  
  return <button onClick={callApi}>Fetch Data</button>;
}
```

### Protect Routes

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@/lib/auth0-context';

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;
  
  return <div>Protected content</div>;
}
```

## 🧪 Testing the Setup

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Visit:** `http://localhost:3000`

3. **Click "Sign In"** - you should be redirected to Auth0

4. **Log in with Auth0** - you'll be redirected back to `/callback`

5. **After successful auth** - you should land on `/dashboard`

## 🐛 Troubleshooting

### "Auth0 client not initialized"
- Make sure environment variables are set correctly
- Check that variables are prefixed with `NEXT_PUBLIC_`
- Restart your dev server after changing env vars

### "Callback URL mismatch"
- Verify the callback URL in Auth0 matches exactly: `http://localhost:3000/callback`
- For production, make sure you've added your production URL

### "Login loops infinitely"
- Check browser console for errors
- Clear cookies and local storage
- Verify your Auth0 application type is "Single Page Application"

### "CORS errors"
- Add your domain to "Allowed Origins (CORS)" in Auth0
- Make sure "Allowed Web Origins" includes your domain

## 📚 Additional Resources

- [Auth0 SPA SDK Documentation](https://auth0.com/docs/libraries/auth0-spa-js)
- [Auth0 React Quick Start](https://auth0.com/docs/quickstart/spa/react)
- [Auth0 Dashboard](https://manage.auth0.com/)

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - it's in `.gitignore` by default
2. **Use HTTPS in production** - Auth0 requires HTTPS for production apps
3. **Keep tokens in memory** - this implementation uses `cacheLocation: 'memory'` by default
4. **Use refresh tokens** - enabled by default with `useRefreshTokens: true`
5. **Implement proper token validation** - when calling your backend APIs
6. **Enable MFA** - in Auth0 dashboard for enhanced security

## 📝 Next Steps

1. Configure your Auth0 tenant
2. Add environment variables to `.env.local`
3. Test the authentication flow
4. Integrate with your backend API (if applicable)
5. Add protected routes as needed
6. Customize the user experience
7. Deploy to production and update Auth0 URLs

---

**Questions?** Check the [Auth0 Community](https://community.auth0.com/) or [open an issue](https://github.com/auth0/auth0-spa-js/issues).
