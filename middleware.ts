import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

// Create i18n middleware instance
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

// i18n middleware for internationalization
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip i18n for design-system page (universal access)
  if (pathname.startsWith('/design-system')) {
    return NextResponse.next();
  }

  // Apply i18n middleware for all routes
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files
  // - image optimization files
  // - favicon files (icon.svg, icon, apple-icon, manifest.json)
  // - SEO files (favicon.ico, robots.txt, sitemap.xml)
  matcher: [
    '/((?!api|_next/static|_next/image|icon|apple-icon|manifest.json|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
