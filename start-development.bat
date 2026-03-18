@echo off
REM Safe Development Startup Script for Windows

setlocal enabledelayedexpansion

echo ==================================================
echo SafeHave Platform - Development Startup (Windows)
echo ==================================================
echo.

REM Set safe environment variables
set BROWSER=none
set CI=false
set NODE_ENV=development
set SKIP_ENV_VALIDATION=true

REM Check Node.js version
echo Checking Node.js version...
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js not found. Please install Node.js v18+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js: %NODE_VERSION%

REM Check if .env files exist
echo.
echo Checking environment files...

if not exist "backend\.env" (
    echo [WARNING] backend\.env not found
    if exist "backend\.env.example" (
        copy "backend\.env.example" "backend\.env" >nul
        echo [OK] Created backend\.env
    ) else (
        echo [ERROR] backend\.env.example not found
    )
)

if not exist ".env.local" (
    echo [WARNING] .env.local not found
    if exist ".env.local.example" (
        copy ".env.local.example" ".env.local" >nul
        echo [OK] Created .env.local
    )
)

REM Install dependencies if needed
echo.
echo Checking dependencies...

if not exist "node_modules" (
    echo [INFO] Installing root dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install root dependencies
        pause
        exit /b 1
    )
    echo [OK] Root dependencies installed
) else (
    echo [OK] Root dependencies already installed
)

if not exist "backend\node_modules" (
    echo [INFO] Installing backend dependencies...
    cd backend
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install backend dependencies
        cd ..
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Backend dependencies installed
) else (
    echo [OK] Backend dependencies already installed
)

if not exist "frontend\node_modules" (
    echo [INFO] Installing frontend dependencies...
    cd frontend
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install frontend dependencies
        cd ..
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies already installed
)

REM Setup database if needed
echo.
echo Checking database...

if not exist "backend\node_modules\.prisma" (
    echo [INFO] Generating Prisma client...
    cd backend
    call npx prisma generate
    if errorlevel 1 (
        echo [WARNING] Prisma generation had issues, continuing...
    )
    cd ..
    echo [OK] Prisma client generated
)

REM Display startup information
echo.
echo ==================================================
echo Environment Configuration
echo ==================================================
echo.
echo BROWSER=%BROWSER%
echo CI=%CI%
echo NODE_ENV=%NODE_ENV%
echo.

REM Ask user what to start
echo What would you like to start?
echo 1 = Backend only
echo 2 = Frontend only
echo 3 = Both (if concurrently is installed)
echo 4 = Exit
echo.

set /p choice="Select option (1-4): "

if "%choice%"=="1" (
    echo.
    echo [INFO] Starting backend...
    echo.
    cd backend
    call npm run dev
) else if "%choice%"=="2" (
    echo.
    echo [INFO] Starting frontend...
    echo.
    cd frontend
    call npm run dev
) else if "%choice%"=="3" (
    echo.
    echo [INFO] Starting both backend and frontend...
    echo.
    call npm run dev:all
) else if "%choice%"=="4" (
    echo Exiting...
    exit /b 0
) else (
    echo [ERROR] Invalid option
    pause
    exit /b 1
)

pause
