# Operations Runbook - Mattia Portfolio

Quick reference guide for common operational tasks and incident response.

## Quick Links

- **Production**: https://mattiaportfolio.com
- **API**: https://api.mattia-portfolio.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard
- **Sentry**: https://sentry.io
- **GitHub Actions**: https://github.com/{owner}/{repo}/actions

---

## Daily Operations

### Morning Health Check
```bash
# Run comprehensive health check
node scripts/monitoring/health-check.js

# Check error rates in Sentry
# Review Vercel analytics
# Verify database connections
```

### Deployment Checklist
```
□ All tests passing
□ Code review approved
□ Feature flags configured
□ Database migrations tested
□ Rollback plan documented
□ Monitoring alerts configured
□ Deployment window scheduled
```

---

## Incident Response

### Severity Levels

**P0 - Critical**: Site down, data loss
- Response time: Immediate
- Escalation: All hands

**P1 - High**: Major feature broken, performance degraded
- Response time: 15 minutes
- Escalation: On-call engineer

**P2 - Medium**: Minor feature broken, workaround available
- Response time: 2 hours
- Escalation: Regular business hours

**P3 - Low**: Cosmetic issues, enhancement requests
- Response time: Next sprint
- Escalation: Backlog prioritization

### Response Procedure

1. **Acknowledge Incident**
   ```bash
   # Check Sentry for errors
   # Review recent deployments
   # Verify monitoring dashboards
   ```

2. **Assess Impact**
   - How many users affected?
   - What functionality is impacted?
   - Is data at risk?

3. **Immediate Mitigation**
   ```bash
   # Rollback if needed
   vercel rollback [previous-deployment]
   railway rollback [deployment-id]

   # Or disable feature flag
   vercel env add ENABLE_FEATURE false production
   ```

4. **Root Cause Analysis**
   - Review error logs
   - Check recent code changes
   - Verify infrastructure status
   - Test in staging environment

5. **Resolution**
   - Apply fix
   - Deploy with verification
   - Monitor for recurrence

6. **Post-Mortem**
   - Document timeline
   - Identify prevention measures
   - Update runbook
   - Share learnings

---

## Common Issues

### Site Unavailable

**Symptoms**: 502/503 errors, timeout

**Diagnosis**:
```bash
# Check frontend
curl -I https://mattiaportfolio.com

# Check backend
curl -I https://api.mattia-portfolio.com/health

# Verify Vercel status
vercel status

# Check Railway status
railway status
```

**Resolution**:
1. Verify Vercel/Railway service status
2. Check recent deployments
3. Review error logs
4. Rollback if deployment-related
5. Restart services if infrastructure issue

### Database Connection Failures

**Symptoms**: API errors, timeout on data operations

**Diagnosis**:
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1;"

# Check active connections
psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"

# Verify connection pool
railway logs --filter=database
```

**Resolution**:
1. Check connection pool exhaustion
2. Verify database credentials
3. Review long-running queries
4. Restart backend service
5. Scale database if needed

### High Error Rate

**Symptoms**: Sentry alerts, increased 500 errors

**Diagnosis**:
```bash
# Check Sentry dashboard
# Filter errors by time range
# Identify error pattern

# Review recent deployments
vercel list

# Check system resources
railway metrics
```

**Resolution**:
1. Identify error source (frontend/backend/database)
2. Rollback if deployment-caused
3. Apply hotfix if code issue
4. Scale resources if capacity issue

### Slow Performance

**Symptoms**: Increased response times, user complaints

**Diagnosis**:
```bash
# Check Vercel analytics
# Review Sentry performance monitoring
# Analyze slow database queries

# Database query performance
psql $DATABASE_URL -c "SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;"
```

**Resolution**:
1. Identify bottleneck (frontend/backend/database)
2. Review recent code changes
3. Optimize slow queries
4. Enable/adjust caching
5. Scale infrastructure if needed

### Failed Deployment

**Symptoms**: Deployment workflow fails, build errors

**Diagnosis**:
```bash
# Check GitHub Actions logs
gh run list --workflow=deploy.yml

# View specific run
gh run view [run-id]

# Verify build locally
npm run build
```

**Resolution**:
1. Review build logs for specific error
2. Verify environment variables
3. Test build locally
4. Fix code/config issue
5. Retry deployment

---

## Maintenance Tasks

### Weekly

**Monday**:
```bash
# Review error trends
# Check disk space and database size
# Review slow query logs
# Update dependencies if needed
```

**Wednesday**:
```bash
# Review performance metrics
# Check security alerts
# Verify backup integrity
```

**Friday**:
```bash
# Review week's incidents
# Update documentation
# Plan upcoming changes
```

### Monthly

```bash
# Database maintenance
psql $DATABASE_URL -c "VACUUM ANALYZE;"

# Review and optimize queries
# Update dependencies
npm audit fix

# Review access logs
# Verify monitoring alerts
# Test disaster recovery
```

### Quarterly

```bash
# Rotate secrets
./scripts/deployment/secrets-setup.sh

# Review infrastructure costs
# Capacity planning review
# Security audit
# Load testing
```

---

## Emergency Procedures

### Complete Site Outage

1. **Immediate Actions**:
   ```bash
   # Check service status
   curl -I https://mattiaportfolio.com

   # Verify DNS
   dig mattiaportfolio.com

   # Check Vercel status
   curl https://www.vercel-status.com/api/v2/status.json
   ```

2. **Communication**:
   - Update status page
   - Notify stakeholders
   - Post on social media if extended

3. **Resolution**:
   - Identify root cause
   - Coordinate with platform support if needed
   - Implement fix or rollback
   - Verify restoration

### Data Loss Incident

1. **Stop Operations**:
   - Disable write operations
   - Preserve current state

2. **Assess Damage**:
   ```bash
   # Check database state
   psql $DATABASE_URL

   # Identify missing/corrupted data
   ```

3. **Restore from Backup**:
   ```bash
   # List available backups
   ls -lh backups/

   # Restore database
   ./scripts/db/restore.sh
   ```

4. **Verify Restoration**:
   - Test data integrity
   - Verify application functionality
   - Document data loss scope

### Security Breach

1. **Immediate Containment**:
   ```bash
   # Disable compromised access
   # Rotate all secrets immediately
   # Enable IP blocking if applicable
   ```

2. **Assessment**:
   - Identify breach scope
   - Check audit logs
   - Determine data exposure

3. **Recovery**:
   - Close security vulnerabilities
   - Deploy security patches
   - Reset all credentials
   - Notify affected users

4. **Post-Incident**:
   - Security audit
   - Update security measures
   - Document lessons learned
   - Compliance reporting if required

---

## Monitoring & Alerts

### Key Metrics to Watch

**Application Health**:
- Error rate: < 0.1%
- Response time (p95): < 500ms
- Availability: > 99.9%

**Infrastructure**:
- CPU usage: < 70%
- Memory usage: < 80%
- Database connections: < 80% of pool

**Business Metrics**:
- API calls per minute
- User sessions
- Conversion events

### Alert Configuration

**Sentry Alerts**:
- New error in production: Immediate
- Error spike (>10 in 5 min): Immediate
- Performance degradation: 15 min delay

**Vercel Alerts**:
- Deployment failure: Immediate
- Build time > 5 minutes: Warning
- Bandwidth spike: Daily summary

**Database Alerts**:
- Connection pool > 80%: Warning
- Slow query (> 1s): Daily summary
- Disk usage > 85%: Immediate

---

## Useful Commands

### Deployment
```bash
# Deploy to production
vercel --prod

# Deploy backend
railway up

# Rollback frontend
vercel rollback [url]

# Rollback backend
railway rollback [id]
```

### Database
```bash
# Connect to database
psql $DATABASE_URL

# Run migrations
npx prisma migrate deploy

# Create backup
./scripts/db/backup.sh

# Restore backup
./scripts/db/restore.sh
```

### Monitoring
```bash
# Health check
node scripts/monitoring/health-check.js

# View logs (frontend)
vercel logs --follow

# View logs (backend)
railway logs --tail 100

# Check deployment status
vercel list
railway status
```

### Debugging
```bash
# Test API endpoint
curl -v https://api.mattia-portfolio.com/health

# Check environment variables
vercel env ls

# Pull environment to local
vercel env pull .env.local

# Test build locally
npm run build
```

---

## Contact Information

**On-Call Escalation**:
1. Primary: [Contact Info]
2. Secondary: [Contact Info]
3. Platform Support: See Quick Links

**External Dependencies**:
- Vercel Support: support@vercel.com
- Railway Support: team@railway.app
- Cloudflare Support: https://dash.cloudflare.com/support

---

## Documentation Updates

This runbook should be updated:
- After each major incident
- When operational procedures change
- After infrastructure modifications
- Quarterly review minimum

Last updated: 2025-11-04
