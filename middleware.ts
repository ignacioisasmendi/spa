import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const action = searchParams.get('action');

  if (action) {
    // Redirect to /auth/login
    console.log('Redirecting to /auth/login');
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Get the session
  const session = await auth0.getSession(request);
  const isAuthenticated = !!session?.user;

  // Define protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/instagram-publish', '/design-system'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Redirect unauthenticated users to landing page
  if (isProtectedRoute && !isAuthenticated) {
    console.log('Redirecting to landing page');
    
    const loginUrl = process.env.NEXT_PUBLIC_LANDING_URL || '';
    return NextResponse.redirect(loginUrl);
  }

  // Optionally: Redirect authenticated users from landing page to dashboard
  if (pathname === '/' && isAuthenticated) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - /api/auth (Auth0 authentication routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/auth).*)",
  ],
};