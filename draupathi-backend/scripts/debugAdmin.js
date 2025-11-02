// Debug script for admin login endpoint
require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('../src/models/AdminUser');

async function debugAdminLogin() {
  console.log('🔍 Debugging Admin Login...\n');

  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin user exists
    const email = 'admin@draupathi.com';
    const adminUser = await AdminUser.findOne({ email });
    
    if (!adminUser) {
      console.log('❌ Admin user not found. Creating one...');
      
      const newAdmin = new AdminUser({
        name: 'Super Admin',
        email: email,
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
      
      await newAdmin.save();
      console.log('✅ Admin user created successfully');
    } else {
      console.log('✅ Admin user found:', {
        email: adminUser.email,
        role: adminUser.role,
        isActive: adminUser.isActive,
        isLocked: adminUser.isLocked,
        loginAttempts: adminUser.loginAttempts
      });
    }

    // Test the findByCredentials method
    console.log('\n🧪 Testing findByCredentials method...');
    try {
      const user = await AdminUser.findByCredentials(email, 'Admin@123');
      console.log('✅ findByCredentials works:', user.email);
    } catch (error) {
      console.log('❌ findByCredentials error:', error.message);
    }

    // Test JWT Service
    console.log('\n🔑 Testing JWT Service...');
    const jwtService = require('../src/utils/jwtService');
    
    // Create a mock user object for token generation
    const mockUser = { _id: 'test123', email: email, role: 'super_admin' };
    
    try {
      const tokens = jwtService.generateTokens(mockUser);
      console.log('✅ JWT Service works:', {
        accessToken: tokens.accessToken ? 'Generated' : 'Missing',
        refreshToken: tokens.refreshToken ? 'Generated' : 'Missing'
      });
    } catch (error) {
      console.log('❌ JWT Service error:', error.message);
    }

    // Check environment variables
    console.log('\n📋 Environment Check:');
    console.log('JWT_ACCESS_SECRET:', process.env.JWT_ACCESS_SECRET ? 'Set' : 'Missing');
    console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET ? 'Set' : 'Missing');
    console.log('JWT_ACCESS_EXPIRY:', process.env.JWT_ACCESS_EXPIRY || 'Not set');
    console.log('JWT_REFRESH_EXPIRY:', process.env.JWT_REFRESH_EXPIRY || 'Not set');

    await mongoose.connection.close();
    console.log('\n🎉 Debug completed successfully!');

  } catch (error) {
    console.error('❌ Debug failed:', error);
    console.error('Stack:', error.stack);
  }
}

debugAdminLogin();