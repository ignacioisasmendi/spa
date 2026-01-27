# Landing Page Integration Guide

This guide shows how to integrate a **separate landing page** (different project/domain) with this Planer SPA for Auth0 authentication.

## 🎯 Scenario

- **Landing Page**: `https://planer.com.ar` (separate project - could be WordPress, static site, etc.)
- **SPA Application**: `https://app.planer.com.ar` (this Next.js SPA)
- **Auth Flow**: Landing page → Auth0 → SPA callback → Dashboard

## 🔄 Integration Flow

```
1. User visits: planer.com.ar
2. User clicks "Iniciar Sesión" button
3. Redirects to: Auth0 hosted login page
4. User logs in with Auth0
5. Auth0 redirects to: app.planer.com.ar/callback
6. SPA processes callback
7. SPA redirects to: app.planer.com.ar/dashboard
```

## 🚀 Implementation Options

### Option 1: Simple Link (Easiest)

Your landing page just links to the SPA's login page:

```html
<!-- Landing page button -->
<a href="https://app.planer.com.ar/login" class="btn-primary">
  Iniciar Sesión
</a>
```

The SPA's `/login` page automatically redirects to Auth0.

**Pros:**
- Simplest implementation
- No Auth0 configuration needed on landing page
- Works with any static site generator

### Option 2: Direct Auth0 Redirect (More Control)

Your landing page redirects directly to Auth0:

#### HTML + Vanilla JavaScript

```html
<!-- Landing page -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Planer - Gestión de Redes Sociales</title>
</head>
<body>
  <button onclick="handleLogin()" class="btn-primary">
    Iniciar Sesión
  </button>

  <script>
    function handleLogin() {
      // Auth0 configuration
      const auth0Config = {
        domain: 'your-tenant.auth0.com',
        clientId: 'your_client_id',
        redirectUri: 'https://app.planer.com.ar/callback',
        scope: 'openid profile email'
      };

      // Generate state for CSRF protection
      const state = generateRandomString(32);
      sessionStorage.setItem('auth0_state', state);

      // Build Auth0 authorization URL
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: auth0Config.clientId,
        redirect_uri: auth0Config.redirectUri,
        scope: auth0Config.scope,
        state: state
      });

      const authUrl = `https://${auth0Config.domain}/authorize?${params.toString()}`;
      
      // Redirect to Auth0
      window.location.href = authUrl;
    }

    function generateRandomString(length) {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const values = new Uint8Array(length);
      crypto.getRandomValues(values);
      return Array.from(values)
        .map(x => charset[x % charset.length])
        .join('');
    }
  </script>
</body>
</html>
```

#### React Landing Page

```tsx
// LandingPage.tsx
import { useState } from 'react';

interface Auth0Config {
  domain: string;
  clientId: string;
  redirectUri: string;
  scope: string;
}

export function LandingPage() {
  const auth0Config: Auth0Config = {
    domain: 'your-tenant.auth0.com',
    clientId: 'your_client_id',
    redirectUri: 'https://app.planer.com.ar/callback',
    scope: 'openid profile email'
  };

  const handleLogin = () => {
    // Generate state for CSRF protection
    const state = generateRandomString(32);
    sessionStorage.setItem('auth0_state', state);

    // Build Auth0 authorization URL
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: auth0Config.clientId,
      redirect_uri: auth0Config.redirectUri,
      scope: auth0Config.scope,
      state: state
    });

    const authUrl = `https://${auth0Config.domain}/authorize?${params.toString()}`;
    
    // Redirect to Auth0
    window.location.href = authUrl;
  };

  const generateRandomString = (length: number): string => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = new Uint8Array(length);
    crypto.getRandomValues(values);
    return Array.from(values)
      .map(x => charset[x % charset.length])
      .join('');
  };

  return (
    <div className="landing-page">
      <header>
        <h1>Planer</h1>
        <p>Gestioná todas tus redes en un solo lugar</p>
      </header>
      
      <button 
        onClick={handleLogin}
        className="btn-primary"
      >
        Iniciar Sesión
      </button>
    </div>
  );
}
```

#### WordPress Integration

```php
<!-- In your WordPress theme file -->
<button id="login-btn" class="btn-primary">
  Iniciar Sesión
</button>

<script>
document.getElementById('login-btn').addEventListener('click', function() {
  const auth0Domain = 'your-tenant.auth0.com';
  const clientId = 'your_client_id';
  const redirectUri = 'https://app.planer.com.ar/callback';
  const scope = 'openid profile email';
  
  // Generate state
  const state = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  sessionStorage.setItem('auth0_state', state);
  
  // Build URL
  const authUrl = 'https://' + auth0Domain + '/authorize?' +
    'response_type=code&' +
    'client_id=' + encodeURIComponent(clientId) + '&' +
    'redirect_uri=' + encodeURIComponent(redirectUri) + '&' +
    'scope=' + encodeURIComponent(scope) + '&' +
    'state=' + state;
  
  window.location.href = authUrl;
});
</script>
```

## 🔐 Auth0 Configuration

### Create Application in Auth0

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a **Single Page Application**
3. Configure URLs:

```
Allowed Callback URLs:
https://app.planer.com.ar/callback
http://localhost:3000/callback

Allowed Logout URLs:
https://app.planer.com.ar
https://planer.com.ar
http://localhost:3000

Allowed Web Origins:
https://app.planer.com.ar
http://localhost:3000

Allowed Origins (CORS):
https://app.planer.com.ar
http://localhost:3000
```

**Important:** Add BOTH production and development URLs!

## 🎨 Example Landing Page (Complete HTML)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Planer - Gestión de Redes Sociales</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .container {
      text-align: center;
      padding: 2rem;
      max-width: 600px;
    }
    h1 { font-size: 3rem; margin-bottom: 1rem; }
    p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
    .btn-primary {
      background: white;
      color: #667eea;
      border: none;
      padding: 1rem 3rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Planer</h1>
    <p>Gestioná todas tus redes sociales desde un solo lugar</p>
    <button onclick="handleLogin()" class="btn-primary">
      Iniciar Sesión
    </button>
  </div>

  <script>
    function handleLogin() {
      const auth0Domain = 'your-tenant.auth0.com';
      const clientId = 'your_client_id';
      const redirectUri = 'https://app.planer.com.ar/callback';
      const scope = 'openid profile email';
      
      const state = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      sessionStorage.setItem('auth0_state', state);
      
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scope,
        state: state
      });
      
      window.location.href = `https://${auth0Domain}/authorize?${params.toString()}`;
    }
  </script>
</body>
</html>
```

## 🧪 Testing the Integration

### Local Development

1. **Update Auth0 URLs** to include `http://localhost:3000/callback`
2. **Test Landing Page** → points to `http://localhost:3000/login`
3. **Click "Iniciar Sesión"**
4. **Verify** you're redirected to Auth0
5. **After login** you should land on `http://localhost:3000/dashboard`

### Production

1. **Deploy SPA** to `app.planer.com.ar`
2. **Deploy Landing Page** to `planer.com.ar`
3. **Update Auth0 URLs** with production domains
4. **Test** the full flow from landing page

## 🔒 Security Considerations

1. **Always use HTTPS** in production
2. **Validate state parameter** (Auth0 SDK handles this automatically)
3. **Don't expose secrets** - Client ID is safe to expose (it's public)
4. **Use CORS properly** - configured in Auth0 dashboard
5. **Keep Auth0 tenant secure** - enable MFA for admin access

## 📝 Checklist

- [ ] Auth0 application created (Single Page Application type)
- [ ] Callback URLs configured in Auth0
- [ ] Landing page implements login redirect
- [ ] SPA has Auth0 environment variables configured
- [ ] Testing works locally
- [ ] Production URLs added to Auth0
- [ ] HTTPS enabled in production
- [ ] Users can successfully complete the auth flow

## 🆘 Troubleshooting

### "Callback URL mismatch"
✅ Make sure your callback URL in Auth0 exactly matches your SPA's callback route

### "CORS error"
✅ Add your SPA domain to "Allowed Web Origins" and "Allowed Origins (CORS)" in Auth0

### "Invalid state"
✅ Make sure you're not blocking cookies or sessionStorage

### Login redirects but callback fails
✅ Check browser console for errors
✅ Verify Auth0 environment variables in SPA
✅ Make sure SPA is using the same Auth0 application

---

Need help? Check the [full Auth0 setup guide](./AUTH0_SETUP.md).
