import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { routeAccessMap } from './lib/settings';
import { NextResponse } from 'next/server';

// Create matchers for all protected routes
const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route]
}));

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const pathname = req.nextUrl.pathname;
  
  // Type-safe role extraction
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // 1. Allow access to public routes
  const isPublicRoute = ['/sign-in', '/sign-up', '/'].includes(pathname);
  if (isPublicRoute) return NextResponse.next();

  // 2. Handle missing role
  if (!role) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // 3. Special case for teacher access to students/parents
  if (['/students', '/parents', '/teachers'].some(route => pathname.startsWith(route))) {
    if (['admin', 'teacher'].includes(role)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  // 4. Original route protection logic using matchers
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      if (!allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL(`/${role}`, req.url));
      }
      return NextResponse.next();
    }
  }

  // 5. Allow all other routes
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};