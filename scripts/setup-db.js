#!/usr/bin/env node

/**
 * Database Initialization Script
 * Initializes Supabase PostgreSQL database with all necessary tables and seed data
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const backendDir = path.join(__dirname, '../complete/SafeHave-complete-backend/backend');

console.log('[v0] 🚀 Starting Supabase Database Initialization...\n');

// Check if backend directory exists
if (!fs.existsSync(backendDir)) {
  console.error('[v0] ❌ Backend directory not found:', backendDir);
  process.exit(1);
}

// Array of commands to run sequentially
const commands = [
  {
    name: 'Generate Prisma Client',
    cmd: 'npm',
    args: ['run', 'prisma:generate'],
  },
  {
    name: 'Deploy Migrations',
    cmd: 'npm',
    args: ['run', 'prisma:deploy'],
  },
  {
    name: 'Seed Database',
    cmd: 'npm',
    args: ['run', 'prisma:seed'],
  },
];

let currentCommandIndex = 0;

function runNextCommand() {
  if (currentCommandIndex >= commands.length) {
    console.log('\n[v0] ✅ Database Initialization Complete!\n');
    console.log('[v0] 📊 Summary:');
    console.log('[v0]   ✓ Database schema created');
    console.log('[v0]   ✓ All tables initialized');
    console.log('[v0]   ✓ Seed data loaded');
    console.log('[v0]   ✓ User roles configured');
    console.log('[v0]   ✓ Service providers registered\n');
    console.log('[v0] 🔑 Test Credentials:');
    console.log('[v0]   Admin:     admin@platform.com / Admin@123456');
    console.log('[v0]   Counselor: counselor1@platform.com / Counselor@123456');
    console.log('[v0]   Doctor:    doctor1@platform.com / Medical@123456');
    console.log('[v0]   Lawyer:    lawyer1@platform.com / Legal@123456\n');
    process.exit(0);
  }

  const command = commands[currentCommandIndex];
  console.log(`[v0] Step ${currentCommandIndex + 1}: ${command.name}...`);

  const child = spawn(command.cmd, command.args, {
    cwd: backendDir,
    stdio: ['inherit', 'inherit', 'inherit'],
    shell: true,
  });

  child.on('close', (code) => {
    if (code !== 0) {
      console.error(`[v0] ❌ Command failed: ${command.name}`);
      console.error(`[v0] Exit code: ${code}`);
      process.exit(code);
    }
    console.log(`[v0] ✅ ${command.name} completed\n`);
    currentCommandIndex++;
    runNextCommand();
  });

  child.on('error', (err) => {
    console.error(`[v0] ❌ Error running command: ${command.name}`);
    console.error(err);
    process.exit(1);
  });
}

// Start running commands
runNextCommand();
