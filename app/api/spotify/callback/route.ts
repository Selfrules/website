import { NextRequest, NextResponse } from 'next/server';

/**
 * Spotify OAuth Callback Route
 *
 * Handles the OAuth callback from Spotify after user authorization.
 * Exchanges the authorization code for access and refresh tokens.
 *
 * Flow:
 * 1. User authorizes app on Spotify
 * 2. Spotify redirects to this callback with code
 * 3. Exchange code for tokens
 * 4. Display refresh token to user for manual .env update
 *
 * @route GET /api/spotify/callback?code=XXX
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Handle authorization errors
  if (error) {
    console.error('❌ Spotify authorization error:', error);
    return NextResponse.redirect(
      new URL(`/spotify-setup?error=${error}`, request.url)
    );
  }

  // Validate code parameter
  if (!code) {
    console.error('❌ No authorization code received');
    return NextResponse.redirect(
      new URL('/spotify-setup?error=no_code', request.url)
    );
  }

  try {
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

    console.log('🔄 Exchanging code for tokens...');

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
      console.error('❌ Token exchange failed:', errorData);
      throw new Error(`Token exchange failed: ${errorData.error || response.statusText}`);
    }

    const data = await response.json();
    const { access_token, refresh_token, expires_in, scope } = data;

    if (!refresh_token) {
      throw new Error('No refresh token received from Spotify');
    }

    console.log('✅ Tokens received successfully');
    console.log('   Access Token:', access_token.substring(0, 20) + '...');
    console.log('   Refresh Token:', refresh_token.substring(0, 20) + '...');
    console.log('   Expires in:', expires_in, 'seconds');
    console.log('   Scope:', scope);

    // Redirect to success page with refresh token
    const successUrl = new URL('/spotify-setup', request.url);
    successUrl.searchParams.set('success', 'true');
    successUrl.searchParams.set('refresh_token', refresh_token);
    successUrl.searchParams.set('access_token', access_token);
    successUrl.searchParams.set('expires_in', expires_in.toString());

    return NextResponse.redirect(successUrl);

  } catch (error) {
    console.error('❌ Error in Spotify callback:', error);

    const errorUrl = new URL('/spotify-setup', request.url);
    errorUrl.searchParams.set('error', 'token_exchange_failed');
    errorUrl.searchParams.set('message', error instanceof Error ? error.message : 'Unknown error');

    return NextResponse.redirect(errorUrl);
  }
}
