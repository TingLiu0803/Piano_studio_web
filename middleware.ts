import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STICKY_AB_COOKIE = "ab_sticky_cta";
const STICKY_AB_HEADER = "x-ab-sticky-cta";
const LOCALE_HEADER = "x-site-locale";

function withRequestHeaders(request: NextRequest, variant: string) {
  const requestHeaders = new Headers(request.headers);
  const localeFromPath = request.nextUrl.pathname.split("/")[1];
  const locale = localeFromPath === "zh" ? "zh" : "en";
  requestHeaders.set(STICKY_AB_HEADER, variant);
  requestHeaders.set(LOCALE_HEADER, locale);
  return requestHeaders;
}

export function middleware(request: NextRequest) {
  const existing = request.cookies.get(STICKY_AB_COOKIE)?.value;
  const variant =
    existing === "treatment" || existing === "control"
      ? existing
      : Math.random() < 0.5
        ? "treatment"
        : "control";

  const res = NextResponse.next({
    request: { headers: withRequestHeaders(request, variant) },
  });

  if (!existing) {
    res.cookies.set(STICKY_AB_COOKIE, variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "lax",
    });
  }

  return res;
}

export const config = {
  matcher: ["/en", "/en/:path*", "/zh", "/zh/:path*"],
};
