# Quick Start - SafeHaven Platform

## 5-Minute Setup

### 1. Install Dependencies (2 minutes)

```bash
cd complete/SafeHave-complete-backend

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

### 2. Configure Environment (1 minute)

**Backend** - Create `backend/.env`:
```env
DATABASE_URL=your-supabase-connection-string
JWT_SECRET=your-jwt-secret-key-min-32-chars
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend** - Create `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:3001/api/v1
```

### 3. Initialize Database (1 minute)

```bash
cd backend
npm run db:init
cd ..
```

### 4. Start Services (1 minute)

**Terminal 1 - Backend**:
```bash
cd backend
npm run start:dev
# Wait for: "Server running on port 3001"
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
# Wait for: "Local: http://localhost:3000"
```

## Access the App

- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:3001/api/v1/docs
- **Database Browser**: `npm run prisma:studio` (from backend dir)

## Test Login

- Email: survivor@safehaven.com
- Password: survivor123

## What's Running

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:3000 | React SPA |
| Backend API | http://localhost:3001/api/v1 | NestJS REST |
| Swagger Docs | http://localhost:3001/api/v1/docs | API Documentation |
| Prisma Studio | http://localhost:5555 | Database Browser |

## Troubleshooting

**`vite: command not found`**
```bash
cd frontend && npm install
```

**Database connection error**
- Check DATABASE_URL in backend/.env
- Verify Supabase project is running
- Ensure password is correct

**Port in use**
```bash
# Change in backend/.env
PORT=3002
```

## Next Steps

1. Create an incident report: http://localhost:3000
2. View API in Swagger: http://localhost:3001/api/v1/docs
3. Check database: `npm run prisma:studio` (backend dir)
4. Modify code and see hot-reload

## Full Documentation

See `complete/SafeHave-complete-backend/SETUP_INSTRUCTIONS.md` for detailed setup, troubleshooting, and advanced configuration.

---

**Ready to go!** Your SafeHaven platform is running locally.
