#!/usr/bin/env node

/**
 * Setup script for Draupathi Backend
 * This script will:
 * 1. Test MongoDB connection
 * 2. Create default admin user
 * 3. Start the server
 */

const mongoose = require('mongoose');
require('dotenv').config();

const AdminUser = require('../src/models/AdminUser');

async function setupBackend() {
  console.log('🚀 Starting Draupathi Backend Setup...\n');

  try {
    // Step 1: Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    console.log('   URI:', process.env.MONGODB_URI?.replace(/:[^:]*@/, ':***@') || 'Not set');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/DIT');
    console.log('✅ MongoDB connected successfully\n');

    // Step 2: Create default admin user
    console.log('👤 Checking for default admin user...');
    const adminEmail = 'admin@draupathi.com';
    
    let adminUser = await AdminUser.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('   Creating default admin user...');
      
      adminUser = new AdminUser({
        name: 'Super Admin',
        email: adminEmail,
        password: 'Admin@123',
        role: 'super_admin',
        permissions: [
          'content.read', 'content.create', 'content.update', 'content.delete',
          'media.upload', 'media.delete', 'media.manage',
          'products.read', 'products.create', 'products.update', 'products.delete',
          'ventures.read', 'ventures.update', 'ventures.manage',
          'banners.read', 'banners.create', 'banners.update', 'banners.delete',
          'announcements.read', 'announcements.create', 'announcements.update', 'announcements.delete'
        ],
        isActive: true,
        emailVerified: true
      });
      
      await adminUser.save();
      console.log('✅ Default admin user created');
      console.log('   Email:', adminEmail);
      console.log('   Password: Admin@123');
      console.log('   ⚠️  Please change the password after first login!\n');
    } else {
      console.log('✅ Admin user already exists\n');
    }

    // Step 3: Close MongoDB connection
    await mongoose.connection.close();
    console.log('📡 MongoDB connection closed');
    
    // Step 4: Start the server
    console.log('🌟 Starting the server...\n');
    console.log('==========================================');
    console.log('🎉 Setup completed successfully!');
    console.log('==========================================');
    console.log('📝 Admin Login Details:');
    console.log('   URL: http://localhost:5173/admin/login');
    console.log('   Email: admin@draupathi.com');
    console.log('   Password: Admin@123');
    console.log('==========================================');
    console.log('🔗 Public Login: http://localhost:5173/login');
    console.log('🏠 Home: http://localhost:5173');
    console.log('==========================================\n');
    
    // Import and start the server
    require('../src/server');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure MongoDB is running');
    console.error('   2. Check your .env file configuration');
    console.error('   3. Verify network connectivity');
    console.error('\n📋 Current Configuration:');
    console.error('   PORT:', process.env.PORT || '5000');
    console.error('   NODE_ENV:', process.env.NODE_ENV || 'development');
    console.error('   MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the setup
setupBackend();