import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/auth/login(.*)",
    "/auth/register(.*)",
    "/api/clerk-webhook",
  ],

  afterAuth(auth, req) {
    const role = auth.sessionClaims?.publicMetadata?.role;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && role !== "admin") {
      return Response.redirect(new URL("/not-authorized", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
