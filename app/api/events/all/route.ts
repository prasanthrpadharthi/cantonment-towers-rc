import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const limit = url.searchParams.get('limit') || '12';
  const res = await fetch(`${backendUrl}/api/events/all?page=${page}&limit=${limit}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}
