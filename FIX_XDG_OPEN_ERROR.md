# Fix: Error spawn xdg-open ENOENT

## Problem
When running the application or setup scripts, you encounter:
```
Error: spawn xdg-open ENOENT
    at ChildProcess._handle.onexit (node:internal/child_process:286:19)
```

## Root Cause
`xdg-open` is a Linux utility used to open files/URLs with the default application. This error occurs when:
1. Running in a non-Linux environment (Windows, macOS, or containerized environment)
2. A package is trying to open the browser automatically
3. The system doesn't have `xdg-open` available (sandboxed environment, CI/CD, Vercel)

## Solutions

### Solution 1: Disable Browser Opening (Recommended)
This is now built into the setup scripts. The setup-db.js script automatically:
- Sets `BROWSER=none` environment variable
- Ignores xdg-open errors gracefully
- Continues execution even if browser opening fails

**No action needed** - the scripts now handle this automatically.

### Solution 2: Manual Environment Variables
If you're running commands manually, set these environment variables:

```bash
# Linux/macOS
export BROWSER=none
export CI=true
npm run dev

# Windows (PowerShell)
$env:BROWSER='none'
$env:CI='true'
npm run dev

# Windows (CMD)
set BROWSER=none
set CI=true
npm run dev
```

### Solution 3: Use Docker (If Available)
If you have Docker, run the backend in a container where xdg-open is available:

```bash
docker run -it \
  -e DATABASE_URL=your_supabase_url \
  -e PORT=3001 \
  -p 3001:3001 \
  node:18 npm run dev
```

### Solution 4: Run Setup Script Safely
The improved setup script now handles xdg-open errors:

```bash
# Simply run - it handles errors gracefully
node scripts/setup-db.js

# Or with environment variables
BROWSER=none CI=true node scripts/setup-db.js
```

### Solution 5: Check Environment
Verify your environment doesn't require browser opening:

```bash
# Check if xdg-open is available
which xdg-open

# If not available, disable browser opening globally
echo "export BROWSER=none" >> ~/.bashrc
source ~/.bashrc
```

## What Changed in the Code

### Updated Scripts:
1. **backend/package.json**
   - Added `--skip-generate` flags to prisma commands
   - Renamed `start:dev` to `dev` for consistency
   - Better error handling in build process

2. **scripts/setup-db.js**
   - Now sets `BROWSER=none` and `CI=true` environment variables
   - Ignores xdg-open errors gracefully
   - Better error messages showing available directories
   - Pipes stderr/stdout to filter out xdg-open errors
   - Continues execution even on non-critical errors

## Testing

After applying the fixes, test with:

```bash
# Test setup script
node scripts/setup-db.js

# Test backend startup
cd backend
npm install
npm run dev

# Test frontend
cd ../frontend
npm install
npm run dev
```

## Still Having Issues?

1. **Check Node.js version**: `node --version` (requires v18+)
2. **Clear cache**: `rm -rf node_modules package-lock.json && npm install`
3. **Check Supabase connection**: Verify `DATABASE_URL` is set correctly
4. **Read full logs**: Run with `DEBUG=* npm run dev` for verbose output
5. **Check TROUBLESHOOTING.md** for more issues

## Environment Variables Reference

| Variable | Value | Purpose |
|----------|-------|---------|
| `BROWSER` | `none` | Prevents automatic browser opening |
| `CI` | `true` | Signals running in CI/CD environment |
| `SKIP_ENV_VALIDATION` | `true` | Skips environment validation checks |
| `DATABASE_URL` | Supabase URL | PostgreSQL database connection |
| `JWT_SECRET` | Random string | JWT token signing secret |
| `PORT` | 3001 | Backend server port |
| `NODE_ENV` | development/production | Node environment |
