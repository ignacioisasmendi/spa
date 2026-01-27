# ⚡ Quick Start - Auth0 Setup (5 Minutes)

Follow these steps to get your Auth0 authentication working:

## Step 1: Create Auth0 Application (2 min)

1. Go to https://manage.auth0.com/
2. Click **Applications** → **Applications** → **Create Application**
3. Name: `Planer SPA`
4. Type: **Single Page Application** ⚠️ Important!
5. Click **Create**

## Step 2: Configure URLs (1 min)

In your new application's **Settings** tab, scroll down and set:

**Allowed Callback URLs:**
```
http://localhost:3000/callback, https://yourdomain.com/callback
```

**Allowed Logout URLs:**
```
http://localhost:3000, https://yourdomain.com
```

**Allowed Web Origins:**
```
http://localhost:3000, https://yourdomain.com
```

**Allowed Origins (CORS):**
```
http://localhost:3000, https://yourdomain.com
```

Click **Save Changes** at the bottom.

## Step 3: Get Your Credentials (30 sec)

Copy these from the top of the **Settings** tab:

- **Domain** (e.g., `dev-abc123.us.auth0.com`)
- **Client ID** (e.g., `abc123xyz...`)

## Step 4: Configure Environment Variables (1 min)

Create a file named `.env.local` in your project root:

```bash
NEXT_PUBLIC_AUTH0_DOMAIN=dev-abc123.us.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=abc123xyz...
```

Replace with your actual values from Step 3.

## Step 5: Restart Dev Server (30 sec)

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Step 6: Test! (30 sec)

1. Open http://localhost:3000/auth-demo
2. Click **"Iniciar sesión"**
3. Log in with Auth0 (you can use email or social login)
4. You should be redirected back and see your profile

## ✅ You're Done!

If you see your profile on the demo page, everything is working! 🎉

## 🚨 Problems?

### "Auth0 client not initialized"
→ Check that `.env.local` has the correct values  
→ Restart the dev server

### "Callback URL mismatch"
→ Make sure you added `http://localhost:3000/callback` exactly in Auth0

### Still stuck?
→ Read the full guide: `AUTH0_SETUP.md`

---

**Next:** Integrate with your landing page → See `LANDING_PAGE_INTEGRATION.md`
