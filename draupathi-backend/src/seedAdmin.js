const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminUser = require('./models/AdminUser');
const ActivityLog = require('./models/ActivityLog');
require('dotenv').config();

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

// Create admin user
const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await AdminUser.findOne({ email: 'admin@draupathi.com' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return existingAdmin;
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('Admin@123', saltRounds);

    // Create admin user
    const adminUser = new AdminUser({
      name: 'System Administrator',
      email: 'admin@draupathi.com',
      password: hashedPassword,
      role: 'super_admin',
      isActive: true,
      permissions: [
        'users.read', 'users.create', 'users.update', 'users.delete',
        'content.read', 'content.create', 'content.update', 'content.delete',
        'ventures.read', 'ventures.create', 'ventures.update', 'ventures.delete',
        'products.read', 'products.create', 'products.update', 'products.delete',
        'contacts.read', 'contacts.update', 'contacts.delete',
        'banners.read', 'banners.create', 'banners.update', 'banners.delete',
        'announcements.read', 'announcements.create', 'announcements.update', 'announcements.delete',
        'analytics.read', 'settings.read', 'settings.update'
      ],
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedUser = await adminUser.save();
    console.log('✅ Admin user created successfully');
    console.log(`   Email: admin@draupathi.com`);
    console.log(`   Password: Admin@123`);
    console.log(`   Role: super_admin`);
    return savedUser;
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    throw error;
  }
};

// Create sample activity logs
const createSampleActivityLogs = async (adminUser) => {
  try {
    const existingLogs = await ActivityLog.countDocuments();
    if (existingLogs > 0) {
      console.log('✅ Activity logs already exist');
      return;
    }

    const sampleLogs = [
      {
        userId: adminUser._id,
        action: 'create',
        resourceType: 'AdminUser',
        resourceId: adminUser._id,
        resourceName: 'System Administrator',
        description: 'Admin user account created',
        ipAddress: '127.0.0.1',
        userAgent: 'System/1.0',
        timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        userId: adminUser._id,
        action: 'login',
        resourceType: 'Auth',
        description: 'Admin user logged in',
        ipAddress: '127.0.0.1',
        userAgent: 'Chrome/119.0.0.0',
        timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
      },
      {
        userId: adminUser._id,
        action: 'update',
        resourceType: 'Settings',
        description: 'Updated system settings',
        ipAddress: '127.0.0.1',
        userAgent: 'Chrome/119.0.0.0',
        timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
      }
    ];

    await ActivityLog.insertMany(sampleLogs);
    console.log('✅ Sample activity logs created');
  } catch (error) {
    console.error('❌ Error creating activity logs:', error);
    throw error;
  }
};

// Main seeder function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    
    const adminUser = await createAdminUser();
    await createSampleActivityLogs(adminUser);
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Admin Login Credentials:');
    console.log('   URL: http://localhost:5173/admin/login');
    console.log('   Email: admin@draupathi.com');
    console.log('   Password: Admin@123');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔐 Database connection closed');
    process.exit(0);
  }
};

// Run seeder
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, createAdminUser, createSampleActivityLogs };