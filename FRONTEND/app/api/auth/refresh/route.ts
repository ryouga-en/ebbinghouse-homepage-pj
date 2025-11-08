import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const refresh = cookies().get("refresh_token")?.value;
  if (!refresh) {
    return NextResponse.json({ ok: false, error: "No refresh token" }, { status: 401 });
  }
  
  const backendUrl = process.env.API_BASE_URL || "http://localhost:8000";
  const r = await fetch(`${backendUrl}/auth/refresh`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });
  
  if (!r.ok) {
    return NextResponse.json({ ok: false, error: "Refresh failed" }, { status: 401 });
  }
  
  const { access_token, expires_in } = await r.json();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("access_token", access_token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "lax", 
    path: "/", 
    maxAge: expires_in 
  });
  
  return res;
}
