# Secrets Management Strategy

Comprehensive guide for secure secrets management in production and development environments.

## Overview

This document defines the strategy for managing sensitive credentials, API keys, and encryption keys throughout the application lifecycle.

## Environment Variables Organization

### Required Environment Variables

#### Application
```bash
NODE_ENV=production|staging|development
NEXT_PUBLIC_APP_URL=https://mattia-portfolio.com
NEXT_PUBLIC_API_URL=https://api.mattia-portfolio.com
```

#### Database
```bash
DATABASE_URL=postgresql://user:password@host:5432/dbname
DATABASE_POOL_SIZE=10
REDIS_URL=redis://user:password@host:6379
```

#### Security Keys
```bash
# Session signing (min 32 chars)
SESSION_SECRET=<generate-with-openssl-rand-hex-32>

# Token encryption (exactly 64 chars hex = 32 bytes)
ENCRYPTION_KEY=<generate-with-openssl-rand-hex-32>

# JWT signing (min 32 chars)
JWT_SECRET=<generate-with-openssl-rand-hex-32>
```

#### API Keys
```bash
# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-api03-...
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
ANTHROPIC_MAX_TOKENS=4096

# Google Calendar API
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
GOOGLE_REDIRECT_URI=https://mattia-portfolio.com/api/auth/google/callback
GOOGLE_CALENDAR_ID=calendar@gmail.com

# Spotify API
SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx
SPOTIFY_REFRESH_TOKEN=xxx
```

#### Admin Access
```bash
ADMIN_EMAIL=admin@mattia-portfolio.com
ADMIN_PASSWORD_HASH=<bcrypt-hash>
```

#### Optional Services
```bash
# Analytics
MIXPANEL_TOKEN=xxx
SENTRY_DSN=https://xxx@sentry.io/xxx

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=notifications@mattia-portfolio.com
SMTP_PASSWORD=xxx
EMAIL_FROM=noreply@mattia-portfolio.com

# Storage
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

## Secret Generation Commands

### Security Keys
```bash
# Session secret (32 bytes = 64 hex chars)
openssl rand -hex 32

# Encryption key (32 bytes = 64 hex chars)
openssl rand -hex 32

# JWT secret (32 bytes = 64 hex chars)
openssl rand -hex 32

# OAuth state parameter
openssl rand -hex 32

# CSRF token
openssl rand -base64 32
```

### Password Hashing
```bash
# Generate bcrypt hash for admin password
npx bcrypt-cli hash "your-password" 12
```

## Storage Solutions by Environment

### Development (Local)

**Method**: `.env.local` file (gitignored)

```bash
# Create .env.local
cp .env.example .env.local

# Add real secrets
nano .env.local

# Verify gitignore
grep ".env.local" .gitignore
```

**Security**:
- ✅ File is gitignored
- ✅ Use test/sandbox API keys
- ❌ Never commit real secrets
- ❌ Never share .env.local files

### Staging/Production

**Method**: Platform environment variables (Vercel, Railway, etc.)

#### Vercel Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add secrets
vercel env add ANTHROPIC_API_KEY
vercel env add DATABASE_URL
vercel env add ENCRYPTION_KEY

# Pull secrets for local development
vercel env pull .env.local
```

#### Railway Setup
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Add secrets
railway variables set ANTHROPIC_API_KEY=sk-ant-...
railway variables set DATABASE_URL=postgresql://...

# List variables
railway variables
```

#### Environment-Specific Variables
```bash
# Production only
vercel env add DATABASE_URL production

# Staging only
vercel env add DATABASE_URL preview

# All environments
vercel env add NEXT_PUBLIC_APP_URL
```

## Secret Rotation Policy

### Rotation Schedule
- **Encryption keys**: Every 90 days
- **API keys**: Every 180 days or on compromise
- **Admin passwords**: Every 90 days
- **OAuth tokens**: Automatic refresh (hourly)
- **Database credentials**: Every 180 days

### Rotation Process

#### 1. Generate New Secret
```bash
NEW_SECRET=$(openssl rand -hex 32)
echo "New secret: $NEW_SECRET"
```

#### 2. Add to Environment (Dual-Key Period)
```bash
# Add new key alongside old
ENCRYPTION_KEY=<old-key>
ENCRYPTION_KEY_NEW=<new-key>
```

#### 3. Deploy Code Update
```typescript
// Support both keys during transition
const decryptionKeys = [
  process.env.ENCRYPTION_KEY_NEW,
  process.env.ENCRYPTION_KEY, // Fallback to old
].filter(Boolean);
```

#### 4. Re-encrypt Data
```bash
# Run migration script
npm run migrate:rotate-encryption-key
```

#### 5. Remove Old Key
```bash
# After all data re-encrypted
vercel env rm ENCRYPTION_KEY
vercel env rename ENCRYPTION_KEY_NEW ENCRYPTION_KEY
```

## Access Control

### Who Can Access Secrets

**Production Secrets**:
- ✅ DevOps team
- ✅ Lead developers
- ❌ Junior developers
- ❌ Contractors (unless approved)

**Staging Secrets**:
- ✅ All developers
- ✅ QA team
- ⚠️ Different from production

**Development Secrets**:
- ✅ Everyone
- ⚠️ Use test/sandbox credentials only

### Access Logging
```typescript
// Log secret access in production
if (process.env.NODE_ENV === 'production') {
  console.log(`Secret accessed: ${secretName} by ${userId} at ${timestamp}`);
}
```

## Security Best Practices

### ✅ DO

1. **Use environment variables for ALL secrets**
   ```typescript
   const apiKey = process.env.ANTHROPIC_API_KEY;
   ```

2. **Validate environment on startup**
   ```typescript
   import { validateEnvironment } from '@/lib/security/config/env';
   validateEnvironment();
   ```

3. **Use different secrets per environment**
   ```
   DEV_API_KEY ≠ STAGING_API_KEY ≠ PROD_API_KEY
   ```

4. **Encrypt secrets at rest**
   ```typescript
   const encrypted = tokenEncryption.encrypt(refreshToken);
   ```

5. **Use secure random generation**
   ```typescript
   crypto.randomBytes(32).toString('hex');
   ```

6. **Rotate secrets regularly**
   - Set calendar reminders
   - Automate rotation where possible

7. **Monitor secret access**
   - Log secret usage
   - Alert on anomalies

### ❌ DON'T

1. **Never commit secrets to git**
   ```bash
   # Check for leaked secrets
   git log -p | grep -i "api_key"
   ```

2. **Never log secrets**
   ```typescript
   // BAD
   console.log(`API Key: ${apiKey}`);

   // GOOD
   console.log(`API Key: ${apiKey.slice(0, 8)}...`);
   ```

3. **Never hardcode secrets**
   ```typescript
   // NEVER DO THIS
   const apiKey = 'sk-ant-api03-xxx';
   ```

4. **Never share secrets via email/Slack**
   - Use secure password managers
   - Use platform secret management

5. **Never use weak secrets**
   ```typescript
   // BAD
   const secret = 'password123';

   // GOOD
   const secret = crypto.randomBytes(32).toString('hex');
   ```

6. **Never store secrets in frontend code**
   ```typescript
   // BAD - exposed to client
   const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;

   // GOOD - server-side only
   const apiKey = process.env.ANTHROPIC_API_KEY;
   ```

## Secret Detection and Prevention

### Pre-commit Hook
```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Check for secrets
npm run check:secrets
```

### GitHub Actions
```yaml
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Detect secrets
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
```

### Git-secrets Tool
```bash
# Install git-secrets
brew install git-secrets

# Setup for repo
git secrets --install
git secrets --register-aws
git secrets --add 'sk-ant-[A-Za-z0-9]+'
git secrets --add 'GOCSPX-[A-Za-z0-9_-]+'
```

## Incident Response

### If Secret is Compromised

#### Immediate Actions (Within 1 hour)
1. **Revoke the compromised secret**
   - API keys: Revoke in provider dashboard
   - Tokens: Invalidate in database
   - Passwords: Force password reset

2. **Generate new secret**
   ```bash
   NEW_SECRET=$(openssl rand -hex 32)
   ```

3. **Update environment variables**
   ```bash
   vercel env rm COMPROMISED_SECRET
   vercel env add NEW_SECRET
   ```

4. **Deploy immediately**
   ```bash
   vercel --prod
   ```

#### Investigation (Within 24 hours)
1. **Review access logs**
   - Who accessed the secret?
   - When was it compromised?
   - What was accessed?

2. **Assess impact**
   - What data was exposed?
   - What actions were taken?
   - What's the blast radius?

3. **Document incident**
   - Timeline of events
   - Root cause analysis
   - Remediation steps taken

#### Prevention (Within 1 week)
1. **Implement additional controls**
   - Enhanced monitoring
   - Stricter access controls
   - Additional validation

2. **Update documentation**
   - Incident post-mortem
   - Updated procedures
   - Team training

## Monitoring and Alerts

### Metrics to Monitor
- Secret access frequency
- Failed authentication attempts
- Unusual API usage patterns
- Secret age (rotation reminders)

### Alert Triggers
- Multiple failed auth attempts (5+)
- Secret accessed outside business hours
- Secret accessed from unusual location
- API rate limit exceeded
- Secret rotation overdue

## Compliance Checklist

- [ ] All secrets in environment variables
- [ ] No secrets in git history
- [ ] .env.local in .gitignore
- [ ] Different secrets per environment
- [ ] Secrets validated on startup
- [ ] Rotation policy documented
- [ ] Access controls implemented
- [ ] Monitoring and alerts configured
- [ ] Incident response plan documented
- [ ] Team trained on secret management

## Tools and Resources

### Recommended Tools
- **1Password/LastPass**: Team password management
- **Vercel/Railway**: Platform secret management
- **git-secrets**: Pre-commit secret detection
- **TruffleHog**: Secret scanning in CI/CD
- **Doppler**: Centralized secret management (enterprise)

### Useful Commands
```bash
# Audit environment variables
env | grep -i "key\|secret\|password"

# Find potential secrets in code
grep -r -i "api.key\|secret\|password" --exclude-dir=node_modules .

# Test environment validation
npm run validate:env

# Check for secrets in git history
git log --all --full-history --source --grep="password\|key\|secret"
```

## Questions and Support

For questions about secret management:
1. Check this documentation
2. Review environment validation errors
3. Contact DevOps team
4. Escalate to security team if needed

**Security Incidents**: Immediately contact security@company.com
