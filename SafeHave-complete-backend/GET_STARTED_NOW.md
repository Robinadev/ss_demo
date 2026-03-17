# GET STARTED IN 5 MINUTES

Quick start guide to run your Violence Reporting Platform locally.

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Supabase account (free at supabase.com)
- 5 minutes ⏱️

---

## Step 1: Get Supabase Connection String (2 min)

1. Go to https://app.supabase.com
2. Create new project OR use existing
3. Go to **Settings** → **Database**
4. Copy the connection string:
   ```
   postgresql://postgres:PASSWORD@db.your-project.supabase.co:6543/postgres?pgbouncer=true
   ```

---

## Step 2: Configure Backend (1 min)

```bash
cd backend
cp .env.example .env

# Edit .env and paste your Supabase connection string:
POSTGRES_PRISMA_URL=postgresql://postgres:PASSWORD@db.your-project.supabase.co:6543/postgres?pgbouncer=true
```

---

## Step 3: Setup Database (1 min)

```bash
# From backend/ directory
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

---

## Step 4: Start Server (1 min)

```bash
npm run start:dev

# You should see:
# ✅ Server running on http://localhost:3001
# ✅ Swagger docs at http://localhost:3001/api/docs
```

---

## Done! 🎉

Your backend is live with:
- ✅ PostgreSQL database on Supabase
- ✅ ML-powered classification
- ✅ 42 API endpoints
- ✅ Admin user ready (admin@violencereporting.org / Admin@123!)

---

## Test the System

### 1. Open Swagger UI
```
http://localhost:3001/api/docs
```

### 2. Login
```
POST /auth/login
{
  "email": "admin@violencereporting.org",
  "password": "Admin@123!"
}

Copy the token from response
```

### 3. Submit a Test Report
```
POST /reports
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "title": "Test Report",
  "description": "My supervisor hit me at work",
  "isAnonymous": false,
  "language": "en"
}
```

### 4. See ML Classification
The system automatically:
- Analyzes your text
- Detects "WORKPLACE_ABUSE"
- Routes to counselor
- Calculates risk score

---

## Next: Connect Frontend

See `BACKEND_INTEGRATION.md` to connect your frontend dashboard.

---

## Useful Commands

```bash
# Start development server
npm run start:dev

# View database
npm run prisma:studio  # Opens GUI at localhost:5555

# Run migrations
npm run prisma:migrate

# Seed sample data
npm run prisma:seed

# Generate Prisma client
npm run prisma:generate

# Reset database (warning: deletes all data)
npm run db:reset

# View logs
npm run logs

# Build for production
npm run build

# Start production
npm run start:prod
```

---

## Troubleshooting

### "Cannot connect to database"
- Check `POSTGRES_PRISMA_URL` in `.env`
- Verify Supabase project is running
- Test: `npm run prisma:studio`

### "Migration failed"
- Run: `npm run db:reset`
- Then: `npm run prisma:migrate`

### "No route handlers"
- Run: `npm run prisma:generate`
- Restart: `npm run start:dev`

### Swagger not loading
- Check port 3001 is free
- Run: `npm run start:dev` in backend directory
- Visit: `http://localhost:3001/api/docs`

---

## What You Have

### Database (15 Tables)
- Users (7 roles)
- Reports (with ML)
- Cases & Comments
- Professionals
- Analytics
- Audit logs

### API (42 Endpoints)
- Auth (3)
- Reports (8)
- Classification (4)
- Cases (6)
- Professionals (6)
- Analytics (5)
- Plus 10+ more

### Features
- Multi-language (English, Amharic)
- ML classification (13 categories)
- Automatic routing
- Risk detection
- Audit logging
- JWT security

---

## Documentation

Read in this order:
1. **This file** ← You are here
2. `SUPABASE_INTEGRATION_COMPLETE.md` - Full details
3. `BACKEND_INTEGRATION.md` - Frontend setup
4. `DEPLOYMENT_GUIDE.md` - Deploy to production
5. `SUPABASE_SETUP.md` - Advanced Supabase config

---

## Need Help?

- Check troubleshooting section above
- Read `backend/README.md`
- View Swagger docs at http://localhost:3001/api/docs
- Check logs: `npm run logs`

---

**You're all set! Start building.** 🚀

```bash
npm run start:dev
# Then visit http://localhost:3001/api/docs
```
