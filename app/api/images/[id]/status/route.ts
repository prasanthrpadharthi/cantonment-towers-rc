import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  const backendRes = await fetch(`${backendUrl}/api/images/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await backendRes.json();
  return new Response(JSON.stringify(data), {
    status: backendRes.status,
    headers: { "Content-Type": "application/json" },
  });
}

