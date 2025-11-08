import type { NextRequest } from "next/server";

const BACKEND = process.env.API_BASE_URL ?? "http://localhost:8000";

async function forward(req: NextRequest, method: string, parts: string[]) {
  const url = `${BACKEND}/api/v1/${parts.join("/")}${req.nextUrl.search}`;
  const headers = new Headers();
  const token = req.cookies.get("access_token")?.value;
  if (token) headers.set("authorization", `Bearer ${token}`);
  const ct = req.headers.get("content-type");
  if (ct) headers.set("content-type", ct);

  const r = await fetch(url, {
    method,
    body: method === "GET" || method === "HEAD" ? undefined : req.body,
    headers,
    cache: "no-store",
  });
  return new Response(r.body, { status: r.status, headers: r.headers });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = (req: NextRequest, ctx: any) => forward(req, "GET", ctx.params.path);
export const POST = (req: NextRequest, ctx: any) => forward(req, "POST", ctx.params.path);
export const PUT = (req: NextRequest, ctx: any) => forward(req, "PUT", ctx.params.path);
export const PATCH = (req: NextRequest, ctx: any) => forward(req, "PATCH", ctx.params.path);
export const DELETE = (req: NextRequest, ctx: any) => forward(req, "DELETE", ctx.params.path);
