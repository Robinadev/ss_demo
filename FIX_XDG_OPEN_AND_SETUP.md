# Fix: xdg-open ENOENT Error and Complete Setup Guide

## The Problem
The `Error: spawn xdg-open ENOENT` error occurs when npm packages try to open browsers using the `xdg-open` command, which doesn't exist in the Vercel sandbox environment (and many other Linux/CI environments).

## The Solution
We've implemented a **3-layer fix** to prevent this issue:

### Layer 1: Environment Variables
Environment variables are set to disable browser opening:
- `BROWSER=none` - Tells Node.js not to open browsers
- `CI=true` - Indicates CI/CD environment

### Layer 2: npm Configuration
`.npmrc` file sets:
```
browser=none
legacy-peer-deps=true
```

### Layer 3: Startup Scripts
Created `dev.sh` (Linux/macOS) and `dev.bat` (Windows) that:
- Explicitly set environment variables
- Install dependencies for all workspaces
- Start both backend and frontend safely

## Setup Instructions

### Option 1: Using Startup Scripts (Recommended)

**Linux/macOS:**
```bash
chmod +x dev.sh
./dev.sh
```

**Windows:**
```cmd
dev.bat
```

### Option 2: Manual Setup

**1. Install dependencies:**
```bash
npm install
npm install -w backend
npm install -w frontend
```

**2. Set environment variables (required):**
```bash
export BROWSER=none
export CI=true
```

**3. Start backend (Terminal 1):**
```bash
npm run dev -w backend
```

**4. Start frontend (Terminal 2):**
```bash
npm run dev -w frontend
```

### Option 3: Using npm Scripts

```bash
# Install everything
npm run install:all

# Setup database
npm run db:setup

# Run backend only
npm run dev:backend

# Run frontend only
npm run dev:frontend
```

## What Changed

### Files Created:
- `frontend/` - Complete React frontend workspace
- `dev.sh` - Linux/macOS startup script
- `dev.bat` - Windows startup script

### Files Modified:
- `package.json` - Simplified scripts, removed problematic dependencies
- `.npmrc` - Already had `browser=none` setting

### New Frontend Structure:
```
frontend/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   └── ...
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

## Verification

After startup, you should see:
```
===================================================
    SafeHaven Platform - Development Server
===================================================

✓ Dependencies installed

Starting backend server...
✓ Backend started (PID: XXXX)

Starting frontend server...
✓ Frontend started (PID: XXXX)

===================================================
SafeHaven is running!
  Backend:  http://localhost:3000
  Frontend: http://localhost:5173
  API Docs: http://localhost:3000/api/docs
===================================================
```

## Troubleshooting

### If you still see xdg-open errors:
1. Make sure environment variables are set:
   ```bash
   echo $BROWSER  # Should be "none"
   echo $CI       # Should be "true"
   ```

2. Try the startup scripts instead of manual setup:
   - `./dev.sh` (Linux/macOS)
   - `dev.bat` (Windows)

### If ports are already in use:
- Backend uses port 3000 (configure with `PORT` env var)
- Frontend uses port 5173 (configure in `vite.config.ts`)

### If dependencies don't install:
```bash
npm run clean
npm run install:all
```

## Architecture

The project is now a proper **monorepo** with workspaces:
```
safehaven-platform/
├── backend/          (NestJS API)
├── frontend/         (React/Vite)
├── package.json      (Root workspace config)
├── .npmrc            (npm config)
├── dev.sh            (Linux/macOS startup)
├── dev.bat           (Windows startup)
└── ...
```

## Next Steps

1. **Run the setup:**
   - Linux/macOS: `./dev.sh`
   - Windows: `dev.bat`

2. **Access the applications:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000
   - API Docs: http://localhost:3000/api/docs

3. **Configure database:**
   ```bash
   npm run db:setup
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Additional Resources

- Backend docs: `backend/README.md`
- Database schema: `backend/prisma/schema.prisma`
- Environment variables: `.env.development.local`

---

**Status:** ✅ All fixes applied. System is ready for development!
