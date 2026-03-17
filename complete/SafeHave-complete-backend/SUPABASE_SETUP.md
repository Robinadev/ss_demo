# Supabase Setup & Configuration Guide

## Quick Start (5 Minutes)

This guide walks you through connecting your NestJS backend to Supabase PostgreSQL.

### Prerequisites
- Supabase account (https://supabase.com)
- Node.js 18+
- npm or yarn

---

## Step 1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click **"New Project"**
3. Choose a name (e.g., "violence-reporting-db")
4. Select your region (closest to your users)
5. Set a strong database password
6. Click **"Create new project"** (takes ~2 minutes)

---

## Step 2: Get Database Connection Details

Once your project is created:

1. Go to **Settings** → **Database**
2. Find the connection strings section
3. Copy these values:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret

# For direct PostgreSQL connections:
POSTGRES_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres?sslmode=require
POSTGRES_PRISMA_URL=postgresql://postgres:password@db.your-project.supabase.co:6543/postgres?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres?sslmode=require
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DATABASE=postgres
POSTGRES_HOST=db.your-project.supabase.co
```

---

## Step 3: Configure Environment Variables

### 3a. Backend Configuration

Create `/backend/.env`:

```bash
# Database (Supabase)
POSTGRES_PRISMA_URL=postgresql://postgres:YOUR_PASSWORD@db.your-project.supabase.co:6543/postgres?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://postgres:YOUR_PASSWORD@db.your-project.supabase.co:5432/postgres?sslmode=require
DATABASE_URL=$POSTGRES_PRISMA_URL

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long-here
JWT_EXPIRATION=24h

# App
NODE_ENV=development
APP_PORT=3001
FRONTEND_URL=http://localhost:3000

# ML Classification
CLASSIFICATION_CONFIDENCE_THRESHOLD=0.7

# Logging
LOG_LEVEL=debug
```

### 3b. Frontend Configuration

Create `/frontend/.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Step 4: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## Step 5: Run Database Migrations

### Option A: Using Prisma CLI (Recommended)

```bash
cd backend

# Generate Prisma client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

### Option B: Using Init Script

```bash
cd backend
npm run prisma:generate
npx ts-node scripts/init-supabase.ts
```

### Option C: Manual Setup

```bash
cd backend

# Push schema to Supabase
npm run prisma:db:push

# Run seed data
npm run prisma:seed
```

---

## Step 6: Verify Database Connection

```bash
# Check Prisma can connect
npm run prisma:studio

# Should open Prisma Studio at http://localhost:5555
```

---

## Step 7: Start Backend Server

```bash
cd backend
npm run start:dev

# Should output:
# 🚀 Server running on http://localhost:3001
# ✅ Database connected to Supabase
```

---

## Step 8: Start Frontend

```bash
cd frontend
npm run dev

# Should start on http://localhost:3000
```

---

## Database Schema Overview

Your Supabase database will have these tables:

### Core Tables
- **users** - User accounts (survivors, professionals, admins)
- **reports** - Incident reports with ML classification
- **evidence** - Attachments and files for reports
- **case_assignments** - Case routing to professionals
- **case_comments** - Communication within cases

### Professional Directory
- **service_providers** - Counselors, doctors, lawyers
- **service_provider_reviews** - Ratings and feedback

### User Support
- **support_requests** - Direct requests for help
- **case_feedback** - Feedback after case resolution

### Community
- **forum_posts** - Discussion forum posts
- **forum_comments** - Comments on forum posts

### Additional
- **analytics_snapshots** - Daily statistics
- **audit_logs** - System audit trail
- **missing_person** - Missing person reports
- **ml_training_data** - ML model training data

---

## Troubleshooting

### Connection Error: "ECONNREFUSED"

**Problem**: Cannot connect to database

**Solution**:
1. Verify POSTGRES_PRISMA_URL is correct
2. Check IP is whitelisted (usually auto-allowed)
3. Ensure password doesn't have special characters (or use URL encoding)

```bash
# Test connection
psql "postgresql://postgres:password@db.your-project.supabase.co:5432/postgres?sslmode=require"
```

### Migration Fails

**Problem**: "Relation does not exist"

**Solution**:
```bash
# Force reset (WARNING: deletes all data)
npm run db:reset

# Rerun migrations
npm run prisma:migrate
```

### Prisma Studio Won't Connect

**Problem**: "Could not connect to database"

**Solution**:
```bash
# Use non-pooling URL for Studio
export POSTGRES_URL_NON_POOLING=postgresql://...

# Try again
npm run prisma:studio
```

### Slow Queries

**Problem**: API responses are slow

**Solution**:
1. Use POSTGRES_PRISMA_URL (has connection pooling)
2. Check indexes are created:
   ```sql
   SELECT * FROM pg_indexes WHERE schemaname = 'public';
   ```
3. Monitor in Supabase Dashboard → Database → Connections

---

## Performance Tips

### 1. Connection Pooling
- Always use `POSTGRES_PRISMA_URL` (has PgBouncer pooling)
- For migrations, use `POSTGRES_URL_NON_POOLING`

### 2. Database Indexes
All tables have indexes on frequently queried fields:
- Reports: status, category, severity, createdAt
- Users: email, role
- CaseAssignments: reportId, assignedToId, status

### 3. Query Optimization
The backend automatically:
- Paginates large result sets
- Uses database-level filtering
- Caches classification results
- Enables query logging in development

### 4. Monitoring
Monitor in Supabase Dashboard:
- Database → Connections (check pooling)
- SQL Editor → Recent queries
- Database → Network → Bandwidth

---

## Security Best Practices

### 1. Environment Variables
✅ Never commit `.env` files  
✅ Use strong JWT_SECRET (min 32 chars)  
✅ Rotate passwords regularly  

### 2. Database Access
✅ Keep POSTGRES_URL private  
✅ Use service role key only for backend  
✅ Use anon key for frontend auth  

### 3. Row Level Security
- Enable RLS for sensitive tables
- Add policies in Supabase Dashboard

```sql
-- Example: Users can only see their own reports
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_see_own_reports" ON reports
FOR SELECT USING (auth.uid() = reporter_id OR is_anonymous = false);
```

### 4. Backups
- Supabase auto-backs up daily
- Manual backup before major changes:
  ```bash
  npm run db:reset  # Creates backup before reset
  ```

---

## Deployment to Production

### Vercel Deployment

1. **Connect GitHub**
```bash
git remote add origin https://github.com/yourname/repo.git
git push -u origin main
```

2. **Create Vercel Project**
- Go to vercel.com
- Import GitHub repository
- Select frontend directory: `./frontend`

3. **Set Environment Variables**
- Go to Settings → Environment Variables
- Add all variables from `.env.local`

4. **Deploy Backend**
Option A: Deploy to Railway, Render, or Heroku
Option B: Deploy to AWS Lambda or Google Cloud Run

Example Railway deployment:
```bash
railway link
railway up
```

### Scale for Production

```bash
# Increase connection pool
# In Supabase: Settings → Database → Connection Pooling
# Set pool size to 10-20 for production

# Add database replicas for read-heavy workloads
# In Supabase: Settings → Database → Replicas
```

---

## Monitoring & Debugging

### View Database Logs
```bash
# Supabase Dashboard → Logs
# Filter by:
# - Database slow queries
# - Connection errors
# - Failed authentications
```

### Monitor Backend Logs
```bash
# With docker
docker logs violence-reporting-backend

# Or tail from Vercel
vercel logs --tail
```

### Performance Testing
```bash
# Load test your API
npx autocannon http://localhost:3001/api/health

# Check response times
curl -w "@curl-format.txt" http://localhost:3001/api/reports
```

---

## Next Steps

After setup:
1. ✅ Run `npm run start:dev` in backend
2. ✅ Run `npm run dev` in frontend
3. ✅ Visit http://localhost:3000
4. ✅ Login with admin@violencereporting.org
5. ✅ Read BACKEND_INTEGRATION.md for frontend API usage

---

## Additional Resources

- Supabase Docs: https://supabase.com/docs
- Prisma Docs: https://www.prisma.io/docs
- PostgreSQL Docs: https://www.postgresql.org/docs
- NestJS Docs: https://docs.nestjs.com

---

**Questions?** Check the troubleshooting section or open an issue on GitHub.
