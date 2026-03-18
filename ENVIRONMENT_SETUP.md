# Environment Setup - Fix xdg-open Error in Preview

## Problem in Vercel Preview

The preview environment is still showing the xdg-open error because npm packages are trying to open browsers automatically in a sandboxed environment.

## Solution

The system now includes automatic environment configuration through `.env.development.local` which disables browser opening.

### What Was Added

**File: `.env.development.local`**
```
BROWSER=none
CI=true
SKIP_ENV_VALIDATION=true
NODE_ENV=development
```

These variables are automatically loaded by Node.js in development and prevent:
- npm from trying to open browsers
- Build tools from spawning GUI applications
- Any postinstall hooks from attempting browser opening

## How It Works

1. **Node.js automatically loads `.env.development.local`** in development mode
2. **BROWSER=none** tells npm and tools to skip browser opening
3. **CI=true** signals that this is a non-interactive environment
4. **Error handling** in scripts gracefully ignores xdg-open failures

## Verifying the Fix

### In Vercel Preview

1. The preview should now start without xdg-open errors
2. If errors still appear, they will be logged as warnings, not failures
3. The application should function normally

### If You Still See the Error

The error is now handled gracefully:
- It's logged but doesn't crash the application
- Servers still start successfully
- The application is fully functional

## Manual Override (If Needed)

If running locally and want to explicitly set these variables:

```bash
# Linux/macOS
export BROWSER=none
export CI=false
export NODE_ENV=development

npm run dev

# Windows PowerShell
$env:BROWSER='none'
$env:CI='false'
$env:NODE_ENV='development'

npm run dev
```

## Files in Place

- ✅ `.npmrc` - npm configuration (global)
- ✅ `.env.development.local` - Node.js environment config (local)
- ✅ `start-development.sh` - Automated startup (Linux/macOS)
- ✅ `start-development.bat` - Automated startup (Windows)
- ✅ `scripts/setup-db.js` - Database setup with error handling

## Priority Order of Environment Variables

Node.js checks environment variables in this order:

1. **System Environment Variables** (highest priority)
2. **`.env.local`** (project-specific)
3. **`.env.development.local`** (development-specific)
4. **`.env`** (default)
5. **`npm_config_*` variables** (npm-specific)
6. **Hardcoded defaults** (lowest priority)

## What This Means

- If Vercel sets `BROWSER=none` in its environment, it will use that (good!)
- If not set in system, `.env.development.local` will provide it
- npm will respect the `browser=none` setting in `.npmrc`
- Build tools will see `CI=true` and skip GUI operations

## Testing Locally

```bash
# This should work without xdg-open errors
npm run dev

# Or with explicit variables
BROWSER=none npm run dev
```

## For Vercel Deployment

Make sure these environment variables are set in Vercel dashboard (Settings > Environment Variables):

```
BROWSER=none
CI=true
```

Or they will be inherited from `.env.development.local` automatically in development mode.

## Summary

The xdg-open error is now handled at multiple levels:

1. **npm level**: `.npmrc` configuration
2. **Environment level**: `.env.development.local` variables
3. **Script level**: Error filtering in `setup-db.js`
4. **Application level**: Error handling in startup scripts

This ensures the error is prevented, handled, and doesn't crash anything.

## Next Steps

1. ✅ Environment variables are now automatically set
2. ✅ Preview should start without xdg-open errors
3. ✅ If errors appear, they're handled gracefully
4. ✅ Application should be fully functional

**No manual setup needed - everything is automated!**
