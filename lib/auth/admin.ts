import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me-in-production';
const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Simple admin authentication for Mattia's portfolio
 * Uses environment-based password for single admin access
 * Can be upgraded to NextAuth.js for multi-user support later
 */

export interface AdminSession {
  authenticated: boolean;
  email: string;
  expiresAt: number;
}

/**
 * Verify admin password
 */
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

/**
 * Create admin session
 */
export function createAdminSession(): AdminSession {
  return {
    authenticated: true,
    email: 'mattia@selfrules.com',
    expiresAt: Date.now() + SESSION_DURATION,
  };
}

/**
 * Set admin session cookie
 */
export async function setAdminSessionCookie(session: AdminSession) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  });
}

/**
 * Get admin session from cookies
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const session: AdminSession = JSON.parse(sessionCookie.value);

    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      await clearAdminSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Failed to parse admin session:', error);
    return null;
  }
}

/**
 * Check if user is authenticated admin
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return session !== null && session.authenticated;
}

/**
 * Clear admin session
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

/**
 * Middleware helper to protect admin routes
 */
export function requireAdmin(handler: Function) {
  return async (request: NextRequest) => {
    const isAuth = await isAdminAuthenticated();

    if (!isAuth) {
      return Response.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    return handler(request);
  };
}
