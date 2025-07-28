import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  const body = await req.json();
  const res = await fetch(`${backendUrl}/api/events/update/${params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}
