import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const url = new URL(req.url);
  const from = url.searchParams.get('from');
  const res = await fetch(`${backendUrl}/api/events${from ? `?from=${from}` : ''}`);
  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const body = await req.json();
  const res = await fetch(`${backendUrl}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}
