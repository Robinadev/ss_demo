# SafeHaven - Digital Reporting Platform

Production-ready full-stack application for reporting violence, abuse, and bullying. Built with React, NestJS, Prisma ORM, and PostgreSQL/Supabase.

## Quick Start

```bash
npm run install:all        # Install all dependencies
npm run db:setup           # Initialize database

# Terminal 1: Backend (http://localhost:3001)
npm run dev:backend

# Terminal 2: Frontend (http://localhost:3000)
npm run dev:frontend
```

## Project Structure

All code is organized in `/complete/SafeHave-complete-backend/`:

```
complete/SafeHave-complete-backend/
├── backend/               # NestJS REST API
│   ├── src/modules/      # 8 feature modules with complete functionality
│   ├── prisma/           # Database schema, migrations, seeding
│   └── package.json
├── frontend/             # React SPA with Vite
│   ├── src/
│   │   ├── pages/       # Login, Register, Dashboard, Reports, Home
│   │   ├── components/  # Layout, ProtectedRoute, Forms
│   │   ├── contexts/    # AuthContext for state management
│   │   └── services/    # API client with JWT refresh
│   └── package.json
└── README.md            # Complete documentation
```

## Features

### Backend Modules
1. **Auth**: JWT authentication, login/register, token refresh
2. **Reports**: Create and manage incident reports with ML classification
3. **Classification**: AI-powered incident categorization with confidence scoring
4. **Cases**: Manage cases, assign to professionals, track progress
5. **Professionals**: Directory of counselors, doctors, lawyers with reviews
6. **Analytics**: Dashboard with real-time statistics and insights
7. **Forum**: Community discussion and support
8. **Support**: Support ticket system for user assistance

### Security
- JWT tokens with automatic refresh
- bcryptjs password hashing
- Role-based access control (6 roles)
- CORS protection
- Rate limiting
- Input validation with class-validator
- SQL injection prevention via Prisma

### Database
- PostgreSQL with Prisma ORM
- 14 database models with relationships
- Automatic migrations
- Seed data for testing
- Indexes for performance

## Environment Setup

Create `.env` in `complete/SafeHave-complete-backend/backend/`:
```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret-key
PORT=3001
```

Create `.env.local` in `complete/SafeHave-complete-backend/frontend/`:
```
VITE_API_URL=http://localhost:3001/api
```

## Available Commands

```bash
npm run install:all    # Install all dependencies
npm run dev:backend    # Start backend (port 3001)
npm run dev:frontend   # Start frontend (port 3000)
npm run build          # Build for production
npm run db:setup       # Initialize database
npm run db:reset       # Reset database
npm run db:seed        # Seed test data
npm run test           # Run tests
npm run lint           # Run linter
```

## API Documentation

Visit `http://localhost:3001/api/docs` (Swagger UI) for full API documentation.

## Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |
| POST | `/auth/refresh` | Refresh token |
| POST | `/reports` | Create report |
| GET | `/reports` | List reports |
| POST | `/classification/classify` | Classify report |
| GET | `/analytics/dashboard` | Dashboard stats |

## License

MIT
