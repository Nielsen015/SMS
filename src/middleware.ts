import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routeAccessMap } from './lib/settings'
import { NextResponse } from 'next/server'

// export default clerkMiddleware()
// Route Protection
// const isProtectedRoute = createRouteMatcher(['/admin', '/teacher', '/student'])
const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route]
}));
// This middleware will run on all routes, but only protect the ones that match the above patterns

export default clerkMiddleware((auth, req) => {
  // if (isProtectedRoute(req)) await auth.protect()
  // get user roles from the request
  const { sessionClaims } = auth();
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}