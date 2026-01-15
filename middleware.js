import { auth } from './auth'
import { NextResponse } from 'next/server'

export default async function middleware(req) {
  const session = await auth()
  const isLoggedIn = !!session
  const userRole = session?.user?.role
  const { pathname } = req.nextUrl
  
  // Public routes - accessible to everyone
  const publicRoutes = ['/', '/datasets', '/map', '/insights', '/api-docs', '/about', '/contact', '/login', '/indicators']
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/indicators/')
  
  // Auth-only routes (need login but no specific role)
  const authRoutes = ['/profile', '/settings']
  const needsAuth = authRoutes.some(route => pathname.startsWith(route))
  
  // Redirect to login if accessing auth route without login
  if (needsAuth && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // Redirect to login if accessing protected route without auth
  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // Redirect to home if already logged in and trying to access login
  if (pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  
  // Role-based route protection
  if (isLoggedIn) {
    // Admin-only routes
    if (pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard?error=unauthorized', req.url))
    }
    
    // Contributor and Admin routes
    if (pathname.startsWith('/upload') && userRole !== 'contributor' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard?error=unauthorized', req.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}