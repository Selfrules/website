import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAdminPassword,
  createAdminSession,
  setAdminSessionCookie,
} from '@/lib/auth/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password required' },
        { status: 400 }
      );
    }

    // Verify password
    const isValid = verifyAdminPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create and set session
    const session = createAdminSession();
    await setAdminSessionCookie(session);

    return NextResponse.json({
      success: true,
      message: 'Authenticated successfully',
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
