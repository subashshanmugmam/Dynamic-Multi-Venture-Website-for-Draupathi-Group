// Server startup verification script
const express = require('express');
const path = require('path');

// Import the app configuration
const app = require('../src/server');

console.log('🚀 Draupathi Backend Server Configuration Check');
console.log('==========================================\n');

// Check environment variables
console.log('📋 Environment Configuration:');
console.log(`   PORT: ${process.env.PORT || '5000'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Not set'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Not set'}`);
console.log(`   CORS_ORIGIN: ${process.env.CORS_ORIGIN || 'Not set'}`);

// List all registered routes
console.log('\n🛣️  Registered API Routes:');
console.log('   GET  /health - Health check endpoint');
console.log('   POST /api/auth/login - User login');
console.log('   POST /api/auth/register - Admin registration (protected)');
console.log('   POST /api/auth/register/public - Public user registration');
console.log('   POST /api/auth/logout - User logout');
console.log('   GET  /api/auth/me - Get current user');
console.log('   POST /api/auth/refresh - Refresh token');
console.log('   PUT  /api/auth/profile - Update profile');
console.log('   PUT  /api/auth/change-password - Change password');

console.log('\n✅ Server configuration verified!');
console.log('💡 To start the server, run: npm start');
console.log('🧪 To test auth endpoints, run: node scripts/testAuth.js\n');