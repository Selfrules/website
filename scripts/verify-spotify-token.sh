#!/bin/bash

# Spotify Token Verification Script
# Quick check to verify if Spotify integration is working

echo "🎵 Verifying Spotify Integration..."
echo ""

# Check if dev server is running
if ! curl -s http://localhost:3000/api/spotify/debug > /dev/null 2>&1; then
  echo "❌ Dev server is not running on port 3000"
  echo "   Run: npm run dev"
  exit 1
fi

# Call debug endpoint
RESPONSE=$(curl -s http://localhost:3000/api/spotify/debug)

# Check token refresh status
TOKEN_STATUS=$(echo "$RESPONSE" | grep -o '"tokenRefresh":{[^}]*}' | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

echo "Token Refresh Status: $TOKEN_STATUS"
echo ""

if [ "$TOKEN_STATUS" = "success" ]; then
  echo "✅ Spotify token is valid!"

  # Check currently playing
  NOW_PLAYING=$(echo "$RESPONSE" | grep -o '"currentlyPlaying":{[^}]*}')
  NOW_STATUS=$(echo "$NOW_PLAYING" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

  echo "   Currently Playing: $NOW_STATUS"

  # Check recently played
  RECENT_PLAYED=$(echo "$RESPONSE" | grep -o '"recentlyPlayed":{[^}]*}')
  RECENT_STATUS=$(echo "$RECENT_PLAYED" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

  echo "   Recently Played: $RECENT_STATUS"
  echo ""

  if [ "$NOW_STATUS" = "nothing_playing" ] && [ "$RECENT_STATUS" = "success" ]; then
    echo "ℹ️  No music currently playing, but integration is working"
    echo "   Start playing on Spotify to see the widget in action"
  elif [ "$NOW_STATUS" = "success" ]; then
    echo "🎶 Music is playing! Widget should show current track"
  fi

  echo ""
  echo "Full debug info: http://localhost:3000/api/spotify/debug"

elif [ "$TOKEN_STATUS" = "failed" ]; then
  echo "❌ Spotify token is INVALID!"
  echo ""
  echo "   Error: $(echo "$RESPONSE" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)"
  echo ""
  echo "📚 Follow the guide to regenerate your token:"
  echo "   docs/SPOTIFY_TOKEN_REFRESH.md"
  echo ""
  echo "Quick steps:"
  echo "   1. Go to https://developer.spotify.com/dashboard"
  echo "   2. Get authorization code with required scopes"
  echo "   3. Exchange for refresh token"
  echo "   4. Update .env.local with new token"
  echo "   5. Restart dev server"

else
  echo "⚠️  Unknown status"
  echo "   Full response:"
  echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
fi

echo ""
