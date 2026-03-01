import { NextResponse } from 'next/server';

const backendBaseUrl = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  const res = await fetch(`${backendBaseUrl}/api/keys`, {
    headers: { Authorization: authHeader },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const authHeader = req.headers.get('authorization') || '';
    const res = await fetch(`${backendBaseUrl}/api/keys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Generate key error:', error);
    return NextResponse.json({ error: 'An error occurred while generating the key' }, { status: 500 });
  }
}
