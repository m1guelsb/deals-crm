import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("deals.access_token");

  if (request.nextUrl.pathname.match("/")) {
    // if (token) {
    //   return NextResponse.redirect(new URL("/dashboard/", request.url));
    // }
    NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
