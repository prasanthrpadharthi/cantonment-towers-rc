import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const url = new URL(req.url);
  const from = url.searchParams.get('from');
  const page = url.searchParams.get('page');
  const limit = url.searchParams.get('limit');
  const status = url.searchParams.get('status');
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');

  // Admin paginated endpoint
  if (url.pathname.endsWith('/all')) {
    const adminUrl = `${backendUrl}/api/events/all?page=${page || 1}&limit=${limit || 12}${status ? `&status=${status}` : ''}`;
    const res = await fetch(adminUrl, {
      headers: authHeader ? { Authorization: authHeader } : {},
    });
    const data = await res.json();
    return new NextResponse(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
  }

  // Public events endpoint (forward token if present)
  const res = await fetch(`${backendUrl}/api/events${from ? `?from=${from}` : ''}`, {
    headers: authHeader ? { Authorization: authHeader } : {},
  });
  console.log("Fetching events from backend:", backendUrl);
  console.log("Request URL:", authHeader);
  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const body = await req.json();
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  const res = await fetch(`${backendUrl}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}

export async function PATCH(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  const body = await req.json();
  const res = await fetch(`${backendUrl}/api/events/${id}`, {
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

export async function PUT(req: NextRequest) {
  // For PATCH /disable endpoint
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const url = new URL(req.url);
  const id = url.pathname.split('/').slice(-2)[0];
  const authHeader = req.headers.get('authorization');
  const res = await fetch(`${backendUrl}/api/events/${id}/disable`, {
    method: 'PATCH',
    headers: authHeader ? { Authorization: authHeader } : {},
  });
  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}
