import { NextResponse } from 'next/server';

const backendBaseUrl = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const url = new URL(req.url);
    const res = await fetch(`${backendBaseUrl}/api/logs?${url.searchParams.toString()}`, {
      headers: { Authorization: authHeader },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Fetch logs error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching logs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get('x-api-key') || '';
    const body = await req.json();
    const res = await fetch(`${backendBaseUrl}/api/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Create log error:', error);
    return NextResponse.json({ error: 'An error occurred while creating the log' }, { status: 500 });
  }
}
