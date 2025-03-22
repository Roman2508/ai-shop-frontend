import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const session = request.cookies.get("ai-shop-session")?.value;

  const isProfilePage = request.url.includes("/profile");
  const isAdminPage = request.url.includes("/admin");

  if (isProfilePage || isAdminPage) {
    if (!session) {
      return NextResponse.redirect(new URL("/catalog", request.url));
    }

    return NextResponse.next();
  }
};

const config = {
  matcher: ["/profile", "/profile/:path*", "/admin", "/admin/:path*", "/catalog", "/catalog/:path*"],
};

export { middleware, config };
