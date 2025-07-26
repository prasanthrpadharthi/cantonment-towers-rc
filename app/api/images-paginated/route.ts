import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";
  const status = searchParams.get("status");

  const backendUrl = new URL("http://localhost:5000/api/images-paginated");
  backendUrl.searchParams.set("page", page);
  backendUrl.searchParams.set("limit", limit);
  if (status) backendUrl.searchParams.set("status", status);

  // Get JWT from cookies (assumes cookie name is 'token')
  const cookieHeader = req.headers.get("cookie") || "";
  let token = "";
  cookieHeader.split(";").forEach((c) => {
    const [k, v] = c.trim().split("=");
    if (k === "token") token = v;
  });

  const backendRes = await fetch(backendUrl.toString(), {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await backendRes.json();
  return new Response(JSON.stringify(data), {
    status: backendRes.status,
    headers: { "Content-Type": "application/json" },
  });
}
