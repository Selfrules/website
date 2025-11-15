import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { locales, defaultLocale } from './i18n';

// Create i18n middleware instance
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

// Combined middleware with auth protection for admin routes
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip i18n for all admin routes
  if (pathname.startsWith('/admin')) {
    // Check auth for protected admin pages (not login)
    if (!pathname.startsWith('/admin/login')) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // Redirect to login if not authenticated
      if (!token) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    // Admin routes bypass i18n
    return NextResponse.next();
  }

  // Skip i18n for design-system page (universal access)
  if (pathname.startsWith('/design-system')) {
    return NextResponse.next();
  }

  // Apply i18n middleware for public routes
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files
  // - image optimization files
  // - favicon.ico
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
