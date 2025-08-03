import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  let url = '';
  console.log("Fetching approved images with backendBase:", backendBase);
  if (backendBase) {
    const query = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    url = `${backendBase}/api/images-paginated${query}`;
  } else {
    const backendUrl = new URL("/api/images-paginated", "http://localhost:5000");
    backendUrl.searchParams.set("page", page);
    backendUrl.searchParams.set("limit", limit);
    backendUrl.searchParams.set("status", "approved");
    url = backendUrl.toString();
  }
  console.log("Final URL for fetching approved images:", url);
  const backendRes = await fetch(url, { method: "GET" });
  const data = await backendRes.json();
  return new Response(JSON.stringify(data), {
    status: backendRes.status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "Surrogate-Control": "no-store"
    },
  });
}
