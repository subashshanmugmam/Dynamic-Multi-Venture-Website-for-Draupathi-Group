/**
 * Complete Admin System Setup and Test
 * This script will setup and test the admin login system
 */

require('dotenv').config();
const mongoose = require('mongoose');

async function setupAdminSystem() {
  console.log('🚀 Setting up Admin System...\n');

  try {
    // 1. Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 2. Import models after connection
    const AdminUser = require('../src/models/AdminUser');

    // 3. Clean up and create fresh admin user
    console.log('\n👤 Setting up admin user...');
    
    const adminEmail = 'admin@draupathi.com';
    const adminPassword = 'Admin@123';

    // Remove existing admin user if any
    await AdminUser.deleteOne({ email: adminEmail });
    console.log('🧹 Cleaned up existing admin user');

    // Create new admin user
    const adminUser = new AdminUser({
      name: 'Super Admin',
      email: adminEmail,
      password: adminPassword,
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
      emailVerified: true,
      loginAttempts: 0,
      isLocked: false
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');

    // 4. Test the findByCredentials method
    console.log('\n🧪 Testing authentication...');
    
    try {
      const testUser = await AdminUser.findByCredentials(adminEmail, adminPassword);
      console.log('✅ Authentication test passed');
      console.log('   User ID:', testUser._id);
      console.log('   Email:', testUser.email);
      console.log('   Role:', testUser.role);
    } catch (authError) {
      console.log('❌ Authentication test failed:', authError.message);
      throw authError;
    }

    // 5. Test JWT service
    console.log('\n🔑 Testing JWT service...');
    
    const jwtService = require('../src/utils/jwtService');
    const testTokens = jwtService.generateTokens({
      _id: adminUser._id,
      email: adminUser.email,
      role: adminUser.role
    });

    if (testTokens.accessToken && testTokens.refreshToken) {
      console.log('✅ JWT service working correctly');
    } else {
      throw new Error('JWT service failed to generate tokens');
    }

    // 6. Close database connection
    await mongoose.connection.close();
    console.log('\n📡 Database connection closed');

    // 7. Display success information
    console.log('\n🎉 Admin system setup completed successfully!');
    console.log('==========================================');
    console.log('🔐 Admin Login Credentials:');
    console.log('   Email: admin@draupathi.com');
    console.log('   Password: Admin@123');
    console.log('==========================================');
    console.log('🌐 Admin Login URL:');
    console.log('   http://localhost:5173/admin/login');
    console.log('==========================================');
    console.log('📋 Next Steps:');
    console.log('   1. Start backend: npm start');
    console.log('   2. Start frontend: npm run dev (in frontend directory)');
    console.log('   3. Navigate to admin login URL');
    console.log('   4. Use the credentials above');
    console.log('==========================================\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error('Stack trace:', error.stack);
    
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Make sure MongoDB is running');
    console.log('   2. Check .env file has correct MONGODB_URI');
    console.log('   3. Verify JWT secrets are set in .env');
    console.log('   4. Try running: npm install');
    
    process.exit(1);
  }
}

setupAdminSystem();