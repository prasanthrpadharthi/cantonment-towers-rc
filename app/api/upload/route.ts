import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  // Forward the form data to the backend Express server
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const backendRes = await fetch(`${backendUrl}/api/upload`, {
    method: "POST",
    body: formData,
    // Let fetch set the correct Content-Type for multipart/form-data
  });

  const data = await backendRes.json();
  return new Response(JSON.stringify(data), {
    status: backendRes.status,
    headers: { "Content-Type": "application/json" },
  });
}
