# Spotify Token Refresh Guide

## Problem
The Spotify widget shows "Not Playing" even when music is playing because the `SPOTIFY_REFRESH_TOKEN` is invalid or expired.

**Error from Spotify API:**
```json
{
  "error": "invalid_grant",
  "error_description": "Invalid refresh token"
}
```

## Solution: Regenerate Refresh Token

### Prerequisites
1. Spotify account (same one used in the widget)
2. Access to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
3. Your app credentials (`SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`)

### Step 1: Verify/Create Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Find your app or create a new one:
   - Click **"Create app"**
   - Name: `Mattia's Portfolio Widget`
   - Description: `Now Playing widget for personal website`
   - Redirect URI: `http://localhost:3000/api/auth/callback/spotify`
   - Check **"Web API"** in APIs used
   - Save the app

4. Note your credentials:
   - **Client ID**: Copy this
   - **Client Secret**: Click "View client secret" and copy

### Step 2: Get Authorization Code

1. Build the authorization URL with these scopes:

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/api/auth/callback/spotify&scope=user-read-currently-playing user-read-recently-played user-read-playback-state
```

**Replace `YOUR_CLIENT_ID`** with your actual Client ID.

**Required Scopes:**
- `user-read-currently-playing` - See what you're currently playing
- `user-read-recently-played` - See recently played tracks
- `user-read-playback-state` - Read playback state

2. Open this URL in your browser
3. Log in to Spotify and approve the permissions
4. You'll be redirected to: `http://localhost:3000/api/auth/callback/spotify?code=AUTHORIZATION_CODE`
5. **Copy the `code` parameter** from the URL (everything after `code=`)

### Step 3: Exchange Code for Refresh Token

Use this curl command (replace the placeholders):

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic $(echo -n 'YOUR_CLIENT_ID:YOUR_CLIENT_SECRET' | base64)" \
  -d "grant_type=authorization_code" \
  -d "code=AUTHORIZATION_CODE" \
  -d "redirect_uri=http://localhost:3000/api/auth/callback/spotify"
```

**Windows PowerShell version:**
```powershell
$credentials = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("YOUR_CLIENT_ID:YOUR_CLIENT_SECRET"))

curl -X POST "https://accounts.spotify.com/api/token" `
  -H "Content-Type: application/x-www-form-urlencoded" `
  -H "Authorization: Basic $credentials" `
  -d "grant_type=authorization_code" `
  -d "code=AUTHORIZATION_CODE" `
  -d "redirect_uri=http://localhost:3000/api/auth/callback/spotify"
```

**Response:**
```json
{
  "access_token": "BQA...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "AQD...",  ← THIS IS WHAT YOU NEED
  "scope": "user-read-currently-playing user-read-recently-played"
}
```

### Step 4: Update Environment Variables

1. Open `.env.local` file
2. Update these variables:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_new_refresh_token_here
```

3. **Restart the development server:**
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 5: Verify It Works

Test the debug endpoint:
```bash
curl http://localhost:3000/api/spotify/debug
```

You should see:
```json
{
  "tests": {
    "tokenRefresh": { "status": "success" },
    "currentlyPlaying": { ... },
    "recentlyPlayed": { ... }
  }
}
```

## Troubleshooting

### "Invalid client" error
- Double-check your `CLIENT_ID` and `CLIENT_SECRET`
- Make sure they're from the same app in the Spotify Dashboard

### "Invalid redirect URI" error
- Make sure `http://localhost:3000/api/auth/callback/spotify` is exactly in your app's redirect URIs
- URIs are case-sensitive and must match exactly

### "Invalid scope" error
- Check that all three scopes are included in the authorization URL
- Make sure scopes are space-separated

### Authorization code already used
- Authorization codes expire after ~10 minutes
- You can only use each code once
- If it fails, start over from Step 2

### Still showing "Not Playing"
1. Make sure you have Spotify open and playing music
2. Wait 30 seconds (cache refresh interval)
3. Check the debug endpoint for errors
4. Verify your Spotify account is the same one that approved the app

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env.local` to git
- Keep your refresh token secret
- Refresh tokens don't expire unless revoked
- If compromised, revoke access from [Spotify Account Settings](https://www.spotify.com/account/apps/)

## Resources

- [Spotify Authorization Guide](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
- [Spotify API Scopes](https://developer.spotify.com/documentation/web-api/concepts/scopes)
- [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
