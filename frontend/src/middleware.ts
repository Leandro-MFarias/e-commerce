import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile", "/dashboard", "/cart"],
};

export async function middleware(req: NextRequest) {
  try {
    const verifyResponse = await fetch(
      "https://e-commerce-9nrq.onrender.com/api/auth/verify",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (verifyResponse.status === 401) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
