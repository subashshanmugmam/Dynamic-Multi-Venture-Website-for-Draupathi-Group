// Test script to verify backend auth endpoints
const baseUrl = 'http://localhost:5000';

async function testAuthEndpoints() {
  console.log('🧪 Testing Authentication Endpoints...\n');

  // Test 1: Health check
  try {
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return;
  }

  // Test 2: Public registration
  try {
    console.log('\n2. Testing public registration...');
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'TestPassword123'
    };

    const registerResponse = await fetch(`${baseUrl}/api/auth/register/public`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });

    if (registerResponse.ok) {
      const registerResult = await registerResponse.json();
      console.log('✅ Registration successful:', registerResult.message);
    } else {
      const errorText = await registerResponse.text();
      console.log('⚠️ Registration response:', registerResponse.status, errorText);
    }
  } catch (error) {
    console.log('❌ Registration test failed:', error.message);
  }

  // Test 3: Login
  try {
    console.log('\n3. Testing login...');
    const loginData = {
      email: 'test@example.com',
      password: 'TestPassword123'
    };

    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (loginResponse.ok) {
      const loginResult = await loginResponse.json();
      console.log('✅ Login successful:', loginResult.message);
      console.log('👤 User role:', loginResult.data.user.role);
    } else {
      const errorText = await loginResponse.text();
      console.log('⚠️ Login response:', loginResponse.status, errorText);
    }
  } catch (error) {
    console.log('❌ Login test failed:', error.message);
  }

  console.log('\n🏁 Authentication endpoint tests completed!');
}

// Run the test if this script is executed directly
if (typeof window === 'undefined') {
  // Running in Node.js
  const fetch = require('node-fetch');
  testAuthEndpoints();
} else {
  // Running in browser
  window.testAuthEndpoints = testAuthEndpoints;
}

module.exports = { testAuthEndpoints };