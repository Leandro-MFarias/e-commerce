"use server";

import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile", "/dashboard/:path*", "/cart"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
