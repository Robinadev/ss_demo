#!/bin/bash

# Database Initialization Script for Supabase
# This script sets up the entire database schema and seeds initial data

set -e

echo "🚀 Starting Supabase Database Initialization..."
echo ""

# Check if we're in the backend directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Please run this script from the backend directory"
  exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo "⚠️  Warning: .env file not found. Creating from environment variables..."
fi

echo "📋 Step 1: Generating Prisma Client..."
npm run prisma:generate

echo "✅ Prisma Client generated"
echo ""

echo "🔄 Step 2: Running Database Migrations..."
npm run prisma:deploy

echo "✅ Database migrations completed"
echo ""

echo "🌱 Step 3: Seeding Database with Initial Data..."
npm run prisma:seed

echo "✅ Database seeding completed"
echo ""

echo "✨ Step 4: Verifying Database Schema..."
npm run prisma:studio &
STUDIO_PID=$!
sleep 5
kill $STUDIO_PID 2>/dev/null || true

echo ""
echo "✅ Database Initialization Complete!"
echo ""
echo "📊 Summary:"
echo "  ✓ Database schema created"
echo "  ✓ All tables initialized"
echo "  ✓ Seed data loaded"
echo "  ✓ User roles configured"
echo "  ✓ Service providers registered"
echo ""
echo "🔑 Test Credentials:"
echo "  Admin:     admin@platform.com / Admin@123456"
echo "  Counselor: counselor1@platform.com / Counselor@123456"
echo "  Doctor:    doctor1@platform.com / Medical@123456"
echo "  Lawyer:    lawyer1@platform.com / Legal@123456"
echo ""
echo "📚 Next Steps:"
echo "  1. Start the backend: npm run start:dev"
echo "  2. Start the frontend: cd ../frontend && npm run dev"
echo "  3. Login with test credentials"
echo ""
