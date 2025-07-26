import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const { id } = params;
  const body = await req.json();
  const res = await fetch(`${backendUrl}/api/images/${id}/block`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}
