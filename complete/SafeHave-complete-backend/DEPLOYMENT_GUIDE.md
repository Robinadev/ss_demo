# Deployment Guide - Violence Reporting Platform

Complete guide to deploy your application to production with Supabase PostgreSQL backend.

---

## Table of Contents

1. [Quick Deployment (15 minutes)](#quick-deployment)
2. [Environment Setup](#environment-setup)
3. [Deploy Backend](#deploy-backend)
4. [Deploy Frontend](#deploy-frontend)
5. [Production Configuration](#production-configuration)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Quick Deployment

### Option 1: Vercel (Recommended - Easiest)

**Frontend + Backend deployment in one platform**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy frontend
cd frontend
vercel

# 3. Deploy backend
cd ../backend
vercel

# Both will prompt for settings - select appropriate options
```

### Option 2: Docker + Railway/Render

```bash
# 1. Build Docker image
docker build -t violence-reporting-backend:latest .

# 2. Push to Docker Hub
docker push yourusername/violence-reporting-backend:latest

# 3. Deploy on Railway/Render (import from GitHub)
```

### Option 3: Manual AWS/Google Cloud

See detailed section below.

---

## Environment Setup

### 1. Update Production Supabase Connection

```bash
# backend/.env.production

# Supabase (Production)
POSTGRES_PRISMA_URL=postgresql://postgres:PROD_PASSWORD@db.your-project.supabase.co:6543/postgres?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://postgres:PROD_PASSWORD@db.your-project.supabase.co:5432/postgres?sslmode=require
DATABASE_URL=$POSTGRES_PRISMA_URL

# Security
JWT_SECRET=your-production-jwt-secret-min-32-chars
JWT_EXPIRATION=24h
NODE_ENV=production

# App Config
APP_PORT=3001
FRONTEND_URL=https://your-domain.com

# Logging
LOG_LEVEL=error
```

### 2. Frontend Environment

```bash
# frontend/.env.production

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# Optional
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXX
```

---

## Deploy Backend

### Vercel Deployment

```bash
cd backend

# 1. Connect to Git
git init
git add .
git commit -m "Initial backend commit"
git push -u origin main

# 2. Create Vercel project
vercel --prod

# 3. Add environment variables in Vercel dashboard
# Settings → Environment Variables

# 4. Run migrations
vercel env pull  # Get env vars locally
npm run prisma:migrate

# 5. Deploy
vercel --prod
```

### Railway Deployment

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Create project
railway init

# 4. Link Supabase
railway link --project <project-id>

# 5. Set variables
railway variables set POSTGRES_PRISMA_URL=...
railway variables set JWT_SECRET=...

# 6. Deploy
railway up
```

### AWS Lambda Deployment

```bash
# 1. Install AWS CLI
npm install -g aws-cli

# 2. Build for Lambda
npm run build

# 3. Create Lambda function
# Using AWS Console or CLI

# 4. Upload code
# Option A: Direct upload
# Option B: S3 + CloudFormation

# 5. Set environment variables in Lambda console

# 6. Create API Gateway
# Associate with Lambda function
```

---

## Deploy Frontend

### Vercel Deployment (Recommended)

```bash
cd frontend

# 1. Push to GitHub
git add .
git commit -m "Initial frontend commit"
git push -u origin main

# 2. Import to Vercel
# Go to vercel.com → Import → Select GitHub repo

# 3. Configure
# Framework: Next.js
# Root directory: ./frontend
# Environment: Set your env vars

# 4. Deploy
# Vercel automatically deploys on git push
```

### Netlify Deployment

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Build
npm run build

# 4. Deploy
netlify deploy --prod --dir=.next
```

### Custom Domain

```bash
# In Vercel/Netlify dashboard:
# 1. Go to Settings → Domains
# 2. Add custom domain
# 3. Update DNS records:
#    - CNAME: your-domain.com → your-project.vercel.app
#    - TXT: verification record
# 4. Wait for DNS propagation (5-48 hours)
```

---

## Production Configuration

### 1. Database Optimization

```sql
-- Run in Supabase SQL Editor

-- Add indexes for common queries
CREATE INDEX CONCURRENTLY idx_reports_status_severity 
ON reports(status, severity DESC);

CREATE INDEX CONCURRENTLY idx_cases_professional_status 
ON case_assignments(assigned_to_id, status);

-- Enable full-text search
CREATE INDEX CONCURRENTLY idx_reports_description 
ON reports USING GIN(to_tsvector('english', description));

-- Monitor index usage
SELECT * FROM pg_stat_user_indexes ORDER BY idx_scan DESC;
```

### 2. Connection Pooling

In Supabase Dashboard:
- **Settings** → **Database** → **Connection Pooling**
- Pool mode: `Transaction` (for web apps)
- Pool size: `15-20` (adjust based on traffic)

### 3. Security Configuration

```bash
# backend/.env.production

# CORS Settings
CORS_ORIGIN=https://your-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW=15  # minutes
RATE_LIMIT_MAX_REQUESTS=100

# Session Security
SESSION_SECRET=your-session-secret
SESSION_TIMEOUT=3600  # 1 hour

# Audit Logging
ENABLE_AUDIT_LOG=true
```

### 4. SSL/TLS Certificates

Vercel handles automatically. For custom deployments:

```bash
# Using Let's Encrypt
certbot certonly --webroot -w /var/www/html -d your-domain.com

# Or in Docker
# Use Nginx with auto-SSL
```

### 5. Enable WAF (Optional)

Vercel has built-in DDoS protection. For additional security:

- Cloudflare Free Plan
- AWS WAF
- Imperva

---

## Monitoring & Maintenance

### Application Monitoring

```bash
# 1. View logs in Vercel
vercel logs <deployment-url>

# 2. Monitor with Sentry (free tier)
npm install @sentry/nestjs

# 3. Track errors
import * as Sentry from "@sentry/nestjs";
Sentry.init({ dsn: "https://..." });
```

### Database Monitoring

Supabase Dashboard:
- **Database** → **Connections** (monitor pool)
- **Database** → **Bandwidth** (track usage)
- **Logs** → **Query Stats** (slow queries)
- **Backups** (automatic daily)

### Performance Monitoring

```bash
# Monitor API response times
curl -w "@curl-format.txt" https://api.your-domain.com/api/reports

# Check database query performance
# In Supabase: SQL Editor → Explain analyze
EXPLAIN ANALYZE SELECT * FROM reports WHERE status = 'PENDING_REVIEW';
```

### Automated Backups

```bash
# Supabase: Automatic daily backups included
# Manual backup:
pg_dump "postgresql://..." > backup.sql

# Restore from backup:
psql "postgresql://..." < backup.sql
```

---

## Scaling for High Traffic

### 1. Database Replication

```bash
# In Supabase Settings:
# Database → Replicas → Create read replica
# Use for analytics queries to avoid impacting main database
```

### 2. Caching Layer

```bash
# Add Redis for session storage
npm install redis

# Cache frequently accessed data
const cacheKey = `reports:${reportId}`;
const cached = await redis.get(cacheKey);
```

### 3. Load Balancing

```bash
# Vercel handles automatically with serverless functions
# For custom deployments:
# - AWS ALB (Application Load Balancer)
# - Nginx load balancer
# - Docker Swarm / Kubernetes
```

### 4. CDN Configuration

```bash
# Images and static assets
# Configure in Vercel Settings → Domains → CDN
# Or use Cloudflare with Supabase
```

---

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql "postgresql://..." -c "SELECT 1;"

# Check connection pool
SELECT * FROM pg_stat_activity;

# Reset pool (if stuck)
# In Supabase: Settings → Database → Reset
```

### 502 Bad Gateway

```bash
# Check backend logs
vercel logs <backend-url>

# Verify database connection
echo $POSTGRES_PRISMA_URL

# Restart function
vercel redeploy

# Check Supabase status
# supabase.com/status
```

### Slow Queries

```sql
-- Find slow queries in Supabase Logs
SELECT * FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;

-- Add missing indexes
CREATE INDEX idx_reports_category 
ON reports(category);
```

### CORS Errors

```bash
# Update backend .env
CORS_ORIGIN=https://your-domain.com

# Or allow multiple origins
CORS_ORIGIN="https://your-domain.com,https://www.your-domain.com"

# Redeploy backend
vercel deploy --prod
```

---

## Post-Deployment Checklist

- [ ] Verify database migrations ran successfully
- [ ] Test user registration and login
- [ ] Test report submission
- [ ] Test ML classification
- [ ] Verify email notifications work
- [ ] Check admin dashboard loads
- [ ] Test file uploads
- [ ] Verify API rate limiting
- [ ] Monitor database connections
- [ ] Set up error tracking (Sentry)
- [ ] Configure monitoring alerts
- [ ] Set up automated backups
- [ ] Test disaster recovery
- [ ] Document deployment steps
- [ ] Brief team on new environment

---

## Maintenance Schedule

### Daily
- Monitor error logs
- Check database connection pool
- Review critical alerts

### Weekly
- Review slow query logs
- Check disk usage
- Test backup restoration

### Monthly
- Update dependencies
- Security patches
- Performance optimization
- Capacity planning

### Quarterly
- Database optimization
- Load testing
- Security audit
- Disaster recovery drill

---

## Rollback Procedure

```bash
# If deployment has issues:

# 1. View deployment history
vercel deployments

# 2. Rollback to previous version
vercel rollback <deployment-id>

# 3. For database issues:
# Restore from automated backup in Supabase

# 4. Notify team and users
# Post status update
```

---

## Cost Optimization

### Supabase
- **Free tier**: Perfect for testing
- **Pro tier**: $25/month, good for production
- Estimated cost for 10,000 MAU: $25-100/month

### Vercel
- **Free tier**: Limited
- **Pro tier**: $20/month per team
- Estimated cost: $20-50/month for production

### Total Estimated Monthly Cost
- Supabase Pro: $25
- Vercel Pro: $20
- Custom domain: $12
- **Total: ~$57/month** (excludes high-traffic costs)

---

## Support & Resources

- **Vercel Support**: https://vercel.com/help
- **Supabase Support**: https://supabase.com/support
- **NestJS Deployment**: https://docs.nestjs.com/deployment
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Deployment successfully completed!** Your platform is now live. 🚀

For issues or questions, check the troubleshooting section or contact support.
