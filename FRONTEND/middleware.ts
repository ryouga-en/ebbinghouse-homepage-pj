import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  
  // 保護ルート（/app で始まるパス）へのアクセス制御
  if (req.nextUrl.pathname.startsWith("/app") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  // ログインページにアクセスした時、既にログイン済みなら /app にリダイレクト
  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/app", req.url));
  }
  
  return NextResponse.next();
}

export const config = { 
  matcher: ["/app/:path*", "/login"] 
};
