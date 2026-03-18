#!/bin/bash

# Safe Development Startup Script
# Handles environment setup and prevents xdg-open errors

set -e

echo "=================================================="
echo "SafeHave Platform - Development Startup"
echo "=================================================="
echo ""

# Set safe environment variables
export BROWSER=none
export CI=false
export NODE_ENV=development
export SKIP_ENV_VALIDATION=true

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v)
print_status "Node.js: $NODE_VERSION"

# Check if .env files exist
echo ""
echo "Checking environment files..."

if [ ! -f "backend/.env" ]; then
    print_warning "backend/.env not found. Creating from template..."
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        print_status "Created backend/.env"
    else
        print_error "backend/.env.example not found"
    fi
fi

if [ ! -f ".env.local" ]; then
    print_warning ".env.local not found. Creating from template..."
    if [ -f ".env.local.example" ]; then
        cp .env.local.example .env.local
        print_status "Created .env.local"
    fi
fi

# Install dependencies if needed
echo ""
echo "Checking dependencies..."

if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    npm install
    print_status "Dependencies installed"
else
    print_status "Dependencies already installed"
fi

if [ ! -d "backend/node_modules" ]; then
    print_warning "backend/node_modules not found. Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    print_status "Backend dependencies installed"
else
    print_status "Backend dependencies already installed"
fi

if [ ! -d "frontend/node_modules" ]; then
    print_warning "frontend/node_modules not found. Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    print_status "Frontend dependencies installed"
else
    print_status "Frontend dependencies already installed"
fi

# Setup database if needed
echo ""
echo "Checking database..."

if [ ! -d "backend/node_modules/.prisma" ]; then
    print_warning "Prisma not initialized. Generating client..."
    cd backend
    npx prisma generate
    cd ..
    print_status "Prisma client generated"
fi

# Display startup information
echo ""
echo "=================================================="
echo "Environment Configuration"
echo "=================================================="
echo ""
echo "BROWSER=$BROWSER"
echo "CI=$CI"
echo "NODE_ENV=$NODE_ENV"
echo ""

# Ask user what to start
echo "What would you like to start?"
echo "1) Backend only (npm run dev)"
echo "2) Frontend only (npm run dev)"
echo "3) Both (concurrently)"
echo "4) Exit"
echo ""

read -p "Select option (1-4): " choice

case $choice in
    1)
        print_status "Starting backend..."
        echo ""
        cd backend
        npm run dev
        ;;
    2)
        print_status "Starting frontend..."
        echo ""
        cd frontend
        npm run dev
        ;;
    3)
        print_status "Starting both backend and frontend..."
        echo ""
        npm run dev:all
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid option"
        exit 1
        ;;
esac
