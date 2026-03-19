# SafeHaven Platform - Complete Setup Instructions

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Supabase project created with PostgreSQL database

## Step 1: Install Dependencies

Navigate to the root of the project and install all dependencies:

```bash
cd complete/SafeHave-complete-backend

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

Or use the convenience script from root:

```bash
npm run install:all
```

## Step 2: Configure Environment Variables

### Backend Configuration

Create a `.env` file in `backend/` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
DATABASE_URL=postgresql://postgres:password@db.supabaseproject.com:5432/postgres?schema=public
JWT_SECRET=your-secure-jwt-secret-key-here-min-32-chars
JWT_EXPIRATION=24h
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
API_VERSION=v1
```

**Getting your DATABASE_URL from Supabase:**
1. Go to Supabase project settings
2. Find "Connection string" under "Connect"
3. Copy the connection string and add `?schema=public` at the end
4. Replace `[YOUR-PASSWORD]` with your database password

### Frontend Configuration

Create a `.env.local` file in `frontend/` directory:

```bash
cd ../frontend
cat > .env.local << 'EOF'
VITE_API_URL=http://localhost:3001/api/v1
EOF
```

## Step 3: Initialize the Database

From the `backend/` directory:

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:deploy

# Create default users
npm run db:init
```

Or from root:

```bash
npm run db:setup
```

This will:
1. Create all database tables
2. Create test users:
   - admin@safehaven.com / admin123
   - counselor@safehaven.com / counselor123
   - survivor@safehaven.com / survivor123

## Step 4: Start the Backend

From the `backend/` directory:

```bash
npm run start:dev
```

You should see:
```
[Nest] 12345 - 01/01/2024, 10:00:00 AM LOG [NestFactory] Nest application successfully started +2ms
[Nest] 12345 - 01/01/2024, 10:00:00 AM LOG [Bootstrap] Server running on port 3001
```

The API will be available at:
- **REST API**: http://localhost:3001/api/v1
- **Swagger Docs**: http://localhost:3001/api/v1/docs

## Step 5: Start the Frontend

From the `frontend/` directory (in a new terminal):

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 123 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

The frontend will be available at: http://localhost:3000

## Troubleshooting

### Issue: `vite: command not found`
**Solution**: Run `npm install` in the frontend directory to install dependencies.

```bash
cd frontend
npm install
npm run dev
```

### Issue: `prisma: command not found`
**Solution**: Run `npm install` in the backend directory.

```bash
cd backend
npm install
npm run prisma:generate
```

### Issue: Database connection error
**Solution**: 
1. Verify DATABASE_URL in `.env` is correct
2. Ensure your Supabase project is running
3. Check database password is correct
4. Verify connection string includes `?schema=public`

### Issue: CORS error in frontend
**Solution**: Ensure backend is running with correct FRONTEND_URL in `.env`:
```env
FRONTEND_URL=http://localhost:3000
```

### Issue: Token refresh failing
**Solution**: Ensure JWT_SECRET in `.env` is at least 32 characters long.

### Issue: Port already in use
**Solution**: Change ports in `.env` and vite.config.ts:

Backend (`.env`):
```env
PORT=3002
```

Frontend (`vite.config.ts`):
```js
server: {
  port: 3001,  // Change this
}
```

## Testing the Setup

### Test Backend API

1. Visit Swagger UI: http://localhost:3001/api/v1/docs
2. Click "Authorize" button
3. Login with: admin@safehaven.com / admin123
4. Try endpoints:
   - GET /api/v1/auth/me - Get current user
   - POST /api/v1/reports - Create a report
   - POST /api/v1/classification/analyze - Test ML classification

### Test Frontend

1. Visit http://localhost:3000
2. Click "Login"
3. Use credentials: survivor@safehaven.com / survivor123
4. Create a new report
5. View dashboard

## Database Management

### View Database Data

Use Prisma Studio to view and edit database:

```bash
cd backend
npm run prisma:studio
```

This opens http://localhost:5555 with database browser.

### Reset Database

WARNING: This deletes all data!

```bash
cd backend
npm run db:reset
```

### Seed Additional Test Data

```bash
cd backend
npm run prisma:seed
```

## Production Build

### Build Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Build Frontend

```bash
cd frontend
npm run build
npm run preview
```

## Deployment

### Deploy to Vercel (Frontend)

```bash
# From frontend directory
npm i -g vercel
vercel
```

### Deploy to Railway/Render (Backend)

1. Create account on Railway or Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

## Common Commands

```bash
# From backend directory
npm run start:dev        # Start development server
npm run build            # Build for production
npm run lint             # Run linter
npm run format           # Format code
npm run test             # Run tests
npm run db:setup         # Initialize database
npm run prisma:studio    # Open database browser

# From frontend directory
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run linter
npm run format           # Format code
```

## Architecture Overview

```
complete/SafeHave-complete-backend/
├── backend/
│   ├── src/
│   │   ├── modules/          # 8 feature modules
│   │   ├── common/           # Shared utilities
│   │   ├── app.module.ts     # Main module
│   │   └── main.ts           # Entry point
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   ├── migrations/       # Database migrations
│   │   └── seed.ts           # Seed script
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── services/         # API client
│   │   ├── contexts/         # State contexts
│   │   ├── App.tsx           # Main component
│   │   └── main.tsx          # Entry point
│   ├── vite.config.ts        # Vite configuration
│   └── package.json
│
└── README.md
```

## Documentation

- **API Documentation**: http://localhost:3001/api/v1/docs (when backend running)
- **Backend README**: `backend/README.md`
- **Database Schema**: `backend/SCHEMA_REFERENCE.md`
- **ML Classification**: `backend/ML_CLASSIFICATION.md`

## Support

If you encounter issues:
1. Check this file's Troubleshooting section
2. Review error messages in terminal
3. Check browser console (F12) for frontend errors
4. Check Swagger UI at http://localhost:3001/api/v1/docs for API status

---

**Setup Complete!** You're ready to develop the SafeHaven platform.
