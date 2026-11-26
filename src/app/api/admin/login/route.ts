import { NextResponse } from 'next/server';
import { db } from '@/lib/store/local-db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const isValid = db.verifyAdminLogin(email, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid Admin Email or Password' },
        { status: 401 }
      );
    }

    // Return success with authenticated session token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      token,
      adminEmail: email,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server authentication error' },
      { status: 500 }
    );
  }
}
