# SafeHaven Platform - Quick Start Guide

## Setup (5 minutes)

```bash
# 1. Install all dependencies
npm run install:all

# 2. Copy environment templates (if not exists)
cp complete/SafeHave-complete-backend/backend/.env.example complete/SafeHave-complete-backend/backend/.env
cp complete/SafeHave-complete-backend/frontend/.env.example complete/SafeHave-complete-backend/frontend/.env.local

# 3. Initialize database
npm run db:setup
```

## Start Development

```bash
# Terminal 1 - Backend API (http://localhost:3001)
npm run dev:backend

# Terminal 2 - Frontend SPA (http://localhost:3000)
npm run dev:frontend
```

## Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React application |
| Backend | http://localhost:3001 | REST API |
| API Docs | http://localhost:3001/api/docs | Swagger UI |

## Environment Variables

### Backend: `complete/SafeHave-complete-backend/backend/.env`
```
DATABASE_URL=postgresql://user:password@localhost:5432/database
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=24h
PORT=3001
NODE_ENV=development
```

### Frontend: `complete/SafeHave-complete-backend/frontend/.env.local`
```
VITE_API_URL=http://localhost:3001/api
```

## Common Commands

```bash
# Development
npm run dev:backend      # Start backend
npm run dev:frontend     # Start frontend

# Database
npm run db:setup         # Initialize & seed database
npm run db:reset         # Reset database
npm run db:seed          # Seed test data

# Building
npm run build            # Build for production
npm run clean            # Clean build artifacts

# Code Quality
npm run lint             # Run linter
npm run format           # Format code
npm run test             # Run tests
```

## Project Structure

```
complete/SafeHave-complete-backend/
├── backend/
│   ├── src/
│   │   ├── modules/      ← 8 feature modules
│   │   ├── common/       ← Shared utilities
│   │   └── main.ts
│   └── prisma/           ← Database
├── frontend/
│   ├── src/
│   │   ├── pages/        ← 5 main pages
│   │   ├── components/   ← Reusable components
│   │   ├── services/     ← API client
│   │   └── contexts/     ← Auth context
│   └── package.json
└── README.md             ← Full documentation
```

## Features

### Authentication
- User registration
- Login with JWT
- Automatic token refresh
- Logout

### Reports
- Create incident reports
- View your reports
- Update reports
- Delete reports

### Dashboard
- User dashboard
- Analytics

### Professional Directory
- Browse professionals
- View reviews

### Admin Features
- Manage cases
- Assign professionals
- View analytics

## API Endpoints

### Authentication
```
POST   /auth/register        Register new user
POST   /auth/login           Login user
POST   /auth/refresh         Refresh JWT token
GET    /auth/me              Get current user
```

### Reports
```
POST   /reports              Create report
GET    /reports              List reports
GET    /reports/:id          Get report details
PUT    /reports/:id          Update report
DELETE /reports/:id          Delete report
```

### Classification
```
POST   /classification/classify    Classify report
```

### Cases
```
GET    /cases                Get cases
GET    /cases/:id            Get case details
PUT    /cases/:id            Update case
```

### Analytics
```
GET    /analytics/dashboard  Get dashboard stats
```

### Professionals
```
GET    /professionals        List professionals
GET    /professionals/:id    Get professional
```

## Default Test Credentials

After running `npm run db:setup`, the database is seeded with:

| Role | Email | Password |
|------|-------|----------|
| Survivor | survivor@test.com | password123 |
| Counselor | counselor@test.com | password123 |
| Admin | admin@test.com | password123 |

## Troubleshooting

### Port Already in Use
```bash
# Change port in backend/.env
PORT=3002

# Change port in frontend/vite.config.ts
server: { port: 3001 }
```

### Database Connection Error
```bash
# Verify DATABASE_URL in .env
# Ensure PostgreSQL is running
# Check Supabase credentials
```

### CORS Error
```bash
# Verify VITE_API_URL in frontend/.env.local
# Should match backend URL
# Check backend CORS configuration
```

### Token Refresh Issues
```bash
# Clear localStorage
# Login again
# Check JWT_SECRET in backend/.env
```

## Documentation

Full documentation available in:
- `/complete/SafeHave-complete-backend/README.md` - Complete documentation
- `/complete/SafeHave-complete-backend/backend/README.md` - Backend details
- `http://localhost:3001/api/docs` - API documentation

## Next Steps

1. Install dependencies: `npm run install:all`
2. Setup database: `npm run db:setup`
3. Start backend: `npm run dev:backend`
4. Start frontend: `npm run dev:frontend`
5. Open browser: `http://localhost:3000`
6. Login with test credentials
7. Explore features

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS 10.4 |
| Database | PostgreSQL via Prisma |
| Frontend | React 18.2 |
| Build Tool | Vite 5.0 |
| State Management | React Context + React Query |
| HTTP Client | Axios 1.6 |
| Language | TypeScript 5.3 |

## Contact & Support

For issues:
1. Check documentation files
2. Review error messages
3. Check API docs at `/api/docs`
4. Verify environment variables

For questions:
- Review `/complete/SafeHave-complete-backend/README.md`
- Check API documentation
- Review code comments

---

**Status**: Ready to use ✓
**All code consolidated in `/complete` directory**
**No duplicates - clean, professional structure**
