#!/usr/bin/env node

/**
 * Wrapper script to start NestJS backend with suppressed xdg-open errors
 * This intercepts and suppresses spawn errors from packages trying to open browsers
 */

// Set environment variables to prevent browser opening
process.env.BROWSER = 'none';
process.env.CI = 'true';
process.env.SKIP_ENV_VALIDATION = 'true';

// Suppress xdg-open errors
const originalSpawn = require('child_process').spawn;
require('child_process').spawn = function(...args) {
  const result = originalSpawn.apply(this, args);
  
  result.on('error', (error) => {
    if (error.code === 'ENOENT' && error.syscall && error.syscall.includes('xdg-open')) {
      // Silently ignore xdg-open errors
      return;
    }
    // For other errors, throw them
    throw error;
  });
  
  return result;
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  if (error?.code === 'ENOENT' && error?.syscall?.includes('xdg-open')) {
    // Silently ignore
    return;
  }
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  if (reason?.code === 'ENOENT' && reason?.syscall?.includes('xdg-open')) {
    // Silently ignore
    return;
  }
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Load and run the actual app
require('./dist/main');
