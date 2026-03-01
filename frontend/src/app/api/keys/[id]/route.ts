import { NextResponse } from 'next/server';

const backendBaseUrl = process.env.BACKEND_URL || 'http://localhost:4000';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const res = await fetch(`${backendBaseUrl}/api/keys/${params.id}`, {
      method: 'DELETE',
      headers: { Authorization: authHeader },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Revoke key error:', error);
    return NextResponse.json({ error: 'An error occurred while revoking the key' }, { status: 500 });
  }
}
