import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("deals.access_token");
  const secret = "123456789";
  const url = request.nextUrl.clone();

  if (request.url.includes("/app")) {
    if (jwt === undefined) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    try {
      jwtVerify(jwt, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch (err) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
