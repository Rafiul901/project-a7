import { NextRequest, NextResponse } from "next/server";

const roleRoutes = {
  CUSTOMER: "/customer/dashboard",
  DELIVERY_AGENT: "/agent/dashboard",
  ADMIN: "/admin/dashboard",
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const role = request.cookies.get("courier-role")?.value;

  if (!role || !(role in roleRoutes)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const allowedRoutes = {
    CUSTOMER: pathname.startsWith("/customer"),
    DELIVERY_AGENT: pathname.startsWith("/agent"),
    ADMIN: pathname.startsWith("/admin"),
  };

  if (!allowedRoutes[role as keyof typeof allowedRoutes]) {
    return NextResponse.redirect(
      new URL(roleRoutes[role as keyof typeof roleRoutes], request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/agent/:path*", "/admin/:path*"],
};