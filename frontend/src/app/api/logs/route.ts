import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // In a real application, you would fetch logs from a database.
  // For now, we'll return some dummy data.

  const dummyLogs = [
    {
      id: '1',
      level: 'info',
      message: 'This is an informational log message.',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      level: 'warn',
      message: 'This is a warning log message.',
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      level: 'error',
      message: 'This is an error log message.',
      timestamp: new Date().toISOString(),
    },
  ];

  return NextResponse.json(dummyLogs, { status: 200 });
}
