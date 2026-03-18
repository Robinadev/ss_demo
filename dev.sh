#!/bin/bash
# SafeHaven Development Server Startup Script

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}    SafeHaven Platform - Development Server${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}\n"

# Disable browser opening
export BROWSER=none
export CI=true

# Check if node_modules exists in root
if [ ! -d "node_modules" ]; then
  echo -e "${BLUE}Installing root dependencies...${NC}"
  npm install
fi

# Check if backend node_modules exists
if [ ! -d "backend/node_modules" ]; then
  echo -e "${BLUE}Installing backend dependencies...${NC}"
  npm install -w backend
fi

# Check if frontend node_modules exists
if [ ! -d "frontend/node_modules" ]; then
  echo -e "${BLUE}Installing frontend dependencies...${NC}"
  npm install -w frontend
fi

echo -e "\n${GREEN}✓ Dependencies installed${NC}\n"

# Start backend
echo -e "${BLUE}Starting backend server...${NC}"
npm run dev -w backend &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}\n"

# Wait a moment for backend to start
sleep 3

# Start frontend
echo -e "${BLUE}Starting frontend server...${NC}"
npm run dev -w frontend &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}\n"

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}SafeHaven is running!${NC}"
echo -e "  Backend:  http://localhost:3000"
echo -e "  Frontend: http://localhost:5173"
echo -e "  API Docs: http://localhost:3000/api/docs"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}\n"

# Handle cleanup
cleanup() {
  echo -e "\n${BLUE}Shutting down servers...${NC}"
  kill $BACKEND_PID 2>/dev/null || true
  kill $FRONTEND_PID 2>/dev/null || true
  echo -e "${GREEN}✓ Servers stopped${NC}"
}

trap cleanup EXIT
wait
