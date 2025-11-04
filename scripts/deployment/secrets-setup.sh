#!/bin/bash

# Secrets Management Setup Script
# This script helps configure GitHub Secrets and Vercel environment variables

set -e

echo "🔐 Secrets Setup for Mattia Portfolio"
echo "======================================"

# Check required CLI tools
command -v gh >/dev/null 2>&1 || { echo "❌ GitHub CLI (gh) not found. Install: https://cli.github.com/"; exit 1; }
command -v vercel >/dev/null 2>&1 || { echo "❌ Vercel CLI not found. Run: npm i -g vercel"; exit 1; }

# GitHub Secrets Setup
echo ""
echo "📦 Setting up GitHub Secrets..."

read -p "Enter GitHub repository (owner/repo): " REPO

# Vercel secrets
read -p "Enter Vercel Token: " -s VERCEL_TOKEN
echo ""
gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN" --repo "$REPO"

# Railway secrets (optional)
read -p "Enter Railway Token (press enter to skip): " -s RAILWAY_TOKEN
echo ""
if [ ! -z "$RAILWAY_TOKEN" ]; then
  gh secret set RAILWAY_TOKEN --body "$RAILWAY_TOKEN" --repo "$REPO"
fi

# Database URL
read -p "Enter Production Database URL: " -s DATABASE_URL
echo ""
gh secret set DATABASE_URL --body "$DATABASE_URL" --repo "$REPO"

# Backend URL
read -p "Enter Backend URL: " BACKEND_URL
gh secret set BACKEND_URL --body "$BACKEND_URL" --repo "$REPO"

# Codecov Token (optional)
read -p "Enter Codecov Token (press enter to skip): " -s CODECOV_TOKEN
echo ""
if [ ! -z "$CODECOV_TOKEN" ]; then
  gh secret set CODECOV_TOKEN --body "$CODECOV_TOKEN" --repo "$REPO"
fi

echo "✅ GitHub Secrets configured"

# Vercel Environment Variables Setup
echo ""
echo "📦 Setting up Vercel Environment Variables..."

# Authenticate with Vercel
vercel link

# Add environment variables
echo "Adding environment variables to Vercel..."

# Database
vercel env add DATABASE_URL production <<< "$DATABASE_URL"
vercel env add DIRECT_URL production <<< "$DATABASE_URL"

# APIs
read -p "Enter Claude API Key: " -s CLAUDE_API_KEY
echo ""
vercel env add CLAUDE_API_KEY production <<< "$CLAUDE_API_KEY"

read -p "Enter Google Calendar Client ID: " GOOGLE_CLIENT_ID
vercel env add GOOGLE_CALENDAR_CLIENT_ID production <<< "$GOOGLE_CLIENT_ID"

read -p "Enter Google Calendar Client Secret: " -s GOOGLE_CLIENT_SECRET
echo ""
vercel env add GOOGLE_CALENDAR_CLIENT_SECRET production <<< "$GOOGLE_CLIENT_SECRET"

read -p "Enter Spotify Client ID: " SPOTIFY_CLIENT_ID
vercel env add SPOTIFY_CLIENT_ID production <<< "$SPOTIFY_CLIENT_ID"

read -p "Enter Spotify Client Secret: " -s SPOTIFY_CLIENT_SECRET
echo ""
vercel env add SPOTIFY_CLIENT_SECRET production <<< "$SPOTIFY_CLIENT_SECRET"

# Monitoring
read -p "Enter Sentry DSN: " SENTRY_DSN
vercel env add SENTRY_DSN production <<< "$SENTRY_DSN"

read -p "Enter Mixpanel Token: " MIXPANEL_TOKEN
vercel env add MIXPANEL_TOKEN production <<< "$MIXPANEL_TOKEN"

# Cloudinary
read -p "Enter Cloudinary Cloud Name: " CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_CLOUD_NAME production <<< "$CLOUDINARY_CLOUD_NAME"

read -p "Enter Cloudinary API Key: " CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_KEY production <<< "$CLOUDINARY_API_KEY"

read -p "Enter Cloudinary API Secret: " -s CLOUDINARY_API_SECRET
echo ""
vercel env add CLOUDINARY_API_SECRET production <<< "$CLOUDINARY_API_SECRET"

echo ""
echo "✅ Vercel Environment Variables configured"

echo ""
echo "🎉 Secrets setup complete!"
echo ""
echo "Next steps:"
echo "1. Verify secrets in GitHub: https://github.com/$REPO/settings/secrets/actions"
echo "2. Verify environment variables in Vercel dashboard"
echo "3. Test deployment with: git push origin main"
