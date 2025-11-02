// Complete admin login test script
require('dotenv').config();
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const AdminUser = require('../src/models/AdminUser');

async function testAdminLogin() {
  console.log('🧪 Testing Admin Login System...\n');

  try {
    // Step 1: Connect to database
    console.log('1. Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('   ✅ Connected successfully');

    // Step 2: Ensure admin user exists
    console.log('\n2. Checking admin user...');
    const adminEmail = 'admin@draupathi.com';
    const adminPassword = 'Admin@123';
    
    let admin = await AdminUser.findOne({ email: adminEmail });
    
    if (!admin) {
      console.log('   Creating admin user...');
      admin = new AdminUser({
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
        emailVerified: true
      });
      
      await admin.save();
      console.log('   ✅ Admin user created');
    } else {
      console.log('   ✅ Admin user exists');
      console.log('   Details:', {
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        isLocked: admin.isLocked
      });
    }

    // Step 3: Test the login API endpoint
    console.log('\n3. Testing login API endpoint...');
    const baseUrl = 'http://localhost:5000';
    const loginUrl = `${baseUrl}/api/admin/auth/login`;
    
    console.log('   URL:', loginUrl);
    console.log('   Payload:', { email: adminEmail, password: '[HIDDEN]' });

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: adminEmail,
        password: adminPassword,
        remember: false
      })
    });

    console.log('   Response Status:', response.status);
    console.log('   Response Headers:', Object.fromEntries(response.headers));

    const responseText = await response.text();
    console.log('   Response Body:', responseText);

    try {
      const data = JSON.parse(responseText);
      if (data.success) {
        console.log('   ✅ Login successful!');
        console.log('   User:', data.data.user.email);
        console.log('   Token:', data.data.tokens.accessToken ? 'Generated' : 'Missing');
      } else {
        console.log('   ❌ Login failed:', data.error);
        console.log('   Message:', data.message);
      }
    } catch (parseError) {
      console.log('   ❌ Could not parse JSON response');
      console.log('   Raw response:', responseText);
    }

    await mongoose.connection.close();

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Check if server is running first
async function checkServer() {
  try {
    const response = await fetch('http://localhost:5000/health');
    const data = await response.json();
    console.log('✅ Server is running:', data.message);
    return true;
  } catch (error) {
    console.log('❌ Server is not running. Please start it first with: npm start');
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await testAdminLogin();
  }
}

main();