import { NextResponse } from 'next/server';
import { db } from '@/lib/store/local-db';

export async function GET() {
  const settings = db.getSettings();
  return NextResponse.json({
    admin_email: settings.security?.admin_email || 'admin@nstechsphere.store',
  });
}

export async function PUT(req: Request) {
  try {
    const { email, currentPassword, newPassword } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Admin email is required' },
        { status: 400 }
      );
    }

    // If changing password, verify current password
    if (newPassword) {
      const currentStored = db.getSettings().security?.admin_password || 'admin';
      if (currentPassword !== currentStored) {
        return NextResponse.json(
          { success: false, message: 'Current password is incorrect' },
          { status: 403 }
        );
      }
    }

    db.updateAdminSecurity(email, newPassword);

    return NextResponse.json({
      success: true,
      message: 'Admin security credentials updated successfully',
      admin_email: email,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to update admin credentials' },
      { status: 500 }
    );
  }
}
