# Deployment Guide - Mattia Portfolio Website

Complete deployment guide with infrastructure setup, CI/CD configuration, and operational procedures.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Infrastructure Setup](#infrastructure-setup)
3. [Environment Configuration](#environment-configuration)
4. [Deployment Pipeline](#deployment-pipeline)
5. [Monitoring & Logging](#monitoring--logging)
6. [Operational Procedures](#operational-procedures)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools
- Node.js 20+
- Git
- GitHub CLI (`gh`)
- Vercel CLI (`npm i -g vercel`)
- Docker & Docker Compose (for local development)
- PostgreSQL client

### Required Accounts
- GitHub account with repository access
- Vercel account
- Railway or Fly.io account (backend hosting)
- Cloudflare account (CDN)
- Sentry account (error tracking)
- AWS account (backup storage, optional)

---

## Infrastructure Setup

### 1. Frontend Deployment (Vercel)

**Initial Setup**:
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Deploy to production
vercel --prod
```

**Vercel Configuration**:
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 20.x

**Custom Domains**:
1. Go to Vercel Dashboard → Project Settings → Domains
2. Add custom domain: `mattiaportfolio.com`
3. Configure DNS records as instructed
4. Enable automatic HTTPS

### 2. Backend Deployment (Railway)

**Initial Setup**:
```bash
# Install Railway CLI
curl -fsSL https://railway.app/install.sh | sh

# Login to Railway
railway login

# Initialize project
railway init

# Link to service
railway link

# Deploy
railway up
```

**Railway Configuration**:
- Service: Backend API
- Start Command: `node dist/server.js`
- Build Command: `npm run build`
- Healthcheck Path: `/health`
- Port: 3001

**Database Setup**:
1. Create PostgreSQL service in Railway
2. Link to backend service
3. Copy `DATABASE_URL` to environment variables
4. Run migrations: `railway run npx prisma migrate deploy`

### 3. Database (PostgreSQL)

**Managed PostgreSQL Setup**:
```bash
# Connect to database
psql $DATABASE_URL

# Run initial migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Verify connection
npx prisma db pull
```

### 4. CDN Configuration (Cloudflare)

**DNS Records**:
```
Type    Name    Content                     Proxy
CNAME   @       cname.vercel-dns.com        Yes
CNAME   www     cname.vercel-dns.com        Yes
CNAME   api     railway.app                 Yes
```

**Page Rules**:
- Cache Level: Standard
- Browser Cache TTL: 4 hours
- Always Use HTTPS: On
- Auto Minify: HTML, CSS, JS

---

## Environment Configuration

### 1. GitHub Secrets

Navigate to repository → Settings → Secrets and variables → Actions

**Required Secrets**:
```bash
VERCEL_TOKEN              # Vercel deployment token
VERCEL_ORG_ID             # Vercel organization ID
VERCEL_PROJECT_ID         # Vercel project ID
RAILWAY_TOKEN             # Railway API token
DATABASE_URL              # Production database URL
BACKEND_URL               # Backend API URL
CODECOV_TOKEN             # Code coverage token (optional)
AWS_ACCESS_KEY_ID         # AWS for backups (optional)
AWS_SECRET_ACCESS_KEY     # AWS for backups (optional)
AWS_REGION                # AWS region (optional)
BACKUP_S3_BUCKET          # S3 bucket for backups (optional)
```

**Setup Script**:
```bash
chmod +x ./scripts/deployment/secrets-setup.sh
./scripts/deployment/secrets-setup.sh
```

### 2. Vercel Environment Variables

**Production Environment**:
```bash
# Database
DATABASE_URL
DIRECT_URL

# APIs
CLAUDE_API_KEY
GOOGLE_CALENDAR_CLIENT_ID
GOOGLE_CALENDAR_CLIENT_SECRET
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN

# Monitoring
SENTRY_DSN
SENTRY_AUTH_TOKEN
MIXPANEL_TOKEN

# Storage
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

# Application
NEXTAUTH_SECRET
ADMIN_EMAIL
```

**Environment Setup**:
```bash
# Add all variables at once
vercel env pull .env.local
# Edit .env.local with production values
vercel env add < .env.local
```

### 3. Local Development

**Environment File** (`.env.local`):
```bash
cp .env.example .env.local
# Edit .env.local with development values
```

**Docker Compose**:
```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## Deployment Pipeline

### CI/CD Workflows

#### 1. Continuous Integration (`.github/workflows/ci.yml`)

**Triggers**:
- Pull requests to `main` or `develop`
- Pushes to `main` or `develop`

**Jobs**:
- **Code Quality**: Linting, type checking, formatting
- **Build Test**: Verify production build
- **Security Audit**: npm audit for vulnerabilities
- **Tests**: Run test suite with coverage

**Manual Trigger**:
```bash
gh workflow run ci.yml
```

#### 2. Production Deployment (`.github/workflows/deploy.yml`)

**Triggers**:
- Push to `main` branch
- Manual workflow dispatch

**Jobs**:
1. **Deploy Frontend**: Vercel production deployment
2. **Deploy Backend**: Railway deployment + migrations
3. **Verification**: Health checks
4. **Notification**: Deployment status
5. **Rollback**: Automatic on failure

**Manual Deploy**:
```bash
gh workflow run deploy.yml
```

#### 3. Preview Deployments (`.github/workflows/preview.yml`)

**Triggers**:
- Pull request opened/updated/reopened

**Features**:
- Automatic preview environment
- Lighthouse CI performance testing
- Visual regression testing
- Comment with preview URL
- Automatic cleanup after merge

#### 4. Database Backups (`.github/workflows/backup.yml`)

**Schedule**: Daily at 2 AM UTC

**Features**:
- Automated PostgreSQL backup
- Compressed storage
- Upload to artifacts
- Optional S3 upload
- 30-day retention

**Manual Backup**:
```bash
gh workflow run backup.yml
```

### Deployment Process

#### Standard Deployment Flow:
```
1. Create feature branch
   git checkout -b feature/new-feature

2. Develop and commit changes
   git add .
   git commit -m "feat: add new feature"

3. Push and create PR
   git push origin feature/new-feature
   gh pr create

4. Automated checks run
   - CI workflow executes
   - Preview deployment creates

5. Review and merge
   gh pr merge

6. Automatic production deployment
   - Deploy workflow triggers
   - Frontend → Vercel
   - Backend → Railway
   - Health checks verify
```

#### Emergency Hotfix:
```bash
# Create hotfix branch
git checkout -b hotfix/critical-fix main

# Make fix and commit
git add .
git commit -m "fix: critical security patch"

# Push and deploy
git push origin hotfix/critical-fix
gh pr create --base main
gh pr merge --auto --squash

# Deployment triggers automatically
```

---

## Monitoring & Logging

### 1. Error Tracking (Sentry)

**Setup**:
```bash
# Install Sentry SDK
npm install @sentry/nextjs

# Initialize Sentry
npx @sentry/wizard -i nextjs
```

**Configuration** (`sentry.client.config.js`):
```javascript
import { initSentry } from './scripts/monitoring/sentry-setup';
initSentry();
```

**Usage**:
```javascript
import { logError } from './scripts/monitoring/sentry-setup';

try {
  // code
} catch (error) {
  logError(error, { context: 'additional info' });
}
```

**Accessing Sentry**:
- Dashboard: https://sentry.io
- Filter by environment: production/staging/preview
- Set up alerts for critical errors

### 2. Performance Monitoring

**Vercel Analytics**:
- Automatic Web Vitals tracking
- Real User Monitoring (RUM)
- Dashboard: Vercel Project → Analytics

**Custom Metrics**:
```javascript
import { trackPerformance } from './scripts/monitoring/sentry-setup';

trackPerformance('api-call', () => {
  // operation to track
});
```

### 3. Health Checks

**Automated Monitoring**:
```bash
# Run health check script
node scripts/monitoring/health-check.js
```

**Health Check Endpoints**:
- Frontend: `https://mattiaportfolio.com/`
- Backend: `https://api.mattia-portfolio.com/health`

**Monitoring Schedule**:
- Production: Every 5 minutes
- Staging: Every 15 minutes
- Alerts: Email + Webhook on failures

### 4. Log Aggregation

**Vercel Logs**:
```bash
# Stream production logs
vercel logs --follow

# Filter by function
vercel logs --follow --filter=api/chat
```

**Railway Logs**:
```bash
# View backend logs
railway logs --tail 100
```

---

## Operational Procedures

### Database Management

#### Migrations:
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Deploy to production
npx prisma migrate deploy

# Reset database (CAUTION)
npx prisma migrate reset
```

#### Backups:
```bash
# Manual backup
chmod +x ./scripts/db/backup.sh
BACKUP_DIR=./backups ./scripts/db/backup.sh

# Restore from backup
chmod +x ./scripts/db/restore.sh
./scripts/db/restore.sh
```

#### Database Maintenance:
```bash
# Check database size
psql $DATABASE_URL -c "SELECT pg_size_pretty(pg_database_size('mattia_portfolio'));"

# Vacuum database
psql $DATABASE_URL -c "VACUUM ANALYZE;"

# Check active connections
psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"
```

### Rollback Procedures

#### Frontend Rollback (Vercel):
```bash
# List recent deployments
vercel list

# Rollback to previous deployment
vercel rollback [deployment-url]

# Or use GitHub Actions
gh workflow run deploy.yml -f rollback=true
```

#### Backend Rollback (Railway):
```bash
# List deployments
railway status

# Rollback to previous deployment
railway rollback [deployment-id]
```

#### Database Rollback:
```bash
# Restore from backup
./scripts/db/restore.sh

# Or manually
psql $DATABASE_URL < backups/backup_file.sql
```

### Zero-Downtime Deployment

**Strategy**: Blue-Green Deployment

1. **Deploy new version** to staging slot
2. **Verify health checks** pass
3. **Gradual traffic shift**: 10% → 50% → 100%
4. **Monitor error rates** during shift
5. **Auto-rollback** if error rate exceeds threshold

**Configuration** (Vercel):
- Automatic traffic splitting on production aliases
- Health check verification before promotion
- Rollback on any HTTP 5xx errors

### Secrets Rotation

**Quarterly Rotation Checklist**:
```bash
# 1. Generate new secrets
openssl rand -base64 32

# 2. Update in GitHub Secrets
gh secret set SECRET_NAME

# 3. Update in Vercel
vercel env add SECRET_NAME production

# 4. Update in Railway
railway variables set SECRET_NAME=value

# 5. Trigger redeploy
gh workflow run deploy.yml

# 6. Verify services healthy
node scripts/monitoring/health-check.js
```

---

## Troubleshooting

### Common Issues

#### Build Failures:
```bash
# Check build logs
vercel logs --follow

# Verify dependencies
npm ci
npm run build

# Clear cache
vercel --force
```

#### Database Connection Issues:
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1;"

# Check connection pool
psql $DATABASE_URL -c "SELECT * FROM pg_stat_activity;"

# Restart database connections
railway restart
```

#### Deployment Verification Failed:
```bash
# Check health endpoint
curl -I https://mattiaportfolio.com/

# View error logs
vercel logs --filter=error

# Manual health check
node scripts/monitoring/health-check.js
```

#### Environment Variables Missing:
```bash
# List current variables
vercel env ls

# Pull from Vercel
vercel env pull .env.local

# Verify all required variables
diff .env.example .env.local
```

### Emergency Contacts

**Critical Issues**:
- Vercel Support: https://vercel.com/support
- Railway Support: https://railway.app/help
- Sentry Support: https://sentry.io/support

**On-Call Procedures**:
1. Check Sentry for error details
2. Review recent deployments in Vercel
3. Verify backend health in Railway
4. Check database connections
5. Review GitHub Actions logs
6. Rollback if necessary
7. Document incident for post-mortem

---

## Performance Optimization

### Caching Strategy:
- Static assets: 1 year
- API responses: 5 minutes (with revalidation)
- Images: 30 days
- Fonts: Immutable

### CDN Configuration:
- Edge caching enabled
- Brotli compression
- HTTP/3 support
- Image optimization

### Database Optimization:
- Connection pooling: 10-20 connections
- Query timeout: 30 seconds
- Idle timeout: 10 minutes
- Index maintenance: Weekly

---

## Security Checklist

- [ ] HTTPS enforced everywhere
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] Rate limiting on API endpoints
- [ ] SQL injection protection (Prisma ORM)
- [ ] XSS protection enabled
- [ ] Secrets stored securely (no hardcoded values)
- [ ] Regular dependency updates (Dependabot enabled)
- [ ] Database backups automated
- [ ] Error logging excludes sensitive data
- [ ] Admin routes protected

---

## Next Steps

After deployment:
1. Configure custom domain DNS
2. Setup monitoring alerts
3. Enable automatic backups
4. Configure CDN caching rules
5. Schedule quarterly secrets rotation
6. Document runbook for common incidents
7. Setup on-call rotation
8. Create disaster recovery plan

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
