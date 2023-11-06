import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { destroyCookie } from "nookies";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("deals.access_token");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const url = request.nextUrl.clone();

  if (request.url.includes("/app")) {
    if (jwt === undefined) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // @ts-ignore
    jwtVerify(jwt, secret)
      .then(({ payload, protectedHeader }) => {
        return NextResponse.next();
      })
      .catch((reason) => {
        url.pathname = "/";

        destroyCookie(undefined, "deals.access_token", { path: "/" });
        return NextResponse.redirect(url);
      });
  }

  return NextResponse.next();
}
