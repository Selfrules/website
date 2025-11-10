import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/middleware/rate-limit';

/**
 * Spotify OAuth Callback Route
 *
 * Handles the OAuth callback from Spotify after user authorization.
 * Exchanges the authorization code for access and refresh tokens.
 *
 * Rate Limit: 20 requests per 10 minutes per IP
 * Security: Tokens stored in HTTP-only cookies, never in URL
 *
 * Flow:
 * 1. User authorizes app on Spotify
 * 2. Spotify redirects to this callback with code
 * 3. Exchange code for tokens
 * 4. Store tokens in secure HTTP-only cookies
 * 5. Redirect to setup page for user to copy token
 *
 * @route GET /api/spotify/callback?code=XXX
 */
export async function GET(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await checkRateLimit(request, 'spotifyCallback');

    if (!rateLimitResult.success) {
      const errorUrl = new URL('/spotify-setup', request.url);
      errorUrl.searchParams.set('error', 'rate_limit_exceeded');
      errorUrl.searchParams.set(
        'message',
        `Too many requests. Try again in ${Math.ceil(
          (rateLimitResult.reset - Date.now()) / 1000
        )} seconds.`
      );
      return NextResponse.redirect(errorUrl);
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Handle authorization errors
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Spotify authorization error:', error);
      }
      return NextResponse.redirect(
        new URL(`/spotify-setup?error=${error}`, request.url)
      );
    }

    // Validate code parameter
    if (!code) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ No authorization code received');
      }
      return NextResponse.redirect(
        new URL('/spotify-setup?error=no_code', request.url)
      );
    }
    // Exchange code for tokens
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI ||
                       `${process.env.NEXT_PUBLIC_APP_URL}/api/spotify/callback`;

    if (!clientId || !clientSecret) {
      throw new Error('Missing Spotify credentials in environment variables');
    }

    // Prepare token exchange request
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Exchanging code for tokens...');
    }

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authHeader}`,
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Token exchange failed:', errorData);
      }
      throw new Error(`Token exchange failed: ${errorData.error || response.statusText}`);
    }

    const data = await response.json();
    const { access_token, refresh_token, expires_in, scope } = data;

    if (!refresh_token) {
      throw new Error('No refresh token received from Spotify');
    }

    // Log success (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Tokens received successfully');
      console.log('   Expires in:', expires_in, 'seconds');
      console.log('   Scope:', scope);
    }

    // SECURITY: Store tokens in HTTP-only cookies instead of URL params
    // This prevents exposure in browser history, referrer headers, and logs
    const successUrl = new URL('/spotify-setup?success=true', request.url);
    const response = NextResponse.redirect(successUrl);

    // Set refresh token in secure HTTP-only cookie (5 minute expiry)
    response.cookies.set('spotify_temp_refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 300, // 5 minutes
      path: '/spotify-setup',
    });

    // Set access token for immediate verification (optional, 5 minute expiry)
    response.cookies.set('spotify_temp_access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 300, // 5 minutes
      path: '/spotify-setup',
    });

    // Store expiry metadata in non-sensitive cookie
    response.cookies.set('spotify_token_expires_in', expires_in.toString(), {
      httpOnly: false, // Client needs to read this
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 300,
      path: '/spotify-setup',
    });

    return response;

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Error in Spotify callback:', error);
    }

    const errorUrl = new URL('/spotify-setup', request.url);
    errorUrl.searchParams.set('error', 'token_exchange_failed');
    errorUrl.searchParams.set('message', error instanceof Error ? error.message : 'Unknown error');

    return NextResponse.redirect(errorUrl);
  }
}
