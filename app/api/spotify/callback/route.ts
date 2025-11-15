/**
 * Spotify OAuth Callback Handler
 * Receives authorization code and exchanges it for access/refresh tokens
 *
 * This endpoint is used during initial setup only
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Handle authorization denial
  if (error) {
    return NextResponse.json(
      { error: 'Authorization denied', details: error },
      { status: 400 }
    );
  }

  // Validate code parameter
  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Missing Spotify client credentials in environment variables' },
      { status: 500 }
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${req.nextUrl.origin}/api/spotify/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return NextResponse.json(
        { error: 'Token exchange failed', details: errorData },
        { status: tokenResponse.status }
      );
    }

    const tokenData = await tokenResponse.json();

    // Return success page with tokens
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spotify Authorization Success</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #1DB954 0%, #191414 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 800px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #1DB954;
      margin-bottom: 20px;
      font-size: 28px;
    }
    .success-icon {
      width: 64px;
      height: 64px;
      background: #1DB954;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 32px;
    }
    .token-section {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .token-section h2 {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .token-value {
      background: #191414;
      color: #1DB954;
      padding: 15px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 12px;
      word-break: break-all;
      line-height: 1.6;
      position: relative;
    }
    .copy-btn {
      background: #1DB954;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      margin-top: 10px;
      transition: background 0.2s;
    }
    .copy-btn:hover {
      background: #1ed760;
    }
    .copy-btn:active {
      transform: scale(0.98);
    }
    .instructions {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .instructions h3 {
      color: #856404;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .instructions ol {
      margin-left: 20px;
      color: #856404;
    }
    .instructions li {
      margin: 5px 0;
    }
    .info {
      background: #d1ecf1;
      border-left: 4px solid #0c5460;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      color: #0c5460;
    }
    code {
      background: rgba(0,0,0,0.05);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'JetBrains Mono', monospace;
    }
    .copied {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #1DB954;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .copied.show {
      opacity: 1;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="success-icon">✓</div>
    <h1>🎉 Spotify Authorization Successful!</h1>

    <div class="token-section">
      <h2>Refresh Token (IMPORTANT - Save This!)</h2>
      <div class="token-value" id="refreshToken">
        ${tokenData.refresh_token}
        <div class="copied" id="copiedMsg">Copied!</div>
      </div>
      <button class="copy-btn" onclick="copyToken('refreshToken')">📋 Copy Refresh Token</button>
    </div>

    <div class="token-section">
      <h2>Access Token (Temporary - Expires in ${tokenData.expires_in}s)</h2>
      <div class="token-value" id="accessToken">
        ${tokenData.access_token}
      </div>
      <button class="copy-btn" onclick="copyToken('accessToken')">📋 Copy Access Token</button>
    </div>

    <div class="instructions">
      <h3>📝 Next Steps:</h3>
      <ol>
        <li>Copy the <strong>Refresh Token</strong> above (click the copy button)</li>
        <li>Open your <code>.env.local</code> file</li>
        <li>Update or add: <code>SPOTIFY_REFRESH_TOKEN=paste_token_here</code></li>
        <li>Restart your development server</li>
        <li>Test with: <code>curl http://localhost:3000/api/spotify/debug</code></li>
      </ol>
    </div>

    <div class="info">
      <strong>ℹ️ Token Details:</strong><br>
      • Scopes: ${tokenData.scope}<br>
      • Access token expires: ${new Date(Date.now() + tokenData.expires_in * 1000).toLocaleString()}<br>
      • Refresh token: Never expires (unless revoked)
    </div>

    <div class="info">
      <strong>🔒 Security Reminder:</strong><br>
      Keep your refresh token secret! Never commit it to git or share it publicly.
      The <code>.env.local</code> file is already in <code>.gitignore</code>.
    </div>
  </div>

  <script>
    function copyToken(elementId) {
      const element = document.getElementById(elementId);
      const text = element.textContent.trim();

      navigator.clipboard.writeText(text).then(() => {
        const copiedMsg = element.querySelector('.copied');
        copiedMsg.classList.add('show');
        setTimeout(() => {
          copiedMsg.classList.remove('show');
        }, 2000);
      });
    }
  </script>
</body>
</html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to exchange token', details: error.message },
      { status: 500 }
    );
  }
}
