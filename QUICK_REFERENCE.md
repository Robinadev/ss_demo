# Quick Reference - Getting Started

## 🚀 Start Here

### Option 1: Automated Startup (Recommended)

**Linux/macOS:**
```bash
chmod +x start-development.sh
./start-development.sh
```

**Windows:**
```batch
start-development.bat
```

Then select option 3 to start both frontend and backend.

### Option 2: Manual Startup

**Set environment variables first:**

```bash
# Linux/macOS
export BROWSER=none
export CI=true

# Windows PowerShell
$env:BROWSER='none'
$env:CI='true'

# Windows CMD
set BROWSER=none
set CI=true
```

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Option 3: One Command (if concurrently is installed)

```bash
npm run dev:all
```

---

## 🔧 Setup & Configuration

### First Time Setup

```bash
# 1. Install root dependencies
npm install

# 2. Configure environment files
cp .env.local.example .env.local
cp backend/.env.example backend/.env

# 3. Edit environment files with your Supabase credentials
# Update DATABASE_URL in backend/.env

# 4. Initialize backend
cd backend
npm install
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
cd ..
```

### Initialize Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
safehaven/
├── app/                    # Next.js app (frontend)
├── backend/               # NestJS backend
│   ├── src/
│   │   ├── modules/      # Feature modules
│   │   ├── database/     # Prisma & database
│   │   └── main.ts       # Entry point
│   └── prisma/           # Database schema
├── frontend/             # React frontend
├── lib/                  # Shared utilities
├── scripts/              # Automation scripts
└── package.json          # Root monorepo config
```

---

## 🔑 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=SafeHaven
```

### Backend (backend/.env)
```
DATABASE_URL=postgresql://user:password@host/db
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

---

## 🚨 Common Issues & Solutions

### "xdg-open ENOENT" Error
✅ Fixed! This error is now handled automatically.

See `FIX_XDG_OPEN_ERROR.md` for details.

### "Cannot find module" Errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Failed
1. Check `DATABASE_URL` in `backend/.env`
2. Verify Supabase credentials
3. Ensure database is running
4. Test connection: `npx prisma db execute --stdin < test.sql`

### Port Already in Use
```bash
# Backend on different port
PORT=3002 npm run dev

# Frontend on different port
npm run dev -- -p 3001
```

---

## 📊 Available Endpoints

### Backend API (Running on http://localhost:3001)
- `GET /api/health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh token
- `GET /reports` - List all reports
- `POST /reports` - Create new report
- API Docs: `GET /api/docs` - Swagger UI

### Frontend (Running on http://localhost:3000)
- Dashboard, Profile, Reports
- Role-based pages (Survivor, Counselor, Medical, Legal, Admin)

---

## 🧪 Testing

### Test Backend API
```bash
curl http://localhost:3001/api/health

# With authentication
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/reports
```

### Test Database Connection
```bash
cd backend
npx prisma studio  # Opens Prisma Studio to view database
```

### Test Frontend
```bash
# Check frontend is running
curl http://localhost:3000
```

---

## 🔐 Test Credentials

After database seeding:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@platform.com | Admin@123456 |
| Counselor | counselor1@platform.com | Counselor@123456 |
| Doctor | doctor1@platform.com | Medical@123456 |
| Lawyer | lawyer1@platform.com | Legal@123456 |

---

## 📝 Useful Commands

### Backend Commands
```bash
cd backend

npm run dev              # Start development server
npm run build           # Build for production
npm run start:prod      # Run production build
npm run lint            # Run linter
npm run test            # Run tests
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Create/run migrations
npm run prisma:seed     # Seed database
npm run db:reset        # Reset database
```

### Frontend Commands
```bash
cd frontend

npm run dev             # Start development server
npm run build          # Build for production
npm run lint           # Run linter
npm run type-check    # Check TypeScript types
```

### Root Commands
```bash
npm run dev:all       # Start both backend and frontend
npm run build:all     # Build both
npm run test          # Test both
npm run lint          # Lint both
```

---

## 🐛 Debug Mode

### Enable Debug Logging
```bash
# Linux/macOS
DEBUG=* npm run dev

# Windows PowerShell
$env:DEBUG='*'
npm run dev
```

### View Database Directly
```bash
cd backend
npx prisma studio
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `QUICK_REFERENCE.md` | This file - quick start guide |
| `ERROR_FIXES_APPLIED.md` | Details on xdg-open error fix |
| `FIX_XDG_OPEN_ERROR.md` | Troubleshooting browser opening errors |
| `TROUBLESHOOTING.md` | General troubleshooting |
| `GITHUB_SETUP.md` | GitHub & Vercel setup |
| `DEPLOYMENT_CHECKLIST.md` | Production deployment |

---

## 🚢 Deployment

### Deploy to Vercel

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

See `GITHUB_SETUP.md` for detailed instructions.

---

## ✅ Next Steps

1. ✅ Run `./start-development.sh` or `start-development.bat`
2. ✅ Visit http://localhost:3000 for frontend
3. ✅ Visit http://localhost:3001/api/docs for API docs
4. ✅ Login with test credentials (see above)
5. ✅ Start developing!

---

## 💡 Tips

- Keep terminal windows open for both backend and frontend during development
- Use `npm run dev:all` if you have concurrently installed
- Check `.env` files if things aren't working
- Clear browser cache if frontend behaves strangely
- Restart servers if you make environment variable changes
- Use Prisma Studio to inspect database: `npx prisma studio`

---

**For more detailed guides, see the documentation index or the specific guide files.**
