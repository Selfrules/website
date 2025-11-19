# Spotify Widget Debug Session Report

**Date**: 2025-11-15
**Branch**: `debug/spotify-playback-issue`
**Status**: ✅ Root cause identified

## Problem Statement

The Spotify "Now Playing" widget is not displaying the currently playing track, showing "Not Playing" or "Offline" status instead.

## Investigation Process

### 1. Architecture Analysis

Analyzed the complete Spotify integration flow:

```
SpotifyWidget.tsx
    ↓ (uses hook)
useNowPlaying() hook
    ↓ (React Query polling every 30s)
/api/spotify/now-playing route
    ↓ (server-side cache 30s)
lib/api/spotify.ts
    ↓ (getCurrentOrRecentTrack)
Spotify Web API
    ├─ /v1/me/player/currently-playing
    └─ /v1/me/player/recently-played (fallback)
```

**Key Findings:**
- ✅ Widget component correctly handles loading/error/data states
- ✅ Hook polling configuration correct (30s interval)
- ✅ API route has proper caching and error handling
- ✅ Integration logic includes fallback to recently played

### 2. Environment Variable Check

**Status**: ✅ All required variables present

```
SPOTIFY_CLIENT_ID      = 32 chars ✅
SPOTIFY_CLIENT_SECRET  = present ✅
SPOTIFY_REFRESH_TOKEN  = 31 chars ❌ INVALID
```

### 3. API Endpoint Testing

**Test 1: Local API Endpoint**
```bash
curl http://localhost:3000/api/spotify/now-playing
```

**Response:**
```json
{
  "data": null,
  "message": "No track currently playing or recently played"
}
```

Status: ⚠️ API working but returns no data

**Test 2: Debug Endpoint**
```bash
curl http://localhost:3000/api/spotify/debug
```

**Response:**
```json
{
  "timestamp": "2025-11-15T19:37:17.659Z",
  "environment": {
    "hasClientId": true,
    "hasClientSecret": true,
    "hasRefreshToken": true,
    "clientIdLength": 32,
    "refreshTokenLength": 31
  },
  "tests": {
    "tokenRefresh": {
      "status": "failed",
      "httpStatus": 400,
      "error": "{\"error\":\"invalid_grant\",\"error_description\":\"Invalid refresh token\"}"
    }
  }
}
```

## 🎯 Root Cause Identified

**Issue**: `SPOTIFY_REFRESH_TOKEN` is invalid or expired

**Spotify API Error:**
```json
{
  "error": "invalid_grant",
  "error_description": "Invalid refresh token"
}
```

### Why This Happens

1. **User revoked access** to the app from Spotify account settings
2. **Token was invalidated** by Spotify (rare, but possible)
3. **App credentials changed** in Spotify Developer Dashboard
4. **Token belongs to different app** than current credentials

### Impact

- ❌ Cannot refresh access token
- ❌ Cannot authenticate with Spotify API
- ❌ No playback data can be retrieved
- ❌ Widget shows "Not Playing" / "Offline" state

## Solution

The refresh token must be regenerated through Spotify's OAuth flow.

**Detailed guide created:** `docs/SPOTIFY_TOKEN_REFRESH.md`

### Quick Fix Steps

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Get new authorization code with required scopes:
   - `user-read-currently-playing`
   - `user-read-recently-played`
   - `user-read-playback-state`
3. Exchange authorization code for refresh token
4. Update `SPOTIFY_REFRESH_TOKEN` in `.env.local`
5. Restart dev server

## Files Created During Debug

### Debug Tools
- `app/api/spotify/debug/route.ts` - Diagnostic endpoint
- `scripts/test-spotify-api.ts` - API integration test script
- `scripts/verify-spotify-token.sh` - Bash verification script
- `scripts/verify-spotify-token.ps1` - PowerShell verification script

### Documentation
- `docs/SPOTIFY_TOKEN_REFRESH.md` - Complete token regeneration guide
- `docs/SPOTIFY_DEBUG_SESSION.md` - This report

## Recommendations

### Immediate Actions

1. **Regenerate refresh token** following the guide
2. **Test with debug endpoint** to verify token validity
3. **Verify widget displays correctly** after token update

### Future Improvements

#### 1. Better Error Visibility

Currently, auth errors return `200 OK` with null data, masking the real issue:

```typescript
// app/api/spotify/now-playing/route.ts:57
if (error.response?.status === 401) {
  return NextResponse.json(
    formatSuccessResponse(null, 'Spotify authentication required'),
    { status: 200 }  // ← Should be 401 for proper error handling
  );
}
```

**Recommendation**: Return proper HTTP status codes for auth failures

#### 2. Client-Side Error Display

Add user-friendly error messages when token is invalid:

```typescript
// SpotifyWidget.tsx enhancement
function SpotifyAuthError() {
  return (
    <div className="bg-neon-pink/10 border-neon-pink ...">
      <p>Spotify authentication expired</p>
      <button onClick={triggerReauth}>Reconnect Spotify</button>
    </div>
  );
}
```

#### 3. Automatic Token Monitoring

Add health check endpoint that alerts when token becomes invalid:

```typescript
// app/api/health/spotify/route.ts
export async function GET() {
  try {
    await getAccessToken(); // Will fail if refresh token invalid
    return NextResponse.json({ status: 'healthy' });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: 'Invalid refresh token'
    }, { status: 503 });
  }
}
```

#### 4. Token Expiry Tracking

Store token metadata to proactively detect issues:

```typescript
interface TokenMetadata {
  lastRefreshed: number;
  consecutiveFailures: number;
  lastSuccessfulAuth: number;
}
```

## Testing Checklist

After token regeneration:

- [ ] Run debug endpoint: `curl http://localhost:3000/api/spotify/debug`
- [ ] Verify token refresh status is "success"
- [ ] Start playing music on Spotify
- [ ] Wait 30 seconds for cache/polling
- [ ] Verify widget shows current track
- [ ] Test recently played fallback (pause music, wait 30s)
- [ ] Check widget shows last played track

## Useful Commands

```bash
# Quick token verification
curl http://localhost:3000/api/spotify/debug | jq '.tests.tokenRefresh'

# Check currently playing
curl http://localhost:3000/api/spotify/now-playing | jq '.'

# Monitor widget updates (PowerShell)
while ($true) {
  curl http://localhost:3000/api/spotify/now-playing | jq '.data.name'
  Start-Sleep -Seconds 5
}
```

## Resources

- [Spotify Authorization Guide](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
- [Spotify API Scopes](https://developer.spotify.com/documentation/web-api/concepts/scopes)
- [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- [Revoke App Access](https://www.spotify.com/account/apps/)

## Conclusion

**Root Cause**: Invalid Spotify refresh token
**Solution**: Regenerate token via OAuth flow
**Prevention**: Monitor token health, improve error visibility

**Status**: Issue identified and documented ✅
**Next Step**: Follow `docs/SPOTIFY_TOKEN_REFRESH.md` to restore functionality

---

## Fix Completed - 2025-11-19

**Date**: 2025-11-19T20:04:00Z
**Branch**: `fix/spotify-player-not-working`

### 🚨 Security Incident - Credentials Exposed (Fixed)

**Incident Date**: 2025-11-19T20:30:00Z
**Status**: ✅ Remediated

⚠️ **Initial commit accidentally exposed Spotify credentials in this documentation file.**

**Exposed Data (Now Removed):**
- Spotify Client Secret
- Spotify Refresh Token

**Remediation Actions Taken:**
1. ✅ Removed all credentials from documentation (replaced with placeholders)
2. ⚠️ **REQUIRED**: Revoke exposed refresh token from [Spotify Account Settings](https://www.spotify.com/account/apps/)
3. ⚠️ **REQUIRED**: Regenerate Client Secret in [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
4. ⚠️ **REQUIRED**: Generate new refresh token following `docs/SPOTIFY_TOKEN_REFRESH.md`
5. ✅ Updated PR with sanitized documentation

**Lesson Learned**: Never include actual credentials in documentation files, even for internal purposes. Always use placeholders like `<your-credential-here>`.

---

### Actions Taken

1. ✅ **Configured Spotify Developer Dashboard**
   - Added redirect URI: `https://selfrules.org/api/spotify/callback`
   - Verified Client ID and Client Secret from Spotify Dashboard

2. ✅ **Generated New Refresh Token**
   - Completed OAuth2 authorization flow
   - Obtained authorization code from callback
   - Exchanged code for refresh token via API
   - New token: `<REFRESH_TOKEN_SUCCESSFULLY_GENERATED>`

3. ✅ **Updated Environment Variables**
   - Updated `.env.local` with new refresh token
   - All required credentials configured

4. ✅ **Verified Fix**
   - Tested debug endpoint: `/api/spotify/debug`
   - Token refresh: **SUCCESS** ✅
   - Currently playing: **SUCCESS** ✅ ("U Already Know - Kiimi Remix" - DJ Seinfeld)
   - Recently played: **SUCCESS** ✅ ("CONTROL" - Seb Wildblood)

### Production Deployment Required

⚠️ **Next Steps for Production:**

1. Update environment variables in production deployment (Vercel/Netlify/Railway):
   ```env
   SPOTIFY_CLIENT_ID=<your-spotify-client-id>
   SPOTIFY_CLIENT_SECRET=<your-spotify-client-secret>
   SPOTIFY_REFRESH_TOKEN=<your-spotify-refresh-token>
   ```

2. Redeploy application to apply new environment variables

3. Verify widget displays correctly on production site

### Testing Results

**Local Development:**
- ✅ Token refresh working
- ✅ Currently playing API functional
- ✅ Recently played API functional
- ✅ Widget displays track information correctly
- ✅ Real-time updates every 30 seconds

**Scopes Granted:**
- `user-read-playback-state`
- `user-read-currently-playing`
- `user-read-recently-played`

### Files Modified

- `.env.local` - Updated `SPOTIFY_REFRESH_TOKEN` (local only, not committed)
- `package-lock.json` - Added missing @next/swc dependencies
- `docs/SPOTIFY_DEBUG_SESSION.md` - Documented fix completion

**Issue Status**: ✅ **RESOLVED**
