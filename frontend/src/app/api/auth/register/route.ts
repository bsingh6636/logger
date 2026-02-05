import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // For now, we'll just log the data and return a success response.
    console.log('Registration attempt:', { username, email });

    // In a real application, you would add logic here to:
    // 1. Validate the input.
    // 2. Check if the user already exists in the database.
    // 3. Hash the password.
    // 4. Save the new user to the database.

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 });
  }
}
