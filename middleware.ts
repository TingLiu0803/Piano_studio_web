import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STICKY_AB_COOKIE = "ab_sticky_cta";
const STICKY_AB_HEADER = "x-ab-sticky-cta";

function withVariantHeader(request: NextRequest, variant: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(STICKY_AB_HEADER, variant);
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
    request: { headers: withVariantHeader(request, variant) },
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
