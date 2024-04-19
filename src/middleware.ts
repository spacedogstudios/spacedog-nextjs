import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/";
import type { Session } from "next-auth";

// next-auth not currently exporting NextAuthRequest
interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

export default auth((request: NextAuthRequest) => {
  if (!request.auth) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;
    url.pathname = "/signin";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: ["/topsecret"],
};
