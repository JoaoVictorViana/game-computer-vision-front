import { NextRequest, NextResponse } from 'next/server'
import { API_TOKEN } from './config/app'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

const publicPages = ['/login', '/register', '/keyboard-mapping']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookie = request.cookies.get(API_TOKEN)

  if (publicPages.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  if (!cookie) return NextResponse.redirect(new URL('/login'))

  return NextResponse.next()
}
