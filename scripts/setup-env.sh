#!/bin/bash
# Environment Setup Script for Mattia Portfolio Backend APIs
# This script helps set up required environment variables and services

set -e

echo "========================================="
echo "Mattia Portfolio - Backend API Setup"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
    read -p "Do you want to overwrite it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

# Copy example env file
echo -e "${GREEN}✓${NC} Creating .env file from .env.example..."
cp .env.example .env

echo ""
echo "========================================="
echo "Database Setup"
echo "========================================="
echo ""

# Ask for database type
read -p "Use SQLite for development? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    DATABASE_URL="file:./dev.db"
    echo -e "${GREEN}✓${NC} Using SQLite database"
else
    read -p "Enter PostgreSQL connection string: " PG_URL
    DATABASE_URL=$PG_URL
    echo -e "${GREEN}✓${NC} Using PostgreSQL database"
fi

# Update DATABASE_URL in .env
sed -i "s|DATABASE_URL=.*|DATABASE_URL=$DATABASE_URL|g" .env

echo ""
echo "========================================="
echo "Redis Setup"
echo "========================================="
echo ""

read -p "Is Redis running locally? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    REDIS_URL="redis://localhost:6379"
    echo -e "${GREEN}✓${NC} Using local Redis"
else
    read -p "Enter Redis connection string: " REDIS_CONN
    REDIS_URL=$REDIS_CONN
fi

sed -i "s|REDIS_URL=.*|REDIS_URL=$REDIS_URL|g" .env

echo ""
echo "========================================="
echo "Security Keys Generation"
echo "========================================="
echo ""

echo "Generating security keys..."

# Generate SESSION_SECRET (32 bytes)
SESSION_SECRET=$(openssl rand -hex 32)
sed -i "s|SESSION_SECRET=.*|SESSION_SECRET=$SESSION_SECRET|g" .env
echo -e "${GREEN}✓${NC} Generated SESSION_SECRET"

# Generate ENCRYPTION_KEY (32 bytes, 64 hex chars)
ENCRYPTION_KEY=$(openssl rand -hex 32)
sed -i "s|ENCRYPTION_KEY=.*|ENCRYPTION_KEY=$ENCRYPTION_KEY|g" .env
echo -e "${GREEN}✓${NC} Generated ENCRYPTION_KEY"

# Generate JWT_SECRET (32 bytes)
JWT_SECRET=$(openssl rand -hex 32)
sed -i "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|g" .env
echo -e "${GREEN}✓${NC} Generated JWT_SECRET"

echo ""
echo "========================================="
echo "API Keys Setup"
echo "========================================="
echo ""

echo -e "${YELLOW}⚠️  You need to manually configure the following API keys in .env:${NC}"
echo ""
echo "1. Anthropic Claude API"
echo "   - Sign up at: https://console.anthropic.com/"
echo "   - Get your API key and set ANTHROPIC_API_KEY"
echo ""
echo "2. Google Calendar API"
echo "   - Create project at: https://console.cloud.google.com/"
echo "   - Enable Calendar API"
echo "   - Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALENDAR_REFRESH_TOKEN"
echo ""
echo "3. Spotify Web API"
echo "   - Register app at: https://developer.spotify.com/"
echo "   - Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN"
echo ""

read -p "Have you obtained all API keys? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠️  Please configure API keys in .env before running the application${NC}"
fi

echo ""
echo "========================================="
echo "Database Migration"
echo "========================================="
echo ""

read -p "Run database migrations now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Running Prisma migrations..."
    npm run db:push
    echo -e "${GREEN}✓${NC} Database migrations completed"
fi

echo ""
echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo -e "${GREEN}✓${NC} .env file created"
echo -e "${GREEN}✓${NC} Security keys generated"
echo -e "${GREEN}✓${NC} Database configured"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your API keys"
echo "2. Run 'npm install' to install dependencies"
echo "3. Run 'npm run dev' to start development server"
echo ""
echo "For detailed API documentation, see:"
echo "  claudedocs/API_IMPLEMENTATION_GUIDE.md"
echo ""
