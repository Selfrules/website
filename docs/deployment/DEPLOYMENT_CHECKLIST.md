# Deployment Checklist

Complete checklist for deploying Mattia Portfolio to production.

## Pre-Deployment Setup

### 1. Repository Configuration

- [x] Git repository initialized
- [ ] Push to GitHub
  ```bash
  git remote add origin https://github.com/{owner}/{repo}.git
  git branch -M main
  git push -u origin main
  ```

### 2. Environment Configuration

- [ ] Create `.env.local` from `.env.example`
- [ ] Configure all required environment variables
- [ ] Test local build: `npm run build`
- [ ] Verify environment variables with: `diff .env.example .env.local`

### 3. Database Setup

- [ ] PostgreSQL instance provisioned
- [ ] Database URL configured
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Generate Prisma Client: `npx prisma generate`
- [ ] Verify connection: `psql $DATABASE_URL -c "SELECT 1;"`

---

## Platform Setup

### 4. Vercel Configuration

- [ ] Create Vercel account
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Login: `vercel login`
- [ ] Link project: `vercel link`
- [ ] Configure environment variables:
  ```bash
  vercel env add DATABASE_URL production
  vercel env add CLAUDE_API_KEY production
  vercel env add GOOGLE_CALENDAR_CLIENT_ID production
  vercel env add GOOGLE_CALENDAR_CLIENT_SECRET production
  vercel env add SPOTIFY_CLIENT_ID production
  vercel env add SPOTIFY_CLIENT_SECRET production
  vercel env add SENTRY_DSN production
  vercel env add MIXPANEL_TOKEN production
  vercel env add CLOUDINARY_CLOUD_NAME production
  vercel env add CLOUDINARY_API_KEY production
  vercel env add CLOUDINARY_API_SECRET production
  ```
- [ ] Configure custom domain
- [ ] Enable HTTPS

### 5. Railway Configuration (Backend)

- [ ] Create Railway account
- [ ] Install Railway CLI: `curl -fsSL https://railway.app/install.sh | sh`
- [ ] Login: `railway login`
- [ ] Initialize project: `railway init`
- [ ] Link service: `railway link`
- [ ] Configure environment variables
- [ ] Add PostgreSQL service
- [ ] Deploy backend: `railway up`

### 6. GitHub Actions Setup

- [ ] Navigate to repository Settings → Secrets and variables → Actions
- [ ] Add GitHub Secrets:
  - `VERCEL_TOKEN` (from Vercel dashboard)
  - `VERCEL_ORG_ID` (from `.vercel/project.json`)
  - `VERCEL_PROJECT_ID` (from `.vercel/project.json`)
  - `RAILWAY_TOKEN` (from Railway dashboard)
  - `DATABASE_URL` (production database)
  - `BACKEND_URL` (Railway backend URL)
  - `CODECOV_TOKEN` (optional)
  - `AWS_ACCESS_KEY_ID` (optional, for backups)
  - `AWS_SECRET_ACCESS_KEY` (optional, for backups)
  - `AWS_REGION` (optional, for backups)
  - `BACKUP_S3_BUCKET` (optional, for backups)

### 7. Cloudflare Configuration

- [ ] Create Cloudflare account
- [ ] Add domain to Cloudflare
- [ ] Configure DNS records:
  ```
  Type    Name    Content                     Proxy
  CNAME   @       cname.vercel-dns.com        Yes
  CNAME   www     cname.vercel-dns.com        Yes
  CNAME   api     railway.app                 Yes
  ```
- [ ] Enable Always Use HTTPS
- [ ] Configure caching rules
- [ ] Enable Auto Minify

### 8. Monitoring Setup

- [ ] Create Sentry account
- [ ] Create new Sentry project
- [ ] Copy DSN to environment variables
- [ ] Install Sentry: `npx @sentry/wizard -i nextjs`
- [ ] Verify error tracking works
- [ ] Configure alerts

---

## Deployment Verification

### 9. Initial Deployment

- [ ] Push to main: `git push origin main`
- [ ] Verify GitHub Actions CI workflow passes
- [ ] Verify deployment workflow completes
- [ ] Check Vercel deployment status
- [ ] Check Railway deployment status

### 10. Health Checks

- [ ] Frontend accessible: `curl -I https://mattiaportfolio.com`
- [ ] Backend accessible: `curl -I https://api.mattia-portfolio.com/health`
- [ ] Database connected: `psql $DATABASE_URL -c "SELECT 1;"`
- [ ] Run health check script: `node scripts/monitoring/health-check.js`

### 11. Functionality Testing

- [ ] Homepage loads correctly
- [ ] Dark mode toggle works
- [ ] Language switcher works (ITA/ENG)
- [ ] Navigation functional
- [ ] API endpoints responding
- [ ] Database queries working
- [ ] Forms submitting correctly

### 12. Performance Verification

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Core Web Vitals passing
- [ ] Image optimization working
- [ ] CDN caching effective

### 13. Security Verification

- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] CORS configured correctly
- [ ] Rate limiting active
- [ ] No secrets exposed in client
- [ ] Content Security Policy working

---

## Post-Deployment

### 14. Monitoring Configuration

- [ ] Sentry alerts configured
- [ ] Vercel alerts configured
- [ ] Database alerts configured
- [ ] Uptime monitoring active
- [ ] Error notification webhooks setup

### 15. Backup Configuration

- [ ] Automated backup workflow enabled
- [ ] Verify first backup completes successfully
- [ ] Test backup restore process
- [ ] Configure backup retention policy
- [ ] Document backup/restore procedures

### 16. Documentation

- [ ] Update README with production URLs
- [ ] Document custom domain configuration
- [ ] Update runbook with production details
- [ ] Share deployment guide with team
- [ ] Document any custom configurations

### 17. DNS & Domain

- [ ] Custom domain configured in Vercel
- [ ] SSL certificate issued
- [ ] DNS propagation complete
- [ ] WWW redirect configured
- [ ] Naked domain accessible

---

## Operational Readiness

### 18. Incident Response

- [ ] Review runbook procedures
- [ ] Test rollback procedure
- [ ] Configure on-call rotation
- [ ] Document escalation paths
- [ ] Setup incident communication channels

### 19. Access Management

- [ ] Vercel team access configured
- [ ] Railway project access configured
- [ ] GitHub repository permissions set
- [ ] Sentry project access configured
- [ ] Database access credentials secured

### 20. Final Verification

- [ ] All automated workflows tested
- [ ] Preview deployments working
- [ ] Backup automation verified
- [ ] Monitoring alerts tested
- [ ] Rollback procedure tested
- [ ] Documentation reviewed and updated

---

## Quick Setup Script

Run automated setup with:

```bash
# 1. Configure secrets (interactive)
chmod +x ./scripts/deployment/secrets-setup.sh
./scripts/deployment/secrets-setup.sh

# 2. Deploy to Vercel
vercel --prod

# 3. Deploy backend to Railway
railway up

# 4. Run migrations
railway run npx prisma migrate deploy

# 5. Verify deployment
node scripts/monitoring/health-check.js

# 6. Create first backup
./scripts/db/backup.sh
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules .next
npm install
npm run build
```

### Environment Variables Missing

```bash
# Pull from Vercel
vercel env pull .env.local

# Verify completeness
diff .env.example .env.local
```

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1;"

# Check Railway logs
railway logs
```

### Deployment Verification Fails

```bash
# Check Vercel logs
vercel logs --follow

# Check Railway logs
railway logs --tail 100

# Run health check
node scripts/monitoring/health-check.js
```

---

## Success Criteria

Deployment is successful when:

- [x] All checklist items completed
- [x] Frontend accessible at production URL
- [x] Backend responding to health checks
- [x] Database migrations applied
- [x] Monitoring active and alerts configured
- [x] Backups automated and verified
- [x] Security headers present
- [x] Performance metrics meet targets
- [x] No errors in Sentry
- [x] Team access configured

---

## Next Steps After Deployment

1. **Monitor for 48 hours**: Watch error rates, performance, user behavior
2. **Iterate based on data**: Use analytics to guide improvements
3. **Schedule maintenance**: Weekly health checks, monthly dependency updates
4. **Plan scaling**: Monitor resource usage and plan capacity upgrades
5. **Document learnings**: Update runbook with production insights

---

## Support Resources

- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [Runbook](RUNBOOK.md) - Operational procedures and incident response
- [PRD](../../PRD_Mattia_Website.md) - Product requirements and architecture
- [README](../../README.md) - Project overview and development guide

---

**Last Updated**: 2025-11-04
**Version**: 1.0.0
