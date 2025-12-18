import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
  const isOnApiAuth = nextUrl.pathname.startsWith("/api/auth")

  // Allow API auth routes
  if (isOnApiAuth) {
    return NextResponse.next()
  }

  // Check for session token in cookies (Edge Runtime compatible)
  // NextAuth v5 uses various cookie names depending on configuration
  const cookies = req.cookies.getAll()
  const hasSessionCookie = cookies.some(
    (cookie) =>
      cookie.name.includes("authjs") ||
      cookie.name.includes("next-auth") ||
      cookie.name.includes("session")
  )

  const isLoggedIn = hasSessionCookie

  // Protect dashboard routes
  if (isOnDashboard) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl))
    }
  }

  // Redirect logged-in users away from home page
  if (isLoggedIn && nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}

