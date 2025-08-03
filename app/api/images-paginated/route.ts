import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";
  const status = searchParams.get("status");

  const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const backendUrl = new URL(`${backendBase}/api/images-paginated`);
  backendUrl.searchParams.set("page", page);
  backendUrl.searchParams.set("limit", limit);
  if (status) backendUrl.searchParams.set("status", status);

  // Forward Authorization header from incoming request
  const authHeader = req.headers.get("authorization");
  const backendRes = await fetch(backendUrl.toString(), {
    method: "GET",
    headers: {
      ...(authHeader ? { Authorization: authHeader } : {}),
      'Cache-Control': 'no-store',
      'Pragma': 'no-cache',
    },
    cache: 'no-store',
  });
  const data = await backendRes.json();
  return new Response(JSON.stringify(data), {
    status: backendRes.status,
    headers: { "Content-Type": "application/json" },
  });
}
