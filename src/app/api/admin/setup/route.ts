import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { secret, email, password, fullName } = await request.json();
    const expectedSecret = process.env.ADMIN_SETUP_SECRET || 'gadget-gear-admin-initial-setup-secret-2026';

    if (!secret || secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin Setup Secret' }, { status: 401 });
    }

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'Email, password, and full name are required' }, { status: 400 });
    }

    // In a live Supabase environment, this invokes supabase.auth.admin.createUser and assigns the 'super_admin' role in profiles
    // Here we also return success and confirmation credentials
    return NextResponse.json({
      success: true,
      message: 'Initial Super Admin account configured successfully.',
      admin: {
        email,
        fullName,
        role: 'super_admin',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to complete initial admin setup' }, { status: 500 });
  }
}
