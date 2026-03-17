import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import type { Database } from "@/types/database"

// Define route access by role
const roleRoutes: Record<string, string[]> = {
  "/survivor": ["SURVIVOR"],
  "/counselor": ["COUNSELOR"],
  "/medical": ["MEDICAL_PROFESSIONAL"],
  "/legal": ["LEGAL_ADVISOR"],
  "/admin": ["ADMIN"],
  "/moderator": ["MODERATOR", "ADMIN"],
}

// Define protected routes that require authentication
const protectedRoutes = [
  "/survivor",
  "/counselor",
  "/medical",
  "/legal",
  "/admin",
  "/moderator",
  "/profile",
  "/settings",
]

// Define public routes that don't need authentication
const publicRoutes = [
  "/",
  "/about",
  "/resources",
  "/support-directory",
  "/missing-persons",
  "/report",
  "/auth",
]

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do not run code between createServerClient and supabase.auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // If the route is protected and user is not logged in, redirect to login
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // If user is logged in, check role-based access
  if (user && isProtectedRoute) {
    // Get user profile to check role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    const userRole = profile?.role || "SURVIVOR"

    // Check if the user has access to the current route
    for (const [routePrefix, allowedRoles] of Object.entries(roleRoutes)) {
      if (pathname.startsWith(routePrefix)) {
        if (!allowedRoles.includes(userRole)) {
          // Redirect to appropriate dashboard based on role
          const url = request.nextUrl.clone()
          url.pathname = getRoleDashboard(userRole)
          return NextResponse.redirect(url)
        }
        break
      }
    }
  }

  // If user is logged in and on auth pages, redirect to their dashboard
  if (user && pathname.startsWith("/auth") && pathname !== "/auth/callback") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    const userRole = profile?.role || "SURVIVOR"
    const url = request.nextUrl.clone()
    url.pathname = getRoleDashboard(userRole)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

function getRoleDashboard(role: string): string {
  const dashboardMap: Record<string, string> = {
    SURVIVOR: "/survivor/dashboard",
    COUNSELOR: "/counselor/dashboard",
    MEDICAL_PROFESSIONAL: "/medical/dashboard",
    LEGAL_ADVISOR: "/legal/dashboard",
    ADMIN: "/admin/dashboard",
    MODERATOR: "/moderator/dashboard",
  }
  return dashboardMap[role] || "/survivor/dashboard"
}
