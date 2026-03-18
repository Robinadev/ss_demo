# SafeHaven Complete Setup Guide

This guide covers the consolidated monorepo structure with both frontend and backend in the `complete/SafeHave-complete-backend` directory.

## Quick Start (5 minutes)

```bash
# 1. Install all dependencies
npm run install:all

# 2. Setup environment variables
# Backend: create complete/SafeHave-complete-backend/backend/.env
# Frontend: create complete/SafeHave-complete-backend/frontend/.env.local

# 3. Initialize database
npm run db:setup

# 4. Run in development mode
# Terminal 1:
npm run dev:backend

# Terminal 2:
npm run dev:frontend
```

## Directory Structure Explanation

### All code is consolidated under:
```
complete/SafeHave-complete-backend/
├── backend/          # NestJS API server
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/              # Authentication & JWT
│   │   │   ├── reports/           # Report management
│   │   │   ├── classification/    # ML classification
│   │   │   ├── cases/             # Case management
│   │   │   ├── professionals/     # Professional directory
│   │   │   ├── analytics/         # Analytics dashboard
│   │   │   ├── forum/             # Forum discussions
│   │   │   └── support/           # Support system
│   │   └── common/                # Shared utilities
│   ├── prisma/                    # Database schema & migrations
│   └── package.json
│
└── frontend/         # React SPA client
    ├── src/
    │   ├── pages/                 # Page components
    │   ├── components/            # Reusable components
    │   ├── contexts/              # React contexts
    │   ├── services/              # API client
    │   └── App.tsx                # Main app
    └── package.json
```

## Environment Setup

### Backend (.env)
Create `complete/SafeHave-complete-backend/backend/.env`:

```env
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/safehaven
PORT=3001
JWT_SECRET=your_secure_random_secret_key_here
JWT_REFRESH_SECRET=your_secure_random_refresh_secret_key
JWT_EXPIRATION=24h
JWT_REFRESH_EXPIRATION=7d
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

### Frontend (.env.local)
Create `complete/SafeHave-complete-backend/frontend/.env.local`:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development
```

## Database Setup with Supabase

1. Create a Supabase project at https://supabase.com
2. Get your database connection URL from the project settings
3. Set `DATABASE_URL` in backend/.env
4. Run migrations:

```bash
npm run db:setup
```

This will:
- Generate Prisma client
- Run all migrations
- Seed test data

## Starting Development Servers

### Method 1: Separate Terminals (Recommended)

```bash
# Terminal 1 - Backend
cd complete/SafeHave-complete-backend/backend
npm run start:dev
# Backend runs on http://localhost:3001

# Terminal 2 - Frontend
cd complete/SafeHave-complete-backend/frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### Method 2: From Root

```bash
# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

## Available Commands

From project root:

```bash
# Development
npm run dev:backend                    # Start backend in watch mode
npm run dev:frontend                   # Start frontend in watch mode

# Building
npm run build                          # Build both backend and frontend

# Production
npm start                              # Start production backend

# Testing
npm run test                           # Run backend tests
npm run test:cov                       # Run tests with coverage
npm run test:e2e                       # Run E2E tests

# Linting & Formatting
npm run lint                           # Lint backend code
npm run format                         # Format code with prettier

# Database
npm run db:setup                       # Run migrations and seed
npm run db:reset                       # Reset database (destructive)
npm run db:seed                        # Run seed only

# Cleanup
npm run clean                          # Remove node_modules and dist
npm run install:all                    # Install all dependencies
```

## Testing Credentials

After running `npm run db:setup`, you can login with:

```
Email: survivor@example.com
Password: password123

Email: counselor@example.com
Password: password123

Email: admin@example.com
Password: password123
```

## API Documentation

Once backend is running, visit:
```
http://localhost:3001/api/docs
```

This provides interactive Swagger UI documentation of all API endpoints.

## Troubleshooting

### Port 3000 or 3001 already in use

```bash
# Find and kill process on port 3001
lsof -i :3001
kill -9 <PID>

# Or change port in vite.config.ts (frontend) or main.ts (backend)
```

### Database connection error

1. Verify DATABASE_URL is correct
2. Check Supabase project is active
3. Ensure network access is allowed
4. Try: `npx prisma db push`

### Module not found errors

```bash
# Reinstall dependencies
npm run clean
npm run install:all
npm run db:setup
```

### xdg-open errors

These are safely ignored and don't affect functionality. They occur in headless environments trying to open browsers.

## Next Steps

1. Read the main [README.md](./README.md) for project overview
2. Check [complete/SafeHave-complete-backend/backend/README.md](./complete/SafeHave-complete-backend/backend/README.md) for backend details
3. Explore the API at `http://localhost:3001/api/docs`
4. Start with creating a report through the UI

## Important Notes

- All code is in the `complete/SafeHave-complete-backend` directory
- The root `package.json` is the monorepo configuration
- Frontend and backend run on different ports and communicate via API
- Database migrations are automatically applied on first setup
- JWT tokens are stored in localStorage on the frontend
- All passwords are hashed with bcryptjs

## Support

For issues:
1. Check if all environment variables are set
2. Ensure database is running and accessible
3. Clear node_modules and reinstall: `npm run clean && npm run install:all`
4. Check backend logs for errors
5. Verify CORS settings in backend main.ts
