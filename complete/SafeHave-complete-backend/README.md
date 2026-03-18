# SafeHaven - Violence, Abuse & Bullying Digital Reporting Platform

A comprehensive full-stack platform for reporting and managing cases of violence, abuse, and bullying with professional support integration.

## Project Structure

```
SafeHave-complete-backend/
├── backend/                 # NestJS REST API
│   ├── src/
│   │   ├── modules/        # Feature modules (Auth, Reports, Cases, Classification, etc.)
│   │   ├── common/         # Shared services (Prisma, filters, interceptors)
│   │   ├── main.ts         # Application entry point
│   │   └── app.module.ts   # Root module
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   ├── migrations/     # Database migrations
│   │   └── seed.ts         # Initial data seed
│   ├── package.json
│   └── .env.example
│
└── frontend/               # React + Vite SPA
    ├── src/
    │   ├── pages/         # Page components
    │   ├── components/    # Reusable components
    │   ├── contexts/      # React contexts (Auth)
    │   ├── services/      # API client services
    │   ├── App.tsx        # Root component
    │   └── main.tsx       # Application bootstrap
    ├── index.html
    ├── vite.config.ts
    ├── package.json
    └── tsconfig.json
```

## Features

### Backend
- **Authentication**: JWT-based with refresh tokens
- **Authorization**: Role-based access control (6 roles)
- **Database**: PostgreSQL with Prisma ORM
- **API**: RESTful API with Swagger documentation
- **ML Classification**: Automatic incident classification
- **Modules**:
  - Reports: Submit and manage incident reports
  - Cases: Track and manage cases
  - Classification: ML-powered categorization
  - Professionals: Manage counselors, doctors, lawyers
  - Analytics: Dashboard and statistics
  - Forum: Community discussion
  - Support: Support ticket system

### Frontend
- **Authentication**: Login, registration, JWT management
- **Reports**: Create, view, and manage reports
- **Dashboard**: User dashboard with analytics
- **Responsive Design**: Mobile-friendly UI
- **State Management**: React Query for server state

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Supabase)
- npm or pnpm

### Installation

1. **Install dependencies**
```bash
npm install:all
```

2. **Configure environment variables**

Backend (`.env`):
```bash
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="24h"
PORT=3001
```

Frontend (`.env.local`):
```bash
VITE_API_URL=http://localhost:3001/api
```

3. **Initialize database**
```bash
npm run db:setup
```

4. **Start development servers**

Terminal 1 (Backend):
```bash
npm run dev:backend
```

Terminal 2 (Frontend):
```bash
npm run dev:frontend
```

Backend will be running on `http://localhost:3001`
Frontend will be running on `http://localhost:3000`

## API Documentation

Once the backend is running, visit `http://localhost:3001/api/docs` for Swagger documentation.

## Database Schema

The database includes the following main tables:
- `User` - User accounts with role-based access
- `Report` - Incident reports
- `Case` - Case management
- `MLClassification` - ML classification results
- `Professional` - Professional directory
- `ForumPost` - Community posts
- `SupportRequest` - Support tickets
- And supporting tables for relationships

## Authentication Flow

1. User registers/logs in
2. Backend returns `access_token` and `refresh_token`
3. Frontend stores tokens in localStorage
4. API requests include `Authorization: Bearer {token}`
5. On token expiration, automatic refresh using `refresh_token`
6. If refresh fails, redirect to login

## Roles & Permissions

- **SURVIVOR**: Can create reports, view cases
- **COUNSELOR**: Can manage cases, provide support
- **MEDICAL_PROFESSIONAL**: Can add medical info to cases
- **LEGAL_ADVISOR**: Can provide legal guidance
- **ADMIN**: Full platform access
- **MODERATOR**: Can moderate content

## Key Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get current user

### Reports
- `GET /reports` - List reports
- `POST /reports` - Create report
- `GET /reports/:id` - Get report details
- `PUT /reports/:id` - Update report
- `DELETE /reports/:id` - Delete report

### Classification
- `POST /classification/classify` - Classify report

## Troubleshooting

**Database connection error**: Verify `DATABASE_URL` is correct and PostgreSQL is running.

**CORS errors**: Check that frontend `VITE_API_URL` matches backend address.

**Port conflicts**: Change `PORT` in backend `.env` or frontend `vite.config.ts`.

## Development

### Running tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Building for production
```bash
npm run build
```

## Deployment

See `DEPLOYMENT_GUIDE.md` for production deployment instructions.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
