import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";
  const backendUrl = new URL("http://localhost:5000/api/images-paginated");
  backendUrl.searchParams.set("page", page);
  backendUrl.searchParams.set("limit", limit);
  backendUrl.searchParams.set("status", "approved");

  const backendRes = await fetch(backendUrl.toString(), { method: "GET" });
  const data = await backendRes.json();
  return new Response(JSON.stringify(data), {
    status: backendRes.status,
    headers: { "Content-Type": "application/json" },
  });
}
