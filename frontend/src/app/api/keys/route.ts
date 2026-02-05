import { NextResponse } from 'next/server';

// Dummy data for API keys
let dummyKeys = [
  {
    id: '1',
    name: 'My First Key',
    key: 'faskdfjhasdfjhasdlkjfhalksdjfh',
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'My Second Key',
    key: 'asdfjhasdlkjfhalksdjfh',
    createdAt: new Date().toISOString(),
    lastUsed: null,
  },
];

export async function GET(req: Request) {
  // In a real application, you would fetch API keys from a database.
  return NextResponse.json(dummyKeys, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    // In a real application, you would:
    // 1. Generate a cryptographically secure API key.
    // 2. Save the hashed key to the database.
    // 3. Return the unhashed key to the user to be displayed once.

    const newKey = {
      id: (dummyKeys.length + 1).toString(),
      name,
      key: `new-dummy-key-${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString(),
      lastUsed: null,
    };

    dummyKeys.push(newKey);

    return NextResponse.json(newKey, { status: 201 });
  } catch (error) {
    console.error('Generate key error:', error);
    return NextResponse.json({ error: 'An error occurred while generating the key' }, { status: 500 });
  }
}
