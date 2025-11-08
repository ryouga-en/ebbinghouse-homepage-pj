import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json(); // { email, password }
  const backendUrl = process.env.API_BASE_URL || "http://localhost:8000";
  const r = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  
  if (!r.ok) {
    const error = await r.json().catch(() => ({ detail: "Login failed" }));
    return NextResponse.json({ ok: false, error: error.detail }, { status: r.status });
  }
  
  const { access_token, refresh_token, expires_in, user } = await r.json();

  console.log("Backend response user:", user);
  
  const res = NextResponse.json({ ok: true, user });
  const cookieBase = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" } as const;
  const userCookieBase = { httpOnly: false, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" } as const; // user_info用はhttpOnly: false
  
  res.cookies.set("access_token", access_token, { ...cookieBase, maxAge: expires_in });
  res.cookies.set("refresh_token", refresh_token, { ...cookieBase, maxAge: 60 * 60 * 24 * 30 });
  
  // ユーザー情報をCookieに保存（ロール情報を含む）- JavaScriptから読み取り可能
  const userInfoString = JSON.stringify(user);
  console.log("Setting user_info cookie:", userInfoString);
  res.cookies.set("user_info", userInfoString, { ...userCookieBase, maxAge: 60 * 60 * 24 * 30 });
  
  return res;
}
