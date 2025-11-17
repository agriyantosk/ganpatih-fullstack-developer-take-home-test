import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { REFRESH_TOKEN_KEY } from "@/config/theme";

const AUTH_ROUTES = ["/feed"];
const PUBLIC_ROUTES = ["/"];

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;
  const isAuthenticated = Boolean(refreshToken);
  const { pathname } = request.nextUrl;

  if (!isAuthenticated && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
    const feedUrl = new URL("/feed", request.url);
    return NextResponse.redirect(feedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/feed"],
};
