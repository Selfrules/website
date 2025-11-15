# Spotify Authentication Setup

Quick guide to set up Spotify integration for the Now Playing widget.

## Prerequisites

1. Spotify Developer App created at [developer.spotify.com](https://developer.spotify.com/dashboard)
2. Environment variables set:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`

## Quick Setup (Automated)

### Step 1: Start Authorization Flow

Open in your browser:
```
http://localhost:3000/api/spotify/auth/start?show=true
```

Or use PowerShell:
```powershell
start http://localhost:3000/api/spotify/auth/start?show=true
```

### Step 2: Authorize the App

1. Click **"Start Authorization"**
2. Log in to Spotify (use the account you want to track)
3. Approve the requested permissions:
   - `user-read-currently-playing`
   - `user-read-recently-played`
   - `user-read-playback-state`

### Step 3: Copy the Refresh Token

After authorization, you'll see a success page with your tokens.

**Copy the REFRESH TOKEN** (the long one that doesn't expire).

### Step 4: Update .env.local

**Option A: Automated (PowerShell)**
```powershell
.\scripts\update-spotify-token.ps1 "your_refresh_token_here"
```

**Option B: Manual**
1. Open `.env.local`
2. Add or update:
   ```env
   SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
   ```

### Step 5: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 6: Verify It Works

```bash
# Test the integration
curl http://localhost:3000/api/spotify/debug

# Or use PowerShell
Invoke-RestMethod http://localhost:3000/api/spotify/debug | ConvertTo-Json
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

## Manual Setup

If you prefer to do it manually, follow: [SPOTIFY_TOKEN_REFRESH.md](./SPOTIFY_TOKEN_REFRESH.md)

## Troubleshooting

### "Invalid client" error
- Verify `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` match your app in the Spotify Dashboard
- Make sure they're from the same app

### "Invalid redirect URI" error
- Add `http://localhost:3000/api/spotify/auth/callback` to your app's Redirect URIs in the Spotify Dashboard
- URIs must match exactly (including protocol and port)

### Token still invalid after update
1. Make sure you copied the **REFRESH TOKEN**, not the access token
2. Restart the dev server after updating `.env.local`
3. Check for typos in the token (no extra spaces)
4. Verify `.env.local` is in the project root

### Widget still shows "Not Playing"
1. Make sure Spotify is open and playing music
2. Wait 30 seconds (cache/polling interval)
3. Check debug endpoint for errors: `http://localhost:3000/api/spotify/debug`
4. Verify you authorized the correct Spotify account

## Endpoints Reference

| Endpoint | Purpose |
|----------|---------|
| `/api/spotify/auth/start?show=true` | Authorization start page |
| `/api/spotify/auth/callback` | OAuth callback (automatic) |
| `/api/spotify/debug` | Diagnostic information |
| `/api/spotify/now-playing` | Current/recent track |

## Security Notes

⚠️ **NEVER commit `.env.local` to git!**

- The refresh token gives access to your Spotify account
- `.env.local` is already in `.gitignore`
- Revoke access from [Spotify Account Settings](https://www.spotify.com/account/apps/) if compromised

## Files in This Setup

```
app/api/spotify/
  ├── auth/
  │   ├── start/route.ts       # Authorization start endpoint
  │   └── callback/route.ts    # OAuth callback handler
  ├── debug/route.ts           # Diagnostic endpoint
  └── now-playing/route.ts     # Main widget endpoint

scripts/
  ├── update-spotify-token.ps1 # Auto-update token script
  └── verify-spotify-token.ps1 # Verification script

docs/
  ├── SPOTIFY_AUTH_SETUP.md         # This file
  ├── SPOTIFY_TOKEN_REFRESH.md      # Detailed manual guide
  └── SPOTIFY_DEBUG_SESSION.md      # Debug session report
```

## Support

For issues or questions:
1. Check debug endpoint: `http://localhost:3000/api/spotify/debug`
2. Review error messages in browser console
3. Verify environment variables are set correctly
4. Ensure dev server is running on port 3000
