export { auth as middleware } from "./auth";

export const config = {
  matcher: ["/profile/:path*", "/signin/:path*", "/signup/:path*"],
};
