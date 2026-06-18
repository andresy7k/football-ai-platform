import { type NextRequest, NextResponse } from "next/server";

// Protected routes require authentication
const protectedPaths = ["/(dashboard)"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is protected
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    // Auth check will be implemented in Phase 2
    // For now, allow all requests
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|images|fonts).*)",
  ],
};
