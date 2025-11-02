require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('../src/models/AdminUser');

const run = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/draupathi-group';
  
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@draupathi.com';
  const name = process.env.DEFAULT_ADMIN_NAME || 'Super Admin';
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';

  let user = await AdminUser.findOne({ email });
  if (user) {
    console.log('Admin user already exists:', email);
    process.exit(0);
  }

  // Create admin user with full permissions
  const adminData = {
    name,
    email,
    password,
    role: 'super_admin',
    permissions: [
      // Content permissions
      'content.read', 'content.create', 'content.update', 'content.delete',
      // Media permissions
      'media.upload', 'media.delete', 'media.manage',
      // Product permissions
      'products.read', 'products.create', 'products.update', 'products.delete',
      // Venture permissions
      'ventures.read', 'ventures.update', 'ventures.manage',
      // Banner permissions
      'banners.read', 'banners.create', 'banners.update', 'banners.delete',
      // Announcement permissions
      'announcements.read', 'announcements.create', 'announcements.update', 'announcements.delete'
    ],
    isActive: true,
    emailVerified: true
  };

  user = new AdminUser(adminData);
  await user.save();
  await user.save();
  
  console.log('✅ Default admin user created successfully!');
  console.log('📧 Email:', email);
  console.log('🔑 Password:', password);
  console.log('⚠️  Please change the default password after first login');
  
  process.exit(0);
};

run().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
