@echo off
REM SafeHaven Development Server Startup Script for Windows

setlocal enabledelayedexpansion

echo.
echo ===================================================
echo     SafeHaven Platform - Development Server
echo ===================================================
echo.

REM Disable browser opening
set BROWSER=none
set CI=true

REM Check if node_modules exists in root
if not exist "node_modules" (
  echo Installing root dependencies...
  call npm install
)

REM Check if backend node_modules exists
if not exist "backend\node_modules" (
  echo Installing backend dependencies...
  call npm install -w backend
)

REM Check if frontend node_modules exists
if not exist "frontend\node_modules" (
  echo Installing frontend dependencies...
  call npm install -w frontend
)

echo.
echo Dependencies installed
echo.

REM Start backend
echo Starting backend server...
start "SafeHaven Backend" npm run dev -w backend
echo Backend started
echo.

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start frontend
echo Starting frontend server...
start "SafeHaven Frontend" npm run dev -w frontend
echo Frontend started
echo.

echo ===================================================
echo SafeHaven is running!
echo   Backend:  http://localhost:3000
echo   Frontend: http://localhost:5173
echo   API Docs: http://localhost:3000/api/docs
echo ===================================================
echo.
echo Close this window to stop the servers
pause
